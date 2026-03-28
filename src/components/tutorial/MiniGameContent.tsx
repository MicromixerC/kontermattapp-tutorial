import React from 'react';
import { Button } from '@/components/ui/button';
import { MiniGameStep } from '@/types/tutorial';
import { GameContentRenderer } from './miniGames/GameContentRenderer';
import { useMiniGameSelection } from './miniGames/useMiniGameSelection';

interface Props {
  step: MiniGameStep;
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswer: (answer: string) => void;
  onReset?: () => void;
}

const areCardsEqual = (a: string | null, b: string) => {
  if (!a || !b) return false;
  return a.split(',').sort().join(',') === b.split(',').sort().join(',');
};

export const MiniGameContent: React.FC<Props> = ({ step, selectedAnswer, showResult, onAnswer, onReset }) => {
  const { miniGame } = step;
  const scenario = miniGame.scenarios?.[0] || { hand: [], cards: [], simpleCards: [], trumpSuit: '', leadSuit: '', options: [], correct: '', explanation: '' };
  const isMultiSelect = ['playable-cards', 'count-trumps', 'trick-winner', 'card-play-logic'].includes(miniGame.type);
  const stepKey = `${miniGame.type}-${miniGame.question}`;
  const { selectedCards, handleCardSelect, resetSelectedCards } = useMiniGameSelection(isMultiSelect, showResult, miniGame.type, stepKey);

  const renderQuestion = () => {
    const q = miniGame.question;
    return q.replace(/\s*\([^)]*ass Tromp\)$/, '');
  };

  const handleSubmit = () => {
    if (isMultiSelect) onAnswer(selectedCards.sort().join(','));
  };

  const handleReset = () => {
    resetSelectedCards();
    onReset?.();
  };

  const isCorrect = areCardsEqual(selectedAnswer, scenario.correct);

  return (
    <div className="space-y-4">
      <div className="bg-white/10 rounded-lg p-4">
        <p className="text-white font-medium mb-4 text-center text-sm">{renderQuestion()}</p>
        <GameContentRenderer
          gameType={miniGame.type}
          scenario={scenario}
          selectedCards={selectedCards}
          showResult={showResult}
          onCardSelect={handleCardSelect}
        />
      </div>

      {isMultiSelect && !showResult && (
        <Button onClick={handleSubmit} disabled={selectedCards.length === 0} className="w-full bg-green-600 hover:bg-green-700 text-white">
          Areechen ({selectedCards.length} ausgewielt)
        </Button>
      )}

      {!isMultiSelect && (
        <div className="space-y-2">
          {scenario.options?.map((opt, i) => (
            <Button key={i} onClick={() => onAnswer(opt)} disabled={showResult}
              className={`w-full text-left justify-start text-sm ${
                selectedAnswer === opt
                  ? selectedAnswer === scenario.correct ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  : 'bg-white/20 hover:bg-white/30'
              } text-white`}>
              {opt}
            </Button>
          ))}
        </div>
      )}

      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-600/20 border border-green-400' : 'bg-red-600/20 border border-red-400'}`}>
          <p className={`font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
            {isCorrect ? '✓ Korrekt!' : '✗ Falsch!'}
          </p>
          <p className="text-white/90 mt-2 text-sm">{scenario.explanation}</p>
          {onReset && (
            <Button onClick={handleReset} className="mt-3 bg-white/20 hover:bg-white/30 text-white text-sm">
              Nei Hand
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
