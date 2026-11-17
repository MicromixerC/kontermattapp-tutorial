import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, ChevronDown, PanelRightClose, PanelRightOpen,
  Users, Layers, Star, Crown, BarChart2, AlignJustify, Trophy,
  Shuffle, Megaphone, HelpCircle, MessageSquare,
  Play, List, Gem, Medal,
  Hash, Gamepad2, BookOpen, Info, Check, Spade
} from 'lucide-react';
import { TutorialChapter, TutorialStep, QuizStep, MiniGameStep } from '@/types/tutorial';
import { TutorialStepContent } from './TutorialStepContent';

const isQuizStep     = (s: TutorialStep): s is QuizStep      => 'quiz' in s;
const isMiniGameStep = (s: TutorialStep): s is MiniGameStep  => 'miniGame' in s;

// Icon per step index per chapter
const STEP_ICONS: Record<string, React.ReactNode[]> = {
  intro:     [<Info size={14}/>, <Info size={14}/>, <Info size={14}/>],
  rules:     Array(12).fill(<BookOpen size={14}/>),
  basics:    [<Users size={14}/>, <Layers size={14}/>, <Star size={14}/>, <Crown size={14}/>, <AlignJustify size={14}/>, <BarChart2 size={14}/>, <AlignJustify size={14}/>],
  dealing:   [<Shuffle size={14}/>],
  bidding:   [<Megaphone size={14}/>, <HelpCircle size={14}/>, <MessageSquare size={14}/>, <MessageSquare size={14}/>],
  playing:   [<Play size={14}/>, <List size={14}/>],
  scoring:   [<Trophy size={14}/>, <Gem size={14}/>, <Medal size={14}/>, <AlignJustify size={14}/>, <AlignJustify size={14}/>],
  minigames: Array(9).fill(<Gamepad2 size={14}/>),
  quiz:      [<BookOpen size={14}/>],
  playhand:  [<Spade size={14}/>],
};

const stepIcon = (chapterId: string, index: number, step: TutorialStep): React.ReactNode => {
  if (isMiniGameStep(step)) return <Gamepad2 size={14} />;
  if (isQuizStep(step))     return <BookOpen size={14} />;
  return STEP_ICONS[chapterId]?.[index] ?? <Hash size={14} />;
};

interface Props {
  isOpen: boolean;
  chapters?: TutorialChapter[];
  /** steps already seen, as "chapterId-stepIndex" */
  visited?: Set<string>;
  currentChapter: TutorialChapter | undefined;
  currentStep: number;
  currentStepData: TutorialStep | undefined;
  selectedAnswer: string | null;
  showResult: boolean;
  quizAnswers: Record<number, string>;
  quizComplete: boolean;
  quizScore: number;
  onClose: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSetStep: (step: number) => void;
  onOpenChapter?: (id: string, startStep?: number) => void;
  onMiniGameAnswer: (answer: string) => void;
  onQuizAnswer: (qi: number, answer: string) => void;
  onQuizSubmit: () => void;
  onResetMiniGame?: () => void;
}

