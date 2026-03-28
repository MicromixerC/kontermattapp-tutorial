import React from 'react';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

export const TrumpSelectionGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="flex flex-wrap justify-center gap-2">
    {scenario.hand?.map((c, i) => <CardRenderer key={i} cardString={c} />)}
  </div>
);

export const CountPointsGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="flex flex-wrap justify-center gap-2">
    {scenario.simpleCards?.map((c, i) => <CardRenderer key={i} cardString={c} />)}
  </div>
);

export const LeeScoringGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="bg-white/5 rounded-lg p-4 space-y-2 text-white/90 text-sm">
    <p><strong>Tromp-Team:</strong> {scenario.gameInfo?.trumpTeam}</p>
    <p><strong>Gewënner:</strong> {scenario.gameInfo?.winnerTeam}</p>
    <p><strong>Score:</strong> {scenario.gameInfo?.score}</p>
    <p><strong>Annoncen:</strong> {scenario.gameInfo?.announcements?.join(', ') || 'Keng'}</p>
  </div>
);

export const AnnouncementDecisionGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="space-y-3">
    <div className="bg-white/5 rounded-lg p-3">
      <p className="text-white/70 text-sm mb-2 text-center">Är Hand:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {scenario.hand?.map((c, i) => <CardRenderer key={i} cardString={c} />)}
      </div>
      <p className="text-center text-sm text-white/60 mt-2">Tromp: {scenario.trumpSuit}</p>
    </div>
  </div>
);

export const HandEvaluationGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="bg-white/5 rounded-lg p-3">
    <p className="text-white/70 text-sm mb-2 text-center">Är Hand:</p>
    <div className="flex flex-wrap justify-center gap-2">
      {scenario.hand?.map((c, i) => <CardRenderer key={i} cardString={c} />)}
    </div>
    <p className="text-center text-sm text-white/60 mt-2">Tromp: {scenario.trumpSuit}</p>
  </div>
);

interface SelectProps {
  scenario: MiniGameScenario;
  selectedCards: string[];
  showResult: boolean;
  onCardSelect: (card: string) => void;
}

export const CountTrumpsGame: React.FC<SelectProps> = ({ scenario, selectedCards, showResult, onCardSelect }) => (
  <div className="space-y-3">
    <div className="flex flex-wrap justify-center gap-2">
      {scenario.hand?.map((c, i) => (
        <div key={i}
          className={`cursor-pointer transition-all ${selectedCards.includes(c) ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-transparent scale-105' : ''} ${showResult ? 'cursor-default' : 'hover:scale-105'}`}
          onClick={() => onCardSelect(c)}>
          <CardRenderer cardString={c} />
        </div>
      ))}
    </div>
    <p className="text-center text-sm text-white/70">Tromp: {scenario.trumpSuit}</p>
  </div>
);

export const TrickWinnerGame: React.FC<SelectProps> = ({ scenario, selectedCards, showResult, onCardSelect }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-3">
      {scenario.cards?.map((cd, i) => (
        <div key={i} className="text-center">
          <div
            className={`cursor-pointer transition-all inline-block ${selectedCards.includes(cd.card) ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-transparent scale-105' : ''} ${showResult ? 'cursor-default' : 'hover:scale-105'}`}
            onClick={() => onCardSelect(cd.card)}>
            <CardRenderer cardString={cd.card} />
          </div>
          <p className="text-xs text-white/60 mt-1">{cd.player}</p>
        </div>
      ))}
    </div>
    <p className="text-center text-sm text-white/70">Tromp: {scenario.trumpSuit} | Ugespillt: {scenario.leadSuit}</p>
  </div>
);

export const PlayableCardsGame: React.FC<SelectProps> = ({ scenario, selectedCards, showResult, onCardSelect }) => (
  <div className="space-y-3">
    <div className="bg-white/5 rounded-lg p-3">
      <p className="text-white/70 text-sm mb-2 text-center">Är Hand:</p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {scenario.hand?.map((c, i) => (
          <div key={i}
            className={`cursor-pointer transition-all ${selectedCards.includes(c) ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-transparent scale-105' : ''} ${showResult ? 'cursor-default' : 'hover:scale-105'}`}
            onClick={() => onCardSelect(c)}>
            <CardRenderer cardString={c} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3 text-center text-sm">
        <div><p className="text-white/60">Tromp:</p><p className="text-white font-bold">{scenario.trumpSuit}</p></div>
        <div><p className="text-white/60">Ugespillt:</p><p className="text-white font-bold">{scenario.leadSuit}</p></div>
      </div>
    </div>
  </div>
);

export const CardPlayLogicGame: React.FC<SelectProps> = ({ scenario, selectedCards, showResult, onCardSelect }) => (
  <div className="space-y-3">
    <div className="bg-white/5 rounded-lg p-3">
      <p className="text-white/70 text-sm mb-2">Positioun: {scenario.playerPosition}</p>
      <p className="text-white/60 text-xs mb-1">Aktuelle Streech:</p>
      <div className="flex gap-2 mb-3">
        {scenario.currentTrick?.map((cd, i) => (
          <div key={i} className="text-center">
            <CardRenderer cardString={cd.card} className="w-11 h-15" />
            <p className="text-xs text-white/50 mt-0.5">{cd.player}</p>
          </div>
        ))}
      </div>
      <p className="text-white/60 text-xs mb-1">Är Hand:</p>
      <div className="flex flex-wrap gap-1.5">
        {scenario.hand?.map((c, i) => (
          <div key={i}
            className={`cursor-pointer transition-all ${selectedCards.includes(c) ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-transparent scale-105' : ''} ${showResult ? 'cursor-default' : 'hover:scale-105'}`}
            onClick={() => onCardSelect(c)}>
            <CardRenderer cardString={c} />
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-white/60 mt-2">Tromp: {scenario.trumpSuit}</p>
    </div>
  </div>
);
