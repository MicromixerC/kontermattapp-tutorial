import React from 'react';
import { motion } from 'motion/react';
import { TableStage, StageCard, Seat, SeatInfo } from '../anim/TableStage';
import { CardRenderer } from '../CardRenderer';
import { MiniGameScenario } from '@/types/tutorial';

// ── Shared table layout ───────────────────────────────────────────────────────
// A small felt-table with 4 player positions.
// Players: bottom = "Dir" (you), top = opponent, left/right = others.

const SUIT_COLORS: Record<string, string> = {
  '♠': 'text-gray-800', '♣': 'text-gray-800',
  '♥': 'text-red-600',  '♦': 'text-red-600',
};

const suitColor = (card: string) => SUIT_COLORS[card[0]] ?? 'text-gray-800';

// Badge for player name
const PlayerBadge: React.FC<{ name: string; team?: 'A'|'B'; active?: boolean; small?: boolean }> = ({
  name, team, active, small,
}) => (
  <div className={`
    ${small ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]'}
    rounded-full text-white font-bold whitespace-nowrap
    ${team === 'A' ? 'bg-red-500' : team === 'B' ? 'bg-blue-500' : 'bg-white/30'}
    ${active ? 'ring-2 ring-yellow-300' : ''}
  `}>{name}</div>
);

// Compact face-down deck placeholder for players not in focus
const FaceDownStack: React.FC<{ count?: number; rotated?: boolean }> = ({ count = 3, rotated }) => (
  <div className={`flex ${rotated ? 'flex-col' : 'flex-row'} gap-0.5`}>
    {Array.from({ length: count }).map((_, i) => (
      <CardRenderer key={i} cardString="" faceDown rotated={rotated} className="w-[14px] h-[20px]" />
    ))}
  </div>
);

// Trump badge
const TrumpBadge: React.FC<{ suit: string }> = ({ suit }) => (
  <div className="absolute top-0 right-0 z-10">
    <span className="text-[9px] font-bold text-yellow-300 bg-black/50 px-1.5 py-0.5 rounded-bl-lg border-l border-b border-yellow-400/30">
      Tromp: {suit}
    </span>
  </div>
);

// Lead suit indicator
const LeadBadge: React.FC<{ suit: string }> = ({ suit }) => (
  <div className="absolute bottom-0 right-0 z-10">
    <span className="text-[9px] font-bold text-blue-200 bg-black/40 px-1.5 py-0.5 rounded-tl-lg border-l border-t border-blue-400/20">
      Ugespillt: {suit}
    </span>
  </div>
);

// ── A full mini game table ────────────────────────────────────────────────────
// Shows 4 players, trump, lead, and the centre trick area.
// playerHand: the "you" player's hand shown face-up at bottom
// trickCards: cards played by each position { bottom, left, top, right }
// highlightCards: set of cards to highlight (ring)
// selectableCards: which cards in playerHand can be clicked
interface MiniTableProps {
  trumpSuit?: string;
  leadSuit?: string;
  playerHand?: string[];           // bottom player's face-up hand
  topHand?: string[];              // top player — shown face-down or face-up
  leftHand?: string[];             // left player face-down
  rightHand?: string[];            // right player face-down
  trickCards?: Partial<Record<'bottom'|'left'|'top'|'right', string>>;
  selectableCards?: string[];      // cards in playerHand that are clickable
  selectedCards?: string[];
  showResult?: boolean;
  onCardSelect?: (card: string) => void;
  playerName?: string;
  topName?: string;
  leftName?: string;
  rightName?: string;
  bottomTeam?: 'A'|'B';
  topTeam?: 'A'|'B';
  leftTeam?: 'A'|'B';
  rightTeam?: 'A'|'B';
  activePosition?: 'bottom'|'left'|'top'|'right';
  showHandFaceDown?: boolean;      // show player's own hand face-down
  correctCards?: string[];         // after the answer: mark right (green) / wrong (red) cards
}

