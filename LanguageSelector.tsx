
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe } from 'lucide-react';
import { Language } from '@/types/tutorial';
import { languages } from '@/data/tutorial/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  showOnlyFlag?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  showOnlyFlag = false
}) => {
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  // Get dialog title based on selected language
  const getDialogTitle = () => {
    switch (selectedLanguage) {
      case 'lux': return 'Sprooch wielen';
      case 'de': return 'Sprache wählen';
      case 'en': return 'Choose language';
      case 'fr': return 'Choisir la langue';
      default: return 'Sprooch wielen';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
          {showOnlyFlag ? (
            <span className="text-xl">{currentLanguage?.flag}</span>
          ) : (
            <>
              <Globe className="w-4 h-4" />
              {currentLanguage?.flag} {currentLanguage?.name}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-white/20 max-w-[90%] rounded-3xl bg-[#2c7855]">
        <DialogHeader>
          <DialogTitle className="text-white">{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          {languages.map(language => (
            <Button
              key={language.code}
              onClick={() => onLanguageChange(language.code)}
              className={`justify-start gap-3 p-4 h-auto ${
                selectedLanguage === language.code 
                  ? 'bg-white/20 border-white/40 text-white' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
              }`}
              variant="outline"
            >
              <span className="text-2xl">{language.flag}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{language.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
