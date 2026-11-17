import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { TableStage, StageCard, Seat, SeatInfo, SEATS } from './TableStage';
import { Confetti } from './Confetti';
import {
  Card, Suit, Announcement, SUITS, deal, legalMoves, trickWinner, explainMove, sumPoints, isTrump,
  sortHand, possibleAnnouncement, leeResult, LeeResult, effectiveSuit,
} from '@/lib/konter/rules';
import { chooseTrump, chooseAnnouncement, chooseCard, hintFor } from '@/lib/konter/bot';
import { label, SUIT_NAME } from '@/lib/konter/generators';

type Team = 'A' | 'B';
const next = (s: Seat): Seat => SEATS[(SEATS.indexOf(s) + 1) % 4];
const teamOf = (s: Seat): Team => (s === 'bottom' || s === 'top' ? 'A' : 'B');
const NAMES: Record<Seat, string> = { bottom: 'Dir', left: 'Jeanny', top: 'Mariette', right: 'Jupp' };
const TEAM_NAME: Record<Team, string> = { A: 'Dir & Mariette', B: 'Jeanny & Jupp' };
const ANN_LABEL: Record<Announcement, string> = { matt: 'Matt', konter: 'Konter', konterMatt: 'Konter a Matt' };
const START_LINES = 9;

type Phase = 'deal1' | 'chooseTrump' | 'deal2' | 'play' | 'collect' | 'summary';

interface GameState {
  dealer: Seat;
  hands: Record<Seat, Card[]>;
  phase: Phase;
  trump: Suit | null;
  turn: Seat;
  trick: { seat: Seat; card: Card }[];
  piles: Record<Seat, Card[]>;
  tricksWon: Record<Team, number>;
  announcements: { seat: Seat; ann: Announcement }[];
  played: Seat[]; // seats that already played their first card (announcement window closed)
  lastWinner: Seat | null;
}

function newGame(dealer: Seat): GameState {
  const h = deal();
  const first = next(dealer);
  return {
    dealer,
    hands: { bottom: h[0], left: h[1], top: h[2], right: h[3] },
    phase: 'deal1',
    trump: null,
    turn: first,
    trick: [],
    piles: { bottom: [], left: [], top: [], right: [] },
    tricksWon: { A: 0, B: 0 },
    announcements: [],
    played: [],
    lastWinner: null,
  };
}

const BOT_DELAY = 850;