export const MiniTable: React.FC<MiniTableProps> = ({
  trumpSuit, leadSuit,
  playerHand = [], topHand, leftHand, rightHand,
  trickCards = {},
  selectableCards, selectedCards = [], showResult = false,
  onCardSelect,
  playerName = 'Dir', topName = 'Géigner', leftName = 'Lénks', rightName = 'Riets',
  bottomTeam = 'A', topTeam = 'B', leftTeam = 'B', rightTeam = 'A',
  activePosition, showHandFaceDown = false, correctCards,
}) => {
  const CARD = 'w-9 h-[50px]';
  const SMALL = 'w-[22px] h-[32px]';

  const isSelectable = (c: string) => !showResult && (selectableCards ? selectableCards.includes(c) : true);
  const isSelected = (c: string) => selectedCards.includes(c);

  // Rendered via a plain function (not a nested component) so the springs keep their state.
  const renderHandCard = (card: string, i: number) => {
    const sel = isSelected(card);
    const clickable = isSelectable(card);
    const isRight = showResult && correctCards?.includes(card);
    const isWrong = showResult && sel && correctCards && !correctCards.includes(card);
    const ring = isWrong ? 'ring-2 ring-red-500 ring-offset-1'
      : isRight ? 'ring-2 ring-green-400 ring-offset-1'
      : sel ? 'ring-2 ring-yellow-400 ring-offset-1' : '';
    return (
      <motion.div
        key={card}
        onClick={() => clickable && onCardSelect?.(card)}
        className={`relative rounded-md ${clickable ? 'cursor-pointer' : ''}`}
        initial={{ opacity: 0, y: 30, rotate: -8 }}
        animate={{ opacity: 1, y: sel ? -10 : 0, rotate: 0, scale: sel ? 1.06 : 1 }}
        whileHover={clickable ? { y: sel ? -12 : -5 } : undefined}
        whileTap={clickable ? { scale: 0.94 } : undefined}
        transition={{ type: 'spring', stiffness: 420, damping: 24, delay: showResult ? 0 : i * 0.04 }}
      >
        <CardRenderer
          cardString={showHandFaceDown ? '' : card}
          faceDown={showHandFaceDown}
          className={`${CARD} ${ring}`}
        />
        {(isRight || isWrong) && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className={`absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${isWrong ? 'bg-red-500' : 'bg-green-500'}`}
          >{isWrong ? '✗' : '✓'}</motion.span>
        )}
      </motion.div>
    );
  };

  const horizFaceDown = (n: number) => (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: n }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown className={SMALL} />
      ))}
    </div>
  );
  const vertFaceDown = (n: number) => (
    <div className="flex flex-col gap-0.5 items-center">
      {Array.from({ length: n }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown rotated className={SMALL} />
      ))}
    </div>
  );

  const TrickCard: React.FC<{ card: string; rotated?: boolean }> = ({ card, rotated }) => (
    <CardRenderer cardString={card} rotated={rotated} className="w-8 h-11" />
  );

  return (
    <div className="felt-table rounded-2xl p-3 w-full max-w-xs shadow-xl border border-white/10 relative">
      {trumpSuit && <TrumpBadge suit={trumpSuit} />}
      {leadSuit  && <LeadBadge  suit={leadSuit} />}

      {/* Top player */}
      <div className="flex flex-col items-center gap-0.5 mb-1" style={{ minHeight: 42 }}>
        {topHand
          ? <div className="flex gap-0.5 justify-center">{topHand.map((c,i)=><CardRenderer key={i} cardString={c} className={SMALL}/>)}</div>
          : horizFaceDown(6)}
        <PlayerBadge name={topName} team={topTeam} small active={activePosition === 'top'} />
      </div>

      {/* Middle row */}
      <div className="flex items-center justify-between gap-1">
        {/* Left */}
        <div className="flex flex-col items-center gap-0.5 w-10 flex-shrink-0" style={{ minHeight: 72 }}>
          <PlayerBadge name={leftName} team={leftTeam} small active={activePosition === 'left'} />
          {leftHand
            ? <div className="flex flex-col gap-0.5">{leftHand.map((c,i)=><CardRenderer key={i} cardString={c} rotated className={SMALL}/>)}</div>
            : vertFaceDown(6)}
        </div>

        {/* Centre: trick area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative" style={{ width: 110, height: 110 }}>
            {trickCards.top && (
              <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 4 }}>
                <TrickCard card={trickCards.top} />
              </div>
            )}
            {trickCards.left && (
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: 4 }}>
                <TrickCard card={trickCards.left} rotated />
              </div>
            )}
            {trickCards.right && (
              <div className="absolute top-1/2 -translate-y-1/2" style={{ right: 4 }}>
                <TrickCard card={trickCards.right} rotated />
              </div>
            )}
            {trickCards.bottom && (
              <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 4 }}>
                <TrickCard card={trickCards.bottom} />
              </div>
            )}
            {!trickCards.top && !trickCards.left && !trickCards.right && !trickCards.bottom && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/15 text-xs">Dësch</span>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center gap-0.5 w-10 flex-shrink-0" style={{ minHeight: 72 }}>
          <PlayerBadge name={rightName} team={rightTeam} small active={activePosition === 'right'} />
          {rightHand
            ? <div className="flex flex-col gap-0.5">{rightHand.map((c,i)=><CardRenderer key={i} cardString={c} rotated className={SMALL}/>)}</div>
            : vertFaceDown(6)}
        </div>
      </div>

      {/* Bottom: your hand */}
      <div className="flex flex-col items-center gap-1 mt-1">
        <PlayerBadge name={playerName} team={bottomTeam} small active={activePosition === 'bottom'} />
        <div className="flex gap-1 flex-wrap justify-center">
          {playerHand.map((c, i) => renderHandCard(c, i))}
        </div>
      </div>
    </div>
  );
};

