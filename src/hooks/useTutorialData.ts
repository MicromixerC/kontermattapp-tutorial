import { useState, useEffect } from 'react';
import { Language, TutorialChapter } from '@/types/tutorial';
import { chaptersLux } from '@/data/tutorial/chapters-lux';
import { defaultLanguage } from '@/data/tutorial/languages';

export const useTutorialData = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);
  const [chapters, setChapters] = useState<TutorialChapter[]>(chaptersLux);

  useEffect(() => {
    const load = async () => {
      switch (selectedLanguage) {
        case 'lux': { const { chaptersLux } = await import('@/data/tutorial/chapters-lux'); setChapters(chaptersLux); break; }
        case 'de':  { const { chaptersDe }  = await import('@/data/tutorial/chapters-de');  setChapters(chaptersDe);  break; }
        case 'en':  { const { chaptersEn }  = await import('@/data/tutorial/chapters-en');  setChapters(chaptersEn);  break; }
        case 'fr':  { const { chaptersFr }  = await import('@/data/tutorial/chapters-fr');  setChapters(chaptersFr);  break; }
        default:    { const { chaptersLux } = await import('@/data/tutorial/chapters-lux'); setChapters(chaptersLux); break; }
      }
    };
    load();
  }, [selectedLanguage]);

  return { selectedLanguage, setSelectedLanguage, chapters };
};
