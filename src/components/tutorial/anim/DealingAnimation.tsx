import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { TableStage, StageCard, Seat, SeatInfo } from './TableStage';
import { fullDeck, shuffle, mulberry32, parseCard, Suit, SUITS, isTrump } from '@/lib/konter/rules';
import { SUIT_NAME } from '@/lib/konter/generators';

const DEAL_ORDER: Seat[] = ['left', 'top', 'right', 'bottom']; // starting left of the dealer, clockwise

const BASE_SEATS: Record<Seat, SeatInfo> = {
  bottom: { name: 'Luca', team: 'A' },
  left: { name: 'Jeanny', team: 'B' },
  top: { name: 'Mariette', team: 'A' },
  right: { name: 'Jupp', team: 'B' },
};

interface Step {
  caption: string;
  dealt: number;        // how many cards are dealt so far (0..24)
  active?: Seat;
  labels: Partial<Record<Seat, string>>;
  phase?: 'shuffle' | 'cut' | 'trump' | 'first' | 'rotate';
}

const STEPS: Step[] = [
  { caption: 'De Luca ass den Ausdeeler. Hie stéckt (mëscht) d\'Kaarten.', dealt: 0, active: 'bottom', labels: { bottom: 'Ausdeeler' }, phase: 'shuffle' },
  { caption: 'De Jupp (riets vum Ausdeeler) hiewt of: hien deelt de Koup an zwee a leet den ënneschten Deel uewen drop.', dealt: 0, active: 'right', labels: { bottom: 'Ausdeeler', right: 'Ofhiewer' }, phase: 'cut' },
  { caption: 'De Luca deelt der Jeanny (lénks vun him) 3 Kaarten.', dealt: 3, active: 'left', labels: { bottom: 'Ausdeeler' } },
  { caption: 'Dann der Mariette 3 Kaarten…', dealt: 6, active: 'top', labels: { bottom: 'Ausdeeler' } },
  { caption: '…dem Jupp 3 Kaarten…', dealt: 9, active: 'right', labels: { bottom: 'Ausdeeler' } },
  { caption: '…a sech selwer 3 Kaarten.', dealt: 12, active: 'bottom', labels: { bottom: 'Ausdeeler' } },
  { caption: '', dealt: 12, active: 'left', labels: { bottom: 'Ausdeeler', left: 'mécht Tromp' }, phase: 'trump' },
  { caption: 'Elo gëtt nach eng Kéier ausgedeelt: der Jeanny 3 Kaarten…', dealt: 15, active: 'left', labels: { bottom: 'Ausdeeler' } },
  { caption: '…der Mariette 3…', dealt: 18, active: 'top', labels: { bottom: 'Ausdeeler' } },
  { caption: '…dem Jupp 3…', dealt: 21, active: 'right', labels: { bottom: 'Ausdeeler' } },
  { caption: '…an dem Luca selwer 3. Elo huet all Spiller 6 Kaarten.', dealt: 24, active: 'bottom', labels: { bottom: 'Ausdeeler' } },
  { caption: 'D\'Jeanny (lénks vum Ausdeeler) spillt déi éischt Kaart. Dono geet et der Auer no.', dealt: 24, active: 'left', labels: { bottom: 'Ausdeeler', left: '1. Spiller' }, phase: 'first' },
  { caption: 'No 6 Streech réckelen d\'Rollen eng Plaz no lénks: elo deelt d\'Jeanny aus, de Luca hiewt of an d\'Mariette mécht Tromp.', dealt: 0, labels: { left: 'Ausdeeler', bottom: 'Ofhiewer', top: 'mécht Tromp' }, phase: 'rotate' },
];