export const PlayHand: React.FC = () => {
  const [g, setG] = useState<GameState>(() => newGame('right')); // you choose trump in the first game
  const [lee, setLee] = useState<Record<Team, number>>({ A: START_LINES, B: START_LINES });
  const [result, setResult] = useState<(LeeResult & { pointsA: number }) | null>(null);
  const [message, setMessage] = useState<React.ReactNode>(null);
  const [shake, setShake] = useState<{ card: Card; n: number } | null>(null);
  const [hint, setHint] = useState<{ card: Card; why: string } | null>(null);
  const [learn, setLearn] = useState(true);
  const [myAnn, setMyAnn] = useState<Announcement | null>(null);
  const [matchWinner, setMatchWinner] = useState<Team | null>(null);
  const [gameNo, setGameNo] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const chooser = next(g.dealer);
  const trump = g.trump ?? '♣';

  const later = (fn: () => void, ms: number) => { clearTimeout(timer.current); timer.current = setTimeout(fn, ms); };
  useEffect(() => () => clearTimeout(timer.current), []);

  // --- phase machine -------------------------------------------------------
  useEffect(() => {
    if (g.phase === 'deal1') {
      later(() => {
        if (chooser === 'bottom') {
          setG((s) => ({ ...s, phase: 'chooseTrump' }));
          setMessage('Kuck deng 3 Kaarten: wéi eng Faarf soll Tromp sinn?');
        } else {
          const t = chooseTrump(g.hands[chooser].slice(0, 3));
          setMessage(<><b>{NAMES[chooser]}</b> mécht Tromp: <b>{t} {SUIT_NAME[t]}</b></>);
          setG((s) => ({ ...s, trump: t, phase: 'deal2' }));
        }
      }, 1400);
    }
    if (g.phase === 'deal2') later(() => setG((s) => ({ ...s, phase: 'play' })), 1500);
    if (g.phase === 'collect') {
      later(() => {
        setG((s) => {
          const cards = s.trick.map((t) => t.card);
          const w = s.trick[trickWinner(cards, s.trump!)].seat;
          const hands = { ...s.hands };
          const done = Object.values(hands).every((h) => h.length === 0);
          return {
            ...s,
            piles: { ...s.piles, [w]: [...s.piles[w], ...cards] },
            tricksWon: { ...s.tricksWon, [teamOf(w)]: s.tricksWon[teamOf(w)] + 1 },
            trick: [],
            turn: w,
            lastWinner: w,
            phase: done ? 'summary' : 'play',
          };
        });
      }, 1700);
    }
  }, [g.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // bots play
  useEffect(() => {
    if (g.phase !== 'play' || g.turn === 'bottom') return;
    later(() => {
      setG((s) => {
        if (s.phase !== 'play' || s.turn === 'bottom') return s;
        const seat = s.turn;
        const hand = s.hands[seat];
        let announcements = s.announcements;
        if (!s.played.includes(seat)) {
          const a = chooseAnnouncement(hand, s.trump!, teamOf(seat) === teamOf(next(s.dealer)));
          if (a) announcements = [...announcements, { seat, ann: a }];
        }
        const trickCards = s.trick.map((t) => t.card);
        const partnerIdx = s.trick.findIndex((t) => teamOf(t.seat) === teamOf(seat));
        const card = chooseCard(hand, trickCards, s.trump!, partnerIdx);
        return playCard(s, seat, card, announcements);
      });
    }, BOT_DELAY);
  }, [g.phase, g.turn, g.trick.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // game over → score it
  useEffect(() => {
    if (g.phase !== 'summary' || result) return;
    const pointsA = g.piles.bottom.concat(g.piles.top).reduce((s, c) => s + sumPoints([c]), 0);
    const allTricksBy: Team | null = g.tricksWon.A === 6 ? 'A' : g.tricksWon.B === 6 ? 'B' : null;
    const r = leeResult({ trumpTeam: teamOf(chooser), pointsA, announcements: g.announcements.map((a) => a.ann), allTricksBy });
    setResult({ ...r, pointsA });
    setLee((l) => {
      const n = { A: l.A + r.deltaA, B: l.B + r.deltaB };
      if (n.A <= 0) setMatchWinner('A'); else if (n.B <= 0) setMatchWinner('B');
      return { A: Math.max(0, n.A), B: Math.max(0, n.B) };
    });
  }, [g.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  function playCard(s: GameState, seat: Seat, card: Card, announcements = s.announcements): GameState {
    const trick = [...s.trick, { seat, card }];
    return {
      ...s,
      hands: { ...s.hands, [seat]: s.hands[seat].filter((c) => c !== card) },
      trick,
      announcements,
      played: s.played.includes(seat) ? s.played : [...s.played, seat],
      turn: next(seat),
      phase: trick.length === 4 ? 'collect' : 'play',
    };
  }

  // --- your actions --------------------------------------------------------
  const lead = g.trick[0]?.card ?? null;
  const myLegal = useMemo(() => (g.phase === 'play' && g.turn === 'bottom' ? legalMoves(g.hands.bottom, lead, trump) : []), [g, lead, trump]);
  const canAnnounce = g.phase === 'play' && g.turn === 'bottom' && !g.played.includes('bottom') ? possibleAnnouncement(g.hands.bottom) : null;

  const onMyCard = useCallback((card: Card) => {
    if (g.phase !== 'play' || g.turn !== 'bottom') return;
    const ex = explainMove(card, g.hands.bottom, lead, trump);
    if (!ex.legal) {
      setShake({ card, n: Date.now() });
      const led = effectiveSuit(lead!, trump);
      setMessage(ex.reason === 'mustTrump'
        ? <>✋ Tromp gouf ausgespillt: Dir musst <b>Tromp bekennen</b>.</>
        : <>✋ Dir musst <b>{SUIT_NAME[led as Suit]}</b> bekennen — oder trompen.</>);
      return;
    }
    setHint(null);
    setMessage(null);
    const ann = myAnn && canAnnounce ? [...g.announcements, { seat: 'bottom' as Seat, ann: myAnn }] : g.announcements;
    setMyAnn(null);
    setG((s) => playCard(s, 'bottom', card, ann));
  }, [g, lead, trump, myAnn, canAnnounce]);

  const pickTrump = (t: Suit) => {
    setG((s) => ({ ...s, trump: t, phase: 'deal2' }));
    setMessage(<>Dir maacht <b>{t} {SUIT_NAME[t]}</b> zur Tromp!</>);
  };

  const showHint = () => {
    const partnerIdx = g.trick.findIndex((t) => t.seat === 'top');
    setHint(hintFor(g.hands.bottom, g.trick.map((t) => t.card), trump, partnerIdx));
  };

  const nextGame = () => {
    if (matchWinner) { setLee({ A: START_LINES, B: START_LINES }); setMatchWinner(null); }
    setResult(null); setMessage(null); setHint(null);
    setG(newGame(next(g.dealer)));
    setGameNo((n) => n + 1);
  };

  // --- what's on the table ---------------------------------------------------
  const cards: StageCard[] = [];
  SEATS.forEach((seat) => {
    // the original 6 cards in deal order; drop those already played
    const playedHere = new Set([...g.trick.map((t) => t.card), ...Object.values(g.piles).flat()]);
    let hand = g.hands[seat].slice(0, g.phase === 'deal1' || g.phase === 'chooseTrump' ? 3 : 6).filter((c) => !playedHere.has(c));
    if (seat === 'bottom') hand = sortHand(hand, g.trump ?? undefined);
    hand.forEach((card, i) => {
      const mine = seat === 'bottom';
      const legal = myLegal.includes(card);
      cards.push({
        id: card, card,
        loc: { kind: 'hand', seat, i, n: hand.length },
        faceUp: mine,
        highlighted: mine && !!g.trump && isTrump(card, trump),
        dim: mine && learn && g.phase === 'play' && g.turn === 'bottom' && !legal,
        glow: mine && hint?.card === card,
        shakeKey: shake?.card === card ? shake.n : 0,
        enterFrom: 'deck',
        delay: (g.phase === 'deal1' || g.phase === 'deal2') ? 0.1 + SEATS.indexOf(seat) * 0.25 + (i % 3) * 0.08 : 0,
        onClick: mine && g.phase === 'play' && g.turn === 'bottom' ? () => onMyCard(card) : undefined,
      });
    });
  });
  // cards not dealt yet sit on the deck
  if (g.phase === 'deal1' || g.phase === 'chooseTrump') {
    SEATS.forEach((seat) => g.hands[seat].slice(3).forEach((card, i) =>
      cards.push({ id: card, card, loc: { kind: 'deck', i: SEATS.indexOf(seat) * 3 + i } })));
  }
  const winnerIdx = g.trick.length === 4 ? trickWinner(g.trick.map((t) => t.card), trump) : -1;
  g.trick.forEach((t, order) => cards.push({
    id: t.card, card: t.card, loc: { kind: 'trick', seat: t.seat, order }, faceUp: true,
    highlighted: isTrump(t.card, trump), glow: order === winnerIdx,
  }));
  SEATS.forEach((seat) => g.piles[seat].forEach((card, i) => cards.push({ id: card, card, loc: { kind: 'pile', seat, i } })));

  const seats = Object.fromEntries(SEATS.map((s) => {
    const ann = g.announcements.filter((a) => a.seat === s).map((a) => `„${ANN_LABEL[a.ann]}!"`).join(' ');
    const role = s === g.dealer ? 'Ausdeeler' : s === chooser ? 'mécht Tromp' : '';
    return [s, {
      name: NAMES[s], team: teamOf(s),
      active: (g.phase === 'play' && g.turn === s) || (g.phase === 'chooseTrump' && s === 'bottom'),
      label: [ann, role].filter(Boolean).join(' · ') || undefined,
    }];
  })) as Record<Seat, SeatInfo>;

  // --- status line -----------------------------------------------------------
  let status: React.ReactNode = message;
  if (!status) {
    if (g.phase === 'deal1') status = <><b>{NAMES[g.dealer]}</b> deelt aus: 3 Kaarte fir jiddereen…</>;
    else if (g.phase === 'deal2') status = 'Nach 3 Kaarte fir jiddereen…';
    else if (g.phase === 'play' && g.turn === 'bottom') status = lead
      ? <>Dir sidd drun. {learn && 'Déi hell Kaarte sinn erlaabt.'}</>
      : 'Dir spillt aus — all Kaart ass erlaabt.';
    else if (g.phase === 'play') status = <><b>{NAMES[g.turn]}</b> iwwerleet…</>;
    else if (g.phase === 'collect' && winnerIdx >= 0) {
      const w = g.trick[winnerIdx];
      status = <><b>{NAMES[w.seat]}</b> {w.seat === 'bottom' ? 'gewannt' : 'gewënnt'} de Streech mat {label(w.card)} (+{sumPoints(g.trick.map((t) => t.card))} Punkten).</>;
    }
  }

  const pointsA = [...g.piles.bottom, ...g.piles.top].reduce((s, c) => s + sumPoints([c]), 0);
  const pointsB = [...g.piles.left, ...g.piles.right].reduce((s, c) => s + sumPoints([c]), 0);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative w-full">
        {matchWinner === 'A' && <Confetti count={60} />}
        <TableStage
          key={gameNo}
          cards={cards}
          seats={seats}
          bigBottomHand
          cornerBadge={g.trump ? `Tromp: ${g.trump} ${SUIT_NAME[g.trump]}` : undefined}
          overlay={
            <div className="absolute top-1.5 right-2 z-[600] text-[9px] font-bold flex flex-col items-end gap-1">
              <Pill team="A" text={`Dir: ${pointsA}`} />
              <Pill team="B" text={`Géigner: ${pointsB}`} />
            </div>
          }
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={String(g.phase) + g.trick.length + g.turn + (message ? 'm' : '')}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-xs text-white/85 text-center px-2 leading-snug min-h-[32px] max-w-sm">
          {status}
        </motion.p>
      </AnimatePresence>

      {/* trump choice */}
      {g.phase === 'chooseTrump' && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {SUITS.map((s) => (
              <motion.button key={s} whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} onClick={() => pickTrump(s)}
                className="flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20">
                <span className={`text-2xl leading-none ${s === '♥' || s === '♦' ? 'text-red-500' : 'text-white'}`}>{s}</span>
                <span className="text-[10px] text-white/70">{SUIT_NAME[s]}</span>
              </motion.button>
            ))}
          </div>
          <button onClick={() => setMessage(<>💡 Mäi Tipp: <b>{chooseTrump(g.hands.bottom.slice(0, 3))}</b> — dann hues de déi meeschte staark Trëmp. Denk drun: ♠D, ♥D an ♦D sinn ëmmer Tromp.</>)}
            className="text-[11px] text-yellow-200/90 hover:text-yellow-100 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> Tipp
          </button>
        </div>
      )}

      {/* announcement */}
      {canAnnounce && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/40 rounded-xl px-3 py-2">
          <span className="text-[11px] text-yellow-100">Dir hutt {canAnnounce === 'matt' ? 'd\'♠D' : canAnnounce === 'konter' ? '♥D an ♦D' : 'all 3 Dammen'} — wëllt Dir schwätzen, ier Dir Är éischt Kaart spillt?</span>
          <div className="flex gap-2">
            {([null, canAnnounce] as (Announcement | null)[]).map((a) => (
              <button key={String(a)} onClick={() => setMyAnn(a)}
                className={`px-3 py-1 rounded-full text-xs font-bold border ${myAnn === a ? 'bg-yellow-400 text-gray-900 border-yellow-400' : 'bg-white/10 text-white border-white/20'}`}>
                {a ? `„${ANN_LABEL[a]}!"` : 'Näischt soen'}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* tools */}
      {g.phase === 'play' && g.turn === 'bottom' && (
        <div className="flex gap-2 items-center">
          <button onClick={showHint} className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-yellow-200 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" /> Tipp
          </button>
          <button onClick={() => setLearn((l) => !l)} className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-white/80 flex items-center gap-1">
            {learn ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />} Erlaabt Kaarte weisen
          </button>
        </div>
      )}
      <AnimatePresence>
        {hint && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[11px] text-yellow-100 text-center max-w-sm">
            💡 {label(hint.card)}: {hint.why}
          </motion.p>
        )}
      </AnimatePresence>

      {/* summary */}
      <AnimatePresence>
        {g.phase === 'summary' && result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-white/10 border border-white/20 rounded-xl p-4 space-y-3">
            <p className="text-center font-bold text-white">
              {result.winner === 'tie' ? 'Stänner — 20 : 20!' : result.winner === 'A' ? '🎉 Dir gewannt dëst Spill!' : 'D\'Géigner gewannen dëst Spill.'}
            </p>
            <p className="text-center text-sm text-white/80">{TEAM_NAME.A}: <b>{result.pointsA}</b> · {TEAM_NAME.B}: <b>{40 - result.pointsA}</b> Punkten</p>
            <p className="text-[11px] text-white/70 text-center">
              {explainLee(result, teamOf(chooser), g.announcements.map((a) => a.ann), g.tricksWon)}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <LeeRow name={TEAM_NAME.A} team="A" lines={lee.A} delta={result.deltaA} />
              <LeeRow name={TEAM_NAME.B} team="B" lines={lee.B} delta={result.deltaB} />
            </div>
            {matchWinner && (
              <p className="text-center font-bold text-yellow-300">
                {matchWinner === 'A' ? '🏆 Dir hutt d\'Lee gewonnen!' : 'D\'Géigner hunn d\'Lee gewonnen.'}
              </p>
            )}
            <button onClick={nextGame} className="w-full py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm flex items-center justify-center gap-1">
              {matchWinner ? <><RotateCcw className="w-4 h-4" /> Nei Lee</> : 'Nächst Spill ▸'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {g.phase !== 'summary' && (
        <div className="flex gap-4 text-[10px] text-white/50">
          <span>Lee — Dir: {lee.A} Linnen</span><span>Géigner: {lee.B} Linnen</span>
        </div>
      )}
    </div>
  );
};

function explainLee(r: LeeResult, trumpTeam: Team, anns: Announcement[], tricks: Record<Team, number>): string {
  if (r.winner === 'tie') return `Bei 20:20 kritt d'Tromp-Ekipp (${TEAM_NAME[trumpTeam]}) 1 Linn bäi.`;
  const parts = ['1 fir de Gewënn'];
  anns.forEach((a) => parts.push(`${a === 'konterMatt' ? 2 : 1} fir „${ANN_LABEL[a]}"`));
  if (tricks[r.winner] === 6) parts.push('1 fir all 6 Streech');
  let s = `${TEAM_NAME[r.winner]}: ${parts.join(' + ')} = ${r.lines} Linn${r.lines > 1 ? 'en' : ''} ausgestrach.`;
  if (r.winner !== trumpTeam) s += ` ${TEAM_NAME[trumpTeam]} hunn d'Tromp gemaach a verluer → ${r.lines} Linn${r.lines > 1 ? 'en' : ''} bäi.`;
  return s;
}

const Pill: React.FC<{ team: Team; text: string }> = ({ team, text }) => (
  <span className={`px-2 py-0.5 rounded-full text-white ${team === 'A' ? 'bg-red-500/80' : 'bg-blue-500/80'}`}>{text}</span>
);

const LeeRow: React.FC<{ name: string; team: Team; lines: number; delta: number }> = ({ name, team, lines, delta }) => (
  <div className="text-center">
    <p className={`text-[11px] font-bold ${team === 'A' ? 'text-red-300' : 'text-blue-300'}`}>{name}</p>
    <div className="flex justify-center gap-[3px] my-1 flex-wrap">
      {Array.from({ length: lines + Math.max(0, -delta) }).map((_, i) => {
        const struck = i >= lines;
        return (
          <div key={i} className="relative w-[2px] h-5">
            <motion.div className={`absolute inset-0 rounded-full ${struck ? 'bg-white/25' : i >= lines - Math.max(0, delta) ? 'bg-blue-400' : 'bg-white'}`}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 0 }} transition={{ delay: i * 0.03 }} />
            {struck && (
              <motion.div className="absolute top-1/2 -left-1 h-[2px] w-3 bg-yellow-200 rounded-full"
                style={{ rotate: -28, originX: 0 }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 + (i - lines) * 0.15 }} />
            )}
          </div>
        );
      })}
    </div>
    <p className="text-[10px] text-white/60">{delta < 0 ? `${delta} → ` : delta > 0 ? `+${delta} → ` : ''}{lines} Linnen</p>
  </div>
);
