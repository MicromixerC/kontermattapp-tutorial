import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Info, X } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { Language } from '@/types/tutorial';

interface Props {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onClose?: () => void;
  onShowOriginInfo?: () => void;
}

const subtitles: Record<Language, string> = {
  lux: "Léier d'Spillreegelen a gëff e Meeschter am Konter&Matt!",
  de:  "Lerne die Spielregeln und werde ein Meister in Konter&Matt!",
  en:  "Learn the game rules and become a master at Konter&Matt!",
  fr:  "Apprenez les règles et devenez un maître de Konter&Matt!",
};

export const TutorialHeader: React.FC<Props> = ({ selectedLanguage, onLanguageChange, onClose, onShowOriginInfo }) => (
  <>
    <div className="flex justify-between items-start mb-4">
      {/* Language switcher hidden until translations are complete */}
      <div />
      {onClose && (
        <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
          <X className="w-5 h-5" />
        </Button>
      )}
    </div>

    <div className="flex justify-center mb-3">
      <GraduationCap className="h-12 w-12 text-white opacity-90" />
    </div>

    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-white leading-tight flex items-center justify-center gap-2">
        <span>Konter &amp; Matt<br />Tutorial</span>
        {onShowOriginInfo && (
          <button
            onClick={onShowOriginInfo}
            className="bg-white/20 hover:bg-white/35 border border-white/30 rounded-full w-6 h-6 flex items-center justify-center transition-all flex-shrink-0 self-start mt-1"
            title="Ursprong vu Konter&Matt"
          >
            <Info size={12} className="text-white" />
          </button>
        )}
      </h1>
      <p className="text-green-100 mt-2 text-sm">{subtitles[selectedLanguage]}</p>
    </div>
  </>
);
