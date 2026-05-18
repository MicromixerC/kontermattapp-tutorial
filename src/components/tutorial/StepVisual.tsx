import React, { useState } from 'react';
import { TeamsTable, TrickDemo, GameTable, DealingDemo } from './GameTable';
import { CardRenderer } from './CardRenderer';
import { TutorialStep } from '@/types/tutorial';

interface StepVisualProps {
  chapterId: string;
  stepIndex: number;
  step: TutorialStep;
}

const SUITS = [
  { sym: '♠', name: 'Schëppen',  id: 'spades',   red: false },
  { sym: '♥', name: 'Häerzer',   id: 'hearts',   red: true  },
  { sym: '♦', name: 'Rauten',    id: 'diamonds', red: true  },
  { sym: '♣', name: 'Kräizer',   id: 'clubs',    red: false },
];
const CARD_RANKS_ENG = ['A','K','Q','J','10','9'];
const ALWAYS_QUEEN_CARDS = new Set(['♠Q', '♥Q', '♦Q']);
const CLUB_QUEEN = '♣Q';

// ── Shared nav buttons ────────────────────────────────────────────────────────
const NavButtons: React.FC<{
  step: number; total: number;
  onPrev: () => void; onNext: () => void;
}> = ({ step, total, onPrev, onNext }) => (
  <div className="flex items-center gap-3 justify-center">
    <button onClick={onPrev} disabled={step === 0}
      className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-full disabled:opacity-30 transition-all">
      ← Zrëck
    </button>
    <span className="text-xs text-white/40">{step + 1} / {total}</span>
    <button onClick={onNext} disabled={step === total - 1}
      className="px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 text-white rounded-full disabled:opacity-30 transition-all">
      Weider →
    </button>
  </div>
);

