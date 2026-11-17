import React from 'react';

interface CardRendererProps {
  cardString: string;
  className?: string;
  style?: React.CSSProperties;
  faceDown?: boolean;
  highlighted?: boolean;
  /** Green border ring (for ♣Q special queen) */
  highlightedGreen?: boolean;
  rotated?: boolean;
}

const RANK_DISPLAY: Record<string, string> = {
  A: '1',
  K: 'R',
  Q: 'D',
  J: 'V',
};

export const CardRenderer: React.FC<CardRendererProps> = ({
  cardString,
  className = 'w-14 h-20',
  style,
  faceDown = false,
  highlighted = false,
  highlightedGreen = false,
  rotated = false,
}) => {
  const suitMap: Record<string, string> = {
    '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs',
  };
  const match = cardString.match(/^([♠♥♦♣])️?(.*)$/);
  const suitSymbol = match?.[1] ?? '';
  const rawRank    = match?.[2]?.trim() ?? '';
  const rank       = RANK_DISPLAY[rawRank] ?? rawRank;
  const suit       = suitMap[suitSymbol];
  const isRed      = suit === 'hearts' || suit === 'diamonds';
  const suitChar: Record<string, string> = {
    hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠',
  };

  const borderClass = highlightedGreen
    ? 'border-green-400 ring-2 ring-green-300 ring-offset-1'
    : highlighted
    ? 'border-yellow-400 ring-2 ring-yellow-300 ring-offset-1'
    : 'border-gray-200';

  if (faceDown) {
    return (
      <div className={`${className} flex-shrink-0 card-back rounded-md shadow-md border-2 border-blue-800 ${rotated ? 'rotate-90' : ''}`} />
    );
  }

  if (!suit || !rank) {
    return (
      <div className={`${className} flex-shrink-0 bg-white rounded-md flex items-center justify-center text-black font-bold border border-gray-300 ${rotated ? 'rotate-90' : ''}`}>
        {cardString}
      </div>
    );
  }

  const colorClass = isRed ? 'text-red-600' : 'text-gray-900';

  return (
    <div
      className={`
        ${className} flex-shrink-0 bg-white rounded-md shadow-md border-2 select-none
        flex flex-col
        ${borderClass}
        ${colorClass}
        ${rotated ? 'rotate-90' : ''}
      `}
      style={style}
    >
      {/* Top-left corner */}
      <div className="flex flex-col items-start leading-none px-[8%] pt-[8%]">
        <span className="font-bold" style={{ fontSize: 'clamp(7px, 28%, 13px)', lineHeight: 1.1 }}>{rank}</span>
        <span style={{ fontSize: 'clamp(7px, 28%, 13px)', lineHeight: 1.0 }}>{suitChar[suit]}</span>
      </div>

      {/* Centre suit */}
      <div className="flex-1 flex items-center justify-center">
        <span style={{ fontSize: 'clamp(12px, 55%, 26px)', lineHeight: 1 }}>{suitChar[suit]}</span>
      </div>

      {/* Bottom-right corner:
          We rotate the ENTIRE corner div 180°, which flips it.
          Using items-start in the rotated div means the content is visually
          at the bottom-right (since rotation flips left↔right and top↔bottom). */}
      <div className="flex flex-col items-start leading-none px-[8%] pb-[8%] rotate-180">
        <span className="font-bold" style={{ fontSize: 'clamp(7px, 28%, 13px)', lineHeight: 1.1 }}>{rank}</span>
        <span style={{ fontSize: 'clamp(7px, 28%, 13px)', lineHeight: 1.0 }}>{suitChar[suit]}</span>
      </div>
    </div>
  );
};
