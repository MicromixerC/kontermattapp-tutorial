
import { useState, useEffect } from 'react';

export const useMiniGameSelection = (isMultiSelectGame: boolean, showResult: boolean, gameType: string, stepKey?: string) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  // Reset selected cards when game type or step changes
  useEffect(() => {
    setSelectedCards([]);
  }, [gameType, stepKey]);

  // Handle card selection for multi-select games
  const handleCardSelect = (cardValue: string) => {
    if (!isMultiSelectGame || showResult) return;
    
    setSelectedCards(prev => {
      if (prev.includes(cardValue)) {
        return prev.filter(card => card !== cardValue);
      } else {
        return [...prev, cardValue];
      }
    });
  };

  // Reset selected cards
  const resetSelectedCards = () => {
    setSelectedCards([]);
  };

  return {
    selectedCards,
    handleCardSelect,
    resetSelectedCards
  };
};
