import React, { useState } from 'react';
import { CardRenderer } from './CardRenderer';

const TEAM_COLOR: Record<string, string> = { A: 'bg-red-500', B: 'bg-blue-500' };

export type GameTableMode = 'teams' | 'trick' | 'handCards' | 'static';

interface GameTableProps {
  mode: GameTableMode;
  tableCards?: Partial<Record<string, string>>;
  handCards?: string[];
  activePlayer?: string;
  caption?: string;
  trumpSuit?: string;
}

const Badge: React.FC<{
  name: string;
  team: string;
  active?: boolean;
  small?: boolean;
  extra?: string;
}> = ({ name, team, active, small, extra }) => (
  <div className="flex flex-col items-center gap-0.5">
    <div className={`
      ${small ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]'}
      rounded-full text-white font-bold whitespace-nowrap
      ${TEAM_COLOR[team]}
      ${active ? 'ring-2 ring-yellow-300 scale-110' : ''}
    `}>{name}</div>
    {extra && <div className="text-yellow-300 text-[9px] font-bold">{extra}</div>}
  </div>
);

// ── TeamsTable ────────────────────────────────────────────────────────────────
export const TeamsTable: React.FC = () => (
  <div className="flex flex-col items-center gap-3 w-full">
    <div className="felt-table rounded-2xl p-5 w-full max-w-xs shadow-xl border border-white/10">
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center gap-0.5">
          <Badge name="Mariette" team="A" />
          <div className="text-white/40 text-[10px]">Ekipp 1</div>
        </div>
      </div>
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col items-center gap-0.5">
          <Badge name="Jeanny" team="B" />
          <div className="text-white/40 text-[10px]">Ekipp 2</div>
        </div>
        <div className="w-20 h-20 rounded-xl border border-white/10 bg-transparent" />
        <div className="flex flex-col items-center gap-0.5">
          <Badge name="Jupp" team="B" />
          <div className="text-white/40 text-[10px]">Ekipp 2</div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center gap-0.5">
          <Badge name="Luca" team="A" />
          <div className="text-white/40 text-[10px]">Ekipp 1</div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-1 text-xs text-white/80 items-start">
      <span><span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mr-2 align-middle" />Ekipp 1: Luca + Mariette</span>
      <span><span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 align-middle" />Ekipp 2: Jeanny + Jupp</span>
    </div>
  </div>
);

