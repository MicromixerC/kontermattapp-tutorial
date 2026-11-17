import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlipCard } from './FlipCard';

/**
 * A felt card table where every card has a location and animates to it.
 * Seats: bottom (you), left, top, right — play goes clockwise bottom → left → top → right.
 */

export type Seat = 'bottom' | 'left' | 'top' | 'right';
export const SEATS: Seat[] = ['bottom', 'left', 'top', 'right'];

export type Loc =
  | { kind: 'deck'; i: number }
  | { kind: 'hand'; seat: Seat; i: number; n: number }
  | { kind: 'trick'; seat: Seat; order?: number }
  | { kind: 'pile'; seat: Seat; i: number };

export interface StageCard {
  id: string;
  card: string;
  loc: Loc;
  faceUp?: boolean;
  highlighted?: boolean;
  highlightedGreen?: boolean;
  /** greyed out (e.g. not allowed to play) */
  dim?: boolean;
  /** lifted a bit (e.g. selected) */
  lifted?: boolean;
  /** pulsing glow (e.g. trick winner) */
  glow?: boolean;
  /** shake once when this value changes (e.g. illegal move) */
  shakeKey?: number;
  delay?: number;
  /** extra offset on top of the location (e.g. shuffle / cut motions) */
  offset?: { x: number; y: number };
  /** fly in from this seat's hand when the card first appears */
  enterFrom?: Seat | 'deck';
  onClick?: () => void;
}

export interface SeatInfo {
  name: string;
  team: 'A' | 'B';
  label?: string;
  active?: boolean;
}

interface Props {
  cards: StageCard[];
  seats: Record<Seat, SeatInfo>;
  /** Show the bottom hand bigger and spread out (the player's own hand). */
  bigBottomHand?: boolean;
  /** Small text in the table centre (e.g. "ofhiewen") */
  centerNote?: React.ReactNode;
  /** Badge in the top-right corner, e.g. "Tromp: ♥" */
  cornerBadge?: React.ReactNode;
  overlay?: React.ReactNode;
}

const SIZE = 320; // logical size, scaled to fit the container
const C = SIZE / 2;
const W = 34, H = 48;           // normal card
const BW = 44, BH = 62;         // big bottom-hand card

const TEAM_BG = { A: 'bg-red-500', B: 'bg-blue-500' };

function target(loc: Loc, big: boolean) {
  switch (loc.kind) {
    case 'deck':
      return { x: -loc.i * 0.25, y: -loc.i * 0.35, rotate: 0, z: loc.i, w: W, h: H };
    case 'hand': {
      const off = loc.i - (loc.n - 1) / 2;
      if (loc.seat === 'bottom') {
        return big
          ? { x: off * 38, y: 96, rotate: off * 3, z: 100 + loc.i, w: BW, h: BH }
          : { x: off * 14, y: 100, rotate: 0, z: 100 + loc.i, w: W, h: H };
      }
      if (loc.seat === 'top') return { x: -off * 14, y: -100, rotate: 180, z: 100 + loc.i, w: W, h: H };
      if (loc.seat === 'left') return { x: -106, y: off * 14 + 8, rotate: 90, z: 100 + loc.i, w: W, h: H };
      return { x: 106, y: -off * 14 - 8, rotate: -90, z: 100 + loc.i, w: W, h: H };
    }
    case 'trick': {
      const o = loc.order ?? 0;
      const p = { bottom: [0, 30, -3], left: [-40, -2, -9], top: [0, -34, 4], right: [40, 2, 9] }[loc.seat];
      return { x: p[0], y: p[1], rotate: p[2], z: 300 + o, w: W, h: H };
    }
    case 'pile': {
      const p = { bottom: [-120, 126], left: [-112, -82], top: [-76, -128], right: [112, 70] }[loc.seat];
      return { x: p[0] + loc.i * 0.6, y: p[1] - loc.i * 0.6, rotate: 0, z: 50 + loc.i, w: W * 0.8, h: H * 0.8 };
    }
  }
}

