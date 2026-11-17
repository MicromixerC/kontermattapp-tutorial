import React, { useMemo } from 'react';
import { motion } from 'motion/react';

const COLORS = ['#facc15', '#f87171', '#60a5fa', '#4ade80', '#ffffff', '#fb923c'];
const SUITS = ['♠', '♥', '♦', '♣'];

/** A short burst of confetti and card suits. Re-mount (change `key`) to fire again. */
export const Confetti: React.FC<{ count?: number }> = ({ count = 26 }) => {
  const bits = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: (Math.random() - 0.5) * 320,
        y: -60 - Math.random() * 140,
        r: (Math.random() - 0.5) * 720,
        c: COLORS[i % COLORS.length],
        suit: i % 4 === 0 ? SUITS[(i / 4) % 4] : null,
        d: Math.random() * 0.15,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible z-50" aria-hidden>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute font-bold"
          style={{ color: b.c, fontSize: b.suit ? 16 : 0, width: b.suit ? 'auto' : 7, height: b.suit ? 'auto' : 11, background: b.suit ? 'transparent' : b.c, borderRadius: 2 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 220], opacity: [1, 1, 0], rotate: b.r, scale: 1 }}
          transition={{ duration: 1.4, delay: b.d, ease: 'easeOut', times: [0, 0.4, 1] }}
        >
          {b.suit}
        </motion.span>
      ))}
    </div>
  );
};