// ── TrickDemo ─────────────────────────────────────────────────────────────────
// Centre area is taller (150px) so top and bottom cards have more distance
export const TrickDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const PLAY_SEQ = [
    { pos: 'bottom', card: '♠R' },
    { pos: 'left',   card: '♠9' },
    { pos: 'top',    card: '♠A' },
    { pos: 'right',  card: '♠V' },
  ];

  const played = step >= 5 ? PLAY_SEQ : PLAY_SEQ.slice(0, step);
  const hasPlayed = (pos: string) => played.some(p => p.pos === pos);
  const cardOf    = (pos: string) => played.find(p => p.pos === pos)?.card ?? '';

  const handCount = (pos: string, threshold: number) =>
    step >= 5 ? 6 : Math.max(0, 6 - (step >= threshold ? 1 : 0));

  const captions = [
    'Klick op den Dësch fir de Streech ze spillen…',
    'De Luca spillt ♠R aus…',
    'Déi Jeanny spillt ♠9…',
    'D\'Mariette spillt ♠1 (Ass)…',
    '♠V vum Jupp — ♠1 gewënnt de Streech!',
    'd\'Mariette gewënnt de Streech a leet déi 4 Kaarten verdeckt bei sech op e Koup. D\'Punkte vun deem Streech ginn un d\'Ekipp 1. D\'Mariette duerf elo déi éischt Kaart vum nächste Streech spillen.',
  ];

  const handleClick = () => setStep(s => (s < 5 ? s + 1 : 0));
  const showPile = step === 5;

  const HorizHand: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown className="w-[22px] h-[32px]" />
      ))}
    </div>
  );

  const VertHand: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex flex-col gap-0.5 items-center">
      {Array.from({ length: count }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown rotated className="w-[22px] h-[32px]" />
      ))}
    </div>
  );

  // Centre area height — taller for more spacing between top/bottom cards
  const CENTRE_H = 150;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        className="felt-table rounded-2xl p-3 w-full max-w-xs shadow-xl border border-white/10 cursor-pointer select-none"
        onClick={handleClick}
      >
        {/* Top — Mariette: fixed height so board stays stable */}
        <div className="flex flex-col items-center gap-0.5 mb-1" style={{ minHeight: 52 }}>
          {showPile ? (
            <div className="flex items-center gap-1.5 justify-center">
              <HorizHand count={6} />
              {/* Winning pile with red border highlight */}
              <div className="relative flex-shrink-0 rounded-md border-2 border-red-400 ring-2 ring-red-300 ring-offset-1" style={{ width: 32, height: 36 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} className="absolute" style={{ top: i * 1.5, left: i * 1.5 }}>
                    <CardRenderer cardString="" faceDown className="w-[22px] h-[32px]" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <HorizHand count={handCount('top', 3)} />
          )}
          <Badge name="Mariette" team="A" small extra={showPile ? '✓ gewënnt' : undefined} />
        </div>

        {/* Middle row */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex flex-col items-center gap-1 w-10 flex-shrink-0">
            <Badge name="Jeanny" team="B" small />
            <VertHand count={handCount('left', 2)} />
          </div>

          {/* Centre trick area — taller to separate top/bottom cards */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative" style={{ width: 120, height: CENTRE_H }}>
              {showPile ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-xs text-center">Kaarten{'\n'}bäi Mariette</span>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-xs">↑ Klick</span>
                    </div>
                  )}
                  {/* Bottom card — near the bottom edge */}
                  {hasPlayed('bottom') && (
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 6 }}>
                      <CardRenderer cardString={cardOf('bottom')} className="w-9 h-[50px]" />
                    </div>
                  )}
                  {/* Left card — horizontally centred, rotated */}
                  {hasPlayed('left') && (
                    <div className="absolute top-1/2 -translate-y-1/2" style={{ left: 4 }}>
                      <CardRenderer cardString={cardOf('left')} rotated className="w-9 h-[50px]" />
                    </div>
                  )}
                  {/* Top card — near the top edge */}
                  {hasPlayed('top') && (
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 6 }}>
                      <CardRenderer cardString={cardOf('top')} highlighted className="w-9 h-[50px]" />
                    </div>
                  )}
                  {/* Right card — horizontally centred, rotated */}
                  {hasPlayed('right') && (
                    <div className="absolute top-1/2 -translate-y-1/2" style={{ right: 4 }}>
                      <CardRenderer cardString={cardOf('right')} rotated className="w-9 h-[50px]" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 w-10 flex-shrink-0">
            <VertHand count={handCount('right', 4)} />
            <Badge name="Jupp" team="B" small />
          </div>
        </div>

        {/* Bottom — Luca: fixed height */}
        <div className="flex flex-col items-center gap-1 mt-1" style={{ minHeight: 52 }}>
          <Badge name="Luca" team="A" small />
          <HorizHand count={handCount('bottom', 1)} />
        </div>
      </div>

      <p className="text-xs text-white/70 text-center italic px-2 leading-snug min-h-[32px]">{captions[step]}</p>
    </div>
  );
};