// ── Shared tally row ──────────────────────────────────────────────────────────
const TallyRow: React.FC<{ total?: number; crossed: number; crossColor: string }> = ({
  total = 9, crossed, crossColor,
}) => (
  <div className="flex items-center justify-center" style={{ gap: 3 }}>
    {Array.from({ length: total }).map((_, i) => {
      const isStruck = i < crossed;
      const needsGap = i > 0 && i % 3 === 0;
      return (
        <React.Fragment key={i}>
          {needsGap && <div style={{ width: 6 }} />}
          <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 8, height: 20 }}>
            <div className={`absolute rounded-full ${isStruck ? 'bg-white/25' : 'bg-white'}`} style={{ width: 2, height: '100%' }} />
            {isStruck && <div className={`absolute rounded-full ${crossColor}`} style={{ height: 2, width: '100%' }} />}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

// Two-team Lee board
const LeeBoardStatic: React.FC<{
  aRemaining: number; bRemaining: number;
  aExtra?: number; bExtra?: number;
  aLabel?: string; bLabel?: string;
}> = ({ aRemaining, bRemaining, aExtra = 0, bExtra = 0, aLabel = 'Ekipp 1', bLabel = 'Ekipp 2' }) => {
  const aCrossed = Math.max(0, 9 - aRemaining);
  const bCrossed = Math.max(0, 9 - bRemaining);
  const aTotal = 9 + aExtra;
  const bTotal = 9 + bExtra;
  return (
    <div className="flex justify-around items-start gap-3 w-full">
      <div className="text-center flex-1 min-w-0">
        <p className="text-xs font-bold text-red-300 mb-1">{aLabel}</p>
        <TallyRow total={aTotal} crossed={aCrossed} crossColor="bg-white/30" />
        {aExtra > 0 && <p className="text-[10px] text-red-300 mt-0.5">+{aExtra} bäi</p>}
        {aRemaining === 0 ? <p className="text-xs text-green-300 mt-1 font-bold">Gewonnen! 🏆</p>
          : <p className="text-xs text-white/60 mt-1">{aRemaining + aExtra} iwwer</p>}
      </div>
      <div className="w-px bg-white/20 self-stretch flex-shrink-0" />
      <div className="text-center flex-1 min-w-0">
        <p className="text-xs font-bold text-blue-300 mb-1">{bLabel}</p>
        <TallyRow total={bTotal} crossed={bCrossed} crossColor="bg-white/30" />
        {bExtra > 0 && <p className="text-[10px] text-red-300 mt-0.5">+{bExtra} bäi</p>}
        {bRemaining === 0 ? <p className="text-xs text-green-300 mt-1 font-bold">Gewonnen! 🏆</p>
          : <p className="text-xs text-white/60 mt-1">{bRemaining + bExtra} Linnen</p>}
      </div>
    </div>
  );
};

// ── BASICS slides ─────────────────────────────────────────────────────────────

// basics-2: AllCards — 1px border (thin) so each card in the grid is individually recognizable
const AllCards: React.FC = () => (
  <div className="w-full space-y-1.5">
    <div className="flex gap-0.5 items-center justify-center">
      <div className="flex-shrink-0 w-14 text-[10px] text-white/50 font-bold text-center">Faarf</div>
      {CARD_RANKS_ENG.map(rank => (
        <div key={rank} className="w-9 text-center text-[10px] text-white/40">{rank}</div>
      ))}
      <div className="flex-shrink-0 w-14" />
    </div>
    {SUITS.map((suit, si) => (
      <div key={suit.id} className="flex gap-0.5 items-center justify-center">
        <div className="flex-shrink-0 w-14 flex flex-col items-center justify-center">
          <span className={`text-base font-bold leading-none ${suit.red ? 'text-red-500' : 'text-white'}`}>{suit.sym}</span>
          <span className="text-[9px] text-white/60 leading-tight text-center">{suit.name}</span>
        </div>
        {CARD_RANKS_ENG.map(rank => (
          <div key={rank} className="flex-shrink-0">
            <CardRenderer cardString={`${suit.sym}${rank}`} className="w-9 h-[50px]" style={{ border: '1px solid #d1d5db' }} />
          </div>
        ))}
        <div className="flex-shrink-0 w-14 flex items-center justify-center h-[50px]">
          {si === 1 && (
            <span className="text-[10px] font-bold text-white/55 text-center leading-tight">24 Kaarten</span>
          )}
        </div>
      </div>
    ))}
  </div>
);

const SuitPicker: React.FC<{ selected: string | null; onSelect: (id: string) => void }> = ({ selected, onSelect }) => (
  <div className="flex gap-2 justify-center">
    {SUITS.map(s => {
      const isSel = selected === s.id;
      return (
        <button key={s.id} onClick={() => onSelect(s.id)}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all duration-200
            ${isSel ? 'bg-yellow-400/30 border-yellow-400 -translate-y-2 shadow-lg' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
          <span className={`text-2xl font-bold leading-none ${s.red ? 'text-red-500' : 'text-white'}`}>{s.sym}</span>
          <span className="text-white/70 text-xs leading-none">{s.name}</span>
          {isSel && <span className="text-yellow-300 text-xs font-bold leading-none">Tromp!</span>}
        </button>
      );
    })}
  </div>
);

// basics-3: TrumpHighlightAllCards — centered with thin card borders
const TrumpHighlightAllCards: React.FC = () => {
  const [trump, setTrump] = useState<string | null>(null);
  const getTrumpSet = (suitId: string): Set<string> => {
    const suit = SUITS.find(s => s.id === suitId);
    if (!suit) return new Set();
    const s = new Set<string>();
    ALWAYS_QUEEN_CARDS.forEach(q => s.add(q));
    if (suitId === 'clubs') s.add(CLUB_QUEEN);
    CARD_RANKS_ENG.forEach(r => s.add(`${suit.sym}${r}`));
    return s;
  };
  const trumpSet = trump ? getTrumpSet(trump) : new Set<string>();
  const isCard = (sym: string, rank: string) => {
    if (!trump) return { highlighted: false, highlightedGreen: false };
    const card = `${sym}${rank}`;
    if (ALWAYS_QUEEN_CARDS.has(card)) return { highlighted: true, highlightedGreen: false };
    if (card === CLUB_QUEEN && trump === 'clubs') return { highlighted: false, highlightedGreen: true };
    return { highlighted: trumpSet.has(card), highlightedGreen: false };
  };
  const totalTrumps = trump ? (trump === 'clubs' ? 9 : 8) : 0;
  return (
    <div className="w-full space-y-3 flex flex-col items-center">
      <p className="text-white/70 text-xs text-center">Wiel eng Faarf als Trompfaarf fir ze gesinn, wéi eng Kaarten doduerch zur Tromp ginn:</p>
      <SuitPicker selected={trump} onSelect={setTrump} />
      <div className="space-y-1 w-full flex flex-col items-center">
        {SUITS.map(suit => (
          <div key={suit.id} className="flex gap-1 justify-center">
            {CARD_RANKS_ENG.map(rank => {
              const { highlighted, highlightedGreen } = isCard(suit.sym, rank);
              return <CardRenderer key={rank} cardString={`${suit.sym}${rank}`} className="w-10 h-[56px]" highlighted={highlighted} highlightedGreen={highlightedGreen} />;
            })}
          </div>
        ))}
      </div>
      {trump && (
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-yellow-200">{SUITS.find(s => s.id === trump)?.name} Tromp → {totalTrumps} Trëmp am Ganzen</p>
          <div className="flex gap-3 justify-center text-[10px]">
            <span><span className="inline-block w-3 h-3 rounded border-2 border-yellow-400 bg-yellow-400/20 mr-1 align-middle"/>Tromp</span>
            <span><span className="inline-block w-3 h-3 rounded border-2 border-green-400 bg-green-400/20 mr-1 align-middle"/>♣D (nëmme bei ♣ Tromp)</span>
          </div>
        </div>
      )}
    </div>
  );
};

const TRUMP_ORDER: Record<string, string[]> = {
  spades:   ['♠A','|','♠Q','♥Q','♦Q','|','♠K','♠J','♠10','♠9'],
  hearts:   ['♥A','|','♠Q','♥Q','♦Q','|','♥K','♥J','♥10','♥9'],
  diamonds: ['♦A','|','♠Q','♥Q','♦Q','|','♦K','♦J','♦10','♦9'],
  clubs:    ['♣A','|','♠Q','♥Q','♦Q','♣Q','|','♣K','♣J','♣10','♣9'],
};

const TrumpRankChart: React.FC = () => {
  const [trump, setTrump] = useState<string | null>(null);
  const [trickMode, setTrickMode] = useState<'trump' | 'noTrump' | null>(null);
  const [selectedSuit, setSelectedSuit] = useState<string | null>(null);
  
  const rawCards = trump ? TRUMP_ORDER[trump] : null;
  const count = rawCards ? rawCards.filter(c => c !== '|').length : 0;
  const suitName = SUITS.find(s => s.id === trump)?.name ?? '';
  
  // Define non-trump card orders (A>K>Q>J>10>9, but Q only for clubs)
  const getNonTrumpCards = (suitId: string): string[] => {
    const suit = SUITS.find(s => s.id === suitId);
    if (!suit) return [];
    
    if (suitId === 'clubs') {
      return [`${suit.sym}A`, `${suit.sym}K`, `${suit.sym}Q`, `${suit.sym}J`, `${suit.sym}10`, `${suit.sym}9`];
    } else {
      return [`${suit.sym}A`, `${suit.sym}K`, `${suit.sym}J`, `${suit.sym}10`, `${suit.sym}9`];
    }
  };
  
  return (
    <div className="w-full space-y-3">
      <p className="text-white/60 text-xs text-center">Déi stäerkste Kaarten am Spill sinn d'Trëmp. Wielt d'Trompfaarf fir d'Rangfolleg ze gesinn:</p>
      <SuitPicker selected={trump} onSelect={setTrump} />
      {rawCards && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-yellow-300 text-center">{suitName} Tromp — {count} Trëmp</p>
          <div className="flex flex-wrap justify-center items-end gap-0.5">
            {(() => {
              let n = 0;
              return rawCards.map((c, i) => {
                if (c === '|') return <div key={`sep-${i}`} className="w-3" />;
                const isClubQ = c === '♣Q';
                const isAlwaysQ = ALWAYS_QUEEN_CARDS.has(c);
                return (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[10px] text-white/40 mb-0.5 leading-none">{++n}</span>
                    <CardRenderer cardString={c} className="w-9 h-[50px]" highlighted={isAlwaysQ} highlightedGreen={isClubQ} />
                  </div>
                );
              });
            })()}
          </div>
          <div className="flex gap-3 justify-center text-[10px] text-white/50 mt-1">
            <span><span className="inline-block w-3 h-3 rounded border-2 border-yellow-400 mr-1 align-middle"/>♠D ♥D ♦D — ëmmer Tromp</span>
            {trump === 'clubs' && <span><span className="inline-block w-3 h-3 rounded border-2 border-green-400 mr-1 align-middle"/>♣D — och Tromp</span>}
          </div>
          
          <div className="pt-2 space-y-3">
            <p className="text-xs text-white/60 text-center">Mee wann am Streech keng Tromp läit, dann hänkt et vun der éischter Kaart vum Streech of, ween de Streech gewënnt.</p>
            
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => { setTrickMode('trump'); setSelectedSuit(null); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  trickMode === 'trump' 
                    ? 'bg-yellow-400/30 border-2 border-yellow-400 text-yellow-300' 
                    : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                }`}
              >
                Tromp am Streech
              </button>
              <button 
                onClick={() => { setTrickMode('noTrump'); setSelectedSuit(null); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  trickMode === 'noTrump' 
                    ? 'bg-yellow-400/30 border-2 border-yellow-400 text-yellow-300' 
                    : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                }`}
              >
                Keng Tromp am Streech
              </button>
            </div>
            
            {trickMode === 'trump' && (
              <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                <p className="text-xs text-white/80 text-center">
                  Nëmmen d'Trëmp si relevant, an déi héchsten Tromp gewënnt de Streech (kuck d'Rangfolleg uewen)
                </p>
              </div>
            )}
            
            {trickMode === 'noTrump' && (
              <div className="space-y-3">
                <p className="text-xs text-white/60 text-center">Klick d'Faarf vun der éischter Kaart vum Streech:</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {SUITS.map(s => (
                    <button key={s.id} onClick={() => setSelectedSuit(s.id)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all duration-200
                        ${selectedSuit === s.id 
                          ? 'bg-blue-400/30 border-blue-400 shadow-lg' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
                      <span className={`text-2xl font-bold leading-none ${s.red ? 'text-red-500' : 'text-white'}`}>{s.sym}</span>
                      <span className="text-white/70 text-xs leading-none">{s.name}</span>
                    </button>
                  ))}
                </div>
                
                {selectedSuit && (
                  <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                    <p className="text-xs text-white/60 text-center mb-2">Rangfolleg (vu lénks héich bis riets niddereg):</p>
                    <div className="flex gap-1 justify-center items-end flex-wrap">
                      {getNonTrumpCards(selectedSuit).map((card, idx) => (
                        <React.Fragment key={card}>
                          {idx > 0 && <span className="text-white/40 text-sm self-center pb-3">&gt;</span>}
                          <CardRenderer cardString={card} className="w-9 h-[50px]" />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// basics-5: MiniTrickTable
const TRICK_CARD = 'w-10 h-[56px]';
const MiniTrickTable: React.FC = () => (
  <div className="felt-table rounded-xl p-2 w-full max-w-[240px] mx-auto border border-white/10 shadow-md mb-2">
    <p className="text-[9px] text-white/50 text-center mb-1">1 Streech = 4 gespillt Kaarten</p>
    <div className="flex justify-center mb-1">
      <CardRenderer cardString="♥R" className={TRICK_CARD} highlighted />
    </div>
    <div className="flex items-center justify-center gap-8">
      <CardRenderer cardString="♥9" rotated className={TRICK_CARD} />
      <div className="w-2" />
      <CardRenderer cardString="♥V" rotated className={TRICK_CARD} />
    </div>
    <div className="flex justify-center mt-1">
      <CardRenderer cardString="♥10" className={TRICK_CARD} />
    </div>
  </div>
);

// basics-5: TrickPile — thin 1px border so stacked cards read as a deck
const TrickPile: React.FC<{ done: boolean; number: number }> = ({ done, number }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`relative flex-shrink-0 transition-all ${done ? 'opacity-100' : 'opacity-20'}`}
      style={{ width: 36, height: 50 }}>
      {[0,1,2,3].map(i => (
        <div key={i} className="absolute" style={{ top: i * 2, left: i * 2 }}>
          <div className="w-[28px] h-[38px] flex-shrink-0 card-back rounded shadow"
            style={{ border: '1px solid rgba(30,58,138,0.7)' }} />
        </div>
      ))}
      {done && (
        <div className="absolute inset-0 flex items-end justify-end pb-0.5 pr-0.5">
          <span className="text-green-300 font-bold text-[10px] z-10 bg-green-900/60 rounded-full w-4 h-4 flex items-center justify-center">✓</span>
        </div>
      )}
    </div>
    <span className={`text-[10px] font-bold ${done ? 'text-green-300' : 'text-white/25'}`}>{number}.</span>
  </div>
);

const TRICK_STEPS = [
  { tricks: 0, caption: 'Start vum Spill — nach kee Streech gespillt.' },
  { tricks: 1, caption: '1. Streech gespillt — 5 iwwreg.' },
  { tricks: 2, caption: '2. Streech gespillt — 4 iwwreg.' },
  { tricks: 3, caption: '3. Streech gespillt — 3 iwwreg.' },
  { tricks: 4, caption: '4. Streech gespillt — 2 iwwreg.' },
  { tricks: 5, caption: '5. Streech gespillt — nach 1 iwwreg.' },
  { tricks: 6, caption: '6 Streech gespillt — elo ginn d\'Punkten gezielt! 🎯' },
];

const ScoreChartWithTricks: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = TRICK_STEPS[step];
  const items = [{ display: '1', pts: 4 },{ display: 'R', pts: 3 },{ display: 'D', pts: 2 },{ display: 'V', pts: 1 },{ display: '10', pts: 0 },{ display: '9', pts: 0 }];
  return (
    <div className="w-full space-y-3">
      <MiniTrickTable />
      <div className="bg-white/10 rounded-xl p-3 w-full max-w-xs mx-auto">
        <p className="text-xs text-white/60 text-center mb-3">Streech gespillt:</p>
        <div className="flex gap-2 justify-center items-end mb-3">
          {Array.from({ length: 6 }).map((_, i) => <TrickPile key={i} done={i < cur.tricks} number={i + 1} />)}
        </div>
        <p className="text-xs text-white/70 text-center italic">{cur.caption}</p>
      </div>
      {cur.tricks === 6 && (
        <div className="space-y-2">
          <div className="bg-blue-500/20 border border-blue-400/40 rounded-xl p-3 w-full max-w-xs mx-auto">
            <p className="text-xs text-blue-100 text-center leading-snug">
              All Ekipp kuckt elo d'Streech, déi se gewonnen huet an zéielt d'Punkte vun den eenzelne Kaarten zesummen. D'Ekipp mat méi wéi 20 Punkten huet dës Ronn gewonnen.
            </p>
          </div>
          <p className="text-xs text-white/60 text-center">Punktwäert vun de Kaarten:</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {items.map(({ display, pts }) => (
              <div key={display} className="flex flex-col items-center gap-1">
                <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 flex items-center justify-center text-gray-900 font-extrabold flex-shrink-0"
                  style={{ width: '40px', aspectRatio: '2/3', fontSize: display.length > 1 ? '13px' : '18px' }}>{display}</div>
                <span className={`text-sm font-bold ${pts > 0 ? 'text-yellow-300' : 'text-white/40'}`}>{pts}P</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <NavButtons step={step} total={TRICK_STEPS.length} onPrev={() => setStep(s => Math.max(0, s-1))} onNext={() => setStep(s => Math.min(TRICK_STEPS.length-1, s+1))} />
    </div>
  );
};

// basics-6: Lee board progression — newly added marks shown in blue
const LEE_STEPS = [
  { a: 9, b: 9, bExtra: 0, bExtraNew: 0, label: 'Virun dem Spill: all Ekippen mat 9 Linnen' },
  { a: 7, b: 9, bExtra: 0, bExtraNew: 0, label: 'Ronn 1: Ekipp 1 gewënnt → -2 Linnen fir Ekipp 1' },
  { a: 7, b: 9, bExtra: 1, bExtraNew: 1, label: 'Ronn 2: Ekipp 2 mécht Tromp a verléiert → +1 Linn bäigesat' },
  { a: 5, b: 9, bExtra: 3, bExtraNew: 2, label: 'Ronn 3: Ekipp 1 gewënnt mat Matt → -2 ; Ekipp 2 (Tromp) kritt +2 bäi' },
  { a: 4, b: 7, bExtra: 3, bExtraNew: 0, label: 'Ronn 4: Ekipp 2 gewënnt! → -2 Linnen fir Ekipp 2 (déi extra Linne bleiwen!)' },
  { a: 2, b: 7, bExtra: 3, bExtraNew: 0, label: 'Ronn 5: Ekipp 1 gewënnt → -2 Linnen fir Ekipp 1' },
  { a: 0, b: 7, bExtra: 3, bExtraNew: 0, label: '🏆 Partie fäerdeg — Ekipp 1 gewënnt!' },
];

const TallyRowWithBlueExtra: React.FC<{
  total: number; crossed: number; crossColor: string; blueExtraStart: number; blueExtraCount: number;
}> = ({ total, crossed, crossColor, blueExtraStart, blueExtraCount }) => (
  <div className="flex items-center justify-center" style={{ gap: 3 }}>
    {Array.from({ length: total }).map((_, i) => {
      const isStruck = i < crossed;
      const needsGap = i > 0 && i % 3 === 0;
      const isBlueExtra = i >= blueExtraStart && i < blueExtraStart + blueExtraCount;
      return (
        <React.Fragment key={i}>
          {needsGap && <div style={{ width: 6 }} />}
          <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 8, height: 20 }}>
            <div className={`absolute rounded-full ${
              isStruck ? 'bg-white/25' : isBlueExtra ? 'bg-blue-400' : 'bg-white'
            }`} style={{ width: 2, height: '100%' }} />
            {isStruck && <div className={`absolute rounded-full ${crossColor}`} style={{ height: 2, width: '100%' }} />}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

const LeeBoardAndProgression: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = LEE_STEPS[step];
  const aCrossed = Math.max(0, 9 - cur.a);
  const bCrossed = Math.max(0, 9 - cur.b);
  const bTotal = 9 + cur.bExtra;
  const blueStart = 9 + (cur.bExtra - cur.bExtraNew);
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="bg-white/10 rounded-xl p-4 w-full max-w-xs">
        <div className="flex justify-around items-start gap-3 w-full">
          <div className="text-center flex-1 min-w-0">
            <p className="text-xs font-bold text-red-300 mb-1">Ekipp 1</p>
            <TallyRow crossed={aCrossed} crossColor="bg-white/30" />
            {cur.a === 0 ? <p className="text-xs text-green-300 mt-1 font-bold">Gewonnen! 🏆</p>
              : <p className="text-xs text-white/60 mt-1">{cur.a} iwwer</p>}
          </div>
          <div className="w-px bg-white/20 self-stretch flex-shrink-0" />
          <div className="text-center flex-1 min-w-0">
            <p className="text-xs font-bold text-blue-300 mb-1">Ekipp 2</p>
            <TallyRowWithBlueExtra
              total={bTotal} crossed={bCrossed} crossColor="bg-white/30"
              blueExtraStart={blueStart} blueExtraCount={cur.bExtraNew}
            />
            {cur.bExtra > 0 && <p className="text-[10px] text-blue-300 mt-0.5">+{cur.bExtra} bäigesat</p>}
            {cur.b === 0 ? <p className="text-xs text-green-300 mt-1 font-bold">Gewonnen! 🏆</p>
              : <p className="text-xs text-white/60 mt-1">{cur.b + cur.bExtra} Linnen</p>}
          </div>
        </div>
      </div>
      <p className="text-xs text-white/80 text-center italic px-2 min-h-[36px] leading-snug">{cur.label}</p>
      <NavButtons step={step} total={LEE_STEPS.length} onPrev={() => setStep(s => Math.max(0, s-1))} onNext={() => setStep(s => Math.min(LEE_STEPS.length-1, s+1))} />
    </div>
  );
};

// ── BIDDING slides ────────────────────────────────────────────────────────────

type BiddingSubStep = {
  caption: string;
  lucaHighlight?: string[];
  lucaSpeaks?: string;
  jeanySpeaks?: string;
  marietteSpeaks?: string;
  juppSpeaks?: string;
  activePlayer?: 'luca' | 'jeanny' | 'mariette' | 'jupp';
  played?: string[];
  centreCards?: Partial<Record<string, string>>;
  announcements?: Array<{ player: string; text: string; color: string }>;
};

const LUCA_HAND   = ['♠Q','♥9','♦10','♣R','♣V','♠10'];
const JEANNY_HAND = ['♥Q','♦Q','♠9','♣9','♥10','♦9'];

const BIDDING_STEPS: BiddingSubStep[] = [
  { caption: 'All 4 Spiller kréien 6 Kaarten. Déi Jeanny ass lénks vum Ausdeeler an dierf als éischt schwätzen.' },
  { caption: 'De Luca kuckt seng Kaarten. Hien huet d\'♠D (Matt)! Ier hien seng éischt Kaart spillt, kann e "Matt" soen.', activePlayer: 'luca', lucaHighlight: ['♠Q'] },
  { caption: 'De Luca seet: "Matt!" — hien huet d\'♠D an der Hand.', activePlayer: 'luca', lucaHighlight: ['♠Q'], lucaSpeaks: '♠D — Matt!', announcements: [{ player: 'Luca', text: 'Matt', color: 'bg-purple-500' }] },
  { caption: 'De Luca spillt seng éischt Kaart op den Dësch.', activePlayer: 'luca', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }], played: ['luca'], centreCards: { bottom: '♠10' } },
  { caption: 'Déi Jeanny ass un der Reih. Si huet ♥D + ♦D → si ka "Konter" soen!', activePlayer: 'jeanny', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }], played: ['luca'], centreCards: { bottom: '♠10' } },
  { caption: 'Déi Jeanny seet: "Konter!" — si huet ♥D an ♦D.', activePlayer: 'jeanny', jeanySpeaks: '♥D+♦D — Konter!', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }, { player: 'Jeanny', text: 'Konter', color: 'bg-blue-500' }], played: ['luca'], centreCards: { bottom: '♠10' } },
  { caption: 'Déi Jeanny spillt hir éischt Kaart op den Dësch.', activePlayer: 'jeanny', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }, { player: 'Jeanny', text: 'Konter ✓', color: 'bg-blue-500' }], played: ['luca', 'jeanny'], centreCards: { bottom: '♠10', left: '♠9' } },
  { caption: 'D\'Mariette ass un der Reih. Si huet keng speziell Damm → si passt.', activePlayer: 'mariette', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }, { player: 'Jeanny', text: 'Konter ✓', color: 'bg-blue-500' }], played: ['luca', 'jeanny'], centreCards: { bottom: '♠10', left: '♠9' }, marietteSpeaks: 'Näischt.' },
  { caption: 'D\'Mariette spillt hir éischt Kaart op den Dësch.', activePlayer: 'mariette', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }, { player: 'Jeanny', text: 'Konter ✓', color: 'bg-blue-500' }], played: ['luca', 'jeanny', 'mariette'], centreCards: { bottom: '♠10', left: '♠9', top: '♥9' } },
  { caption: 'De Jupp ass un der Reih. Hien huet och keng speziell Damm → hien passt.', activePlayer: 'jupp', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }, { player: 'Jeanny', text: 'Konter ✓', color: 'bg-blue-500' }], played: ['luca', 'jeanny', 'mariette'], centreCards: { bottom: '♠10', left: '♠9', top: '♥9' }, juppSpeaks: 'Näischt.' },
  { caption: 'Annoncen an dësem Spill: Matt + Konter → 1 + 1 + 1 = 3 Linnen stinn op dem Spill!', lucaHighlight: ['♠Q'], announcements: [{ player: 'Luca', text: 'Matt ✓', color: 'bg-purple-500' }, { player: 'Jeanny', text: 'Konter ✓', color: 'bg-blue-500' }], played: ['luca', 'jeanny', 'mariette', 'jupp'], centreCards: { bottom: '♠10', left: '♠9', top: '♥9', right: '♦9' } },
];

const BiddingDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = BIDDING_STEPS[step];
  const hasPlayed = (p: string) => cur.played?.includes(p) ?? false;
  const centreCards = cur.centreCards ?? {};

  // Bigger card so bottom rank/suit symbol fits inside the card background
  const CARD_SIZE = 'w-[36px] h-[50px]';

  const SpeechBubble: React.FC<{ text: string }> = ({ text }) => (
    <div className="bg-white/90 text-gray-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow leading-tight max-w-[90px] text-center whitespace-nowrap">
      {text}
    </div>
  );

  const mariCount = hasPlayed('mariette') ? 5 : 6;
  const juppCount = hasPlayed('jupp') ? 5 : 6;
  const jeannCount = hasPlayed('jeanny') ? 5 : 6;

  // Mariette — face-down horizontal, gap-1 for visible spacing
  const MariHand = () => (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: mariCount }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown className={CARD_SIZE} />
      ))}
    </div>
  );

  // Jupp — face-down vertical, tight gap
  const JuppHand = () => (
    <div className="flex flex-col items-center" style={{ gap: 1 }}>
      {Array.from({ length: juppCount }).map((_, i) => (
        <CardRenderer key={i} cardString="" faceDown rotated className={CARD_SIZE} />
      ))}
    </div>
  );

  // Jeanny — face-up, rotated 90° (card turned sideways as if held by left-side player)
  const JeannyHand = () => (
    <div className="flex flex-col items-center" style={{ gap: 1 }}>
      {JEANNY_HAND.slice(0, jeannCount).map((card, i) => (
        <div key={i} className="rotate-90">
          <CardRenderer cardString={card} className={CARD_SIZE} />
        </div>
      ))}
    </div>
  );

  // Luca — face-up with gap-1 spacing
  const LucaHand = () => {
    const cards = hasPlayed('luca') ? LUCA_HAND.slice(0, 5) : LUCA_HAND;
    return (
      <div className="flex gap-1 flex-wrap justify-center">
        {cards.map((c, i) => {
          const isHL = (cur.lucaHighlight ?? []).includes(c);
          return <CardRenderer key={i} cardString={c} className={CARD_SIZE} highlighted={isHL} />;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Fixed-height announcement area — prevents layout jump when badges appear/disappear */}
      <div className="min-h-[24px] flex gap-2 justify-center flex-wrap">
        {cur.announcements?.map(a => (
          <span key={a.player} className={`${a.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
            {a.player}: {a.text}
          </span>
        ))}
      </div>

      {/* Fixed-size board: all rows have minHeight */}
      <div className="felt-table rounded-2xl p-3 w-full max-w-xs shadow-xl border border-white/10 select-none">
        {/* Top — Mariette */}
        <div className="flex flex-col items-center gap-0.5 mb-2" style={{ minHeight: 68 }}>
          <MariHand />
          <div className={`px-2 py-0.5 rounded-full text-white text-[10px] font-bold whitespace-nowrap bg-red-500 ${cur.activePlayer === 'mariette' ? 'ring-2 ring-yellow-300' : ''}`}>
            Mariette
          </div>
          {cur.marietteSpeaks ? <SpeechBubble text={cur.marietteSpeaks} /> : <div className="h-[18px]" />}
        </div>

        {/* Middle */}
        <div className="flex items-center gap-1">
          {/* Left — Jeanny: face-UP reversed */}
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0" style={{ minWidth: 52 }}>
            <div className={`px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold bg-blue-500 ${cur.activePlayer === 'jeanny' ? 'ring-2 ring-yellow-300' : ''}`}>Jeanny</div>
            {cur.jeanySpeaks ? <SpeechBubble text={cur.jeanySpeaks} /> : <div className="h-[18px]" />}
            <JeannyHand />
          </div>

          {/* Centre — fixed size */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative" style={{ width: 90, height: 130 }}>
              {centreCards.bottom && (
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 4 }}>
                  <CardRenderer cardString={centreCards.bottom} className="w-8 h-11" />
                </div>
              )}
              {centreCards.left && (
                <div className="absolute top-1/2 -translate-y-1/2" style={{ left: 2 }}>
                  <CardRenderer cardString={centreCards.left} rotated className="w-8 h-11" />
                </div>
              )}
              {centreCards.top && (
                <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 2 }}>
                  <CardRenderer cardString={centreCards.top} className="w-8 h-11" />
                </div>
              )}
              {centreCards.right && (
                <div className="absolute top-1/2 -translate-y-1/2" style={{ right: 2 }}>
                  <CardRenderer cardString={centreCards.right} rotated className="w-8 h-11" />
                </div>
              )}
              {!centreCards.bottom && !centreCards.left && !centreCards.top && !centreCards.right && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/15 text-xs">Dësch</span>
                </div>
              )}
            </div>
          </div>

          {/* Right — Jupp: face-down vertical */}
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0" style={{ minWidth: 52 }}>
            <JuppHand />
            <div className={`px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold bg-blue-500 ${cur.activePlayer === 'jupp' ? 'ring-2 ring-yellow-300' : ''}`}>Jupp</div>
            {cur.juppSpeaks ? <SpeechBubble text={cur.juppSpeaks} /> : <div className="h-[18px]" />}
          </div>
        </div>

        {/* Bottom — Luca: face-up, gap-1 */}
        <div className="flex flex-col items-center gap-0.5 mt-2" style={{ minHeight: 68 }}>
          <div className={`px-2 py-0.5 rounded-full text-white text-[10px] font-bold bg-red-500 ${cur.activePlayer === 'luca' ? 'ring-2 ring-yellow-300' : ''}`}>Luca</div>
          {cur.lucaSpeaks ? <SpeechBubble text={cur.lucaSpeaks} /> : <div className="h-[18px]" />}
          <LucaHand />
        </div>
      </div>

      <p className="text-xs text-white/80 text-center italic px-2 leading-snug min-h-[36px]">{cur.caption}</p>
      <NavButtons step={step} total={BIDDING_STEPS.length}
        onPrev={() => setStep(s => Math.max(0, s-1))}
        onNext={() => setStep(s => Math.min(BIDDING_STEPS.length-1, s+1))} />
    </div>
  );
};

// bidding-2: Announcement value — winner-only Lee, no coloring on original 9 lines
// TallyRowColored: marks from newMarkStart onward shown in newColor; all others white or struck
const TallyRowColored: React.FC<{
  total: number; crossed: number; crossColor: string;
  newMarkStart: number; newMarkCount: number; newColor: string;
}> = ({ total, crossed, crossColor, newMarkStart, newMarkCount, newColor }) => (
  <div className="flex items-center justify-center" style={{ gap: 3 }}>
    {Array.from({ length: total }).map((_, i) => {
      const isStruck = i < crossed;
      const needsGap = i > 0 && i % 3 === 0;
      // Only color marks that are genuinely extra (index >= 9) — original 9 marks never get colored
      const isNew = !isStruck && i >= 9 && i >= newMarkStart && i < newMarkStart + newMarkCount;
      return (
        <React.Fragment key={i}>
          {needsGap && <div style={{ width: 6 }} />}
          <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 8, height: 20 }}>
            <div className={`absolute rounded-full ${
              isStruck ? 'bg-white/25' : isNew ? newColor : 'bg-white'
            }`} style={{ width: 2, height: '100%' }} />
            {isStruck && <div className={`absolute rounded-full ${crossColor}`} style={{ height: 2, width: '100%' }} />}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

const ANNOUNCEMENT_SCENARIOS = [
  { title: 'Keng Annonce',       lines: 1 },
  { title: 'Matt (♠D)',          lines: 2 },
  { title: 'Konter (♥D+♦D)',     lines: 2 },
  { title: 'Konter & Matt',      lines: 3 },
  { title: 'Matt + Konter (2×)', lines: 3 },
];

const AnnouncementValueDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [allStreech, setAllStreech] = useState(false);
  const cur = ANNOUNCEMENT_SCENARIOS[idx];
  const totalLines = cur.lines + (allStreech ? 1 : 0);
  const remaining = Math.max(0, 9 - totalLines);
  const crossed   = Math.min(9, totalLines);
  // The newly-struck marks are the last `totalLines` of the 9 base marks
  const newStart  = 9 - totalLines;

  return (
    <div className="w-full space-y-3">
      <div className="flex gap-1 flex-wrap justify-center">
        {ANNOUNCEMENT_SCENARIOS.map((s, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`text-[10px] px-2 py-1 rounded-full border transition-all ${i === idx ? 'bg-yellow-400/30 border-yellow-400 text-yellow-200' : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'}`}>
            {s.title}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button onClick={() => setAllStreech(v => !v)}
          className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
            allStreech ? 'bg-green-500/30 border-green-400 text-green-200 font-bold' : 'bg-white/10 border-white/20 text-white/60'
          }`}>
          {allStreech ? '✓' : '○'} Gewënner kritt all Streech (+1)
        </button>
      </div>
      <p className="text-xs text-white/60 text-center italic">Ekipp 1 gewënnt — -{totalLines} Linn{totalLines > 1 ? 'en' : ''}</p>
      <div className="bg-white/10 rounded-xl p-4 w-full max-w-xs mx-auto">
        <p className="text-xs font-bold text-red-300 mb-2 text-center">Ekipp 1</p>
        {/* All original 9 marks dim when struck, never turn red — guarded by i >= 9 in TallyRowColored */}
        <TallyRowColored
          total={9} crossed={crossed} crossColor="bg-white/25"
          newMarkStart={newStart} newMarkCount={totalLines} newColor="bg-red-400"
        />
        {remaining === 0
          ? <p className="text-xs text-green-300 mt-1 text-center font-bold">Gewonnen! 🏆</p>
          : <p className="text-xs text-white/60 mt-1 text-center">{remaining} Linnen iwwer</p>}
      </div>
      <p className="text-xs text-yellow-200 text-center font-bold">
        -{totalLines} Linn{totalLines > 1 ? 'en' : ''} fir Gewënner{allStreech ? ' (inkl. all Streech)' : ''}
      </p>
    </div>
  );
};

// bidding-3 & scoring-4: Trump team Lee demo with colored new marks
function computeLeeResult(
  announcement: string, winner: '1'|'2', trumpTeam: '1'|'2', isStaenner: boolean, allStreech: boolean
) {
  const annoLines: Record<string, number> = { 'Keng': 0, 'Matt': 1, 'Konter': 1, 'K&M': 2 };
  const totalLines = 1 + (annoLines[announcement] ?? 0) + (allStreech ? 1 : 0);
  let aRemain = 9, bRemain = 9, aExtra = 0, bExtra = 0, newA = 0, newB = 0, explanation = '';
  if (isStaenner) {
    if (trumpTeam === '1') { aExtra = 1; newA = 1; explanation = `Stänner: Tromp-Ekipp 1 kritt +1 Linn bäi.`; }
    else                   { bExtra = 1; newB = 1; explanation = `Stänner: Tromp-Ekipp 2 kritt +1 Linn bäi.`; }
  } else if (winner === '1') {
    aRemain = 9 - totalLines; newA = totalLines;
    if (trumpTeam === '2') { bExtra = totalLines; newB = totalLines; explanation = `Ekipp 1 gewënnt (-${totalLines}). Tromp-Ekipp 2 kritt +${totalLines} bäi!`; }
    else explanation = `Ekipp 1 gewënnt (Tromp-Ekipp). -${totalLines} Linnen.`;
  } else {
    bRemain = 9 - totalLines; newB = totalLines;
    if (trumpTeam === '1') { aExtra = totalLines; newA = totalLines; explanation = `Ekipp 2 gewënnt (-${totalLines}). Tromp-Ekipp 1 kritt +${totalLines} bäi!`; }
    else explanation = `Ekipp 2 gewënnt (Tromp-Ekipp). -${totalLines} Linnen.`;
  }
  return { a: Math.max(0, aRemain), b: Math.max(0, bRemain), aExtra, bExtra, newA, newB, explanation };
}

const ANNOUNCEMENT_OPTIONS = ['Keng', 'Matt', 'Konter', 'K&M'];

const TrumpTeamDemo: React.FC<{ showAllStreechToggle?: boolean }> = ({ showAllStreechToggle }) => {
  const [announcement, setAnnouncement] = useState<string>('Keng');
  const [winner, setWinner] = useState<'1'|'2'>('1');
  const [trumpTeam, setTrumpTeam] = useState<'1'|'2'>('1');
  const [isStaenner, setIsStaenner] = useState(false);
  const [allStreech, setAllStreech] = useState(false);

  const r = computeLeeResult(announcement, winner, trumpTeam, isStaenner, allStreech);
  const aCrossed = Math.min(9, 9 - r.a);
  const bCrossed = Math.min(9, 9 - r.b);
  const aNewStart = Math.max(0, 9 - r.newA);

  const ToggleGroup: React.FC<{
    label: string; options: Array<{ value: string; label: string }>;
    value: string; onChange: (v: any) => void; color?: string;
  }> = ({ label, options, value, onChange, color = 'bg-blue-500/30 border-blue-400' }) => (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-white/60 w-20 text-right flex-shrink-0">{label}:</span>
      <div className="flex gap-1 flex-wrap">
        {options.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${value === o.value ? `${color} text-white font-bold` : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-3">
      <div className="bg-white/5 rounded-xl p-3 w-full max-w-xs mx-auto space-y-2">
        <ToggleGroup label="Annonce" options={ANNOUNCEMENT_OPTIONS.map(a => ({ value: a, label: a }))}
          value={announcement} onChange={(v: string) => setAnnouncement(v)} color="bg-yellow-500/30 border-yellow-400" />
        <ToggleGroup label="Tromp-Ekipp" options={[{ value: '1', label: 'Ekipp 1' }, { value: '2', label: 'Ekipp 2' }]}
          value={trumpTeam} onChange={setTrumpTeam} color="bg-orange-500/30 border-orange-400" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/60 w-20 text-right flex-shrink-0">Gewënner:</span>
          <div className="flex gap-1 flex-wrap">
            {[{ value: '1', label: 'Ekipp 1' }, { value: '2', label: 'Ekipp 2' }].map(o => (
              <button key={o.value} onClick={() => { setWinner(o.value as '1'|'2'); setIsStaenner(false); }}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                  !isStaenner && winner === o.value ? 'bg-green-600/40 border-green-400 text-white font-bold' : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'
                }`}>{o.label}</button>
            ))}
            <button onClick={() => setIsStaenner(s => !s)}
              className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                isStaenner ? 'bg-purple-500/40 border-purple-400 text-white font-bold' : 'bg-white/10 border-white/20 text-white/60'
              }`}>20:20</button>
          </div>
        </div>
        {showAllStreechToggle && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/60 w-20 text-right flex-shrink-0"></span>
            <button onClick={() => setAllStreech(v => !v)}
              className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                allStreech ? 'bg-green-500/30 border-green-400 text-green-200 font-bold' : 'bg-white/10 border-white/20 text-white/60'
              }`}>
              {allStreech ? '✓' : '○'} All Streech gewënnt (+1)
            </button>
          </div>
        )}
      </div>

      <div className="bg-white/10 rounded-xl p-4 w-full max-w-xs mx-auto">
        <div className="flex justify-around items-start gap-3">
          <div className="text-center flex-1 min-w-0">
            <p className="text-xs font-bold text-red-300 mb-1">Ekipp 1</p>
            {r.aExtra > 0 ? (
              <TallyRowColored total={9 + r.aExtra} crossed={0} crossColor="bg-white/25"
                newMarkStart={9} newMarkCount={r.aExtra} newColor="bg-orange-400" />
            ) : (
              <TallyRowColored total={9} crossed={aCrossed} crossColor="bg-white/25"
                newMarkStart={aNewStart} newMarkCount={r.newA} newColor="bg-red-300" />
            )}
            {r.aExtra > 0 && <p className="text-[10px] text-orange-300 mt-0.5">+{r.aExtra} bäigesat</p>}
            {r.a === 0 ? <p className="text-xs text-green-300 mt-1 font-bold">Gewonnen! 🏆</p>
              : <p className="text-xs text-white/60 mt-1">{r.a + r.aExtra} iwwer</p>}
          </div>
          <div className="w-px bg-white/20 self-stretch flex-shrink-0" />
          <div className="text-center flex-1 min-w-0">
            <p className="text-xs font-bold text-blue-300 mb-1">Ekipp 2</p>
            {r.bExtra > 0 ? (
              <TallyRowColored total={9 + r.bExtra} crossed={0} crossColor="bg-white/25"
                newMarkStart={9} newMarkCount={r.bExtra} newColor="bg-orange-400" />
            ) : (
              <TallyRowColored total={9} crossed={bCrossed} crossColor="bg-white/25"
                newMarkStart={Math.max(0, 9 - r.newB)} newMarkCount={r.newB} newColor="bg-blue-300" />
            )}
            {r.bExtra > 0 && <p className="text-[10px] text-orange-300 mt-0.5">+{r.bExtra} bäigesat</p>}
            {r.b === 0 ? <p className="text-xs text-green-300 mt-1 font-bold">Gewonnen! 🏆</p>
              : <p className="text-xs text-white/60 mt-1">{r.b + r.bExtra} Linnen</p>}
          </div>
        </div>
      </div>
      <p className="text-xs text-yellow-200 text-center font-bold px-2 leading-snug min-h-[32px]">{r.explanation}</p>
    </div>
  );
};

