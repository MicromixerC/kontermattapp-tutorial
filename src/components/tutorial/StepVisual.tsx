import React, { useState } from 'react';
import { GameTable } from './GameTable';
import { CardRenderer } from './CardRenderer';
import { TutorialStep } from '@/types/tutorial';

interface StepVisualProps {
  chapterId: string;
  stepIndex: number;
  step: TutorialStep;
}

// ── per-step visual definitions ──────────────────────────────────────────────

const LeeBoard: React.FC<{ teamA: number; teamB: number; label?: string }> = ({ teamA, teamB, label }) => {
  const lines = (filled: number, total = 9) =>
    Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`inline-block w-4 h-0.5 mx-0.5 rounded ${i < filled ? 'bg-white/30 line-through' : 'bg-white'}`}
        style={i < filled ? { textDecoration: 'line-through' } : {}}
      >
        {/* tally mark */}
        <svg viewBox="0 0 12 12" className="w-4 h-4">
          <line x1="6" y1="1" x2="6" y2="11" stroke={i < filled ? '#aaa' : 'white'} strokeWidth="2" />
          {i < filled && <line x1="1" y1="6" x2="11" y2="6" stroke="#f87171" strokeWidth="2" />}
        </svg>
      </span>
    ));

  return (
    <div className="bg-white/10 rounded-xl p-4 w-full max-w-xs mx-auto">
      {label && <p className="text-xs text-white/60 text-center mb-2">{label}</p>}
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-xs font-bold text-red-300 mb-1">Ekipp A</p>
          <div className="flex flex-wrap gap-1 justify-center w-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <svg key={i} viewBox="0 0 10 18" className="w-3 h-5">
                <line x1="5" y1="1" x2="5" y2="17" stroke={i < (9 - teamA) ? '#ccc' : 'white'} strokeWidth="2" />
                {i < (9 - teamA) && <line x1="1" y1="9" x2="9" y2="9" stroke="#f87171" strokeWidth="2" />}
              </svg>
            ))}
          </div>
          <p className="text-xs text-white/60 mt-1">{teamA} iwwer</p>
        </div>
        <div className="w-px bg-white/20 mx-2" />
        <div className="text-center">
          <p className="text-xs font-bold text-blue-300 mb-1">Ekipp B</p>
          <div className="flex flex-wrap gap-1 justify-center w-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <svg key={i} viewBox="0 0 10 18" className="w-3 h-5">
                <line x1="5" y1="1" x2="5" y2="17" stroke={i < (9 - teamB) ? '#ccc' : 'white'} strokeWidth="2" />
                {i < (9 - teamB) && <line x1="1" y1="9" x2="9" y2="9" stroke="#60a5fa" strokeWidth="2" />}
              </svg>
            ))}
          </div>
          <p className="text-xs text-white/60 mt-1">{teamB} iwwer</p>
        </div>
      </div>
    </div>
  );
};