// ── TRUMP SELECTION ────────────────────────────────────────────────────────────
// Show player's hand, ask which trump to pick
export const TrumpSelectionGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="flex flex-col items-center gap-3">
    <MiniTable
      playerHand={scenario.hand}
      playerName="Dir (Jeanny)"
      topName="Mariette" leftName="Luca" rightName="Jupp"
      bottomTeam="B" topTeam="A" leftTeam="A" rightTeam="B"
    />
    <p className="text-xs text-white/60 text-center italic">
      Dir sidd lénks vum Ausdeeler a wielt d'Trompfaarf fir dëst Spill.
    </p>
  </div>
);

// ── COUNT TRUMPS ───────────────────────────────────────────────────────────────
// Show hand, user clicks trump cards
export const CountTrumpsGame: React.FC<{
  scenario: MiniGameScenario; selectedCards: string[]; showResult: boolean; onCardSelect: (c: string) => void;
}> = ({ scenario, selectedCards, showResult, onCardSelect }) => (
  <div className="flex flex-col items-center gap-3">
    <MiniTable
      trumpSuit={scenario.trumpSuit}
      playerHand={scenario.hand}
      playerName="Dir"
      topName="Mariette" leftName="Jeanny" rightName="Jupp"
      bottomTeam="A" topTeam="A" leftTeam="B" rightTeam="B"
      selectableCards={scenario.hand}
      selectedCards={selectedCards}
      showResult={showResult}
      onCardSelect={onCardSelect}
        correctCards={scenario.correct.split(',')}
    />
    <p className="text-xs text-white/60 text-center italic">Klick all Tromp-Kaarten an denger Hand.</p>
  </div>
);

