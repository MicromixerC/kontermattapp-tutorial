export interface BaseStep {
  title: string;
  description: string;
  image: string;
  highlights: Array<{
    x: number;
    y: number;
    content: string;
  }>;
}

export interface MiniGameScenario {
  hand?: string[];
  cards?: Array<{
    card: string;
    player: string;
  }>;
  simpleCards?: string[];
  trumpSuit?: string;
  leadSuit?: string;
  gameInfo?: {
    trumpTeam: string;
    winnerTeam: string;
    score: string;
    announcements: string[];
  };
  currentTrick?: Array<{
    card: string;
    player: string;
  }>;
  playerPosition?: string;
  handStrength?: string;
  playableCards?: string[];
  options: string[];
  correct: string;
  explanation: string;
}

export interface MiniGameStep extends BaseStep {
  miniGame: {
    type: string;
    question: string;
    scenarios: MiniGameScenario[];
  };
}

export interface QuizStep extends BaseStep {
  quiz: {
    questions: Array<{
      question: string;
      options: string[];
      correct: string;
      explanation: string;
    }>;
  };
}

export type TutorialStep = BaseStep | MiniGameStep | QuizStep;

export interface TutorialChapter {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  steps: TutorialStep[];
}

export type Language = 'lux' | 'de' | 'en' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}
