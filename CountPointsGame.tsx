
import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

interface CountPointsGameProps {
  scenario: MiniGameScenario;
}

export const CountPointsGame: React.FC<CountPointsGameProps> = ({ scenario }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {scenario.simpleCards?.map((cardValue, index) => (
          <CardRenderer key={index} cardString={cardValue} />
        ))}
      </div>
    </div>
  );
};
