
import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

interface TrumpSelectionGameProps {
  scenario: MiniGameScenario;
}

export const TrumpSelectionGame: React.FC<TrumpSelectionGameProps> = ({ scenario }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {scenario.hand?.map((cardValue, index) => (
          <CardRenderer key={index} cardString={cardValue} />
        ))}
      </div>
    </div>
  );
};