// ── DealingDemo ───────────────────────────────────────────────────────────────
const DEALING_STEPS: Array<{
  caption: string;
  hands: Record<string, number>;
  highlight?: string;
  dealer?: string;
  cutter?: string;
  trump?: string;
  first?: string;
  newDealer?: string;
  newCutter?: string;
  newFirst?: string;
  centreIcon?: string;
}> = [
  {
    caption: 'Den Luca ass den Ausdeeler. Hie stéckt d\'Kaarten.',
    hands: { bottom: 0, left: 0, top: 0, right: 0 },
    highlight: 'bottom', dealer: 'bottom',
  },
  {
    caption: 'De Jupp (riets vum Ausdeeler) hiewt of.',
    hands: { bottom: 0, left: 0, top: 0, right: 0 },
    highlight: 'right', dealer: 'bottom', cutter: 'right', centreIcon: 'cut',
  },
  {
    caption: 'Den Luca deelt der Jeanny 3 Kaarten.',
    hands: { bottom: 0, left: 3, top: 0, right: 0 },
    highlight: 'left', dealer: 'bottom',
  },
  {
    caption: 'Den Luca deelt der Mariette 3 Kaarten.',
    hands: { bottom: 0, left: 3, top: 3, right: 0 },
    highlight: 'top', dealer: 'bottom',
  },
  {
    caption: 'Den Luca deelt dem Jupp 3 Kaarten.',
    hands: { bottom: 0, left: 3, top: 3, right: 3 },
    highlight: 'right', dealer: 'bottom',
  },
  {
    caption: 'Den Luca deelt sech selwer 3 Kaarten.',
    hands: { bottom: 3, left: 3, top: 3, right: 3 },
    highlight: 'bottom', dealer: 'bottom',
  },
  {
    caption: 'Déi Jeanny kuckt hir 3 Kaarten a seet d\'Trompfaarf.',
    hands: { bottom: 3, left: 3, top: 3, right: 3 },
    highlight: 'left', dealer: 'bottom', trump: '♥ Häerzer',
  },
  {
    caption: 'Den Luca deelt der Jeanny nach emol 3 Kaarten.',
    hands: { bottom: 3, left: 6, top: 3, right: 3 },
    highlight: 'left', dealer: 'bottom', trump: '♥ Häerzer',
  },
  {
    caption: 'Den Luca deelt der Mariette nach emol 3 Kaarten.',
    hands: { bottom: 3, left: 6, top: 6, right: 3 },
    highlight: 'top', dealer: 'bottom', trump: '♥ Häerzer',
  },
  {
    caption: 'Den Luca deelt dem Jupp nach emol 3 Kaarten.',
    hands: { bottom: 3, left: 6, top: 6, right: 6 },
    highlight: 'right', dealer: 'bottom', trump: '♥ Häerzer',
  },
  {
    caption: 'Den Luca deelt sech selwer nach emol 3 Kaarten. Elo huet all Spiller 6 Kaarten an der Hand.',
    hands: { bottom: 6, left: 6, top: 6, right: 6 },
    highlight: 'bottom', dealer: 'bottom', trump: '♥ Häerzer',
  },
  {
    caption: 'Déi Jeanny (lénks vum Ausdeeler) spillt déi éischt Kaart vum Spill. Dono spillt der Rei no all Spiller eng Kaart.',
    hands: { bottom: 6, left: 6, top: 6, right: 6 },
    highlight: 'left', dealer: 'bottom', trump: '♥ Häerzer', first: 'left',
  },
  {
    caption: 'No 6 Streech wiesselen d\'Positioune vum Ausdeeler, Ofhiewer, an éischte Spiller ëm eng Positioun no lénks.',
    hands: { bottom: 0, left: 0, top: 0, right: 0 },
    newDealer: 'left', newCutter: 'bottom', newFirst: 'top', centreIcon: 'rotate',
  },
];

