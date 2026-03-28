
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, X, Book } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { Language } from '@/types/tutorial';
import RulesSheet from '@/components/RulesSheet';

interface TutorialHeaderProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onClose: () => void;
}

export const TutorialHeader: React.FC<TutorialHeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  onClose
}) => {
  return <>
      {/* Header with language selector and close button */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex justify-start">
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} showOnlyFlag={true} />
        </div>
        <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Title and description */}
      <div className="flex justify-center mb-4">
        <GraduationCap className="h-15 w-15 text-white -my-[16px]" />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white leading-tight">
          Konter & Matt<br />
          Tutorial
        </h1>
        <p className="text-green-100 mt-3 text-sm">
          {selectedLanguage === 'lux' && 'Léier d\'Spillreegelen a gëff e Meeschter am Konter&Matt!'}
          {selectedLanguage === 'de' && 'Lerne die Spielregeln und werde ein Meister in Konter&Matt!'}
          {selectedLanguage === 'en' && 'Learn the game rules and become a master at Konter&Matt!'}
          {selectedLanguage === 'fr' && 'Apprenez les règles et devenez un maître de Konter&Matt!'}
        </p>
        
        {/* Book icon and Spillreegelen link */}
        <div className="mt-4 flex justify-center">
          <RulesSheet 
            trigger={
              <button className="flex items-center gap-2 text-green-100 hover:text-white transition-colors cursor-pointer">
                <Book className="h-4 w-4" />
                <span className="text-sm underline">Spillreegelen</span>
              </button>
            } 
            side="left" 
          />
        </div>
      </div>
    </>;
};
