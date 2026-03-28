import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizStep } from '@/types/tutorial';

interface Props {
  step: QuizStep;
  quizAnswers: Record<number, string>;
  quizComplete: boolean;
  quizScore: number;
  onAnswer: (qi: number, answer: string) => void;
  onSubmit: () => void;
}

export const QuizContent: React.FC<Props> = ({ step, quizAnswers, quizComplete, quizScore, onAnswer, onSubmit }) => (
  <div className="mt-4 space-y-4">
    {step.quiz.questions.map((q, qi) => (
      <div key={qi} className="bg-white/10 rounded-lg p-4">
        <h4 className="text-sm font-bold text-white mb-3">{qi + 1}. {q.question}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {q.options.map((opt, oi) => (
            <Button key={oi} onClick={() => onAnswer(qi, opt)} disabled={quizComplete}
              className={`p-2 text-xs min-h-[2.5rem] whitespace-normal text-center ${
                quizAnswers[qi] === opt
                  ? quizComplete
                    ? opt === q.correct ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-white/20 hover:bg-white/30'
              } text-white transition-colors`}>
              {opt}
            </Button>
          ))}
        </div>
        {quizComplete && (
          <div className={`mt-2 p-2 rounded text-xs ${quizAnswers[qi] === q.correct ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
            <strong>Äntwert:</strong> {q.correct}<br />
            <strong>Erklärung:</strong> {q.explanation}
          </div>
        )}
      </div>
    ))}

    {!quizComplete && Object.keys(quizAnswers).length === step.quiz.questions.length && (
      <div className="text-center">
        <Button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-8">
          Quiz ofginn
        </Button>
      </div>
    )}

    {quizComplete && (
      <div className="p-6 bg-white/20 rounded-lg text-center">
        <h3 className="text-xl font-bold text-white mb-2">Quiz fäerdeg!</h3>
        <p className="text-lg text-green-100 mb-3">
          {quizScore} / {step.quiz.questions.length} richteg
        </p>
        <div className="text-sm text-white">
          {quizScore === step.quiz.questions.length && "🏆 Perfekt! Du bass e richtege Konter & Matt Meeschter!"}
          {quizScore >= Math.ceil(step.quiz.questions.length * 0.8) && quizScore < step.quiz.questions.length && "🎉 Super gutt!"}
          {quizScore >= Math.ceil(step.quiz.questions.length * 0.6) && quizScore < Math.ceil(step.quiz.questions.length * 0.8) && "👍 Net schlecht!"}
          {quizScore < Math.ceil(step.quiz.questions.length * 0.6) && "📚 Lies d\'Tutorial nach eng Kéier."}
        </div>
      </div>
    )}
  </div>
);
