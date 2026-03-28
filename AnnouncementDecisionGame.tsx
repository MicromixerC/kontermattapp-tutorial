
import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

interface AnnouncementDecisionGameProps {
  scenario: MiniGameScenario;
}

export const AnnouncementDecisionGame: React.FC<AnnouncementDecisionGameProps> = ({ scenario }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-bold mb-3">Är Hand:</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {scenario.hand?.map((cardValue, index) => (
            <CardRenderer key={index} cardString={cardValue} />
          ))}
        </div>
        <p className="text-center text-sm text-white/80 mt-3">
          Tromp: {scenario.trumpSuit}
        </p>
      </div>
    </div>
  );
};
