
import React from 'react';
import { MiniGameScenario } from '@/types/tutorial';

interface LeeScoringGameProps {
  scenario: MiniGameScenario;
}

export const LeeScoringGame: React.FC<LeeScoringGameProps> = ({ scenario }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-bold mb-3">Spill-Infos:</h4>
        <div className="text-white/90 space-y-2">
          <p><strong>Tromp-Ekipp:</strong> {scenario.gameInfo?.trumpTeam}</p>
          <p><strong>Gewënner:</strong> {scenario.gameInfo?.winnerTeam}</p>
          <p><strong>Score:</strong> {scenario.gameInfo?.score}</p>
          <p><strong>Annoncen:</strong> {scenario.gameInfo?.announcements?.join(', ') || 'Keng'}</p>
        </div>
      </div>
    </div>
  );
};
