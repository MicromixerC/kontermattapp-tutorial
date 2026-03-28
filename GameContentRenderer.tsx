
import React from 'react';
import { MiniGameScenario } from '@/types/tutorial';
import { TrumpSelectionGame } from './TrumpSelectionGame';
import { CountTrumpsGame } from './CountTrumpsGame';
import { TrickWinnerGame } from './TrickWinnerGame';
import { CountPointsGame } from './CountPointsGame';
import { LeeScoringGame } from './LeeScoringGame';
import { CardPlayLogicGame } from './CardPlayLogicGame';
import { AnnouncementDecisionGame } from './AnnouncementDecisionGame';
import { HandEvaluationGame } from './HandEvaluationGame';
import { PlayableCardsGame } from './PlayableCardsGame';

interface GameContentRendererProps {
  gameType: string;
  scenario: MiniGameScenario;
  selectedCards: string[];
  showResult: boolean;
  onCardSelect: (cardValue: string) => void;
}

export const GameContentRenderer: React.FC<GameContentRendererProps> = ({
  gameType,
  scenario,
  selectedCards,
  showResult,
  onCardSelect
}) => {
  switch (gameType) {
    case 'trump-selection':
      return <TrumpSelectionGame scenario={scenario} />;
    case 'count-trumps':
      return <CountTrumpsGame 
        scenario={scenario} 
        selectedCards={selectedCards} 
        showResult={showResult} 
        onCardSelect={onCardSelect} 
      />;
    case 'trick-winner':
      return <TrickWinnerGame 
        scenario={scenario} 
        selectedCards={selectedCards} 
        showResult={showResult} 
        onCardSelect={onCardSelect} 
      />;
    case 'count-points':
      return <CountPointsGame scenario={scenario} />;
    case 'lee-scoring':
      return <LeeScoringGame scenario={scenario} />;
    case 'card-play-logic':
      return <CardPlayLogicGame 
        scenario={scenario} 
        selectedCards={selectedCards} 
        showResult={showResult} 
        onCardSelect={onCardSelect} 
      />;
    case 'announcement-decision':
      return <AnnouncementDecisionGame scenario={scenario} />;
    case 'hand-evaluation':
      return <HandEvaluationGame scenario={scenario} />;
    case 'playable-cards':
      return <PlayableCardsGame 
        scenario={scenario} 
        selectedCards={selectedCards} 
        showResult={showResult} 
        onCardSelect={onCardSelect} 
      />;
    default:
      return null;
  }
};
