import React from 'react';
import { TutorialChapter, Language } from '@/types/tutorial';
import { X } from 'lucide-react';

interface Props {
  chapters: TutorialChapter[];
  selectedLanguage: Language;
  onOpenChapter: (id: string, startStep?: number) => void;
  onShowOriginInfo?: () => void;
}

// The origin slide content (moved from basics slide 0)
const OriginInfo: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
    <div className="relative z-10 bg-gradient-to-b from-blue-800 to-blue-900 border border-white/20 rounded-2xl p-5 max-w-xs w-full shadow-2xl" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-3 right-3 text-white/60 hover:text-white"><X size={18}/></button>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇱🇺</span>
          <p className="text-white font-bold text-sm">E Lëtzebuerger Kaartespill</p>
        </div>
        <div className="border-t border-white/10 pt-3">
          <p className="text-white/60 text-xs font-bold mb-1">Och bekannt als:</p>
          <div className="flex flex-wrap gap-1.5">
            {['Kontramitt','Konter&Mitt','Konter a Matt','Kontermatt'].map(n => (
              <span key={n} className="bg-white/10 px-2 py-0.5 rounded-full text-white/80 text-xs">{n}</span>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-3">
          <p className="text-white/60 text-xs font-bold mb-1">Ursprong:</p>
          <p className="text-white/80 text-xs leading-relaxed">
            Verwandt mat <em>Klaberjass</em> a <em>Klaverjas</em> aus de Nidderlanden. Koum üwwer d'Jore op Lëtzebuerg.
          </p>
        </div>
        <div className="border-t border-white/10 pt-3 flex items-center gap-2 text-white/50 text-xs">
          <span>🌍</span>
          <span>Nederland · Belsch · Lëtzebuerg</span>
        </div>
      </div>
    </div>
  </div>
);

export const TutorialChapterList: React.FC<Props> = ({ chapters, onOpenChapter, onShowOriginInfo }) => {
  const basics      = chapters.find(c => c.id === 'basics');
  const quiz        = chapters.find(c => c.id === 'quiz');
  const minigames   = chapters.find(c => c.id === 'minigames');
  const listChapters = chapters.filter(c =>
    c.id !== 'basics' && c.id !== 'quiz' && c.id !== 'minigames'
  );

  const regularTile = (chapter: TutorialChapter) => {
    // dealing has only 1 slide — go directly to it
    const isDealing = chapter.id === 'dealing';
    return (
      <button
        key={chapter.id}
        onClick={() => onOpenChapter(chapter.id, isDealing ? 0 : undefined)}
        className="w-full bg-white/12 border border-white/25 hover:bg-white/22 hover:border-white/45
          rounded-2xl p-4 text-left transition-all duration-200 active:scale-95 shadow-sm
          flex items-center gap-4"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <div className="text-white flex-shrink-0">{chapter.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-sm leading-tight mb-0.5">{chapter.title}</div>
          <div className="text-white/60 text-xs leading-snug">{chapter.description}</div>
        </div>

      </button>
    );
  };

  return (
    <div className="max-w-lg mx-auto space-y-3">
      {/* BASICS — full width */}
      {basics && (
        <button
          onClick={() => onOpenChapter(basics.id)}
          className="w-full bg-white/12 border border-white/25 hover:bg-white/22 hover:border-white/45
            rounded-2xl p-5 text-left transition-all duration-200 active:scale-95 shadow-sm
            flex items-center gap-4"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <div className="text-white flex-shrink-0">{basics.icon}</div>
          <div>
            <div className="text-white font-bold text-base leading-tight mb-1">{basics.title}</div>
            <div className="text-white/60 text-xs leading-snug">{basics.description}</div>
          </div>

        </button>
      )}

      {/* LIST: dealing / bidding / playing / scoring */}
      {listChapters.length > 0 && (
        <div className="flex flex-col gap-2">
          {listChapters.map(ch => regularTile(ch))}
        </div>
      )}

      {/* MINI-GAMES — round pill */}
      {minigames && (
        <button
          onClick={() => onOpenChapter(minigames.id)}
          className="w-full bg-orange-500/25 border border-orange-400/50
            hover:bg-orange-500/40 hover:border-orange-300/70
            rounded-full py-4 px-6 transition-all duration-200 active:scale-95 shadow-sm
            flex items-center justify-center gap-3"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <div className="text-white">{minigames.icon}</div>
          <div className="text-center">
            <div className="text-white font-bold text-sm">{minigames.title}</div>
            <div className="text-orange-200/70 text-xs">{minigames.description}</div>
          </div>
          <div className="ml-2 bg-orange-400/30 rounded-full px-2 py-0.5 text-orange-200 text-xs font-bold flex-shrink-0">
            {minigames.steps.length} Spillecher
          </div>
        </button>
      )}

      {/* QUIZ — full width */}
      {quiz && (
        <button
          onClick={() => onOpenChapter(quiz.id)}
          className="w-full bg-purple-500/25 border border-purple-400/50
            hover:bg-purple-500/40 hover:border-purple-300/70
            rounded-2xl p-5 text-left transition-all duration-200 active:scale-95 shadow-sm
            flex items-center gap-4"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <div className="text-white flex-shrink-0">{quiz.icon}</div>
          <div>
            <div className="text-white font-bold text-base leading-tight mb-1">{quiz.title}</div>
            <div className="text-white/60 text-xs leading-snug">{quiz.description}</div>
          </div>
          <div className="ml-auto flex-shrink-0 bg-purple-400/30 rounded-full px-2 py-1 text-purple-200 text-xs font-bold">
            {quiz.steps[0] && 'quiz' in quiz.steps[0]
              ? `${(quiz.steps[0] as any).quiz.questions.length} Froen`
              : ''}
          </div>
        </button>
      )}

    </div>
  );
};