// ── TRICK WINNER ────────────────────────────────────────────────────────────────
// Show 4 cards on the table, user picks the winner
// cards[0] = Spiller 1 = bottom (first to play, highlighted as lead)
export const TrickWinnerGame: React.FC<{
  scenario: MiniGameScenario; selectedCards: string[]; showResult: boolean; onCardSelect: (c: string) => void;
}> = ({ scenario, selectedCards, showResult, onCardSelect }) => {
  // cards[0] = lead (bottom), then clockwise: left, top, right
  const cards = scenario.cards ?? [];
  const seatOrder: Seat[] = ['bottom', 'left', 'top', 'right'];
  const stageCards: StageCard[] = cards.map((cd, i) => {
    const sel = selectedCards.includes(cd.card);
    const right = showResult && cd.card === scenario.correct;
    return {
      id: `${cd.card}-${i}`,
      card: cd.card,
      loc: { kind: 'trick', seat: seatOrder[i], order: i },
      faceUp: true,
      enterFrom: seatOrder[i],
      delay: 0.15 + i * 0.28,
      lifted: sel && !showResult,
      glow: right,
      dim: showResult && !right,
      shakeKey: showResult && sel && !right ? 1 : 0,
      onClick: showResult ? undefined : () => {
        // single choice: deselect any other card first
        selectedCards.filter((c) => c !== cd.card).forEach(onCardSelect);
        onCardSelect(cd.card);
      },
    };
  });
  const seats = Object.fromEntries(seatOrder.map((s, i) => [s, {
    name: cards[i]?.player ?? '', team: (i % 2 === 0 ? 'A' : 'B') as 'A' | 'B',
    label: i === 0 ? 'spillt aus' : undefined,
  }])) as Record<Seat, SeatInfo>;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <TableStage
        key={cards.map((c) => c.card).join()}
        cards={stageCards}
        seats={seats}
        cornerBadge={scenario.trumpSuit ? `Tromp: ${scenario.trumpSuit}` : undefined}
      />
      <p className="text-xs text-white/60 text-center italic">Klick op déi Kaart, déi de Streech gewënnt.</p>
    </div>
  );
};

