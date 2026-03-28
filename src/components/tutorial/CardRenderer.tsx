import React from 'react';

interface CardRendererProps {
  cardString: string;
  className?: string;
  faceDown?: boolean;
}

export const CardRenderer: React.FC<CardRendererProps> = ({
  cardString,
  className = "w-14 h-20",
  faceDown = false,
}) => {
  const suitMap: Record<string, string> = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
  const match = cardString.match(/^([♠♥♦♣])️?(.*)$/);
  const suitSymbol = match?.[1] || '';
  const rank = match?.[2]?.trim() || '';
  const suit = suitMap[suitSymbol];
  const isRed = suit === 'hearts' || suit === 'diamonds';

  const suitEmoji: Record<string, string> = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' };

  if (faceDown) {
    return (
      <div className={`${className} aspect-[2/3] card-back rounded-lg shadow-md border-2 border-blue-800`} />
    );
  }

  if (!suit || !rank) {
    return (
      <div className={`${className} aspect-[2/3] bg-white rounded-lg flex items-center justify-center text-black font-bold border border-gray-300`}>
        {cardString}
      </div>
    );
  }

  return (
    <div className={`${className} aspect-[2/3] overflow-hidden bg-white rounded-lg shadow-md flex flex-col items-start justify-between p-1 border-2 border-gray-200 select-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
      <div className="leading-none">
        <div className="text-xs font-bold">{rank}</div>
        <div className="text-sm leading-none">{suitEmoji[suit]}</div>
      </div>
      <div className="self-end rotate-180 leading-none">
        <div className="text-xs font-bold">{rank}</div>
        <div className="text-sm leading-none">{suitEmoji[suit]}</div>
      </div>
    </div>
  );
};
