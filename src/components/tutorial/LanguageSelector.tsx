import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe } from 'lucide-react';
import { Language } from '@/types/tutorial';
import { languages } from '@/data/tutorial/languages';

interface Props {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  showOnlyFlag?: boolean;
}

export const LanguageSelector: React.FC<Props> = ({ selectedLanguage, onLanguageChange, showOnlyFlag = false }) => {
  const current = languages.find(l => l.code === selectedLanguage);
  const titles: Record<Language, string> = { lux: 'Sprooch wielen', de: 'Sprache wählen', en: 'Choose language', fr: 'Choisir la langue' };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
          {showOnlyFlag
            ? <span className="text-xl">{current?.flag}</span>
            : <><Globe className="w-4 h-4" />{current?.flag} {current?.name}</>
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="border-white/20 max-w-[90%] rounded-3xl bg-[#2c7855]">
        <DialogHeader>
          <DialogTitle className="text-white">{titles[selectedLanguage]}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          {languages.map(lang => (
            <Button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              variant="outline"
              className={`justify-start gap-3 p-4 h-auto ${selectedLanguage === lang.code ? 'bg-white/20 border-white/40 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
