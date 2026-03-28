
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TutorialChapter, TutorialStep } from '@/types/tutorial';
import { TutorialStepContent } from './TutorialStepContent';

interface TutorialDialogProps {
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
  onQuizAnswer: (questionIndex: number, answer: string) => void;
  onQuizSubmit: () => void;
  onResetMiniGame?: () => void;
}

export const TutorialDialog: React.FC<TutorialDialogProps> = ({
  isOpen,
  currentChapter,
  currentStep,
  currentStepData,
  selectedAnswer,
  showResult,
  quizAnswers,
  quizComplete,
  quizScore,
  onClose,
  onNextStep,
  onPrevStep,
  onSetStep,
  onMiniGameAnswer,
  onQuizAnswer,
  onQuizSubmit,
  onResetMiniGame
}) => {
  if (!currentChapter || !currentStepData) return null;

  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] bg-[#134d33] border-white/20 flex flex-col p-0 rounded-xl [&>button]:bg-white [&>button]:rounded-full [&>button]:p-2 [&>button]:hover:bg-gray-100">
        <DialogHeader className="flex-shrink-0 p-6 pb-0">
          <DialogTitle className="text-white text-2xl flex items-center">
            <div className="p-2 rounded-lg mr-3 text-white">
              {currentChapter.icon}
            </div>
            {currentChapter.title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="pb-6">
            {/* Minimal progress bar */}
            <div className="mb-4">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div className="bg-white rounded-full h-1 transition-all duration-300" style={{
                width: `${(currentStep + 1) / currentChapter.steps.length * 100}%`
              }} />
              </div>
            </div>

            {/* Content */}
            <TutorialStepContent step={currentStepData} selectedAnswer={selectedAnswer} showResult={showResult} quizAnswers={quizAnswers} quizComplete={quizComplete} quizScore={quizScore} onMiniGameAnswer={onMiniGameAnswer} onQuizAnswer={onQuizAnswer} onQuizSubmit={onQuizSubmit} onResetMiniGame={onResetMiniGame} />
          </div>
        </ScrollArea>

        {/* Navigation - Fixed at bottom */}
        <div className="flex-shrink-0 flex justify-between items-center p-6 pt-4 border-t border-white/20 py-[12px]">
          <Button onClick={onPrevStep} disabled={currentStep === 0} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <ChevronLeft className="w-3 h-4 mr-1" />
          </Button>

          <div className="flex gap-2">
            {currentChapter.steps.map((_, index) => <button key={index} onClick={() => onSetStep(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentStep ? 'bg-white' : index < currentStep ? 'bg-green-300' : 'bg-white/30'}`} />)}
          </div>

          <Button onClick={currentStep === currentChapter.steps.length - 1 ? onClose : onNextStep} className="bg-white text-green-700 hover:bg-green-100">
            {currentStep === currentChapter.steps.length - 1 ? 'Fäerdeg' : <>
                <ChevronRight className="w-3 h-4 ml-1" />
              </>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>;
};
