import React from 'react';
import { motion } from 'motion/react';
import { CardRenderer } from '../CardRenderer';

interface Props {
  card: string;
  faceUp: boolean;
  width: number;
  height: number;
  highlighted?: boolean;
  highlightedGreen?: boolean;
}

/** A card with a front and a back that flips in 3D when `faceUp` changes. */
export const FlipCard: React.FC<Props> = ({ card, faceUp, width, height, highlighted, highlightedGreen }) => (
  <div style={{ width, height, perspective: 600 }}>
    <motion.div
      className="relative w-full h-full"
      style={{ transformStyle: 'preserve-3d' }}
      initial={false}
      animate={{ rotateY: faceUp ? 0 : 180 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        <CardRenderer cardString={card} className="w-full h-full" highlighted={highlighted} highlightedGreen={highlightedGreen} />
      </div>
      <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
        <CardRenderer cardString="" faceDown className="w-full h-full" />
      </div>
    </motion.div>
  </div>
);
