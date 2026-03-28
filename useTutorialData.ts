
import { useState, useEffect } from 'react';
import { Language, TutorialChapter } from '@/types/tutorial';
import { chaptersLux } from '@/data/tutorial/chapters-lux';
import { chaptersDe } from '@/data/tutorial/chapters-de';
import { chaptersEn } from '@/data/tutorial/chapters-en';
import { chaptersFr } from '@/data/tutorial/chapters-fr';
import { defaultLanguage } from '@/data/tutorial/languages';

export const useTutorialData = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);
  const [chapters, setChapters] = useState<TutorialChapter[]>(chaptersLux);

  useEffect(() => {
    const loadChapters = async () => {
      switch (selectedLanguage) {
        case 'lux':
          setChapters(chaptersLux);
          break;
        case 'de':
          setChapters(chaptersDe);
          break;
        case 'en':
          setChapters(chaptersEn);
          break;
        case 'fr':
          setChapters(chaptersFr);
          break;
        default:
          setChapters(chaptersLux);
      }
    };

    loadChapters();
  }, [selectedLanguage]);

  return {
    selectedLanguage,
    setSelectedLanguage,
    chapters
  };
};
