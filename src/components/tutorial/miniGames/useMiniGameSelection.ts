import { useState, useEffect } from 'react';

export const useMiniGameSelection = (
  isMultiSelect: boolean,
  showResult: boolean,
  gameType: string,
  stepKey?: string,
) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  useEffect(() => { setSelectedCards([]); }, [gameType, stepKey]);

  const handleCardSelect = (card: string) => {
    if (!isMultiSelect || showResult) return;
    setSelectedCards(prev =>
      prev.includes(card) ? prev.filter(c => c !== card) : [...prev, card]
    );
  };

  return { selectedCards, handleCardSelect, resetSelectedCards: () => setSelectedCards([]) };
};
