
import { Language, LanguageOption } from '@/types/tutorial';

export const languages: LanguageOption[] = [
  {
    code: 'lux',
    name: 'Lëtzebuergesch',
    flag: '🇱🇺'
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  }
];

export const defaultLanguage: Language = 'lux';
