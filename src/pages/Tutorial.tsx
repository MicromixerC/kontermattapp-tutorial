import React from 'react';
import { TutorialStep, MiniGameStep, QuizStep } from '@/types/tutorial';
import { TutorialDialog } from '@/components/tutorial/TutorialDialog';
import { TutorialHeader } from '@/components/tutorial/TutorialHeader';
import { TutorialChapterList } from '@/components/tutorial/TutorialChapterList';
import { useTutorialData } from '@/hooks/useTutorialData';
import { useTutorialState } from '@/hooks/useTutorialState';
import { useTutorialActions } from '@/hooks/useTutorialActions';

const isMiniGameStep = (s: TutorialStep): s is MiniGameStep => 'miniGame' in s;
const isQuizStep    = (s: TutorialStep): s is QuizStep    => 'quiz' in s;

const Tutorial = () => {
  const { selectedLanguage, setSelectedLanguage, chapters } = useTutorialData();
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

  // Fixed quiz submit with access to current answers
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
  let currentStepData = currentChapter?.steps[state.currentStep];

  // Inject current scenario variant into mini-game step
  if (currentStepData && isMiniGameStep(currentStepData) && currentStepData.miniGame.scenarios) {
    const variantKey = `${state.activeChapter}-${state.currentStep}`;
    const variantIndex = state.miniGameVariants[variantKey] || 0;
    const scenario = currentStepData.miniGame.scenarios[variantIndex];
    if (scenario) {
      currentStepData = {
        ...currentStepData,
        miniGame: {
          ...currentStepData.miniGame,
          scenarios: [scenario],
        },
      };
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, #3fa871 20%, #134d33 100%)' }} />
      <div className="relative z-10 p-4 pb-8">
        <div className="max-w-lg mx-auto">
          <TutorialHeader
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          <TutorialChapterList
            chapters={chapters}
            selectedLanguage={selectedLanguage}
            onOpenChapter={state.openChapter}
          />
          <TutorialDialog
            isOpen={!!state.activeChapter}
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
            onSetStep={state.setCurrentStep}
            onMiniGameAnswer={actions.handleMiniGameAnswer}
            onQuizAnswer={actions.handleQuizAnswer}
            onQuizSubmit={submitQuiz}
            onResetMiniGame={actions.handleMiniGameReset}
          />
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
