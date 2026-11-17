import React, { useState } from 'react';
import { TutorialStep, MiniGameStep, QuizStep } from '@/types/tutorial';
import { MiniGameContent } from './MiniGameContent';
import { QuizContent } from './QuizContent';
import { StepVisual } from './StepVisual';
import { QuickCheck } from './QuickCheck';

const isMiniGameStep = (s: TutorialStep): s is MiniGameStep => 'miniGame' in s;
const isQuizStep    = (s: TutorialStep): s is QuizStep    => 'quiz' in s;

// ── Tooltip word component ────────────────────────────────────────────────────
const TooltipWord: React.FC<{ word: string; tooltip: string }> = ({ word, tooltip }) => {
  const [open, setOpen] = useState(false);
  // Render tooltip text with suit coloring
  const tooltipNodes = renderSegment(tooltip, 9999);
  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-yellow-300 underline decoration-dotted underline-offset-2 font-medium focus:outline-none"
      >
        {word}
      </button>
      {open && (
        <>
          <span className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <span className="absolute z-50 left-0 top-full mt-1 w-60 bg-blue-900 border border-white/20 rounded-xl px-3 py-2.5 text-white text-xs leading-snug shadow-xl">
            {tooltipNodes}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-1.5 right-2 text-white/40 hover:text-white text-[10px]"
            >✕</button>
          </span>
        </>
      )}
    </span>
  );
};

// ── Text rendering ────────────────────────────────────────────────────────────
// Handles: suit colors (♠♣=black, ♥♦=red), [word](tooltip), plain text
function renderSegment(text: string, keyBase: number): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Pattern handles: **bold**, [word](tooltip), suit symbols
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|(♠|♥|♦|♣)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<React.Fragment key={keyBase + i++}>{text.slice(last, match.index)}</React.Fragment>);
    }
    if (match[1] !== undefined) {
      // **bold**
      nodes.push(<strong key={keyBase + i++} className="font-bold text-white">{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      // [word](tooltip)
      nodes.push(<TooltipWord key={keyBase + i++} word={match[2]} tooltip={match[3]} />);
    } else {
      // Suit symbol — ♠♣ always black, ♥♦ always red
      const suit = match[4];
      const isRed = suit === '♥' || suit === '♦';
      nodes.push(
        <span key={keyBase + i++} className={`font-bold ${isRed ? 'text-red-500' : 'text-gray-900'}`}>{suit}</span>
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) {
    nodes.push(<React.Fragment key={keyBase + i++}>{text.slice(last)}</React.Fragment>);
  }
  return nodes;
}

const renderDescription = (desc: string): React.ReactNode[] => {
  const lines = desc.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Empty line — spacer
    if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
      continue;
    }

    // Bullet line starting with •
    if (line.trim().startsWith('•')) {
      const content = line.trim().slice(1).trim();
      elements.push(
        <div key={key++} className="flex gap-2 pl-2 mb-1">
          <span className="flex-shrink-0 text-white/50 mt-0.5">•</span>
          <span className="flex-1 text-sm">{renderSegment(content, key * 100)}</span>
        </div>
      );
      continue;
    }

    // Indented sub-line starting with spaces + em-dash (—)
    const dashMatch = line.match(/^(\s+)—\s*(.*)$/);
    if (dashMatch) {
      elements.push(
        <div key={key++} className="flex gap-2 pl-9 mb-0.5">
          <span className="flex-shrink-0 text-white/35 text-sm">—</span>
          <span className="flex-1 text-sm text-white/80">{renderSegment(dashMatch[2], key * 100)}</span>
        </div>
      );
      continue;
    }

    // Indented numbered line: spaces + digit(s) + dot
    const indentMatch = line.match(/^(\s+)(\d+)\.\s*(.*)$/);
    if (indentMatch) {
      const pointNum = parseInt(indentMatch[2]);
      const numLabel = indentMatch[2] + '.';
      const text = indentMatch[3];
      // Dim points 8 and above (dealing subchapter point 8 = role rotation note)
      const dimmed = pointNum >= 8;
      elements.push(
        <div key={key++} className={`flex gap-2 pl-4 mb-1 ${dimmed ? 'opacity-35' : ''}`}>
          <span className="flex-shrink-0 text-white/50 font-medium w-4 text-right text-sm">{numLabel}</span>
          <span className="flex-1 text-sm">{renderSegment(text, key * 100)}</span>
        </div>
      );
      continue;
    }

    // Normal paragraph line
    elements.push(
      <p key={key++} className="mb-1 text-sm">{renderSegment(line, key * 100)}</p>
    );
  }

  return elements;
};

interface Props {
  chapterId: string;
  step: TutorialStep;
  stepIndex: number;
  selectedAnswer: string | null;
  showResult: boolean;
  quizAnswers: Record<number, string>;
  quizComplete: boolean;
  quizScore: number;
  onMiniGameAnswer: (answer: string) => void;
  onQuizAnswer: (qi: number, answer: string) => void;
  onQuizSubmit: () => void;
  onResetMiniGame?: () => void;
  onQuizProgressChange?: (current: number, total: number) => void;
}

export const TutorialStepContent: React.FC<Props> = ({
  chapterId, step, stepIndex,
  selectedAnswer, showResult,
  quizAnswers, quizComplete, quizScore,
  onMiniGameAnswer, onQuizAnswer, onQuizSubmit, onResetMiniGame,
  onQuizProgressChange,
}) => {
  const isMini = isMiniGameStep(step);
  const isQuiz = isQuizStep(step);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white/10 rounded-lg p-4">
        {(!isMini || step.description) && (
          <>
            <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
            {step.description && (
              <div className="text-green-100 leading-relaxed">
                {renderDescription(step.description)}
              </div>
            )}
          </>
        )}
        {isMini && (
          <MiniGameContent
            step={step}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onAnswer={onMiniGameAnswer}
            onReset={onResetMiniGame}
          />
        )}
        {isQuiz && (
          <QuizContent
            step={step}
            quizAnswers={quizAnswers}
            quizComplete={quizComplete}
            quizScore={quizScore}
            onAnswer={onQuizAnswer}
            onSubmit={onQuizSubmit}
            onProgressChange={onQuizProgressChange}
          />
        )}
      </div>

      {!isMini && !isQuiz && (
        <StepVisual chapterId={chapterId} stepIndex={stepIndex} step={step} />
      )}
      {!isMini && !isQuiz && <QuickCheck key={`${chapterId}-${stepIndex}`} chapterId={chapterId} stepIndex={stepIndex} />}
    </div>
  );
};
