import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';
import { Dices, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MiniGameStep, MiniGameScenario } from '@/types/tutorial';
import { GameContentRenderer } from './miniGames/GameContentRenderer';
import { useMiniGameSelection } from './miniGames/useMiniGameSelection';
import { Confetti } from './anim/Confetti';
import { canGenerate, generateScenario } from '@/lib/konter/generators';

interface Props {
  step: MiniGameStep;
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswer: (answer: string) => void;
  onReset?: () => void;
}

const areCardsEqual = (a: string | null, b: string) => {
  if (!a || !b) return false;
  return a.split(',').sort().join(',') === b.split(',').sort().join(',');
};

const EMPTY: MiniGameScenario = { hand: [], cards: [], simpleCards: [], trumpSuit: '', leadSuit: '', options: [], correct: '', explanation: '' };

export const MiniGameContent: React.FC<Props> = ({ step, selectedAnswer, showResult, onAnswer, onReset }) => {
  const { miniGame } = step;
  const [randomScenarios, setRandomScenarios] = useState<MiniGameScenario[]>([]);
  const scenarios = [...(miniGame.scenarios ?? []), ...randomScenarios];
  const fixedCount = miniGame.scenarios?.length ?? 0;
  const total = scenarios.length;
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [streak, setStreak] = useState(0);
  const [burst, setBurst] = useState(0);
  const shake = useAnimationControls();
  const generatable = canGenerate(miniGame.type);

  // new mini-game → start fresh
  useEffect(() => { setRandomScenarios([]); setScenarioIdx(0); }, [miniGame]);

  const scenario = scenarios[Math.min(scenarioIdx, total - 1)] || EMPTY;
  const isMultiSelect = ['playable-cards', 'count-trumps', 'trick-winner', 'card-play-logic'].includes(miniGame.type);
  const stepKey = `${miniGame.type}-${miniGame.question}-${scenarioIdx}`;
  const { selectedCards, handleCardSelect, resetSelectedCards } = useMiniGameSelection(isMultiSelect, showResult, miniGame.type, stepKey);

  const renderQuestion = () => miniGame.question.replace(/\s*\([^)]*ass Tromp\)$/, '');
  const isCorrect = areCardsEqual(selectedAnswer, scenario.correct);

  // feedback when a result comes in
  const lastResult = useRef(false);
  useEffect(() => {
    if (showResult && !lastResult.current) {
      if (isCorrect) { setStreak((s) => s + 1); setBurst((b) => b + 1); }
      else { setStreak(0); shake.start({ x: [0, -10, 10, -7, 7, -3, 0], transition: { duration: 0.45 } }); }
    }
    lastResult.current = showResult;
  }, [showResult, isCorrect, shake]);

  const handleSubmit = () => { if (isMultiSelect) onAnswer(selectedCards.sort().join(',')); };

  const goTo = (index: number) => {
    resetSelectedCards();
    setScenarioIdx(index);
    onReset?.();
  };

  const handleSelectScenario = (index: number) => { if (index !== scenarioIdx) goTo(index); };

  const handleRandom = () => {
    const s = generateScenario(miniGame.type);
    if (!s) return;
    setRandomScenarios((r) => [...r, s]);
    goTo(total); // index of the new one
  };

  const handleNext = () => {
    if (scenarioIdx < total - 1) goTo(scenarioIdx + 1);
    else if (generatable) handleRandom();
    else goTo(0);
  };

  return (
    <div className="space-y-4">
      {/* Scenario picker + streak */}
      <div className="flex items-center gap-2 justify-center flex-wrap">
        <span className="text-white/50 text-xs">Beispill:</span>
        {Array.from({ length: fixedCount }).map((_, i) => (
          <button key={i} onClick={() => handleSelectScenario(i)}
            className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${i === scenarioIdx ? 'bg-yellow-400 text-gray-900 scale-110' : 'bg-white/20 text-white hover:bg-white/35'}`}>
            {i + 1}
          </button>
        ))}
        {generatable && (
          <motion.button onClick={handleRandom} whileTap={{ rotate: 180, scale: 0.9 }}
            title="Zoufälleg Beispill"
            className={`h-7 px-2.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors ${scenarioIdx >= fixedCount ? 'bg-yellow-400 text-gray-900' : 'bg-white/20 text-white hover:bg-white/35'}`}>
            <Dices className="w-3.5 h-3.5" /> Zoufall
          </motion.button>
        )}
        <AnimatePresence>
          {streak >= 2 && (
            <motion.span key={streak} initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 14 }}
              className="h-7 px-2 rounded-full bg-orange-500/90 text-white text-xs font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> {streak}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.div animate={shake} className="relative bg-white/10 rounded-lg p-4">
        {burst > 0 && <Confetti key={burst} />}
        <p className="text-white font-medium mb-4 text-center text-sm">{renderQuestion()}</p>
        <AnimatePresence mode="wait">
          <motion.div key={scenarioIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
            <GameContentRenderer
              gameType={miniGame.type}
              scenario={scenario}
              selectedCards={selectedCards}
              showResult={showResult}
              onCardSelect={handleCardSelect}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {isMultiSelect && !showResult && (
        <Button onClick={handleSubmit} disabled={selectedCards.length === 0} className="w-full bg-green-600 hover:bg-green-700 text-white">
          Areechen ({selectedCards.length} ausgewielt)
        </Button>
      )}

      {!isMultiSelect && (
        <div className="space-y-2">
          {scenario.options?.map((opt, i) => {
            const chosen = selectedAnswer === opt;
            const right = showResult && opt === scenario.correct;
            return (
              <motion.div key={`${scenarioIdx}-${opt}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, scale: chosen && showResult ? [1, 1.04, 1] : 1 }} transition={{ delay: i * 0.05 }}>
                <Button onClick={() => onAnswer(opt)} disabled={showResult}
                  className={`w-full text-left justify-start text-sm disabled:opacity-100 ${
                    right ? 'bg-green-600 hover:bg-green-700'
                    : chosen ? 'bg-red-600 hover:bg-red-700'
                    : showResult ? 'bg-white/10 text-white/50' : 'bg-white/20 hover:bg-white/30'
                  } text-white`}>
                  {opt}
                </Button>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
            className={`p-4 rounded-lg ${isCorrect ? 'bg-green-600/20 border border-green-400' : 'bg-red-600/20 border border-red-400'}`}>
            <p className={`font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? (streak >= 3 ? `✓ Korrekt! ${streak} hannereneen 🔥` : '✓ Korrekt!') : '✗ Falsch!'}
            </p>
            <p className="text-white/90 mt-2 text-sm">{scenario.explanation}</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {!isCorrect && onReset && (
                <Button onClick={() => { resetSelectedCards(); onReset(); }} className="bg-white/20 hover:bg-white/30 text-white text-sm">
                  Nach eng Kéier
                </Button>
              )}
              <Button onClick={handleNext} className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-sm font-bold">
                {scenarioIdx < total - 1 ? 'Nächst Beispill →' : generatable ? 'Nächst (Zoufall) 🎲' : 'Vu vir ufänken ↺'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
