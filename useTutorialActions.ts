
import { useState } from 'react';
import { TutorialChapter, MiniGameStep, QuizStep, TutorialStep } from '@/types/tutorial';

// Type guards
const isMiniGameStep = (step: TutorialStep): step is MiniGameStep => {
  return 'miniGame' in step;
};
const isQuizStep = (step: TutorialStep): step is QuizStep => {
  return 'quiz' in step;
};

interface UseTutorialActionsProps {
  chapters: TutorialChapter[];
  activeChapter: string | null;
  currentStep: number;
  miniGameVariants: Record<string, number>;
  setCurrentStep: (step: number) => void;
  setSelectedAnswer: (answer: string | null) => void;
  setShowResult: (show: boolean) => void;
  setGameScore: (score: number | ((prev: number) => number)) => void;
  setQuizAnswers: (answers: Record<number, string> | ((prev: Record<number, string>) => Record<number, string>)) => void;
  setQuizScore: (score: number) => void;
  setQuizComplete: (complete: boolean) => void;
  setMiniGameVariants: (variants: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void;
  resetStepState: () => void;
}

export const useTutorialActions = ({
  chapters,
  activeChapter,
  currentStep,
  miniGameVariants,
  setCurrentStep,
  setSelectedAnswer,
  setShowResult,
  setGameScore,
  setQuizAnswers,
  setQuizScore,
  setQuizComplete,
  setMiniGameVariants,
  resetStepState
}: UseTutorialActionsProps) => {

  const nextStep = () => {
    const currentChapter = chapters.find(c => c.id === activeChapter);
    if (currentChapter && currentStep < currentChapter.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      resetStepState();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      resetStepState();
    }
  };

  const handleMiniGameAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    const currentChapter = chapters.find(c => c.id === activeChapter);
    const currentStepData = currentChapter?.steps[currentStep];
    
    if (isMiniGameStep(currentStepData)) {
      const variantKey = `${activeChapter}-${currentStep}`;
      const variantIndex = miniGameVariants[variantKey] || 0;
      const scenario = currentStepData.miniGame.scenarios?.[variantIndex];
      const correct = scenario?.correct || '';
      
      if (answer === correct) {
        setGameScore(prev => prev + 1);
      }
    }
  };

  const handleMiniGameReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    
    const currentChapter = chapters.find(c => c.id === activeChapter);
    const currentStepData = currentChapter?.steps[currentStep];
    
    if (isMiniGameStep(currentStepData) && currentStepData.miniGame.scenarios) {
      const variantKey = `${activeChapter}-${currentStep}`;
      const currentVariant = miniGameVariants[variantKey] || 0;
      const maxVariants = currentStepData.miniGame.scenarios.length;
      const nextVariant = (currentVariant + 1) % maxVariants;
      
      setMiniGameVariants(prev => ({
        ...prev,
        [variantKey]: nextVariant
      }));
    }
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const submitQuiz = () => {
    const currentChapter = chapters.find(c => c.id === activeChapter);
    const currentStepData = currentChapter?.steps[currentStep];
    if (!isQuizStep(currentStepData)) return;

    let score = 0;
    currentStepData.quiz.questions.forEach((question, index) => {
      const quizAnswers = {} as Record<number, string>; // This needs to come from state
      if (quizAnswers[index] === question.correct) {
        score++;
      }
    });

    setQuizScore(score);
    setQuizComplete(true);
  };

  return {
    nextStep,
    prevStep,
    handleMiniGameAnswer,
    handleMiniGameReset,
    handleQuizAnswer,
    submitQuiz
  };
};
