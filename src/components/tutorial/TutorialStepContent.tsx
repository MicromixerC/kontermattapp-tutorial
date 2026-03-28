import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TutorialStep, MiniGameStep, QuizStep } from '@/types/tutorial';
import { MiniGameContent } from './MiniGameContent';
import { QuizContent } from './QuizContent';
import { StepVisual } from './StepVisual';

const isMiniGameStep = (s: TutorialStep): s is MiniGameStep => 'miniGame' in s;
const isQuizStep    = (s: TutorialStep): s is QuizStep    => 'quiz' in s;

const POPOVER_WORDS: Record<string, string> = {
  'Tromp':       'Déi stäerkste Kaarten am Spill. Kaarte vun der Trompfaarf plus déi 3 speziellen Dammen.',
  'Trompfaarf':  'Déi Faarf (♠♥♦♣) déi dës Ronn méi staark ass.',
  'Streech':     'Ee Spill-Zuch wou déi 4 Spiller eng Kaart spillen. Déi stäerkste Kaart gewënnt.',
  'Schrom':      'De Punktwäert vun de Kaarten: A=4P, K=3P, D=2P, J=1P, 10=0P, 9=0P.',
  'Lee':         'De Punktesystem wou d\'Gewënner vun all Spill festgehalen ginn.',
  'Konter':      'Eng Annonce mat Häerzer-Damm an Rauten-Damm (+1 Linn).',
  'Matt':        'Eng Annonce mat Schëppen-Damm (+1 Linn).',
  'Ausdeeler':   'All Ronn deelt en aner Spiller d\'Kaarten aus.',
  'bekennen':    'Eng Kaart vun der selwechter Faarf spillen wéi d\'éischt Kaart vum Streech.',
  'Stänner':     'Gläichstand bei 20:20.',
  'Annonce':     'Mécht de Wäert vum Spill héiger — méi ze gewannen, awer och méi ze verléieren.',
};

const processSuits = (text: string): React.ReactNode[] =>
  text.split(/(♠|♥|♦|♣)/).map((p, i) => {
    if (p === '♠' || p === '♣') return <span key={i} className="text-gray-800">{p}</span>;
    if (p === '♥' || p === '♦') return <span key={i} className="text-red-500">{p}</span>;
    return p;
  });

const processPopovers = (text: string): React.ReactNode[] => {
  let parts: React.ReactNode[] = [text];
  Object.entries(POPOVER_WORDS).forEach(([word, explanation]) => {
    parts = parts.flatMap(part => {
      if (typeof part !== 'string') return [part];
      const segments = part.split(new RegExp(`(\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`));
      return segments.map((seg, i) =>
        seg === word
          ? <Popover key={`${word}-${i}`}>
              <PopoverTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-yellow-200 hover:text-yellow-100">{word}</span>
              </PopoverTrigger>
              <PopoverContent className="bg-white border border-gray-200 shadow-lg p-3 w-auto max-w-xs z-[200]" side="top">
                <p className="text-sm text-gray-800">{explanation}</p>
              </PopoverContent>
            </Popover>
          : seg
      );
    });
  });
  return parts.flatMap(p => typeof p === 'string' ? processSuits(p) : [p]);
};

const renderDescription = (desc: string) =>
  desc.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {processPopovers(line)}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

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
}

export const TutorialStepContent: React.FC<Props> = ({
  chapterId, step, stepIndex,
  selectedAnswer, showResult,
  quizAnswers, quizComplete, quizScore,
  onMiniGameAnswer, onQuizAnswer, onQuizSubmit, onResetMiniGame,
}) => {
  const isMini = isMiniGameStep(step);
  const isQuiz = isQuizStep(step);

  return (
    <div className="flex flex-col gap-4">
      {/* Text panel */}
      <div className="bg-white/10 rounded-lg p-4">
        {(!isMini || step.description) && (
          <>
            <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
            {step.description && (
              <div className="text-green-100 text-sm leading-relaxed">
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
          />
        )}
      </div>

      {/* Interactive visual panel — only for non-mini, non-quiz steps */}
      {!isMini && !isQuiz && (
        <StepVisual chapterId={chapterId} stepIndex={stepIndex} step={step} />
      )}
    </div>
  );
};
