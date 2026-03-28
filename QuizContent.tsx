
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizStep } from '@/types/tutorial';

interface QuizContentProps {
  step: QuizStep;
  quizAnswers: Record<number, string>;
  quizComplete: boolean;
  quizScore: number;
  onAnswer: (questionIndex: number, answer: string) => void;
  onSubmit: () => void;
}

export const QuizContent: React.FC<QuizContentProps> = ({
  step,
  quizAnswers,
  quizComplete,
  quizScore,
  onAnswer,
  onSubmit
}) => {
  return (
    <div className="mt-6">
      <div className="space-y-6">
        {step.quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-white/10 rounded-lg p-4">
            <h4 className="text-lg font-bold text-white mb-3">
              {qIndex + 1}. {question.question}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {question.options.map((option, oIndex) => (
                <Button
                  key={oIndex}
                  onClick={() => onAnswer(qIndex, option)}
                  disabled={quizComplete}
                  className={`p-3 text-sm min-h-[3rem] whitespace-normal text-center ${
                    quizAnswers[qIndex] === option
                      ? quizComplete
                        ? option === question.correct
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-white/20 hover:bg-white/30'
                  } text-white transition-colors`}
                >
                  {option}
                </Button>
              ))}
            </div>
            {quizComplete && (
              <div className={`p-3 rounded text-sm ${
                quizAnswers[qIndex] === question.correct
                  ? 'bg-green-500/20 text-green-100'
                  : 'bg-red-500/20 text-red-100'
              }`}>
                <strong>Äntwert:</strong> {question.correct}<br />
                <strong>Erklärung:</strong> {question.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {!quizComplete && Object.keys(quizAnswers).length === step.quiz.questions.length && (
        <div className="mt-6 text-center">
          <Button 
            onClick={onSubmit} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3"
          >
            Quiz ofginn
          </Button>
        </div>
      )}

      {quizComplete && (
        <div className="mt-6 p-6 bg-white/20 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Quiz fäerdeg!
          </h3>
          <p className="text-xl text-green-100 mb-4">
            Du hues {quizScore} vun {step.quiz.questions.length} Froen richteg beäntwert!
          </p>
          <div className="text-lg text-white">
            {quizScore === step.quiz.questions.length && "🏆 Perfekt! Du bass e richtege Konter & Matt Meeschter!"}
            {quizScore >= Math.ceil(step.quiz.questions.length * 0.8) && quizScore < step.quiz.questions.length && "🎉 Super gutt! Du verstees d'Spillreegelen guer gutt!"}
            {quizScore >= Math.ceil(step.quiz.questions.length * 0.6) && quizScore < Math.ceil(step.quiz.questions.length * 0.8) && "👍 Net schlecht! Lies nach emol d'Regelen duerch."}
            {quizScore < Math.ceil(step.quiz.questions.length * 0.6) && "📚 Probéier nach emol! Lies d'Tutorial nach eng Kéier."}
          </div>
        </div>
      )}
    </div>
  );
};
