
import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

interface CardPlayLogicGameProps {
  scenario: MiniGameScenario;
  selectedCards: string[];
  showResult: boolean;
  onCardSelect: (cardValue: string) => void;
}

export const CardPlayLogicGame: React.FC<CardPlayLogicGameProps> = ({
  scenario,
  selectedCards,
  showResult,
  onCardSelect
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-bold mb-3">Är Positioun: {scenario.playerPosition}</h4>
        <div className="space-y-3">
          <div>
            <p className="text-white/80 text-sm mb-2">Aktuelle Streech:</p>
            <div className="flex justify-center gap-2">
              {scenario.currentTrick?.map((cardData, index) => (
                <div key={index} className="text-center">
                  <CardRenderer cardString={cardData.card} />
                  <p className="text-xs text-white/70 mt-1">{cardData.player}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-2">Är Hand:</p>
            <div className="flex flex-wrap justify-center gap-1">
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
          </div>
        </div>
        <p className="text-center text-sm text-white/80 mt-3">
          Tromp: {scenario.trumpSuit}
        </p>
      </div>
    </div>
  );
};
