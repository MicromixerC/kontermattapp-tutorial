import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TutorialChapter, TutorialStep } from '@/types/tutorial';
import { TutorialStepContent } from './TutorialStepContent';

interface Props {
  isOpen: boolean;
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
  onMiniGameAnswer: (answer: string) => void;
  onQuizAnswer: (qi: number, answer: string) => void;
  onQuizSubmit: () => void;
  onResetMiniGame?: () => void;
}

export const TutorialDialog: React.FC<Props> = ({
  isOpen, currentChapter, currentStep, currentStepData,
  selectedAnswer, showResult, quizAnswers, quizComplete, quizScore,
  onClose, onNextStep, onPrevStep, onSetStep,
  onMiniGameAnswer, onQuizAnswer, onQuizSubmit, onResetMiniGame,
}) => {
  if (!currentChapter || !currentStepData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] bg-[#134d33] border-white/20 flex flex-col p-0 rounded-xl [&>button]:bg-white [&>button]:rounded-full [&>button]:p-1.5 [&>button]:hover:bg-gray-100">
        <DialogHeader className="flex-shrink-0 px-5 pt-5 pb-0">
          <DialogTitle className="text-white text-lg flex items-center gap-2">
            <span>{currentChapter.icon}</span>
            {currentChapter.title}
          </DialogTitle>
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-1 mt-3">
            <div
              className="bg-white rounded-full h-1 transition-all duration-300"
              style={{ width: `${(currentStep + 1) / currentChapter.steps.length * 100}%` }}
            />
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-5">
          <div className="pb-4 pt-3">
            <TutorialStepContent
              chapterId={currentChapter.id}
              step={currentStepData}
              stepIndex={currentStep}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              quizAnswers={quizAnswers}
              quizComplete={quizComplete}
              quizScore={quizScore}
              onMiniGameAnswer={onMiniGameAnswer}
              onQuizAnswer={onQuizAnswer}
              onQuizSubmit={onQuizSubmit}
              onResetMiniGame={onResetMiniGame}
            />
          </div>
        </ScrollArea>

        {/* Navigation */}
        <div className="flex-shrink-0 flex justify-between items-center px-5 py-3 border-t border-white/20">
          <Button onClick={onPrevStep} disabled={currentStep === 0} variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0">
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1.5">
            {currentChapter.steps.map((_, i) => (
              <button key={i} onClick={() => onSetStep(i)}
                className={`rounded-full transition-all ${i === currentStep ? 'bg-white w-3 h-3' : i < currentStep ? 'bg-green-300 w-2.5 h-2.5' : 'bg-white/30 w-2.5 h-2.5'}`}
              />
            ))}
          </div>

          <Button
            onClick={currentStep === currentChapter.steps.length - 1 ? onClose : onNextStep}
            className="bg-white text-green-700 hover:bg-green-100 h-8 px-3 text-sm">
            {currentStep === currentChapter.steps.length - 1 ? 'Fäerdeg' : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
