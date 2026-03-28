
import React from 'react';
import { Button } from '@/components/ui/button';
import { TutorialChapter } from '@/types/tutorial';
import { Language } from '@/types/tutorial';

interface TutorialChapterListProps {
  chapters: TutorialChapter[];
  selectedLanguage: Language;
  onOpenChapter: (chapterId: string) => void;
  onGoToIndex: () => void;
}

export const TutorialChapterList: React.FC<TutorialChapterListProps> = ({
  chapters,
  selectedLanguage,
  onOpenChapter,
  onGoToIndex
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-500/20 border-orange-400/40 hover:bg-orange-500/30';
      case 'purple':
        return 'bg-purple-500/20 border-purple-400/40 hover:bg-purple-500/30';
      default:
        return 'bg-white/10 border-white/20 hover:bg-white/20';
    }
  };

  return (
    <>
      <div className="space-y-2">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="max-w-sm mx-auto">
            <Button
              onClick={() => onOpenChapter(chapter.id)}
              className={`w-full border transition-all duration-200 rounded-lg text-white font-semibold p-3 h-auto ${getColorClasses(chapter.color)}`}
              variant="ghost"
            >
              <div className="flex items-center w-full">
                <div className="mr-3">
                  {chapter.icon}
                </div>
                <div className="text-left flex-1">
                  <div className="text-sm font-semibold">{chapter.title}</div>
                  <div className="text-xs text-white/80 mt-1">{chapter.description}</div>
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>

      {/* Bottom back button */}
      <div className="mt-6 text-center">
        <Button
          onClick={onGoToIndex}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          size="lg"
        >
          {selectedLanguage === 'lux' && 'Zeréck'}
          {selectedLanguage === 'de' && 'Zurück'}
          {selectedLanguage === 'en' && 'Back'}
          {selectedLanguage === 'fr' && 'Retour'}
        </Button>
      </div>
    </>
  );
};
