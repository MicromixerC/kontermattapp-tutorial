
import React from 'react';

interface CardRendererProps {
  cardString: string;
  className?: string;
}

export const CardRenderer: React.FC<CardRendererProps> = ({ 
  cardString, 
  className = "w-14 h-24 lg:w-18 lg:h-32" 
}) => {
  const suitMap: { [key: string]: string } = {
    '♠': 'spades',
    '♥': 'hearts',
    '♦': 'diamonds',
    '♣': 'clubs'
  };

  const match = cardString.match(/^([♠♥♦♣])️?(.*)$/);
  const suitSymbol = match?.[1] || '';
  const rank = match?.[2]?.trim() || '';
  const suit = suitMap[suitSymbol];

  const isRed = suit === 'hearts' || suit === 'diamonds';

  const suitSymbols = {
    hearts: '♥️',
    diamonds: '♦️',
    clubs: '♣️',
    spades: '♠️',
  };

  if (!suit || !rank) {
    return (
      <div className={`${className} bg-white rounded-lg flex items-center justify-center text-black font-bold`}>
        {cardString}
      </div>
    );
  }

  return (
    <div className={`${className} aspect-[3/5] overflow-hidden bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-1.5 border-2 transition-transform duration-200 select-none ${isRed ? "text-red-600" : "text-black"}`}>
      <div className="text-left w-full">
        <div className="text-sm font-bold leading-none">{rank}</div>
        <div className="text-lg leading-none">{suitSymbols[suit as keyof typeof suitSymbols]}</div>
      </div>
      <div className="text-left w-full rotate-180">
        <div className="text-sm font-bold leading-none">{rank}</div>
        <div className="text-lg leading-none">{suitSymbols[suit as keyof typeof suitSymbols]}</div>
      </div>
    </div>
  );
};
