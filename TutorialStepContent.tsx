
import React, { useState, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { TutorialStep, MiniGameStep, QuizStep } from '@/types/tutorial';
import { MiniGameContent } from './MiniGameContent';
import { QuizContent } from './QuizContent';
import { CardRenderer } from './CardRenderer';
interface TutorialStepContentProps {
  step: TutorialStep;
  selectedAnswer: string | null;
  showResult: boolean;
  quizAnswers: Record<number, string>;
  quizComplete: boolean;
  quizScore: number;
  onMiniGameAnswer: (answer: string) => void;
  onQuizAnswer: (questionIndex: number, answer: string) => void;
  onQuizSubmit: () => void;
  onResetMiniGame?: () => void;
}

// Type guards
const isMiniGameStep = (step: TutorialStep): step is MiniGameStep => {
  return 'miniGame' in step;
};
const isQuizStep = (step: TutorialStep): step is QuizStep => {
  return 'quiz' in step;
};

// Function to process text and add popovers for specific words
const processTextWithPopovers = (text: string) => {
  const popoverWords = {
    'Konter & Matt': 'Konter & Matt ass de Numm vun dësem Lëtzebuerger Kaartespill.',
    'Tromp': 'Déi stäerkste Kaarten am Spill. Kaarte vun der Trompfaarf plus déi 3 Dammen♠♥♦.',
    'Trompfaarf': 'Déi Faarf (♠♥♦♣) déi dës Ronn méi staark ass',
    'Streech': 'Ee Spill-Zuch wou déi 4 Spiller eng Kaart spillen. Déi stäerkste Kaart gewënnt.',
    'Schrom': 'De Punktwäert vun de Kaarten (A=4P,K=3P,D=2P,J=1P,10=0P,9=0P) ass onofhängeg vun der Trompfaarf an der Rangfolleg.',
    'Lee': 'De Punktesystem wou d\'Gewënner vun all Spill festgehalen ginn. 9 Linnen um Ufank, bis 0 Linnen fir ze gewannen.',
    'Konter': 'Eng Annonce mat Häerzer-Damm an Rauten-Damm, déi de Wäert vum Spill erhéicht (+1).',
    'Matt': 'Eng Annonce mat Schëppen-Damm, déi de Wäert vum Spill erhéicht (+1).',
    'Ausdeeler': 'All Ronn/Spill deelt en aner Spiller d\'Kaarten aus. Dës Roll wiesselt mat der Auer.',
    'hieft of': 'De Kaartekoup an 2 deelen an den ënneschten Deel vum Koup op den iewechten Deel vum Koup leeën',
    'ofhiewen': 'De Kaartekoup an 2 deelen an den ënneschten Deel vum Koup op den iewechten Deel vum Koup leeën',
    'Annonce': 'Annoncen, um Ufank vum Spill, erhéijen de Wäert vum Spill - et gëtt méi ze gewannen awer och méi ze verléieren',
    'Rangfolleg': 'D\'Rangfolleg vun de Kaarten leet fest wéi eng Kaart am stäerksten ass. D\'Rangfolleg ännert jee nodeems wéi eng Faarf Tromp ass.',
    'normal': 'Eng Kaart déi keng Tromp ass, z.B. well d\'Trompfaarf grad eng aner ass, wéi d\'Faarf vun der Kaart',
    'bekennen': 'Bekennen heescht, eng Kaart vun der selwechter Faarf spillen, wéi d\'Faarf vn der éischter Kaart vum aktuelle Streech.',
    'Trompstreech': 'E Streech wou déi éischt ausgespillte Kaart eng Tromp ass.',
    'Faarf': '(Schëppen♠, Häerzer♥, Rauten♦, Kräizer♣)',
    'Faarwen': '(Schëppen♠, Häerzer♥, Rauten♦, Kräizer♣)',
    'Rang': 'Je nodeems wéieng Faarf Tromp ass, ännert d\'Rangfolleg vun de Kaarten.\nTrompkaarten sinn ëmmer méi staark wéi Nët-Tromp Kaarten.',
    'Stänner': 'De Punktestand vun engem Gläichstand (20:20) gëtt Stänner genannt.',
    'Spill': 'E Spill dat si 6 Streech.',
    'Partie': 'Et brauch e puer Ronnen/Spiller bis eng Partie eriwer ass.',
    'Trompwahl': 'De Spiller, lénks vum Ausdeeler, decidéiert wéi eng Faarf dës Ronn zur Tromp gëtt.\nAll d\'Kaarte vun där Faarf klammen doduerch am Rang.'
  };
  let processedText = text;
  const elements: JSX.Element[] = [];
  let keyCounter = 0;

  // Process each popover word
  Object.entries(popoverWords).forEach(([word, explanation]) => {
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');

    // Replace each occurrence with a unique placeholder
    processedText = processedText.replace(regex, (match, offset) => {
      const key = `popover-${keyCounter++}`;
      const placeholder = `__POPOVER_${key}__`;

      // Create a popover element for this specific occurrence
      elements.push(<Popover key={key}>
          <PopoverTrigger asChild>
            <span className="underline decoration-dotted cursor-help text-yellow-200 hover:text-yellow-100">
              {word}
            </span>
          </PopoverTrigger>
          <PopoverContent className="bg-white border border-gray-200 shadow-lg p-3 w-auto max-w-xs z-[200]">
            <p className="text-sm text-gray-800 whitespace-pre-line">{explanation}</p>
          </PopoverContent>
        </Popover>);
      return placeholder;
    });
  });

  // Split text and insert popover elements
  const parts = processedText.split(/(__POPOVER_popover-\d+__)/);
  return parts.map((part, index) => {
    const match = part.match(/__POPOVER_(popover-\d+)__/);
    if (match) {
      const element = elements.find(el => el.key === match[1]);
      return element || part;
    }
    return part;
  });
};

// Function to process suit symbols and add colors
const processSuitSymbols = (text: string) => {
  return text.split(/(♠|♥|♦|♣)/).map((part, index) => {
    switch (part) {
      case '♠':
      case '♣':
        return <span key={index} className="text-gray-800">{part}</span>;
      case '♥':
      case '♦':
        return <span key={index} className="text-red-500">{part}</span>;
      default:
        return part;
    }
  });
};

// Function to convert line breaks to JSX elements
const processLineBreaks = (text: string) => {
  return text.split('\n').map((line, index, array) => <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>);
};
export const TutorialStepContent: React.FC<TutorialStepContentProps> = ({
  step,
  selectedAnswer,
  showResult,
  quizAnswers,
  quizComplete,
  quizScore,
  onMiniGameAnswer,
  onQuizAnswer,
  onQuizSubmit,
  onResetMiniGame
}) => {
  // Local state to handle tooltip visibility and image loading
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset image state when step changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [step.image]);
  const toggleTooltip = (index: number) => {
    setOpenTooltip(openTooltip === index ? null : index);
  };
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  const handleImageError = () => {
    console.log('Image failed to load:', step.image);
    setImageError(true);
    setImageLoaded(false);
  };

  // Process the description text with line breaks, popovers, and suit symbols
  const processedDescription = () => {
    // First split by line breaks
    const lines = step.description.split('\n');
    return lines.map((line, lineIndex) => <React.Fragment key={lineIndex}>
        {processTextWithPopovers(line).map((element, index) => {
        if (typeof element === 'string') {
          return <span key={index}>{processSuitSymbols(element)}</span>;
        }
        return element;
      })}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>);
  };

  // Check if this is a mini-game step - hide images and duplicate content for mini-games
  const isCurrentlyMiniGame = isMiniGameStep(step);
  return <div className="flex flex-col lg:flex-row gap-4">
      {/* Text content - now on top/left */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white/10 rounded-lg p-4 flex-1 py-[4px]">
          {/* Only show title and description if NOT a mini-game or if description is not empty */}
          {(!isCurrentlyMiniGame || step.description) && <>
              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              {step.description && <div className="text-green-100 text-sm leading-relaxed mb-1">
                  {processedDescription()}
                </div>}
            </>}

          {/* Mini-game content */}
          {isMiniGameStep(step) && <MiniGameContent step={step} selectedAnswer={selectedAnswer} showResult={showResult} onAnswer={onMiniGameAnswer} onReset={onResetMiniGame} />}

          {/* Quiz content */}
          {isQuizStep(step) && <QuizContent step={step} quizAnswers={quizAnswers} quizComplete={quizComplete} quizScore={quizScore} onAnswer={onQuizAnswer} onSubmit={onQuizSubmit} />}
          
        </div>
      </div>

      {/* Image with highlights - now on bottom/right - Hide for mini-games */}
      {!isCurrentlyMiniGame && <div className="flex-1 relative">
          <div className="bg-white/10 rounded-lg p-3 h-full min-h-[250px] flex items-center justify-center relative">
            <div className="w-full h-full bg-white/5 rounded-lg flex items-center justify-center relative overflow-hidden">
              {step.image && !imageError && <img key={step.image} // Force re-render when image changes
          src={step.image} alt={step.title} className={`max-w-full max-h-full object-contain rounded-lg transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={handleImageLoad} onError={handleImageError} />}
              
              {/* Loading state */}
              {step.image && !imageLoaded && !imageError && <div className="text-center text-white/60 flex flex-col items-center justify-center">
                  <div className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full mb-2"></div>
                  <p className="text-xs">Bild gëtt gelueden...</p>
                </div>}
              
              {/* Fallback placeholder - shown if no image or image fails to load */}
              {(!step.image || imageError) && <div className="text-center text-white/60 flex flex-col items-center justify-center">
                  <div className="text-4xl mb-2">🃏</div>
                  <p className="text-xs">Spill-Screenshot</p>
                </div>}
              
              {/* Highlight points - only show when image is loaded */}
              {imageLoaded && step.highlights.map((highlight, index) => <div key={index} className="absolute" style={{
            left: `${highlight.x}%`,
            top: `${highlight.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 50
          }}>
                  <Popover open={openTooltip === index} onOpenChange={open => setOpenTooltip(open ? index : null)}>
                    <PopoverTrigger asChild>
                      <Button size="sm" onClick={() => toggleTooltip(index)} className="w-5 h-5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black p-0 transition-all duration-200 shadow-lg border-2 border-yellow-600">
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white border border-gray-200 shadow-lg p-2 w-auto max-w-sm min-w-fit z-[200]" side="top" align="center">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs text-gray-800 leading-relaxed whitespace-nowrap">
                          {highlight.content}
                        </p>
                        <Button size="sm" variant="ghost" className="w-4 h-4 p-0 hover:bg-gray-100 flex-shrink-0" onClick={() => setOpenTooltip(null)}>
                          <X className="w-2 h-2" />
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>)}
            </div>
          </div>
        </div>}
    </div>;
};
