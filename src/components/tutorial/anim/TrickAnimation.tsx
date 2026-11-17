import React, { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shuffle } from 'lucide-react';
import { TableStage, StageCard, Seat, SeatInfo, SEATS } from './TableStage';
import {
  Card, Suit, deal, legalMoves, trickWinner, explainMove, sumPoints, isTrump, sortHand, pick, SUITS, effectiveSuit,
} from '@/lib/konter/rules';
import { label, SUIT_NAME } from '@/lib/konter/generators';

const SEAT_INFO: Record<Seat, SeatInfo> = {
  bottom: { name: 'Luca', team: 'A' },
  left: { name: 'Jeanny', team: 'B' },
  top: { name: 'Mariette', team: 'A' },
  right: { name: 'Jupp', team: 'B' },
};
const next = (s: Seat): Seat => SEATS[(SEATS.indexOf(s) + 1) % 4];

interface Game {
  trump: Suit | null;
  hands: Record<Seat, Card[]>;
  leader: Seat;
}

/** Fixed story for the basics chapter (no trump yet): ♠R, ♠9, ♠1, ♠V → Mariette wins. */
const INTRO: Game = {
  trump: null,
  leader: 'bottom',
  hands: {
    bottom: ['♠K', '♥10', '♦9', '♣A', '♥J', '♦K'],
    left: ['♠9', '♣10', '♥A', '♦J', '♣K', '♥9'],
    top: ['♠A', '♦10', '♣J', '♥K', '♣9', '♦A'],
    right: ['♠J', '♥Q', '♣Q', '♦Q', '♠10', '♠Q'],
  },
};
const INTRO_PLAYS: Record<Seat, Card> = { bottom: '♠K', left: '♠9', top: '♠A', right: '♠J' };

function newGame(): Game {
  const trump = pick(SUITS);
  const h = deal();
  return {
    trump,
    leader: pick(SEATS),
    hands: { bottom: sortHand(h[0], trump), left: h[1], top: h[2], right: h[3] },
  };
}

// Without a trump suit, use one that can't matter for the intro trick.
const rulesTrump = (g: Game): Suit => g.trump ?? '♣';