const TrumpRankChart: React.FC = () => {
  const trumpCards = ['♥A', '♠Q', '♥Q', '♦Q', '♥K', '♥J', '♥10', '♥9'];
  const normalCards = ['♣A', '♣K', '♣Q', '♣J', '♣10', '♣9'];
  return (
    <div className="w-full max-w-xs mx-auto space-y-3">
      <div>
        <p className="text-xs font-bold text-yellow-300 mb-1 text-center">Trëmp (Häerzer Tromp)</p>
        <div className="flex flex-wrap justify-center gap-1">
          {trumpCards.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs text-white/40 mb-0.5">{i + 1}</span>
              <CardRenderer cardString={c} className="w-9 h-12" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-white/60 mb-1 text-center">Nët-Tromp (z.B. ♣)</p>
        <div className="flex flex-wrap justify-center gap-1">
          {normalCards.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs text-white/40 mb-0.5">{i + 1}</span>
              <CardRenderer cardString={c} className="w-9 h-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SpecialQueens: React.FC = () => (
  <div className="flex justify-center gap-4 flex-wrap">
    {[
      { card: '♠Q', label: 'Matt', always: true },
      { card: '♥Q', label: 'Déck Konter', always: true },
      { card: '♦Q', label: 'Kleng Konter', always: true },
      { card: '♣Q', label: 'Nur ♣ Tromp', always: false },
    ].map(({ card, label, always }) => (
      <div key={card} className="flex flex-col items-center gap-1">
        <CardRenderer cardString={card} className="w-12 h-16" />
        <span className={`text-xs font-bold ${always ? 'text-yellow-300' : 'text-white/50'}`}>{label}</span>
        {always && <span className="text-xs text-green-300">Ëmmer Tromp!</span>}
      </div>
    ))}
  </div>
);

const ScoreChart: React.FC = () => (
  <div className="flex justify-center gap-3 flex-wrap">
    {[
      { card: '♠A', pts: 4 }, { card: '♥K', pts: 3 }, { card: '♦Q', pts: 2 },
      { card: '♣J', pts: 1 }, { card: '♠10', pts: 0 }, { card: '♥9', pts: 0 },
    ].map(({ card, pts }) => (
      <div key={card} className="flex flex-col items-center gap-1">
        <CardRenderer cardString={card} className="w-11 h-15" />
        <span className={`text-sm font-bold ${pts > 0 ? 'text-yellow-300' : 'text-white/40'}`}>
          {pts}P
        </span>
      </div>
    ))}
  </div>
);

const AnnouncementCards: React.FC = () => (
  <div className="space-y-4 w-full max-w-xs mx-auto">
    {[
      { name: 'Konter',       cards: ['♥Q', '♦Q'], color: 'text-blue-300',   desc: '♥D + ♦D' },
      { name: 'Matt',         cards: ['♠Q'],        color: 'text-purple-300', desc: '♠D' },
      { name: 'Konter&Matt',  cards: ['♠Q','♥Q','♦Q'], color: 'text-yellow-300', desc: 'All 3 Dammen' },
    ].map(({ name, cards, color, desc }) => (
      <div key={name} className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
        <div className="flex gap-1">
          {cards.map(c => <CardRenderer key={c} cardString={c} className="w-10 h-14" />)}
        </div>
        <div>
          <p className={`font-bold text-sm ${color}`}>{name}</p>
          <p className="text-xs text-white/60">{desc} = +1 Linn</p>
        </div>
      </div>
    ))}
  </div>
);

// ── interactive trick demo ────────────────────────────────────────────────────
const TrickDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const tricks = [
    { bottom: '♠K', left: undefined, top: undefined, right: undefined, caption: 'Du spillst ♠K aus...' },
    { bottom: '♠K', left: '♠9', top: undefined, right: undefined, caption: 'Jeanny spillt ♠9...' },
    { bottom: '♠K', left: '♠9', top: '♠A', right: undefined, caption: 'Mariette spillt ♠A...' },
    { bottom: '♠K', left: '♠9', top: '♠A', right: '♠J', caption: '♠A gewënnt de Streech! ✓' },
  ];
  const current = tricks[Math.min(step, tricks.length - 1)];

  return (
    <div className="flex flex-col items-center gap-3">
      <GameTable
        mode="trick"
        tableCards={current}
        caption={current.caption}
        trumpSuit="♥ Häerzer"
      />
      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 text-white rounded-full disabled:opacity-30"
        >← Zrëck</button>
        <button
          onClick={() => setStep(s => Math.min(tricks.length - 1, s + 1))}
          disabled={step === tricks.length - 1}
          className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 text-white rounded-full disabled:opacity-30"
        >Weider →</button>
      </div>
    </div>
  );
};

// ── DealingDemo ───────────────────────────────────────────────────────────────
const DealingDemo: React.FC<{ phase: 1 | 2 }> = ({ phase }) => {
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const restart = () => { setKey(k => k + 1); setPlaying(true); };

  return (
    <div className="flex flex-col items-center gap-3">
      <GameTable
        key={key}
        mode={playing ? 'dealing' : 'teams'}
        caption={phase === 1 ? 'Éischt Verdeelen: 3 Kaarten pro Spiller' : 'Zweet Verdeelen: nach 3 Kaarten'}
      />
      <button onClick={restart} className="px-4 py-1.5 text-xs bg-white/20 hover:bg-white/30 text-white rounded-full">
        ▶ Animatioun spillen
      </button>
    </div>
  );
};

// ── main router ───────────────────────────────────────────────────────────────
export const StepVisual: React.FC<StepVisualProps> = ({ chapterId, stepIndex }) => {
  const key = `${chapterId}-${stepIndex}`;

  const visuals: Record<string, React.ReactNode> = {
    // basics
    'basics-0': <GameTable mode="teams" caption="2 Ekippen iwwer Kräiz" />,
    'basics-1': <TrickDemo />,
    'basics-2': <ScoreChart />,
    'basics-3': <GameTable mode="handCards" handCards={['♠A','♥K','♦Q','♣J','♠10','♥9']} trumpSuit="♥ Häerzer" caption="Häerzer ass Tromp" />,
    'basics-4': <SpecialQueens />,
    'basics-5': <TrumpRankChart />,
    'basics-6': <ScoreChart />,
    'basics-7': <LeeBoard teamA={2} teamB={0} label="No engem Spill" />,
    'basics-8': <LeeBoard teamA={9} teamB={0} label="Zil: all Linnen duerchsträichen" />,
    // dealing
    'dealing-0': <DealingDemo phase={1} />,
    'dealing-1': <DealingDemo phase={1} />,
    'dealing-2': <DealingDemo phase={2} />,
    // bidding
    'bidding-0': <AnnouncementCards />,
    'bidding-1': <AnnouncementCards />,
    'bidding-2': <GameTable mode="handCards" handCards={['♠Q','♥Q','♦Q','♣A','♣K','♣J']} trumpSuit="♣ Kräizer" caption="Vor der éischter Kaart!" />,
    'bidding-3': <AnnouncementCards />,
    'bidding-4': <LeeBoard teamA={3} teamB={0} label="+2 Linnen fir Konter&Matt" />,
    'bidding-5': <SpecialQueens />,
    // playing
    'playing-0': <TrickDemo />,
    'playing-1': <GameTable mode="handCards" handCards={['♠A','♥Q','♦10','♣9','♠K','♣J']} trumpSuit="♥ Häerzer" />,
    'playing-2': <TrickDemo />,
    'playing-3': <GameTable mode="trick" tableCards={{ bottom: '♥A' }} trumpSuit="♥ Häerzer" caption="Trompstreech: Tromp ugespillt" />,
    'playing-4': <GameTable mode="trick" tableCards={{ bottom: '♠K', left: '♠9' }} trumpSuit="♥ Häerzer" caption="Einfache Streech: Faarf bekennen" />,
    // scoring
    'scoring-0': <TrickDemo />,
    'scoring-1': <ScoreChart />,
    'scoring-2': <LeeBoard teamA={5} teamB={4} label="21+ Punkten fir ze gewannen" />,
    'scoring-3': <LeeBoard teamA={0} teamB={9} label="Éischt Ekipp mat 0 Linnen gewënnt!" />,
    'scoring-4': <LeeBoard teamA={7} teamB={5} label="Tromp maachen = Risiko!" />,
    'scoring-5': <LeeBoard teamA={3} teamB={6} label="Gewënner kritt Linnen duerchgestrach" />,
    'scoring-6': <LeeBoard teamA={2} teamB={7} label="+1 fir Gewënn" />,
    'scoring-7': <LeeBoard teamA={4} teamB={5} label="Verléierer kritt Linnen bäi" />,
    'scoring-8': <LeeBoard teamA={5} teamB={5} label="Stänner: Tromp-Team kritt +1" />,
  };

  const visual = visuals[key];

  if (!visual) return null;

  return (
    <div className="w-full flex justify-center py-2">
      {visual}
    </div>
  );
};
