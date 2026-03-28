
import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

interface CountTrumpsGameProps {
  scenario: MiniGameScenario;
  selectedCards: string[];
  showResult: boolean;
  onCardSelect: (cardValue: string) => void;
}

export const CountTrumpsGame: React.FC<CountTrumpsGameProps> = ({
  scenario,
  selectedCards,
  showResult,
  onCardSelect
}) => {
  return (
    <div className="space-y-4">
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
      <p className="text-center text-sm text-white/80">
        Tromp: {scenario.trumpSuit}
      </p>
    </div>
  );
};
