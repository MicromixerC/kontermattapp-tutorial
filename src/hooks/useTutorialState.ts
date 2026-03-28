import { useState } from 'react';

export const useTutorialState = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [miniGameVariants, setMiniGameVariants] = useState<Record<string, number>>({});

  const resetStepState = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetTutorialState = () => {
    setActiveChapter(null);
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameScore(0);
    setQuizAnswers({});
    setQuizComplete(false);
    setQuizScore(0);
    setMiniGameVariants({});
  };

  const openChapter = (chapterId: string) => {
    setActiveChapter(chapterId);
    setCurrentStep(0);
    resetStepState();
    setGameScore(0);
    setQuizAnswers({});
    setQuizComplete(false);
    setQuizScore(0);
    setMiniGameVariants({});
  };

  return {
    activeChapter, currentStep, selectedAnswer, gameScore, showResult,
    quizAnswers, quizComplete, quizScore, miniGameVariants,
    setCurrentStep, setSelectedAnswer, setGameScore, setShowResult,
    setQuizAnswers, setQuizComplete, setQuizScore, setMiniGameVariants,
    resetTutorialState, resetStepState, openChapter,
  };
};