// ── PLAYING slides ────────────────────────────────────────────────────────────

// Helper: compute trump set for a given suit id
function getTrumpCards(suitId: string): Set<string> {
  const suit = SUITS.find(s => s.id === suitId);
  if (!suit) return new Set();
  const s = new Set<string>();
  ALWAYS_QUEEN_CARDS.forEach(q => s.add(q));
  if (suitId === 'clubs') s.add(CLUB_QUEEN);
  CARD_RANKS_ENG.forEach(r => s.add(`${suit.sym}${r}`));
  return s;
}

// playing-0: Luca's fixed hand, user picks trump suit, see which cards become trump
const BASE_LUCA_HAND = ['♠Q','♥9','♦10','♣R','♣V','♠K'];

const PlayingFirstCard: React.FC = () => {
  const [trump, setTrump] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const trumpSet = trump ? getTrumpCards(trump) : new Set<string>();
  const trumpSuit = SUITS.find(s => s.id === trump);

  const isCardTrump = (card: string) => trumpSet.has(card);
  const getNote = (card: string) => {
    if (!trump) return '';
    if (isCardTrump(card)) {
      if (ALWAYS_QUEEN_CARDS.has(card)) return 'ëmmer Tromp (Damm)';
      if (card === CLUB_QUEEN) return 'Tromp (Kräizer-Damm)';
      return `Tromp (${trumpSuit?.name}-Faarf)`;
    }
    const suitSym = card[0];
    const suitName = SUITS.find(s => s.sym === suitSym)?.name ?? '';
    return `${suitName} — muss bekennen`;
  };

  const sel = selected !== null ? BASE_LUCA_HAND[selected] : null;

  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-white/70 text-center">Wielt d'Trompfaarf fir ze gesinn wat sech ännert:</p>
      <SuitPicker selected={trump} onSelect={id => { setTrump(id); setSelected(null); }} />
      {trump && (
        <>
          <div className="flex gap-3 justify-center text-[10px]">
            <span><span className="inline-block w-3 h-3 rounded border-2 border-yellow-400 bg-yellow-400/20 mr-1 align-middle"/>Tromp — ka ëmmer gespillt ginn</span>
            <span><span className="inline-block w-3 h-3 rounded border-2 border-white/30 bg-white/10 mr-1 align-middle"/>Normal — muss bekennen</span>
          </div>
          <p className="text-xs text-white/60 text-center">De Luca spillt déi éischt Kaart. Klick eng Kaart:</p>
          <div className="flex gap-1.5 justify-center flex-wrap">
            {BASE_LUCA_HAND.map((card, i) => {
              const isTrump = isCardTrump(card);
              return (
                <div key={i} className="cursor-pointer" onClick={() => setSelected(i === selected ? null : i)}>
                  <CardRenderer
                    cardString={card}
                    className={`w-11 h-[60px] transition-all ${selected === i ? 'scale-110 -translate-y-1' : ''}`}
                    highlighted={isTrump}
                  />
                </div>
              );
            })}
          </div>
          {sel && (
            <div className={`rounded-xl p-3 w-full max-w-xs mx-auto border ${
              isCardTrump(sel) ? 'bg-yellow-400/15 border-yellow-400/40' : 'bg-white/10 border-white/20'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <CardRenderer cardString={sel} className="w-9 h-[50px]" highlighted={isCardTrump(sel)} />
                <div>
                  <p className={`text-xs font-bold ${isCardTrump(sel) ? 'text-yellow-300' : 'text-white'}`}>
                    {isCardTrump(sel) ? '🟡 Tromp!' : 'Nët-Tromp'}
                  </p>
                  <p className="text-[10px] text-white/70">{getNote(sel)}</p>
                </div>
              </div>
              <p className="text-[10px] text-white/60 leading-snug">
                {isCardTrump(sel)
                  ? <>
                      <span className="block">— Jidderee muss eng Tromp spillen (=bekennen).</span>
                      <span className="block mt-0.5">— Et kann en all aner Kaart spillen, wann e keng Tromp huet.</span>
                    </>
                  : <>
                      <span className="block">— Jidderee muss eng Kaart vun der selwechter Faarf wéi déi éischt Kaart spillen (=bekennen) oder kann eng Tromp spillen (=trompen).</span>
                      <span className="block mt-0.5">— Et kann en all aner Kaart spillen, wann e keng Kaart vun der selwechter Faarf huet, wéi ausgaangen ass, an en och keng Tromp huet.</span>
                    </>}
              </p>
            </div>
          )}
          {!sel && <div className="text-center text-white/30 text-xs italic">Klick eng Kaart fir méi ze gesinn</div>}
        </>
      )}
      {!trump && <div className="text-center text-white/30 text-xs italic">Wielt eng Trompfaarf fir ufänken</div>}
    </div>
  );
};

// playing-1: Jeanny plays first (RIGHT side), Luca follows (bottom).
const JEANNY_PLAY_HAND = ['♥Q','♦Q','♠9','♣V','♥K','♦9'];  // ♦Q replaced with ♦9
const LUCA_PLAY_HAND   = ['♥A','♠Q','♣Q','♣R','♣10','♠10'];

const PlayingRules: React.FC = () => {
  const [trump, setTrump] = useState<string | null>(null);
  const [leadCard, setLeadCard] = useState<string | null>(null);

  const trumpSet = trump ? getTrumpCards(trump) : new Set<string>();
  const isTrump = (c: string) => trumpSet.has(c);

  // Determine Luca's (follower) card status given Jeanny's lead
  const getLucaStatus = (card: string): 'must' | 'can' | 'no' => {
    if (!leadCard || !trump) return 'can';
    if (isTrump(card)) return 'can'; // trump always playable
    const isLedTromp = isTrump(leadCard);
    if (isLedTromp) {
      // Trump led — non-trump only if Luca has no trump
      const lucaHasTrump = LUCA_PLAY_HAND.some(c => isTrump(c));
      return lucaHasTrump ? 'no' : 'can';
    }
    const ledSym = leadCard[0];
    const cardSym = card[0];
    const hasLedSuit = LUCA_PLAY_HAND.some(c => !isTrump(c) && c[0] === ledSym);
    if (cardSym === ledSym) return 'must';
    if (hasLedSuit) return 'no';
    return 'can';
  };

  const statusIcon = (s: 'must'|'can'|'no') =>
    s === 'must' ? <span className="text-green-300 text-xs font-bold">✓</span>
    : s === 'can'  ? <span className="text-yellow-400 text-xs font-bold">?</span>
    : <span className="text-red-400 text-xs font-bold">✕</span>;

  const isLedTromp = leadCard ? isTrump(leadCard) : false;
  const ledSuitName = leadCard ? (SUITS.find(s => s.sym === leadCard[0])?.name ?? '') : '';

  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-white/70 text-center">Wielt d'Trompfaarf:</p>
      <SuitPicker selected={trump} onSelect={id => { setTrump(id); setLeadCard(null); }} />

      {trump && (
        <>
          {/* Table layout: Jeanny left (leads), Luca bottom (follows) */}
          <div className="felt-table rounded-2xl p-3 w-full max-w-xs mx-auto shadow-xl border border-white/10">
            {/* Top placeholder */}
            <div className="flex justify-center mb-1">
              <span className="text-[10px] text-white/25">Mariette</span>
            </div>

            {/* Middle row */}
            <div className="flex items-start justify-between gap-2">
              {/* Left: Jupp placeholder */}
              <div className="flex flex-col items-center flex-shrink-0 w-8">
                <span className="text-[10px] text-white/25">Jupp</span>
              </div>

              {/* Centre: lead card shown face-up */}
              <div className="flex-1 flex items-center justify-center" style={{ minHeight: 110 }}>
                {leadCard ? (
                  <div className="mt-8">
                    <CardRenderer cardString={leadCard} className="w-10 h-14" highlighted={isTrump(leadCard)} />
                  </div>
                ) : (
                  <span className="text-white/15 text-xs">Dësch</span>
                )}
              </div>

              {/* Right: Jeanny leads — face-up sideways, clickable */}
              <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                <span className="text-[10px] font-bold text-blue-300 px-1.5 py-0.5 bg-blue-500/30 rounded-full">Jeanny (spillt als éischt)</span>
                <p className="text-[9px] text-yellow-300/80 text-center leading-tight">
                  {leadCard ? `spillt ${leadCard}` : 'klick eng Kaart!'}
                </p>
                <div className="flex flex-col" style={{ gap: 2 }}>
                  {JEANNY_PLAY_HAND.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => setLeadCard(c === leadCard ? null : c)}
                      className={`rotate-90 cursor-pointer transition-all ${
                        c === leadCard ? 'scale-110' : 'hover:scale-105'
                      }`}
                    >
                      <CardRenderer cardString={c} className="w-8 h-11" highlighted={isTrump(c)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Luca follows */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <span className="text-[10px] font-bold text-red-300 px-2 py-0.5 bg-red-500/30 rounded-full">Luca (spillt als zweet)</span>
              <div className="flex gap-1 flex-wrap justify-center">
                {LUCA_PLAY_HAND.map((c, i) => {
                  const status = leadCard ? getLucaStatus(c) : 'can';
                  return (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <div className="h-4 flex items-center justify-center">
                        {leadCard && statusIcon(status)}
                      </div>
                      <CardRenderer
                        cardString={c}
                        className={`w-9 h-[50px] transition-all ${
                          status === 'no' && leadCard ? 'opacity-30' : ''
                        }`}
                        highlighted={isTrump(c)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Info panel */}
          {leadCard ? (
            <div className={`rounded-xl p-3 w-full max-w-xs mx-auto border ${
              isLedTromp ? 'bg-yellow-400/15 border-yellow-400/40' : 'bg-white/10 border-white/20'
            }`}>
              <p className="text-xs font-bold text-white mb-1">
                Jeanny spillt: {leadCard} — {isLedTromp ? '🟡 Tromp geet aus' : `${ledSuitName} geet aus`}
              </p>
              <p className="text-[10px] text-white/70 leading-snug">
                {isLedTromp
                  ? 'Luca muss Tromp spillen, falls hien eng huet. ✓=muss, ?=kann, ✕=däerf net.'
                  : `Luca muss ${ledSuitName} bekennen (falls hien eng huet). Falls hie keng huet kann hien all Kaart spillen, oder souguer eng Tromp spillen. ✓=muss, ?=kann, ✕=däerf net.`}
              </p>
            </div>
          ) : (
            <div className="text-center text-white/30 text-xs italic">Klick eng Kaart aus Jeanny senger Hand fir ze gesinn wat Luca spillen muss.</div>
          )}
        </>
      )}
      {!trump && <div className="text-center text-white/30 text-xs italic">Wielt éischt eng Trompfaarf</div>}
    </div>
  );
};

// ── SCORING slides ────────────────────────────────────────────────────────────

const TrickPointsStatic: React.FC = () => {
  const trickCards = [
    { card: '♥R', pts: 3 },
    { card: '♥9', pts: 0 },
    { card: '♦V', pts: 1 },
    { card: '♣10', pts: 0 },
  ];
  const total = trickCards.reduce((s, c) => s + c.pts, 0);
  const pointItems = [
    { display: '1', pts: 4 },{ display: 'R', pts: 3 },{ display: 'D', pts: 2 },
    { display: 'V', pts: 1 },{ display: '10', pts: 0 },{ display: '9', pts: 0 },
  ];
  return (
    <div className="w-full space-y-3">
      <div className="felt-table rounded-xl p-3 w-full max-w-[200px] mx-auto border border-white/10 shadow-md">
        <p className="text-[9px] text-white/50 text-center mb-1">Dëse Streech</p>
        <div className="flex justify-center mb-1">
          <CardRenderer cardString="♥R" className="w-10 h-[56px]" highlighted />
        </div>
        <div className="flex items-center justify-center gap-8">
          <CardRenderer cardString="♦9" rotated className="w-10 h-[56px]" />
          <div className="w-1" />
          <CardRenderer cardString="♣10" rotated className="w-10 h-[56px]" />
        </div>
        <div className="flex justify-center mt-1">
          <CardRenderer cardString="♦V" className="w-10 h-[56px]" />
        </div>
        <p className="text-[9px] text-yellow-300 text-center mt-1">♥R gewënnt — {total} Punkten</p>
      </div>
      <div className="bg-white/10 rounded-xl p-3 w-full max-w-xs mx-auto">
        <p className="text-xs text-white/60 text-center mb-2">Punkten an dësem Streech:</p>
        <div className="flex gap-3 justify-center">
          {trickCards.map(({ card, pts }) => (
            <div key={card} className="flex flex-col items-center gap-1">
              <CardRenderer cardString={card} className="w-9 h-[50px]" />
              <span className={`text-xs font-bold ${pts > 0 ? 'text-yellow-300' : 'text-white/30'}`}>{pts}P</span>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold text-yellow-200 text-center mt-2">Total: {total} Punkten</p>
      </div>
      <p className="text-xs text-white/60 text-center">Punktwäert aller Kaarten:</p>
      <div className="flex justify-center gap-2 flex-wrap">
        {pointItems.map(({ display, pts }) => (
          <div key={display} className="flex flex-col items-center gap-0.5">
            <div className="bg-white rounded-md shadow border-2 border-gray-200 flex items-center justify-center text-gray-900 font-extrabold"
              style={{ width: '34px', aspectRatio: '2/3', fontSize: display.length > 1 ? '11px' : '15px' }}>{display}</div>
            <span className={`text-xs font-bold ${pts > 0 ? 'text-yellow-300' : 'text-white/35'}`}>{pts}P</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScoreAdjuster: React.FC = () => {
  const [score1, setScore1] = useState(20);
  const score2 = 40 - score1;
  const winner = score1 > 20 ? 'Ekipp 1' : score2 > 20 ? 'Ekipp 2' : null;
  const isStaenner = score1 === 20;
  const adjust = (delta: number) => setScore1(s => Math.max(0, Math.min(40, s + delta)));
  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-white/60 text-center">Pass déi Punkten un (Total = 40):</p>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-bold text-red-300">Ekipp 1</p>
          <div className="flex items-center gap-2">
            <button onClick={() => adjust(-1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center">-</button>
            <span className={`text-2xl font-bold w-10 text-center ${score1 > 20 ? 'text-green-300' : score1 === 20 ? 'text-yellow-300' : 'text-white'}`}>{score1}</span>
            <button onClick={() => adjust(1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center">+</button>
          </div>
        </div>
        <div className="flex flex-col items-center"><div className="text-white/30 text-xl font-bold">:</div><div className="text-[10px] text-white/40 mt-1">= 40</div></div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-bold text-blue-300">Ekipp 2</p>
          <div className="flex items-center gap-2">
            <button onClick={() => adjust(1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center">-</button>
            <span className={`text-2xl font-bold w-10 text-center ${score2 > 20 ? 'text-green-300' : score2 === 20 ? 'text-yellow-300' : 'text-white'}`}>{score2}</span>
            <button onClick={() => adjust(-1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center">+</button>
          </div>
        </div>
      </div>
      <div className={`rounded-xl p-3 w-full max-w-xs mx-auto text-center border ${isStaenner ? 'bg-yellow-400/15 border-yellow-400/40' : winner ? 'bg-green-400/15 border-green-400/40' : 'bg-white/10 border-white/20'}`}>
        {isStaenner && <p className="text-sm font-bold text-yellow-300">Gläichspill / Stänner ⚔️</p>}
        {!isStaenner && winner && <p className="text-sm font-bold text-green-300">{winner} gewënnt! 🏆</p>}
        {!isStaenner && !winner && <p className="text-xs text-white/40">Keen Gewënner nach</p>}
        <p className="text-[10px] text-white/50 mt-1">21+ Punkten = Gewënner · 20:20 = Stänner</p>
      </div>
    </div>
  );
};

// ── Simple components ─────────────────────────────────────────────────────────
const AnnouncementCards: React.FC = () => (
  <div className="space-y-3 w-full max-w-xs mx-auto">
    {[
      { name: 'Konter',      cards: ['♥Q','♦Q'],      color: 'text-blue-300',   desc: '♥D + ♦D = +1 Linn' },
      { name: 'Matt',        cards: ['♠Q'],            color: 'text-purple-300', desc: '♠D = +1 Linn' },
      { name: 'Konter&Matt', cards: ['♠Q','♥Q','♦Q'], color: 'text-yellow-300', desc: 'All 3 Dammen = +2 Linnen' },
    ].map(({ name, cards, color, desc }) => (
      <div key={name} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
        <div className="flex gap-1">{cards.map(c => <CardRenderer key={c} cardString={c} className="w-10 h-[54px]" />)}</div>
        <div>
          <p className={`font-bold text-sm ${color}`}>{name}</p>
          <p className="text-xs text-white/60">{desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const LeeBoard: React.FC<{ teamA: number; teamB: number; label?: string }> = ({ teamA, teamB, label }) => (
  <div className="bg-white/10 rounded-xl p-4 w-full max-w-xs mx-auto">
    {label && <p className="text-xs text-white/60 text-center mb-3">{label}</p>}
    <LeeBoardStatic aRemaining={teamA} bRemaining={teamB} />
  </div>
);

// ── Main router ───────────────────────────────────────────────────────────────
export const StepVisual: React.FC<StepVisualProps> = ({ chapterId, stepIndex }) => {
  const key = `${chapterId}-${stepIndex}`;

  const visuals: Record<string, React.ReactNode> = {
    'basics-0': <TeamsTable />,
    'basics-1': <AllCards />,
    'basics-2': <TrickDemo />,
    'basics-3': <TrumpHighlightAllCards />,
    'basics-4': <TrumpRankChart />,
    'basics-5': <ScoreChartWithTricks />,
    'basics-6': <LeeBoardAndProgression />,

    'dealing-0': <DealingDemo />,

    'bidding-0': <BiddingDemo />,
    'bidding-1': <AnnouncementCards />,
    'bidding-2': <AnnouncementValueDemo />,
    'bidding-3': <TrumpTeamDemo showAllStreechToggle />,

    'playing-0': <PlayingFirstCard />,
    'playing-1': <PlayingRules />,

    'scoring-0': <TrickDemo />,
    'scoring-1': <TrickPointsStatic />,
    'scoring-2': <ScoreAdjuster />,
    'scoring-3': <LeeBoardAndProgression />,
    'scoring-4': <TrumpTeamDemo showAllStreechToggle />,
  };

  const visual = visuals[key];
  if (!visual) return null;

  return (
    <div className="w-full flex justify-center py-2">
      {visual}
    </div>
  );
};
