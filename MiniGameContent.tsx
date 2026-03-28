import React from 'react';
import { Button } from '@/components/ui/button';
import { MiniGameStep } from '@/types/tutorial';
import { GameContentRenderer } from './miniGames/GameContentRenderer';
import { useMiniGameSelection } from './miniGames/useMiniGameSelection';

interface MiniGameContentProps {
  step: MiniGameStep;
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswer: (answer: string) => void;
  onReset?: () => void;
}

export const MiniGameContent: React.FC<MiniGameContentProps> = ({
  step,
  selectedAnswer,
  showResult,
  onAnswer,
  onReset
}) => {
  const { miniGame } = step;

  // Get current scenario data
  const currentScenario = miniGame.scenarios?.[0] || {
    hand: [],
    cards: [],
    simpleCards: [],
    trumpSuit: '',
    leadSuit: '',
    gameInfo: undefined,
    currentTrick: [],
    playerPosition: '',
    handStrength: '',
    playableCards: [],
    options: [],
    correct: '',
    explanation: ''
  };

  // Check if this mini-game type supports multi-selection
  const isMultiSelectGame = ['playable-cards', 'count-trumps', 'trick-winner', 'card-play-logic'].includes(miniGame.type);

  // Create a unique key for this step to trigger resets when switching slides
  const stepKey = `${miniGame.type}-${miniGame.question}`;

  const { selectedCards, handleCardSelect, resetSelectedCards } = useMiniGameSelection(
    isMultiSelectGame, 
    showResult, 
    miniGame.type,
    stepKey
  );

  // Function to compare card selections (handles sorting)
  const areCardsEqual = (selectedAnswer: string | null, correctAnswer: string) => {
    if (!selectedAnswer || !correctAnswer) return false;
    
    const selectedCards = selectedAnswer.split(',').sort();
    const correctCards = correctAnswer.split(',').sort();
    
    return selectedCards.length === correctCards.length &&
           selectedCards.every((card, index) => card === correctCards[index]);
  };

  // Handle submit for multi-select games
  const handleSubmit = () => {
    if (isMultiSelectGame) {
      const answer = selectedCards.sort().join(',');
      onAnswer(answer);
    }
  };

  // Reset selected cards when game resets
  const handleReset = () => {
    resetSelectedCards();
    if (onReset) {
      onReset();
    }
  };

  // Function to render question without trump suit info
  const renderQuestion = () => {
    const question = miniGame.question;
    const trumpMatch = question.match(/^(.*?)(\s*\([^)]*ass Tromp\))$/);
    
    if (trumpMatch) {
      return trumpMatch[1];
    }
    
    return question;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 rounded-lg p-4">
        <p className="text-white font-medium mb-4 text-center">{renderQuestion()}</p>
        <GameContentRenderer
          gameType={miniGame.type}
          scenario={currentScenario}
          selectedCards={selectedCards}
          showResult={showResult}
          onCardSelect={handleCardSelect}
        />
      </div>

      {/* Multi-select submit button */}
      {isMultiSelectGame && !showResult && (
        <Button 
          onClick={handleSubmit} 
          disabled={selectedCards.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Areechen ({selectedCards.length} ausgewielt)
        </Button>
      )}

      {/* Regular option buttons for non-multi-select games */}
      {!isMultiSelectGame && (
        <div className="space-y-3">
          {currentScenario.options?.map((option, index) => (
            <Button 
              key={index} 
              onClick={() => onAnswer(option)} 
              disabled={showResult} 
              className={`w-full text-left justify-start ${
                selectedAnswer === option 
                  ? selectedAnswer === currentScenario.correct 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700' 
                  : 'bg-white/20 hover:bg-white/30'
              } text-white`}
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      {showResult && (
        <div className={`p-4 rounded-lg ${
          areCardsEqual(selectedAnswer, currentScenario.correct) 
            ? 'bg-green-600/20 border border-green-400' 
            : 'bg-red-600/20 border border-red-400'
        }`}>
          <p className={`font-bold ${
            areCardsEqual(selectedAnswer, currentScenario.correct) ? 'text-green-300' : 'text-red-300'
          }`}>
            {areCardsEqual(selectedAnswer, currentScenario.correct) ? '✓ Korrekt!' : '✗ Falsch!'}
          </p>
          <p className="text-white/90 mt-2">{currentScenario.explanation}</p>
          {onReset && (
            <Button 
              onClick={handleReset} 
              className="mt-3 bg-white/20 hover:bg-white/30 text-white"
            >
              Nei Hand
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
