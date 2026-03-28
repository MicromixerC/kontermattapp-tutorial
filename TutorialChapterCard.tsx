import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TutorialChapter } from '@/types/tutorial';
import { CustomAccordionItem, CustomAccordionTrigger, CustomAccordionContent } from './CustomAccordion';
import { ChevronDown } from 'lucide-react';

interface TutorialChapterCardProps {
  chapter: TutorialChapter;
  isOpen: boolean;
  onToggle: () => void;
  onOpenChapter: (chapterId: string) => void;
}

export const TutorialChapterCard: React.FC<TutorialChapterCardProps> = ({
  chapter,
  isOpen,
  onToggle,
  onOpenChapter
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
    <CustomAccordionItem value={chapter.id} isOpen={isOpen} onToggle={onToggle}>
      <CustomAccordionTrigger>
        <div className={`w-full border transition-all duration-200 rounded-lg ${getColorClasses(chapter.color)}`}>
          <div className="flex flex-row items-center justify-between space-y-0 p-3">
            <div className="flex items-center">
              <div className="mr-3 text-white">
                {chapter.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white text-lg font-semibold">
                  {chapter.title}
                </h3>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} />
          </div>
        </div>
      </CustomAccordionTrigger>
      <CustomAccordionContent>
        <div className="px-3 pb-3">
          <p className="text-green-100 mb-4">
            {chapter.description}
          </p>
          <Button 
            onClick={() => onOpenChapter(chapter.id)} 
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30" 
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Kapitel opmaachen
          </Button>
        </div>
      </CustomAccordionContent>
    </CustomAccordionItem>
  );
};
