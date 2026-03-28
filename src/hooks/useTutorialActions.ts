import { TutorialChapter, MiniGameStep, QuizStep, TutorialStep } from '@/types/tutorial';

const isMiniGameStep = (step: TutorialStep): step is MiniGameStep => 'miniGame' in step;
const isQuizStep    = (step: TutorialStep): step is QuizStep    => 'quiz' in step;

interface Props {
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
  chapters, activeChapter, currentStep, miniGameVariants,
  setCurrentStep, setSelectedAnswer, setShowResult, setGameScore,
  setQuizAnswers, setQuizScore, setQuizComplete, setMiniGameVariants, resetStepState,
}: Props) => {

  const nextStep = () => {
    const chapter = chapters.find(c => c.id === activeChapter);
    if (chapter && currentStep < chapter.steps.length - 1) {
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
    const chapter = chapters.find(c => c.id === activeChapter);
    const stepData = chapter?.steps[currentStep];
    if (isMiniGameStep(stepData)) {
      const variantKey = `${activeChapter}-${currentStep}`;
      const variantIndex = miniGameVariants[variantKey] || 0;
      const scenario = stepData.miniGame.scenarios?.[variantIndex];
      if (answer === scenario?.correct) setGameScore(prev => prev + 1);
    }
  };

  const handleMiniGameReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    const chapter = chapters.find(c => c.id === activeChapter);
    const stepData = chapter?.steps[currentStep];
    if (isMiniGameStep(stepData) && stepData.miniGame.scenarios) {
      const variantKey = `${activeChapter}-${currentStep}`;
      const current = miniGameVariants[variantKey] || 0;
      const next = (current + 1) % stepData.miniGame.scenarios.length;
      setMiniGameVariants(prev => ({ ...prev, [variantKey]: next }));
    }
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  return { nextStep, prevStep, handleMiniGameAnswer, handleMiniGameReset, handleQuizAnswer };
};