const BADGE_POS: Record<Seat, React.CSSProperties> = {
  bottom: { left: '50%', bottom: 2, transform: 'translateX(-50%)' },
  top: { left: '50%', top: 2, transform: 'translateX(-50%)' },
  left: { left: 4, top: 30 },
  right: { right: 4, bottom: 34 },
};

export const TableStage: React.FC<Props> = ({ cards, seats, bigBottomHand = false, centerNote, cornerBadge, overlay }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1.25, e.contentRect.width / SIZE)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full max-w-sm mx-auto" style={{ height: SIZE * scale }}>
      <div
        className="felt-table relative rounded-3xl shadow-2xl border border-white/10 overflow-hidden select-none"
        style={{ width: SIZE, height: SIZE, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {/* seat badges */}
        {(Object.keys(seats) as Seat[]).map((s) => (
          <motion.div
            key={s}
            className="absolute z-[500]"
            style={BADGE_POS[s]}
            animate={{ scale: seats[s].active ? 1.12 : 1 }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <div className={`px-2 py-0.5 rounded-full text-white text-[10px] font-bold whitespace-nowrap ${TEAM_BG[seats[s].team]} ${seats[s].active ? 'ring-2 ring-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.7)]' : ''}`}>
                {seats[s].name}
              </div>
              <AnimatePresence>
                {seats[s].label && (
                  <motion.div
                    key={seats[s].label}
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-yellow-300 text-[9px] font-bold whitespace-nowrap"
                  >
                    {seats[s].label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {cornerBadge && (
          <div className="absolute top-0 left-0 z-[600]">
            <motion.div
              key={String(cornerBadge)}
              initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="text-[11px] font-bold text-yellow-300 bg-black/50 px-2 py-1 rounded-br-xl border-r border-b border-yellow-400/30"
            >
              {cornerBadge}
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {centerNote && (
            <motion.div
              key={String(centerNote)}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400]"
            >
              <div className="text-white/70 text-xs italic text-center max-w-[120px] mt-24">{centerNote}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {cards.map((c) => {
          const t = target(c.loc, bigBottomHand)!;
          const clickable = !!c.onClick && !c.dim;
          return (
            <motion.div
              key={c.id}
              className="absolute"
              style={{ left: C - t.w / 2, top: C - t.h / 2, zIndex: t.z, cursor: clickable ? 'pointer' : 'default' }}
              initial={c.enterFrom ? (() => { const f = target(c.enterFrom === 'deck' ? { kind: 'deck', i: 0 } : { kind: 'hand', seat: c.enterFrom, i: 0, n: 1 }, bigBottomHand)!; return { x: f.x, y: f.y, rotate: f.rotate, opacity: c.enterFrom === 'deck' ? 1 : 0 }; })() : false}
              animate={{
                x: t.x + (c.offset?.x ?? 0),
                y: t.y + (c.offset?.y ?? 0) - (c.lifted ? 14 : 0),
                rotate: t.rotate,
                opacity: c.dim ? 0.45 : 1,
              }}
              transition={{ type: 'spring', stiffness: 170, damping: 22, delay: c.delay ?? 0 }}
              whileHover={clickable ? { y: t.y - 10, transition: { duration: 0.15 } } : undefined}
              whileTap={clickable ? { scale: 0.95 } : undefined}
              onClick={clickable ? c.onClick : undefined}
            >
              <motion.div
                key={c.shakeKey ?? 0}
                animate={c.shakeKey ? { x: [0, -7, 7, -5, 5, 0] } : undefined}
                transition={{ duration: 0.4 }}
                className={c.glow ? 'rounded-md shadow-[0_0_18px_6px_rgba(253,224,71,0.75)]' : ''}
              >
                {c.glow ? (
                  <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                    <FlipCard card={c.card} faceUp={c.faceUp ?? false} width={t.w} height={t.h} highlighted={c.highlighted} highlightedGreen={c.highlightedGreen} />
                  </motion.div>
                ) : (
                  <FlipCard card={c.card} faceUp={c.faceUp ?? false} width={t.w} height={t.h} highlighted={c.highlighted} highlightedGreen={c.highlightedGreen} />
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {overlay}
      </div>
    </div>
  );
};