export const DealingAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0); // drives the shuffle / cut sub-animations

  // deterministic deck, deck[23] is the top card
  const deck = useMemo(() => shuffle(fullDeck(), mulberry32(11)), []);

  // Who gets which card: card k (k = 0 is dealt first, taken from the top)
  const owner = (k: number): { seat: Seat; i: number } => {
    const round = k < 12 ? 0 : 1;
    const kk = k % 12;
    return { seat: DEAL_ORDER[Math.floor(kk / 3)], i: round * 3 + (kk % 3) };
  };

  // Jeanny's first 3 cards decide the trump: the suit she has most of
  const jeannyFirst = [0, 1, 2].map((k) => deck[23 - k]);
  const trump: Suit = useMemo(() => {
    const count = (s: Suit) => jeannyFirst.filter((c) => parseCard(c).suit === s && !['♠Q', '♥Q', '♦Q'].includes(c)).length;
    return [...SUITS].sort((a, b) => count(b) - count(a))[0];
  }, [deck]); // eslint-disable-line react-hooks/exhaustive-deps

  const jeannyAll = [0, 1, 2, 12, 13, 14].map((k) => deck[23 - k]);
  const firstCard = jeannyAll.find((c) => isTrump(c, trump)) ?? jeannyAll[0];

  const cur = STEPS[step];

  // autoplay
  useEffect(() => {
    if (!playing) return;
    if (step >= STEPS.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), cur.phase ? 2600 : 1700);
    return () => clearTimeout(t);
  }, [playing, step, cur.phase]);

  // sub-animation ticks for shuffle (riffle twice) and cut
  useEffect(() => {
    setTick(0);
    if (cur.phase !== 'shuffle' && cur.phase !== 'cut') return;
    const ids = [1, 2, 3, 4, 5].map((n) => setTimeout(() => setTick(n), n * 380));
    return () => ids.forEach(clearTimeout);
  }, [step, cur.phase]);

  const cards: StageCard[] = deck.map((card, idx) => {
    // idx 23 = top of deck → dealt first (k = 0)
    const k = 23 - idx;
    const base: StageCard = { id: card, card, loc: { kind: 'deck', i: idx } };

    if (cur.phase === 'shuffle') {
      const half = idx % 2 === 0 ? -1 : 1;
      const split = tick === 1 || tick === 3;
      return { ...base, offset: split ? { x: half * 34, y: 0 } : { x: 0, y: 0 } };
    }
    if (cur.phase === 'cut') {
      // tick 1-2: upper half lifted off to the right; tick 3+: put under
      const upper = idx >= 12;
      if (tick >= 1 && tick < 3 && upper) return { ...base, offset: { x: 56, y: -10 } };
      if (tick >= 3) return { ...base, loc: { kind: 'deck', i: upper ? idx - 12 : idx + 12 } };
      return base;
    }
    if (cur.phase === 'rotate' || k >= cur.dealt) return base;

    const { seat, i } = owner(k);
    const n = cur.dealt >= 12 + DEAL_ORDER.indexOf(seat) * 3 + 3 ? 6 : 3;
    const justDealt = k >= (STEPS[step - 1]?.dealt ?? 0);
    const delay = justDealt ? (k % 3) * 0.14 : 0;

    if (cur.phase === 'first' && card === firstCard) {
      return { ...base, loc: { kind: 'trick', seat: 'left' }, faceUp: true };
    }
    const faceUp = (cur.phase === 'trump' && seat === 'left') || seat === 'bottom';
    return {
      ...base,
      loc: cur.phase === 'first' && seat === 'left'
        ? { kind: 'hand', seat, i: jeannyAll.filter((c) => c !== firstCard).indexOf(card), n: 5 }
        : { kind: 'hand', seat, i, n },
      faceUp,
      lifted: cur.phase === 'trump' && seat === 'left',
      highlighted: (cur.phase === 'trump' || step >= 6) && faceUp && isTrump(card, trump),
      delay,
    };
  });

  const seats = Object.fromEntries(
    (Object.keys(BASE_SEATS) as Seat[]).map((s) => [s, { ...BASE_SEATS[s], label: cur.labels[s], active: cur.active === s }]),
  ) as Record<Seat, SeatInfo>;

  const caption = cur.phase === 'trump'
    ? `D'Jeanny kuckt hir 3 Kaarten a seet: „${SUIT_NAME[trump]} ass Tromp!" Déi giel markéiert Kaarte sinn elo Trëmp.`
    : cur.caption;

  const showTrump = step >= 6 && cur.phase !== 'rotate';

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <TableStage
        cards={cards}
        seats={seats}
        bigBottomHand={false}
        cornerBadge={showTrump ? `Tromp: ${trump} ${SUIT_NAME[trump]}` : undefined}
        centerNote={cur.phase === 'cut' ? 'ofhiewen' : cur.phase === 'rotate' ? '↺ nächst Spill' : undefined}
      />

      {/* step dots */}
      <div className="flex gap-1">
        {STEPS.map((_, i) => (
          <button key={i} onClick={() => { setPlaying(false); setStep(i); }}
            aria-label={`Schrëtt ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === step ? 'w-5 bg-yellow-400' : i < step ? 'w-1.5 bg-white/60' : 'w-1.5 bg-white/20'}`} />
        ))}
      </div>

      <motion.p key={step} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        className="text-xs text-white/85 text-center px-2 leading-snug min-h-[40px] max-w-sm">
        {caption}
      </motion.p>

      <div className="flex items-center gap-2">
        <button onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0}
          className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-full disabled:opacity-30">← Zrëck</button>
        <button
          onClick={() => { if (step === STEPS.length - 1) { setStep(0); setPlaying(true); } else setPlaying((p) => !p); }}
          className="w-9 h-9 flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full shadow-lg"
          aria-label={playing ? 'Paus' : 'Ofspillen'}>
          {step === STEPS.length - 1 && !playing ? <RotateCcw className="w-4 h-4" /> : playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <button onClick={() => { setPlaying(false); setStep((s) => Math.min(STEPS.length - 1, s + 1)); }} disabled={step === STEPS.length - 1}
          className="px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 text-white rounded-full disabled:opacity-30">Weider →</button>
      </div>
    </div>
  );
};