export const DealingDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = DEALING_STEPS[step];

  type Pos = 'bottom' | 'left' | 'top' | 'right';

  const getExtra = (pos: Pos): string | undefined => {
    if (cur.newDealer === pos) return 'Ausdeeler';
    if (cur.newCutter === pos) return 'Ofhiewer';
    if (cur.newFirst  === pos) return '1. Spiller';
    if (cur.dealer === pos)    return 'Ausdeeler';
    if (cur.cutter === pos)    return 'Ofhiewer';
    if (cur.first  === pos)    return '1. Spiller';
    return undefined;
  };

  const HorizCards: React.FC<{ n: number }> = ({ n }) => (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: n }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown className="w-[18px] h-[26px]" />
      ))}
    </div>
  );
  const VertCards: React.FC<{ n: number }> = ({ n }) => (
    <div className="flex flex-col" style={{ gap: 1 }}>
      {Array.from({ length: n }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown rotated className="w-[16px] h-[22px]" />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="text-xs text-white/50">{step + 1} / {DEALING_STEPS.length}</div>

      {/* Fixed-size table so layout never jumps between steps */}
      <div className="felt-table rounded-2xl p-3 w-full max-w-xs shadow-xl border border-white/10" style={{ minHeight: 220 }}>
        {/* Trump badge in top-right corner of the table */}
        <div className="relative">
          {cur.trump ? (
            <div className="absolute top-0 right-0 z-10">
              <span className="text-[9px] font-bold text-yellow-300 bg-black/50 px-1.5 py-0.5 rounded-bl-lg border-l border-b border-yellow-400/30">
                Tromp: {cur.trump}
              </span>
            </div>
          ) : (
            // Invisible placeholder to keep layout stable
            <div className="absolute top-0 right-0 z-10">
              <span className="text-[9px] font-bold text-transparent px-1.5 py-0.5">Tromp: placeholder</span>
            </div>
          )}
        </div>

        {/* Top: fixed-height row so board doesn't shift when cards appear/disappear */}
        <div className="flex flex-col items-center gap-1 mb-1" style={{ minHeight: 44 }}>
          <HorizCards n={cur.hands.top} />
          <Badge name="Mariette" team="A" small
            active={cur.highlight === 'top'}
            extra={getExtra('top')} />
        </div>

        <div className="flex items-center justify-between gap-1">
          <div className="flex flex-col items-center gap-1 w-12 flex-shrink-0" style={{ minHeight: 80 }}>
            <Badge name="Jeanny" team="B" small
              active={cur.highlight === 'left'}
              extra={getExtra('left')} />
            <VertCards n={cur.hands.left} />
          </div>

          <div className="flex-1 flex items-center justify-center" style={{ height: 80 }}>
            {cur.centreIcon === 'cut' && (
              <span className="text-white/40 text-xs italic">ofhiewen</span>
            )}
            {cur.centreIcon === 'rotate' && (
              <span className="text-2xl text-white/50">↺</span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 w-12 flex-shrink-0" style={{ minHeight: 80 }}>
            <VertCards n={cur.hands.right} />
            <Badge name="Jupp" team="B" small
              active={cur.highlight === 'right'}
              extra={getExtra('right')} />
          </div>
        </div>

        {/* Bottom: fixed-height row */}
        <div className="flex flex-col items-center gap-1 mt-1" style={{ minHeight: 44 }}>
          <Badge name="Luca" team="A" small
            active={cur.highlight === 'bottom'}
            extra={getExtra('bottom')} />
          <HorizCards n={cur.hands.bottom} />
        </div>
      </div>

      <p className="text-xs text-white/80 text-center italic px-2 leading-snug min-h-[40px]">{cur.caption}</p>

      <div className="flex items-center gap-3">
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-full disabled:opacity-30 transition-all">
          ← Zrëck
        </button>
        <button onClick={() => setStep(s => Math.min(DEALING_STEPS.length - 1, s + 1))} disabled={step === DEALING_STEPS.length - 1}
          className="px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 text-white rounded-full disabled:opacity-30 transition-all">
          Weider →
        </button>
      </div>
    </div>
  );
};

// ── Generic GameTable ─────────────────────────────────────────────────────────
export const GameTable: React.FC<GameTableProps> = ({
  mode, tableCards = {}, handCards = [],
  activePlayer, caption, trumpSuit,
}) => {
  if (mode === 'teams') return <TeamsTable />;

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {trumpSuit && (
        <div className="text-xs font-bold text-yellow-200 bg-black/20 px-2 py-0.5 rounded-full">
          Tromp: {trumpSuit}
        </div>
      )}
      <div className="felt-table rounded-2xl p-4 w-full max-w-xs shadow-xl border border-white/10">
        <div className="flex justify-center mb-2">
          <Badge name="Mariette" team="A" active={activePlayer === 'top'} />
        </div>
        <div className="flex items-center justify-between">
          <Badge name="Jeanny" team="B" active={activePlayer === 'left'} />
          <div className="relative w-28 h-28 flex-shrink-0">
            {tableCards['bottom'] && <div className="absolute bottom-1 left-1/2 -translate-x-1/2"><CardRenderer cardString={tableCards['bottom']!} className="w-9 h-[50px]" /></div>}
            {tableCards['left']   && <div className="absolute left-1 top-1/2 -translate-y-1/2"><CardRenderer cardString={tableCards['left']!} rotated className="w-9 h-[50px]" /></div>}
            {tableCards['top']    && <div className="absolute top-1 left-1/2 -translate-x-1/2"><CardRenderer cardString={tableCards['top']!} className="w-9 h-[50px]" /></div>}
            {tableCards['right']  && <div className="absolute right-1 top-1/2 -translate-y-1/2"><CardRenderer cardString={tableCards['right']!} rotated className="w-9 h-[50px]" /></div>}
          </div>
          <Badge name="Jupp" team="B" active={activePlayer === 'right'} />
        </div>
        <div className="flex flex-col items-center mt-2 gap-1">
          <Badge name="Luca" team="A" active={activePlayer === 'bottom'} />
          {(mode === 'handCards' || mode === 'static') && handCards.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-center mt-1">
              {handCards.map((card, i) => <CardRenderer key={i} cardString={card} className="w-9 h-[50px]" />)}
            </div>
          )}
        </div>
      </div>
      {caption && <p className="text-xs text-white/70 text-center italic mt-1">{caption}</p>}
    </div>
  );
};
