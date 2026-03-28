import React, { useState, useEffect } from 'react';
import { CardRenderer } from './CardRenderer';

// Player positions: bottom=You, left=Left, top=Partner, right=Right
const PLAYERS = [
  { id: 'bottom', label: 'Du',      team: 'A', position: 'bottom' },
  { id: 'left',   label: 'Jeanny',  team: 'B', position: 'left'   },
  { id: 'top',    label: 'Mariette',team: 'A', position: 'top'    },
  { id: 'right',  label: 'Jupp',    team: 'B', position: 'right'  },
];

export type GameTableMode =
  | 'teams'          // shows players with team colours, no cards
  | 'dealing'        // animates dealing cards one by one
  | 'trick'          // each player plays a card to centre
  | 'handCards'      // shows hand cards for bottom player, others face-down
  | 'static';        // fully static, supply cards + tableCards manually

interface GameTableProps {
  mode: GameTableMode;
  /** For mode='trick': cards played to centre, keyed by player id */
  tableCards?: Partial<Record<string, string>>;
  /** For mode='handCards' | 'static': bottom player's hand */
  handCards?: string[];
  /** Cards to show face-down at other positions (mode='handCards') */
  showOpponentCards?: boolean;
  /** Highlight a player (e.g. whose turn) */
  activePlayer?: string;
  /** Label below the table */
  caption?: string;
  /** Trump suit display string e.g. '♥ Häerzer' */
  trumpSuit?: string;
  /** Auto-play trick animation (mode='trick') */
  animateTrick?: boolean;
}

export const GameTable: React.FC<GameTableProps> = ({
  mode,
  tableCards = {},
  handCards = [],
  showOpponentCards = true,
  activePlayer,
  caption,
  trumpSuit,
  animateTrick = false,
}) => {
  const [visibleCards, setVisibleCards] = useState<Partial<Record<string, string>>>({});
  const [dealStep, setDealStep] = useState(0);

  // For trick animation: reveal cards one by one
  useEffect(() => {
    if (mode === 'trick' && animateTrick) {
      setVisibleCards({});
      const order = ['bottom', 'left', 'top', 'right'];
      order.forEach((pos, i) => {
        setTimeout(() => {
          setVisibleCards(prev => ({
            ...prev,
            [pos]: tableCards[pos],
          }));
        }, i * 600);
      });
    } else if (mode === 'trick') {
      setVisibleCards(tableCards);
    }
  }, [mode, animateTrick, JSON.stringify(tableCards)]);

  // For dealing animation
  useEffect(() => {
    if (mode === 'dealing') {
      setDealStep(0);
      const interval = setInterval(() => {
        setDealStep(prev => {
          if (prev >= 11) { clearInterval(interval); return prev; }
          return prev + 1;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const teamColor = (team: string) =>
    team === 'A' ? 'bg-red-500' : 'bg-blue-500';

  const isActive = (pid: string) => activePlayer === pid;

  // Render a player seat
  const PlayerSeat = ({ player }: { player: typeof PLAYERS[0] }) => {
    const active = isActive(player.id);
    const dealCount = mode === 'dealing'
      ? Math.max(0, Math.min(3, dealStep - PLAYERS.findIndex(p => p.id === player.id)))
      : 0;

    return (
      <div className={`flex flex-col items-center gap-1`}>
        {/* Name badge */}
        <div className={`px-2 py-0.5 rounded-full text-xs font-bold text-white transition-all
          ${active ? 'ring-2 ring-yellow-300 ring-offset-1 scale-110' : ''}
          ${teamColor(player.team)}`}>
          {player.label}
        </div>

        {/* Cards at this seat */}
        {mode === 'dealing' && dealCount > 0 && (
          <div className="flex gap-0.5">
            {Array.from({ length: dealCount }).map((_, i) => (
              <CardRenderer key={i} cardString="" faceDown className="w-7 h-10" />
            ))}
          </div>
        )}

        {mode === 'handCards' && player.id !== 'bottom' && showOpponentCards && (
          <div className="flex gap-0.5">
            {[0,1,2].map(i => (
              <CardRenderer key={i} cardString="" faceDown className="w-7 h-10" />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Centre trick area
  const TrickArea = () => (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Bottom card */}
      {visibleCards['bottom'] && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-fade-in">
          <CardRenderer cardString={visibleCards['bottom']!} className="w-10 h-14" />
        </div>
      )}
      {/* Left card */}
      {visibleCards['left'] && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-fade-in">
          <CardRenderer cardString={visibleCards['left']!} className="w-10 h-14" />
        </div>
      )}
      {/* Top card */}
      {visibleCards['top'] && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-fade-in">
          <CardRenderer cardString={visibleCards['top']!} className="w-10 h-14" />
        </div>
      )}
      {/* Right card */}
      {visibleCards['right'] && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-fade-in">
          <CardRenderer cardString={visibleCards['right']!} className="w-10 h-14" />
        </div>
      )}
      {/* Centre dot */}
      {Object.keys(visibleCards).length === 0 && (
        <div className="w-3 h-3 rounded-full bg-white/20" />
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Trump badge */}
      {trumpSuit && (
        <div className="text-xs font-bold text-yellow-200 bg-black/20 px-2 py-0.5 rounded-full">
          Tromp: {trumpSuit}
        </div>
      )}

      {/* Table */}
      <div className="felt-table rounded-2xl p-4 w-full max-w-xs shadow-xl border border-white/10">
        {/* Top player */}
        <div className="flex justify-center mb-2">
          <PlayerSeat player={PLAYERS[2]} />
        </div>

        {/* Middle row: left | centre | right */}
        <div className="flex items-center justify-between">
          <PlayerSeat player={PLAYERS[1]} />
          <TrickArea />
          <PlayerSeat player={PLAYERS[3]} />
        </div>

        {/* Bottom player */}
        <div className="flex flex-col items-center mt-2 gap-1">
          <PlayerSeat player={PLAYERS[0]} />
          {/* Hand cards for bottom player */}
          {(mode === 'handCards' || mode === 'static') && handCards.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-center mt-1">
              {handCards.map((card, i) => (
                <CardRenderer key={i} cardString={card} className="w-10 h-14" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Team legend */}
      {mode === 'teams' && (
        <div className="flex gap-4 text-xs text-white/80">
          <span><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />Du + Mariette</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1" />Jeanny + Jupp</span>
        </div>
      )}

      {caption && (
        <p className="text-xs text-white/70 text-center italic mt-1">{caption}</p>
      )}
    </div>
  );
};
