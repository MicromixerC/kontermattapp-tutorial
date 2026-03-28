
import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

interface PlayableCardsGameProps {
  scenario: MiniGameScenario;
  selectedCards: string[];
  showResult: boolean;
  onCardSelect: (cardValue: string) => void;
}

export const PlayableCardsGame: React.FC<PlayableCardsGameProps> = ({
  scenario,
  selectedCards,
  showResult,
  onCardSelect
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-bold mb-3">Är Hand:</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {scenario.hand?.map((cardValue, index) => (
            <div 
              key={index} 
              className={`cursor-pointer transition-all ${
                selectedCards.includes(cardValue) ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent scale-105' : ''
              } ${showResult ? 'cursor-default' : 'hover:scale-105'}`}
              onClick={() => onCardSelect(cardValue)}
            >
              <CardRenderer cardString={cardValue} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">Tromp:</p>
            <p className="text-white font-bold">{scenario.trumpSuit}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">Ugespillt:</p>
            <p className="text-white font-bold">{scenario.leadSuit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