export const TrickAnimation: React.FC<{ random?: boolean }> = ({ random = false }) => {
  const [game, setGame] = useState<Game>(() => (random ? newGame() : INTRO));
  const [played, setPlayed] = useState<{ seat: Seat; card: Card; why: string }[]>([]);
  const [collected, setCollected] = useState(false);
  const [score, setScore] = useState({ A: 0, B: 0 });

  const trump = rulesTrump(game);
  const done = played.length === 4;
  const winnerIdx = done ? trickWinner(played.map((p) => p.card), trump) : -1;
  const winnerSeat = winnerIdx >= 0 ? played[winnerIdx].seat : null;
  const turn: Seat = played.length ? next(played[played.length - 1].seat) : game.leader;

  const playNext = useCallback(() => {
    if (done) return;
    const seat = turn;
    const hand = game.hands[seat];
    const lead = played[0]?.card ?? null;
    const card = random ? pick(legalMoves(hand, lead, trump)) : INTRO_PLAYS[seat];
    const { reason } = explainMove(card, hand, lead, trump);
    const led = lead ? effectiveSuit(lead, trump) : null;
    const why = !game.trump
      ? (lead ? 'bekennt' : 'spillt aus')
      : reason === 'lead' ? 'spillt aus'
      : reason === 'follow' ? (led === 'trump' ? 'bekennt Tromp' : `bekennt ${SUIT_NAME[led as Suit]}`)
      : reason === 'trump' ? 'trompt!'
      : 'kann net bekennen → fräi Kaart';
    setPlayed((p) => [...p, { seat, card, why }]);
  }, [done, turn, game, played, random, trump]);

  const collect = () => {
    if (!winnerSeat) return;
    const pts = sumPoints(played.map((p) => p.card));
    setScore((s) => ({ ...s, [SEAT_INFO[winnerSeat].team]: s[SEAT_INFO[winnerSeat].team] + pts }));
    setCollected(true);
  };

  const nextTrick = () => {
    // remove played cards, winner leads; when hands are empty, deal a new game
    const hands = { ...game.hands };
    played.forEach((p) => (hands[p.seat] = hands[p.seat].filter((c) => c !== p.card)));
    if (!random) { setGame(INTRO); setScore({ A: 0, B: 0 }); }
    else if (hands.bottom.length === 0) { setGame(newGame()); setScore({ A: 0, B: 0 }); }
    else setGame({ ...game, hands, leader: winnerSeat! });
    setPlayed([]);
    setCollected(false);
  };

  const reset = () => { setGame(newGame()); setPlayed([]); setCollected(false); setScore({ A: 0, B: 0 }); };

  // --- cards on the stage ---
  const cards: StageCard[] = [];
  SEATS.forEach((seat) => {
    const inHand = game.hands[seat].filter((c) => !played.some((p) => p.card === c));
    inHand.forEach((card, i) =>
      cards.push({
        id: card, card,
        loc: { kind: 'hand', seat, i, n: inHand.length },
        faceUp: random && seat === 'bottom',
        highlighted: random && seat === 'bottom' && !!game.trump && isTrump(card, trump),
      }),
    );
  });
  played.forEach((p, order) =>
    cards.push({
      id: p.card, card: p.card,
      loc: collected ? { kind: 'pile', seat: winnerSeat!, i: order } : { kind: 'trick', seat: p.seat, order },
      faceUp: !collected,
      glow: done && !collected && order === winnerIdx,
      highlighted: !!game.trump && isTrump(p.card, trump),
      delay: collected ? order * 0.07 : 0,
    }),
  );

  const seats = Object.fromEntries(
    SEATS.map((s) => [s, {
      ...SEAT_INFO[s],
      active: !done && s === turn,
      label: collected && s === winnerSeat ? '✓ gewënnt' : undefined,
    }]),
  ) as Record<Seat, SeatInfo>;

  // --- caption ---
  const last = played[played.length - 1];
  let caption: React.ReactNode;
  if (!played.length) caption = `Klick op „Nächst Kaart". ${SEAT_INFO[game.leader].name} spillt aus.`;
  else if (!done) caption = <><b>{SEAT_INFO[last.seat].name}</b> {last.why}: {label(last.card)}</>;
  else if (!collected) {
    const w = played[winnerIdx];
    const anyTrump = game.trump && played.some((p) => isTrump(p.card, trump));
    caption = anyTrump
      ? <><b>{SEAT_INFO[w.seat].name}</b> gewënnt mat {label(w.card)}: déi héchsten Tromp am Streech.</>
      : <><b>{SEAT_INFO[w.seat].name}</b> gewënnt mat {label(w.card)}: keng Tromp, also gewënnt déi héchst Kaart vun der ausgespillter Faarf.</>;
  } else {
    const pts = sumPoints(played.map((p) => p.card));
    caption = <>{SEAT_INFO[winnerSeat!].name} leet d'Kaarte verdeckt op hire Koup: <b>+{pts} Punkten</b> fir Ekipp {SEAT_INFO[winnerSeat!].team === 'A' ? 1 : 2}. {SEAT_INFO[winnerSeat!].name} spillt elo als éischt.</>;
  }

  const btn = 'px-4 py-1.5 text-xs font-bold rounded-full shadow transition-colors';

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <TableStage
        cards={cards}
        seats={seats}
        bigBottomHand={random}
        cornerBadge={game.trump ? `Tromp: ${game.trump} ${SUIT_NAME[game.trump]}` : undefined}
        overlay={random ? (
          <div className="absolute top-1.5 right-2 z-[600] text-[9px] font-bold flex flex-col items-end gap-1">
            <ScorePill team="A" value={score.A} />
            <ScorePill team="B" value={score.B} />
          </div>
        ) : undefined}
      />

      <AnimatePresence mode="wait">
        <motion.p key={`${played.length}-${collected}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-xs text-white/85 text-center px-2 leading-snug min-h-[36px] max-w-sm">
          {caption}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-2">
        {!done && <button onClick={playNext} className={`${btn} bg-yellow-400 hover:bg-yellow-300 text-gray-900`}>Nächst Kaart ▸</button>}
        {done && !collected && <button onClick={collect} className={`${btn} bg-green-500 hover:bg-green-400 text-white`}>Streech asammelen</button>}
        {collected && <button onClick={nextTrick} className={`${btn} bg-yellow-400 hover:bg-yellow-300 text-gray-900`}>{random ? 'Nächste Streech ▸' : 'Nach eng Kéier ↺'}</button>}
        {random && (
          <button onClick={reset} className={`${btn} bg-white/15 hover:bg-white/25 text-white flex items-center gap-1`}>
            <Shuffle className="w-3 h-3" /> Nei Kaarten
          </button>
        )}
      </div>
    </div>
  );
};

const ScorePill: React.FC<{ team: 'A' | 'B'; value: number }> = ({ team, value }) => (
  <span className={`px-2 py-0.5 rounded-full text-white ${team === 'A' ? 'bg-red-500/80' : 'bg-blue-500/80'}`}>
    Ekipp {team === 'A' ? 1 : 2}:{' '}
    <motion.span key={value} initial={{ scale: 1.8 }} animate={{ scale: 1 }} className="inline-block">{value}</motion.span>
  </span>
);
