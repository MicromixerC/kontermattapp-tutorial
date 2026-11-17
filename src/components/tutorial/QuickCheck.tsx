import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ChevronDown } from 'lucide-react';
import { MiniGameContent } from './MiniGameContent';
import { generateScenario } from '@/lib/konter/generators';
import type { MiniGameStep } from '@/types/tutorial';

/** Small "test yourself" box shown right after a concept is explained. */
const CHECKS: Record<string, { type: string; question: string; intro: string }> = {
  'basics-3':  { type: 'count-trumps', question: 'Wéi eng Kaarten sinn Tromp an dëser Hand?', intro: 'Erkenns du all Trëmp?' },
  'basics-5':  { type: 'count-points', question: 'Wéivill Punkten sinn an dësem Streech?', intro: 'Ziel de Schrom vun engem Streech.' },
  'bidding-1': { type: 'announcement-decision', question: 'Wat kënnt Dir (maximal) annoncéieren?', intro: 'Wat dierfs du mat dëser Hand soen?' },
  'playing-0': { type: 'playable-cards', question: 'Wéi eng Kaarte kënne gespillt ginn?', intro: 'Wéi eng Kaarte dierfs du spillen?' },
  'scoring-0': { type: 'trick-winner', question: 'Wéi eng Kaart gewënnt de Streech?', intro: 'Wee gewënnt dëse Streech?' },
  'scoring-4': { type: 'lee-scoring', question: 'Wat ännert sech op der Lee fir all Ekipp? (-=ausgestrach, +=bäigemaach)', intro: 'Fëll d\'Lee aus!' },
};

export const hasQuickCheck = (chapterId: string, stepIndex: number) => !!CHECKS[`${chapterId}-${stepIndex}`];

export const QuickCheck: React.FC<{ chapterId: string; stepIndex: number }> = ({ chapterId, stepIndex }) => {
  const cfg = CHECKS[`${chapterId}-${stepIndex}`];
  const [open, setOpen] = useState(false);
  const [step] = useState<MiniGameStep | null>(() => cfg ? ({
    title: '', description: '', image: '', highlights: [],
    miniGame: { type: cfg.type, question: cfg.question, scenarios: [generateScenario(cfg.type)!] },
  }) : null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  if (!cfg || !step) return null;

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl border border-yellow-300/30 bg-yellow-300/5 overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-white/5">
        <Brain className="w-4 h-4 text-yellow-300 flex-shrink-0" />
        <span className="flex-1 text-sm text-white"><b>Kuerz Test:</b> <span className="text-white/75">{cfg.intro}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-white/60" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-3 pb-3">
              <MiniGameContent
                step={step}
                selectedAnswer={answer}
                showResult={showResult}
                onAnswer={(a) => { setAnswer(a); setShowResult(true); }}
                onReset={() => { setAnswer(null); setShowResult(false); }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