export const TutorialDialog: React.FC<Props> = ({
  isOpen, chapters = [], visited = new Set<string>(), currentChapter, currentStep, currentStepData,
  selectedAnswer, showResult, quizAnswers, quizComplete, quizScore,
  onClose, onNextStep, onPrevStep, onSetStep, onOpenChapter,
  onMiniGameAnswer, onQuizAnswer, onQuizSubmit, onResetMiniGame,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [displayStep, setDisplayStep] = useState(currentStep);
  const [visible, setVisible] = useState(true);
  // Quiz question progress — tracked via callback from QuizContent
  const [quizQ, setQuizQ] = useState(0);
  const [quizTotal, setQuizTotal] = useState(15);
  // Sidebar collapse state — starts open
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === 'undefined' || window.innerWidth >= 640);

  // When chapter changes, reset display step and quiz progress
  useEffect(() => {
    setDisplayStep(currentStep);
    setVisible(true);
    setQuizQ(0);
  }, [currentChapter?.id]);

  // Fade-transition when step changes
  useEffect(() => {
    if (currentStep === displayStep) return;
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayStep(currentStep);
      setVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [currentStep]);

  // ← / → keys move between steps (ignored while typing)
  const keyNav = useRef({ next: () => {}, prev: () => {} });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (e.key === 'ArrowRight') keyNav.current.next();
      if (e.key === 'ArrowLeft') keyNav.current.prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // start each step at the top
  useEffect(() => { contentRef.current?.scrollTo({ top: 0 }); }, [displayStep, currentChapter?.id]);

  if (!isOpen || !currentChapter || !currentStepData) return null;

  const steps = currentChapter.steps;
  const isLastStep = currentStep === steps.length - 1;
  const isQuiz = isQuizStep(currentStepData);
  const showNextBtn = !isQuiz || quizComplete;

  // Find the next chapter (skip quiz/minigames for the end-of-chapter button)
  const chapterIds = chapters.map(c => c.id);
  const currentChapterIdx = chapterIds.indexOf(currentChapter.id);
  const nextChapter = currentChapterIdx >= 0 && currentChapterIdx < chapters.length - 1
    ? chapters[currentChapterIdx + 1]
    : null;

  const handleSelectStep = (i: number) => {
    onSetStep(i);
  };

  const handleNext = () => {
    if (!isLastStep) {
      onNextStep();
    } else if (nextChapter && onOpenChapter) {
      // Open the next chapter directly at step 0
      onOpenChapter(nextChapter.id, 0);
    } else {
      onClose();
    }
  };

  keyNav.current = {
    next: () => { if (showNextBtn) handleNext(); },
    prev: () => { if (currentStep > 0) onPrevStep(); },
  };

  const displayStepData = steps[displayStep];

  return (
    // Full-screen overlay
    <div className="fixed inset-0 z-50 flex flex-col" style={{
      background: 'linear-gradient(to bottom, #2E6BAD 0%, #1a4d8a 50%, #14407A 100%)'
    }}>

      {/* ── Top bar: chapter icon + title + menu button ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2.5 border-b border-white/15">
        {/* Left: chapter icon + title */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-white/70 flex-shrink-0">{currentChapter.icon}</span>
          <span className="text-white font-bold text-sm leading-tight truncate">{currentChapter.title}</span>
        </div>
        {/* Right: sidebar toggle only */}
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          {currentChapter.id !== 'quiz' && (
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={sidebarOpen ? 'Sidebar zoumaachen' : 'Sidebar opmaachen'}
            >
              {sidebarOpen
                ? <PanelRightClose className="w-4 h-4 text-white/70" />
                : <PanelRightOpen className="w-4 h-4 text-white/70" />}
            </button>
          )}
        </div>
      </div>

      {/* ── Main area: content (left) + sidebar (right, hidden for quiz) ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Left: scrollable step content ── */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div
            className="p-4 pb-6 transition-opacity duration-150"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {displayStepData && (
              <TutorialStepContent
                chapterId={currentChapter.id}
                step={displayStepData}
                stepIndex={displayStep}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                quizAnswers={quizAnswers}
                quizComplete={quizComplete}
                quizScore={quizScore}
                onMiniGameAnswer={onMiniGameAnswer}
                onQuizAnswer={onQuizAnswer}
                onQuizSubmit={onQuizSubmit}
                onResetMiniGame={onResetMiniGame}
                onQuizProgressChange={(q, t) => { setQuizQ(q); setQuizTotal(t); }}
              />
            )}
          </div>
        </div>

        {/* ── Right sidebar: accordion (collapsible, quiz shown with purple styling) ── */}
        {currentChapter.id !== 'quiz' && sidebarOpen && (
          <div className="flex-shrink-0 w-[152px] border-l border-white/15 overflow-y-auto">
            <div className="py-1">
              {chapters
                .filter(ch => ch.id !== 'quiz')
                .map(ch => {
                  const isCurrentChapter = ch.id === currentChapter.id;
                  const isMinigames = ch.id === 'minigames';
                  return (
                    <div key={ch.id}>
                      {/* ── Chapter row ── */}
                      <button
                        onClick={() => {
                          if (isCurrentChapter) { onSetStep(0); } else { onOpenChapter?.(ch.id, 0); }
                        }}
                        className={`w-full text-left px-2.5 py-2 flex items-center gap-1.5 transition-all duration-150 ${
                          isCurrentChapter
                            ? isMinigames ? 'bg-orange-500/30 text-white' : 'bg-white/20 text-white'
                            : 'text-white/55 hover:bg-white/10 hover:text-white/80'
                        }`}
                      >
                        <span className="flex-shrink-0 text-[11px] opacity-70">{ch.icon}</span>
                        <span className={`text-[11px] leading-snug flex-1 min-w-0 ${
                          isCurrentChapter ? 'font-bold text-white' : 'font-medium'
                        }`}>{ch.title}</span>
                        {!isCurrentChapter && ch.steps.every((_, i) => visited.has(`${ch.id}-${i}`)) && (
                          <Check className="w-3 h-3 flex-shrink-0 text-green-300" aria-label="gesinn" />
                        )}
                        {isCurrentChapter && <ChevronDown className="w-3 h-3 flex-shrink-0 text-white/60" />}
                      </button>
                      {/* ── Subchapters accordion ── */}
                      {isCurrentChapter && (
                        <div className="bg-black/10">
                          {ch.steps.map((step, i) => {
                            const isActive = i === currentStep;
                            const isDone   = i < currentStep || visited.has(`${ch.id}-${i}`);
                            return (
                              <button key={i} onClick={() => onSetStep(i)}
                                className={`w-full text-left pl-5 pr-2 py-2 flex items-start gap-1.5 transition-all duration-150 border-l-2 ${
                                  isActive
                                    ? isMinigames ? 'border-orange-400 bg-orange-500/20' : 'border-white bg-white/15'
                                    : 'border-transparent hover:bg-white/8'
                                }`}
                              >
                                <span className={`text-[10px] leading-snug ${
                                  isActive ? 'text-white font-semibold' : isDone ? 'text-white/45' : 'text-white/35'
                                }`}>
                                  {step.title || (isMiniGameStep(step) ? `Mini-Spill ${i + 1}` : 'Quiz')}
                                </span>
                                {isDone && !isActive && <Check className="w-2.5 h-2.5 flex-shrink-0 mt-0.5 text-green-300/80" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              {/* ── Quiz entry at bottom of sidebar ── */}
              {(() => {
                const quizChapter = chapters.find(ch => ch.id === 'quiz');
                if (!quizChapter) return null;
                const isCurrentChapter = currentChapter.id === 'quiz';
                return (
                  <div>
                    <button
                      onClick={() => onOpenChapter?.('quiz', 0)}
                      className={`w-full text-left px-2.5 py-2 flex items-center gap-1.5 transition-all duration-150 ${
                        isCurrentChapter ? 'bg-purple-500/30 text-white' : 'text-white/55 hover:bg-white/10 hover:text-white/80'
                      }`}
                    >
                      <span className="flex-shrink-0 text-[11px] opacity-70">{quizChapter.icon}</span>
                      <span className={`text-[11px] leading-snug flex-1 min-w-0 ${
                        isCurrentChapter ? 'font-bold text-white' : 'font-medium'
                      }`}>{quizChapter.title}</span>
                      {isCurrentChapter && <ChevronDown className="w-3 h-3 flex-shrink-0 text-white/60" />}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom nav bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-t border-white/15 gap-3">
        {/* Prev */}
        <button
          onClick={onPrevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium disabled:opacity-30 transition-all flex-shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Zeréck
        </button>

        {/* Progress bar — quiz chapter shows question progress, others show step progress */}
        <div className="flex-1 mx-3">
          <div className="w-full bg-white/20 rounded-full h-1.5">
            <div
              className="bg-white rounded-full h-1.5 transition-all duration-300"
              style={{
                width: currentChapter.id === 'quiz' && !quizComplete
                  ? `${((quizQ) / quizTotal) * 100}%`
                  : `${((currentStep + 1) / steps.length) * 100}%`
              }}
            />
          </div>
          <p className="text-center text-white/40 text-[10px] mt-1">
            {currentChapter.id === 'quiz' && !quizComplete
              ? `${quizQ + 1} / ${quizTotal}`
              : `${currentStep + 1} / ${steps.length}`
            }
          </p>
        </div>

        {/* Next / Next chapter */}
        {showNextBtn ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-2 rounded-full bg-white text-blue-900 text-xs font-bold hover:bg-blue-50 transition-all flex-shrink-0"
          >
            {isLastStep
              ? nextChapter
                ? <>{nextChapter.title} <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" /></>
                : 'Fäerdeg'
              : <>Weider <ChevronRight className="w-3.5 h-3.5" /></>}
          </button>
        ) : (
          <div className="w-24 flex-shrink-0" />
        )}
      </div>
    </div>
  );
};
