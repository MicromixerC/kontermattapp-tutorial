import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { QuizStep } from '@/types/tutorial';

interface Props {
  step: QuizStep;
  quizAnswers: Record<number, string>;
  quizComplete: boolean;
  quizScore: number;
  onAnswer: (qi: number, answer: string) => void;
  onSubmit: () => void;
  onProgressChange?: (current: number, total: number) => void;
}

export const QuizContent: React.FC<Props> = ({
  step, quizAnswers, quizComplete, quizScore, onAnswer, onSubmit, onProgressChange
}) => {
  const [currentQ, setCurrentQ] = useState(0);
  const total = step.quiz.questions.length;
  const q = step.quiz.questions[currentQ];
  const answered = quizAnswers[currentQ] !== undefined;
  const isCorrect = quizAnswers[currentQ] === q?.correct;
  const isLast = currentQ === total - 1;

  // Notify parent of progress whenever question changes
  React.useEffect(() => {
    onProgressChange?.(currentQ, total);
  }, [currentQ, total]);

  const handleNext = () => {
    if (isLast) {
      onSubmit();
    } else {
      setCurrentQ(qi => qi + 1);
    }
  };

  if (quizComplete) {
    return (
      <div className="py-4 text-center space-y-4">
        <div className="text-5xl mb-2">
          {quizScore === total ? '🏆' : quizScore >= Math.ceil(total * 0.8) ? '🎉' : quizScore >= Math.ceil(total * 0.6) ? '👍' : '📚'}
        </div>
        <h3 className="text-xl font-bold text-white">Quiz fäerdeg!</h3>
        <p className="text-3xl font-bold text-green-300">{quizScore} / {total}</p>
        <p className="text-sm text-white/80">
          {quizScore === total && "Perfekt! Du bass e richtege Konter & Matt Meeschter!"}
          {quizScore >= Math.ceil(total * 0.8) && quizScore < total && "Super gutt! Du verstees d'Spillreegelen guer gutt!"}
          {quizScore >= Math.ceil(total * 0.6) && quizScore < Math.ceil(total * 0.8) && "Net schlecht! Lies nach emol d'Regelen duerch."}
          {quizScore < Math.ceil(total * 0.6) && "Probéier nach emol! Lies d'Tutorial nach eng Kéier."}
        </p>
        {/* Score breakdown */}
        <div className="flex justify-center gap-1 flex-wrap pt-2">
          {step.quiz.questions.map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold
                ${quizAnswers[i] === step.quiz.questions[i].correct
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Question */}
      <div className="bg-white/10 rounded-xl p-4">
        <p className="text-sm font-bold text-white leading-relaxed">{q.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2">
        {q.options.map((opt, oi) => {
          let style = 'bg-white/15 hover:bg-white/25 border-white/20';
          if (answered) {
            if (opt === q.correct) style = 'bg-green-500/40 border-green-400';
            else if (opt === quizAnswers[currentQ]) style = 'bg-red-500/40 border-red-400';
            else style = 'bg-white/5 border-white/10 opacity-50';
          }
          return (
            <button
              key={oi}
              onClick={() => !answered && onAnswer(currentQ, opt)}
              disabled={answered}
              className={`
                w-full text-left px-4 py-3 rounded-xl border text-sm text-white
                transition-all duration-150
                ${style}
                ${!answered ? 'cursor-pointer active:scale-98' : 'cursor-default'}
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {answered && (
        <div className="space-y-3">
          <div className={`rounded-xl p-3 text-xs ${isCorrect ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
            <span className="font-bold">{isCorrect ? '✓ Korrekt! ' : '✗ Falsch. '}</span>
            {q.explanation}
          </div>
          <Button
            onClick={handleNext}
            className="w-full bg-white text-green-800 hover:bg-green-100 font-bold"
          >
            {isLast ? 'Resultat gesinn' : (
              <span className="flex items-center justify-center gap-1">
                Nächst Fro <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
