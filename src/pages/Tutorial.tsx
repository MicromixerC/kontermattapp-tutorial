import React from 'react';
import { TutorialStep, MiniGameStep, QuizStep } from '@/types/tutorial';
import { TutorialDialog } from '@/components/tutorial/TutorialDialog';
import { useTutorialData } from '@/hooks/useTutorialData';
import { useTutorialState } from '@/hooks/useTutorialState';
import { useTutorialActions } from '@/hooks/useTutorialActions';

const isMiniGameStep = (s: TutorialStep): s is MiniGameStep => 'miniGame' in s;
const isQuizStep    = (s: TutorialStep): s is QuizStep    => 'quiz' in s;

const Tutorial = () => {
  const { chapters } = useTutorialData();
  const state = useTutorialState();
  const actions = useTutorialActions({
    chapters,
    activeChapter: state.activeChapter,
    currentStep: state.currentStep,
    miniGameVariants: state.miniGameVariants,
    setCurrentStep: state.setCurrentStep,
    setSelectedAnswer: state.setSelectedAnswer,
    setShowResult: state.setShowResult,
    setGameScore: state.setGameScore,
    setQuizAnswers: state.setQuizAnswers,
    setQuizScore: state.setQuizScore,
    setQuizComplete: state.setQuizComplete,
    setMiniGameVariants: state.setMiniGameVariants,
    resetStepState: state.resetStepState,
  });

  const submitQuiz = () => {
    const chapter = chapters.find(c => c.id === state.activeChapter);
    const stepData = chapter?.steps[state.currentStep];
    if (!isQuizStep(stepData)) return;
    let score = 0;
    stepData.quiz.questions.forEach((q, i) => {
      if (state.quizAnswers[i] === q.correct) score++;
    });
    state.setQuizScore(score);
    state.setQuizComplete(true);
  };

  const currentChapter = chapters.find(c => c.id === state.activeChapter);
  const currentStepData = currentChapter?.steps[state.currentStep];

  return (
    <TutorialDialog
      isOpen={true}
      chapters={chapters}
      currentChapter={currentChapter}
      currentStep={state.currentStep}
      currentStepData={currentStepData}
      selectedAnswer={state.selectedAnswer}
      showResult={state.showResult}
      quizAnswers={state.quizAnswers}
      quizComplete={state.quizComplete}
      quizScore={state.quizScore}
      onClose={state.resetTutorialState}
      onNextStep={actions.nextStep}
      onPrevStep={actions.prevStep}
      onSetStep={step => { state.setCurrentStep(step); state.resetStepState(); }}
      onOpenChapter={(id, startStep) => state.openChapter(id, startStep)}
      onMiniGameAnswer={actions.handleMiniGameAnswer}
      onQuizAnswer={actions.handleQuizAnswer}
      onQuizSubmit={submitQuiz}
      onResetMiniGame={actions.handleMiniGameReset}
    />
  );
};

export default Tutorial;
