
import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

interface TrickWinnerGameProps {
  scenario: MiniGameScenario;
  selectedCards: string[];
  showResult: boolean;
  onCardSelect: (cardValue: string) => void;
}

export const TrickWinnerGame: React.FC<TrickWinnerGameProps> = ({
  scenario,
  selectedCards,
  showResult,
  onCardSelect
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {scenario.cards?.map((cardData, index) => (
          <div key={index} className="text-center">
            <div 
              className={`cursor-pointer transition-all ${
                selectedCards.includes(cardData.card) ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent scale-105' : ''
              } ${showResult ? 'cursor-default' : 'hover:scale-105'}`}
              onClick={() => onCardSelect(cardData.card)}
            >
              <CardRenderer cardString={cardData.card} />
            </div>
            <p className="text-xs text-white/70 mt-1">{cardData.player}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-white/80">
        Tromp: {scenario.trumpSuit} | Ugespillt: {scenario.leadSuit}
      </p>
    </div>
  );
};
