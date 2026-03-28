import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ChevronDown } from 'lucide-react';
import { TutorialChapter, Language } from '@/types/tutorial';

interface Props {
  chapters: TutorialChapter[];
  selectedLanguage: Language;
  onOpenChapter: (id: string) => void;
}

const colorClasses: Record<string, string> = {
  orange: 'bg-orange-500/20 border-orange-400/40 hover:bg-orange-500/30',
  purple: 'bg-purple-500/20 border-purple-400/40 hover:bg-purple-500/30',
  '':     'bg-white/10 border-white/20 hover:bg-white/20',
};

const backLabels: Record<Language, string> = { lux: 'Zeréck', de: 'Zurück', en: 'Back', fr: 'Retour' };

export const TutorialChapterList: React.FC<Props> = ({ chapters, selectedLanguage, onOpenChapter }) => (
  <div className="space-y-2">
    {chapters.map(chapter => (
      <div key={chapter.id} className="max-w-sm mx-auto">
        <Button
          onClick={() => onOpenChapter(chapter.id)}
          variant="ghost"
          className={`w-full border transition-all duration-200 rounded-lg text-white font-semibold p-3 h-auto ${colorClasses[chapter.color] ?? colorClasses['']}`}
        >
          <div className="flex items-center w-full gap-3">
            <div>{chapter.icon}</div>
            <div className="text-left flex-1">
              <div className="text-sm font-semibold">{chapter.title}</div>
              <div className="text-xs text-white/70 mt-0.5">{chapter.description}</div>
            </div>
            <Play className="w-4 h-4 text-white/50 flex-shrink-0" />
          </div>
        </Button>
      </div>
    ))}
  </div>
);