// ── COUNT POINTS ────────────────────────────────────────────────────────────────
// Show 4 cards in the centre of a table (one trick), ask total points
export const CountPointsGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => {
  const cards = scenario.simpleCards ?? [];
  const pos: ('bottom'|'left'|'top'|'right')[] = ['bottom','left','top','right'];
  const trickCards: Partial<Record<'bottom'|'left'|'top'|'right', string>> = {};
  cards.forEach((c, i) => { trickCards[pos[i]] = c; });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="felt-table rounded-2xl p-3 w-full max-w-xs shadow-xl border border-white/10">
        <p className="text-[9px] text-white/50 text-center mb-2">Kaarten an dësem Streech:</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {cards.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <CardRenderer cardString={c} className="w-9 h-[50px]" />
              <span className="text-[9px] text-white/40">Spiller {i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── LEE SCORING ─────────────────────────────────────────────────────────────────
// Show game result with a nice summary panel
export const LeeScoringGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => {
  const gi = scenario.gameInfo;
  if (!gi) return null;
  const isStaenner = gi.winnerTeam === 'Gläichstand';
  const noAnnouncements = !gi.announcements || gi.announcements.length === 0;
  return (
    <div className="flex flex-col gap-3">
      {/* Score display */}
      <div className="felt-table rounded-2xl p-4 w-full max-w-xs shadow-xl border border-white/10 mx-auto">
        <p className="text-[9px] text-white/50 text-center mb-3">Ronn-Resultat</p>
        {/* Score */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="text-center">
            <p className="text-[10px] text-red-300 font-bold mb-0.5">Ekipp A</p>
            <p className="text-2xl font-bold text-white">{gi.score?.split('-')[0] ?? '?'}</p>
          </div>
          <div className="text-center">
            <p className={`text-sm font-bold ${isStaenner ? 'text-yellow-300' : 'text-white/40'}`}>
              {isStaenner ? '⚔️' : ':'}
            </p>
            <p className="text-[9px] text-white/40">Punkten</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-blue-300 font-bold mb-0.5">Ekipp B</p>
            <p className="text-2xl font-bold text-white">{gi.score?.split('-')[1] ?? '?'}</p>
          </div>
        </div>
        {/* Result row */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-white/60">Tromp-Ekipp</span>
            <span className="text-[10px] font-bold text-orange-300">{gi.trumpTeam}</span>
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-white/60">Gewënner</span>
            <span className={`text-[10px] font-bold ${isStaenner ? 'text-yellow-300' : 'text-green-300'}`}>
              {isStaenner ? 'Gläichstand ⚔️' : gi.winnerTeam}
            </span>
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-white/60">Annoncen</span>
            <span className="text-[10px] font-bold text-purple-300">
              {noAnnouncements ? 'Keng' : gi.announcements?.join(' + ')}
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-white/60 text-center italic">Wat ännert sech op der Lee fir all Ekipp?</p>
    </div>
  );
};

// ── ANNOUNCEMENT DECISION ───────────────────────────────────────────────────────
// Show player's hand + trump, ask what they can announce
export const AnnouncementDecisionGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="flex flex-col items-center gap-3">
    <MiniTable
      trumpSuit={scenario.trumpSuit}
      playerHand={scenario.hand}
      playerName="Dir"
      topName="Mariette" leftName="Jeanny" rightName="Jupp"
      bottomTeam="A" topTeam="A" leftTeam="B" rightTeam="B"
    />
    <p className="text-xs text-white/60 text-center italic">
      Dir kuckt är Hand. Wat kënnt Dir (maximal) annoncéieren ier dir är éischt Kaart spillt?
    </p>
  </div>
);

// ── HAND EVALUATION ─────────────────────────────────────────────────────────────
// Show player's hand + trump, ask how strong it is
export const HandEvaluationGame: React.FC<{ scenario: MiniGameScenario }> = ({ scenario }) => (
  <div className="flex flex-col items-center gap-3">
    <MiniTable
      trumpSuit={scenario.trumpSuit}
      playerHand={scenario.hand}
      playerName="Dir"
      topName="Mariette" leftName="Jeanny" rightName="Jupp"
      bottomTeam="A" topTeam="A" leftTeam="B" rightTeam="B"
    />
    <p className="text-xs text-white/60 text-center italic">
      Wéi staark ass är Hand mat dëser Trompfaarf?
    </p>
  </div>
);

// ── PLAYABLE CARDS ──────────────────────────────────────────────────────────────
// Show full table context: trump, lead suit, player's hand → click which are playable
// The lead card shown on the table matches the leadSuit of each scenario.
export const PlayableCardsGame: React.FC<{
  scenario: MiniGameScenario; selectedCards: string[]; showResult: boolean; onCardSelect: (c: string) => void;
}> = ({ scenario, selectedCards, showResult, onCardSelect }) => {
  // Derive a representative lead card for each scenario's leadSuit
  const leadSuitSymbol = scenario.leadSuit?.split(' ')[0] ?? '';
  // Pick a mid-value lead card of the lead suit (not in player's hand)
  const leadCardMap: Record<string, string> = {
    '♠': '♠K', '♥': '♥K', '♦': '♦K', '♣': '♣K',
  };
  // For trump-led scenarios use the Ass, for others use King
  const isTrumpLead = scenario.leadSuit?.includes(scenario.trumpSuit?.split(' ')[0] ?? 'XX') ||
    scenario.leadSuit === scenario.trumpSuit;
  const leadCard = scenario.leadCard ?? (isTrumpLead
    ? (leadSuitSymbol + 'A')
    : (leadCardMap[leadSuitSymbol] ?? leadSuitSymbol + 'K'));

  return (
    <div className="flex flex-col items-center gap-3">
      <MiniTable
        trumpSuit={scenario.trumpSuit}
        leadSuit={scenario.leadSuit}
        playerHand={scenario.hand}
        playerName="Dir"
        topName="Mariette" leftName="Luca" rightName="Jupp"
        bottomTeam="A" topTeam="A" leftTeam="B" rightTeam="B"
        trickCards={{ left: leadCard }}   // Luca (left) played the first card
        selectableCards={scenario.hand}
        selectedCards={selectedCards}
        showResult={showResult}
        onCardSelect={onCardSelect}
        correctCards={scenario.correct.split(',')}
      />
      <p className="text-xs text-white/60 text-center italic">
        Luca huet ugespillt. Klick all Kaarten, déi dir spillen <strong>dierft</strong>.
      </p>
    </div>
  );
};

// ── CARD PLAY LOGIC ─────────────────────────────────────────────────────────────
// Full table with current trick in the centre + player's hand at bottom
// Teams: Spiller 1 & 3 = red (A), Spiller 2 & 4 = blue (B)
// Table positions: Spiller 1 = bottom (lead), 2 = left, 3 = top, 4 = right
// "Dir" (playerPosition) is always at bottom; other players are mapped relative to that.
export const CardPlayLogicGame: React.FC<{
  scenario: MiniGameScenario; selectedCards: string[]; showResult: boolean; onCardSelect: (c: string) => void;
}> = ({ scenario, selectedCards, showResult, onCardSelect }) => {
  const trick = scenario.currentTrick ?? [];

  // Determine absolute positions of trick cards.
  // In the data: trick[0].player = first player in the sequence.
  // We need to place "Dir" (playerPosition) at bottom.
  // Extract player number from playerPosition, e.g. "Spiller 3" -> 3
  const dirNum = parseInt(scenario.playerPosition?.replace(/\D/g, '') ?? '4') || 4;

  // Build a map from player number -> card
  const playerCards: Record<number, { card: string; player: string }> = {};
  trick.forEach(cd => {
    const num = parseInt(cd.player.replace(/\D/g, ''));
    if (num) playerCards[num] = cd;
  });

  // Table positions relative to Dir (bottom):
  // Dir=bottom, next clockwise=left, across=top, prev=right
  // Player order: 1->2->3->4->1...
  const relativePos = (num: number): 'bottom'|'left'|'top'|'right' => {
    const diff = ((num - dirNum + 4) % 4);
    if (diff === 0) return 'bottom';
    if (diff === 1) return 'left';
    if (diff === 2) return 'top';
    return 'right';
  };

  const trickCards: Partial<Record<'bottom'|'left'|'top'|'right', string>> = {};
  const trickNames: Partial<Record<'bottom'|'left'|'top'|'right', string>> = {};
  Object.entries(playerCards).forEach(([numStr, cd]) => {
    const num = parseInt(numStr);
    const pos = relativePos(num);
    trickCards[pos] = cd.card;
    trickNames[pos] = cd.player.split(' - ')[0]; // strip annotations like "- Matspiller"
  });

  // Player names at each position (Dir is always bottom)
  const playerNameAt = (pos: 'left'|'top'|'right'): string => {
    return trickNames[pos] ?? (['Jeanny','Mariette','Jupp'][['left','top','right'].indexOf(pos)]);
  };

  // Team colors: odd player numbers = red A, even = blue B
  const teamOf = (num: number): 'A'|'B' => (num % 2 === 1 ? 'A' : 'B');
  const dirTeam = teamOf(dirNum);
  const leftNum  = ((dirNum) % 4) + 1;  // next clockwise
  const topNum   = ((dirNum + 1) % 4) + 1;
  const rightNum = ((dirNum + 2) % 4) + 1;

  // Find the first played card (lead) to highlight it
  const firstPlayer = trick[0] ? parseInt(trick[0].player.replace(/\D/g, '')) : null;
  const leadPos = firstPlayer ? relativePos(firstPlayer) : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <MiniTable
        trumpSuit={scenario.trumpSuit}
        leadSuit={scenario.leadSuit}
        playerHand={scenario.hand}
        playerName={scenario.playerPosition ?? 'Dir'}
        topName={playerNameAt('top')}
        leftName={playerNameAt('left')}
        rightName={playerNameAt('right')}
        bottomTeam={dirTeam}
        topTeam={teamOf(topNum)}
        leftTeam={teamOf(leftNum)}
        rightTeam={teamOf(rightNum)}
        trickCards={trickCards}
        activePosition="bottom"
        selectableCards={scenario.hand}
        selectedCards={selectedCards}
        showResult={showResult}
        onCardSelect={onCardSelect}
        correctCards={scenario.correct.split(',')}
      />
      {leadPos && leadPos !== 'bottom' && (
        <p className="text-[10px] text-blue-300 text-center">
          {trickNames[leadPos] ?? ''} huet ugespillt ({scenario.leadSuit})
        </p>
      )}
      <p className="text-xs text-white/60 text-center italic">
        Dir sidd un der Reih. Klick déi Kaart, déi dir spillen géift.
      </p>
    </div>
  );
};
