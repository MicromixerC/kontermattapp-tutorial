import React from 'react';
import { BookOpen, Layers, Megaphone, Trophy, Play, Gamepad2, GraduationCap } from 'lucide-react';
import { TutorialChapter } from '@/types/tutorial';

export const chaptersLux: TutorialChapter[] = [
  {
    id: 'basics',
    title: 'Spillgrondlagen',
    description: 'Léier d\'Basis vu Konter & Matt',
    icon: React.createElement(BookOpen, { className: "w-6 h-6" }),
    color: '',
    steps: [
      {
        title: 'D\'Spiller an d\'Ekippen',
        description: 'Konter & Matt ass e Lëtzebuerger Kaartespill fir 4 Spiller, déi an zwou Ekippen opgedeelt, géintenee spillen.\n\nD\'Ekippe sëtzen iwwer Kräiz, sou datt d\'Spiller vun enger Ekipp sech jeeweils géinteniwwer sëtzen.',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/01.png',
        highlights: [{
          x: 50,
          y: 12,
          content: 'Mat dir an der Ekipp'
        }, {
          x: 78,
          y: 44,
          content: 'An der Ekipp mam Jupp'
        }, {
          x: 50,
          y: 70,
          content: 'Du spills mam Mariette'
        }, {
          x: 22,
          y: 44,
          content: 'An der Ekipp mam Jeanny'
        }]
      },
      {
        title: 'Streech',
        description: 'Am Spill gëtt ee Streech nom aner gespillt.\n\nAll Spiller spillt genau eng Kaart, een nom aner, der Auer no - déi 4 Kaarten um Dësch nennt en dann e Streech.\nDe Spiller mat der stäerkste Kaart, no de Reegele vu Konter&Matt, kann déi 4 Kaarten asammelen (a leet se verdeckt bei sech op e Koup).',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/02.png',
        highlights: [{
          x: 50,
          y: 50,
          content: '4 Kaarten = e Streech'
        }, {
          x: 50,
          y: 85,
          content: 'déi stäerkste Kaart gewënnt'
        }]
      },
      {
        title: 'D\'Kaarten',
        description: 'Et gëtt mat 24 Kaarten gespillt:\n\n9, 10, J(Bauer), D(Damm), K(Kinnek) an 1(Ass) vun all Faarf(♠ ♥ ♦ ♣)',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/03.png',
        highlights: [{
          x: 10,
          y: 20,
          content: 'Häerzer'
        }, {
          x: 10,
          y: 43,
          content: 'Rauten'
        }, {
          x: 10,
          y: 68,
          content: 'Schëppen'
          }, {
          x: 10,
          y: 80,
          content: 'Kräiz'
        }]
      },
      {
        title: 'Tromp',
        description: 'All Ronn gëtt, um Ufank vum Spill, eng vun de véier Faarwen zur Tromp erklärt. Doduerch ginn all d\'Kaarte vun där Faarf zur Tromp, an domat sinn si déi stäerkste Kaarten am Spill.\n\nOpgepasst: All Ronn decidéiert en aner Spiller d\'Trompfaarf.\n\nDéi Ekipp déi d\'Tromp mécht, huet déi Ronn méi ze verléieren!',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/04.png',
        highlights: [{
          x: 60,
          y: 50,
          content: 'Et kann all Ronn just eng Faarf Tromp sinn'
        }, {
          x: 15,
          y: 22,
          content: 'Kaarte vun der Trompfaarf klammen am Rang'
        }]
      },
      {
        title: 'Spezial-Trëmp',
        description: 'D\'Schëppen-Damm(♠D), Häerzer-Damm(♥D) an Rauten-Damm(♦D) sinn ëmmer Tromp, egal wat d\'Trompfaarf ass!\n\nD\'Schëppen-Damm(♠D) gëtt och nach "Matt" genannt, d\'Häerzer-Damm(♥D) ass déi "déck Konter" an d\'Rauten-Damm(♦D) déi "kleng Konter".\n\nD\'Kräizer-Damm(♣D) ass just Tromp, wann d\'Trompfaarf ♣Kräizer ass.',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/05.png',
        highlights: [{
          x: 23,
          y: 50,
          content: '♠D - Ëmmer Tromp!'
        }, {
          x: 50,
          y: 50,
          content: '♦D - Ëmmer Tromp!'
        }, {
          x: 67,
          y: 50,
          content: '♥D - Ëmmer Tromp!'
          }, {
          x: 33,
          y: 90,
          content: '♣D - just Tromp, wa ♣ Trompfaarf ass!'
        }]
      },
      {
        title: 'D\'Rangfolleg vun de Kaarten',
        description: 'Je nodeems wéieng Faarf Tromp ass, ännert d\'Rangfolleg vun de Kaarten.\n\nTromp-Ass ass ëmmer déi stäerkste Kaart am Spill. Direkt hannen drun kommen déi 3 Dammen (♠♥♦) an dann all di aner Kaarte vun der Trompfaarf. Dono réischt kommen d\'Kaarte vun deenen aner 3 Faarwen.\n\nWann ♠/♦/♥ Tromp ass, da sinn et 8 Trëmp, a wa ♣ Tromp ass, da ginn et 9 Trëmp.\nD\'Rangfolleg vu Nët-Tromp Kaarten ass A>K>D>J>10>9',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/06.png',
        highlights: [{
          x: 95,
          y: 20,
          content: '8 Trëmp wann Häerzer Tromp ass'
        }, {
          x: 95,
          y: 40,
          content: '8 Trëmp wa Rauten Tromp ass'
        }, {
          x: 95,
          y: 60,
          content: '8 Trëmp wa Schëppen Tromp ass'
          }, {
          x: 99,
          y: 84,
          content: '9 Trëmp wann Häerzer Tromp ass!'
          }, {
          x: 30,
          y: 50,
          content: 'Tromp-Ass ass ëmmer déi stäerkste Kaart'
          }, {
          x: 40,
          y: 50,
          content: 'Déi 3 Dammen (♠D,♥D,♦D) sinn ëmmer op Positioun 2,3 a 4'
        }]
      },
      {
        title: 'E Spill/eng Ronn',
        description: 'Et gi 6 Streech gespillt, an dann ass e Spill riwwer. Dono ginn d\'Punkte vun de gewonnene Kaarte vun all Ekipp gezielt fir d\'Gewënnerekipp ze ermëttelen.\n\nDe Punktwäert vun enger Kaart, och genannt Schrom, huet näischt mat der Trompfaarf an och näischt mat der Rangfolleg ze dinn.\n\nA=4P, K=3P, Q=2P, J=1P, 10=0P, 9=0P.',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/07.png',
        highlights: [{
          x: 30,
          y: 50,
          content: 'E Kinnek ass 3 Punkte wäert'
        }, {
          x: 70,
          y: 50,
          content: 'E Bauer ass 1 Punkt wäert'
          }, {
          x: 60,
          y: 46,
          content: 'Eng Damm ass 2 Punkte wäert'
          }, {
          x: 43,
          y: 40,
          content: 'En Ass ass 4 Punkte wäert'
          }, {
          x: 64,
          y: 90,
          content: 'Eng 10 ass 0 Punkte wäert'
          }, {
          x: 10,
          y: 90,
          content: 'Eng 9 ass 0 Punkte wäert'
        }]
      },
      {
        title: 'D\'Lee',
        description: 'No all Spill gëtt an engem Stréchsystem festgehal, wie gewonnen huet. Dëse System gëtt Lee genannt.\n\nEt ginn 1 bis 4 Linnen ausgestrach fir de Gewënner, an 0 bis 4 Linne bäigezeechent fir de Verléierer, jee nodeems wéi d\'Spill verlaf ass.',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/08.png',
        highlights: [{
          x: 50,
          y: 40,
          content: 'Déi rout Ekipp huet schonn 2 Linnen ausgestrach (=gutt)'
          }, {
          x: 50,
          y: 75,
          content: 'Déi blo Ekipp huet nach 9 Linnen'
        }]
      },
      {
        title: 'Gesamtgewënner',
        description: 'Wann eng Ekipp all hir Strécher duerchgestrach huet, huet se d\'Partie gewonnen.\n\nEt dauert mindestens 3 Spiller/Ronnen bis d\'Gewënner vun der Partie feststinn.',
        image: '/lovable-uploads/Tutorial/Spillgrondlagen/09.png',
        highlights: [{
          x: 50,
          y: 40,
          content: 'Eng Partie kann iwwer 1 Stonn daueren!'
        }]
      }
    ]
  },
  {
    id: 'dealing',
    title: '1: Kaarten ausdeelen',
    description: 'Wéi d\'Kaarten ausgedeelt ginn',
    icon: React.createElement(Layers, { className: "w-6 h-6" }),
    color: '',
    steps: [
      {
        title: 'Stécken an ofhiewen',
        description: '1) Den Ausdeeler stéckt d\'Kaarten\n\n2) Den Ausdeeler leet de ganze Koup Kaarte virun de (géigneresche) Spiller, dee riets vun him sëtzt.\n\n3) De rietse Spiller muss elo ofhiewen.\n\n4) Den Ausdeeler hëlt de Koup erëm bei sech.\n\n5) Den Ausdeeler fänkt u mat ausdeelen an 2 Etappen.',
        image: '/lovable-uploads/Tutorial/Ausdeelen/01.png',
        highlights: [{
          x: 50,
          y: 50,
          content: 'Den Ausdeeler stéckt déi 24 Kaarten.'
        }]
      },
      {
        title: 'Éischt Verdeelen',
        description: 'Den Ausdeeler deelt elo, der Auer no, all Spiller 3 Kaarten aus.\n\nDéi reschtlech 12 Kaarten bleiwe virleefeg am Pak.\n\nDe Spiller lénks vum Ausdeeler, wielt elo d\'Tromp aus.',
        image: '/lovable-uploads/Tutorial/Ausdeelen/02.png',
        highlights: [{
          x: 50,
          y: 30,
          content: 'All Spiller kritt 3 Kaarten.'
        }]
      },
      {
        title: 'Zweet Verdeelen',
        description: 'No der Trompwahl kritt all Spiller 3 weider Kaarten ausgedeelt.\nAll Spiller huet domat eng Hand mat 6 Kaarten, wann d\'Spill ugeet.\nDe Spiller lénks vum Ausdeeler spillt déi éischt Kaart.',
        image: '/lovable-uploads/Tutorial/Ausdeelen/03.png',
        highlights: [{
          x: 50,
          y: 70,
          content: 'Mat 6 Kaarten an der Hand geet d\'Spill un'
        }]
      }
    ]
  },
  {
    id: 'bidding',
    title: '2: Schwätzen',
    description: 'Annoncen a Schwätzen',
    icon: React.createElement(Megaphone, { className: "w-6 h-6" }),
    color: '',
    steps: [
      {
        title: 'Eng Annonce maachen',
        description: 'Beim Spill Konter & Matt kann all Spiller eng Annonce maachen (virausgesat en huet déi néideg Kaarten an der Hand) an domat de Wäert vum Spill erhéijen.\nD\'Gewënnerekipp vum Spill kann duerch déi Annoncë méi Punkte gewannen.\n\nEsou eng Annonce maachen, nennt e „schwätzen".',
        image: '/lovable-uploads/Tutorial/Schwaetzen/01.png',
        highlights: [{
          x: 40,
          y: 50,
          content: 'Annonce = Schwätzen'
        }]
      },
      {
        title: 'Firwat soll e schwätzen?',
        description: 'Wann e sech gutt Chancen ausrechent fir ze gewannen, kann e mat enger Annonce méi Asaz gewannen, mee natierlech och méi Asaz verléieren.\n\nMéi Spiller kënnen eng Annonce maachen a mat all Annonce erhéicht sech de Wäert vum Spill - et ass dobäi ganz egal ween d\'Annonce mécht.',
        image: '/lovable-uploads/Tutorial/Schwaetzen/02.png',
        highlights: [{
          x: 30,
          y: 50,
          content: 'Méi Risiko'
        }, {
          x: 70,
          y: 50,
          content: 'Méi Gewënn'
        }]
      },
      {
        title: 'Konditioune fir schwätzen ze kënnen',
        description: 'Virum Ausspille vun der eegener éischter Kaart kann e kloer an däitlech seng Annonce maachen.\n\nAll Spiller huet der Reih no d\'Méiglechkeet ze schwätzen soubal en am éischte Streech fir d\'éischt un der Reih ass fir ze spillen (awer onbedéngt virum Spille vun der eegener Kaart).',
        image: '/lovable-uploads/Tutorial/Schwaetzen/03.png',
        highlights: [{
          x: 70,
          y: 35,
          content: 'Schwätzen? Virun der éischter eegener Kaart!'
        }, {
          x: 30,
          y: 70,
          content: 'Ze spéit geschwat, zielt net méi!'
        }]
      },
      {
        title: '3 verschidden Annoncen',
        description: 'Et ginn 3 verschidden Annoncen, déi e ka maachen, jee nodeems wéi eng Kaarten en an der Hand hält:\n\n•Konter (♥♦) - mat Häerzer-Damm an Rauten-Damm\n\n•Matt (♠) - mat Schëppen-Damm\n\n•Konter a Matt (♠♥♦) - mat all 3 Dammen.',
        image: '/lovable-uploads/Tutorial/Schwaetzen/04.png',
        highlights: [{
          x: 25,
          y: 50,
          content: 'Matt (♠)'
        }, {
          x: 60,
          y: 50,
          content: 'Konter (♥♦)'
        }, {
          x: 90,
          y: 10,
          content: 'Konter a Matt (♠♥♦)'
        }]
      },
      {
        title: 'Wäert vun der Annonce',
        description: 'Bei engem normale Spill geet et ëm 1 Linn.\n\nAll d\'Annoncë an engem Spill gi cumuléiert.\n\nWann 1 Annonce (Konter oder Matt) gemaach ginn ass, geet et ëm 1 + 1 = 2 Linnen.\n\nWann 2 Annoncë gemaach gi sinn (Konter a Matt, vun 2 verschidde Spiller oder Konter & Matt vun 1 Spiller) geet et ëm 1 + 2 = 3 Linnen.',
        image: '/lovable-uploads/Tutorial/Schwaetzen/05.png',
        highlights: [{
          x: 20,
          y: 45,
          content: 'Konter: +1 Linn'
        }, {
          x: 50,
          y: 40,
          content: 'Konter a Matt: +2 Linnen'
        }, {
          x: 75,
          y: 40,
          content: 'Matt: +1 Linn'
        }, {
          x: 40,
          y: 80,
          content: 'Annoncë gi cumuléiert'
        }]
      },
      {
        title: 'Ween huet d\'Tromp gemaach?',
        description: 'Opgepasst: et mécht e groussen Ënnerscheed wéi eng Ekipp d\'Tromp gemaach huet bei der Evaluatioun vun engem Spill.\n\nDozou méi am nächste Kapitel.',
        image: '/lovable-uploads/Tutorial/Schwaetzen/06.png',
        highlights: [{
          x: 50,
          y: 50,
          content: 'De Numm vum Spill kënnt vun de Spëtznimm vun den 3 speziellen Dammen - d\'Matt an déi 2 Konteren'
        }]
      }
    ]
  },
  {
    id: 'playing',
    title: '3: Spillen',
    description: 'Spillreegelen a Strategien',
    icon: React.createElement(Play, { className: "w-6 h-6" }),
    color: '',
    steps: [
      {
        title: 'Ausspillen',
        description: 'All Kaart kann als éischt Kaart vum Streech gespillt ginn.\n\nAWER: Déi éischt Kaart vun all eenzelnem Streech leet fest, wéi eng Kaarten dono am Streech duerfe gespillt ginn.',
        image: '/lovable-uploads/Tutorial/Spillen/01.png',
        highlights: [{
          x: 50,
          y: 40,
          content: 'Den éischte Spiller vum Streech kann ALL Kaart spillen!'
        }]
      },
      {
        title: 'Generell Reegelen',
        description: 'Et gëtt 2 Reegelen, déi iwwert dem ganze Spill stinn:\n\n\n 1) Et kann en ëmmer eng Tromp spillen.\n\n2) Wann e keng Tromp spillt, muss en ëmmer bekennen (virausgesat et huet een eng Kaart vun där Faarf an der Hand).',
        image: '/lovable-uploads/Tutorial/Spillen/02.png',
        highlights: [{
          x: 46,
          y: 50,
          content: 'Wann e keng Tromp huet, muss e bekennen!'
        }, {
          x: 70,
          y: 40,
          content: 'Tromp ass ëmmer erlaabt!'
        }]
      },
      {
        title: '(Tromp-)Streech',
        description: 'Et gëtt 2 verschidde Fäll: \n\n\nA) di éischt Kaart vum Streech ass eng Tromp (=Trompstreech) \n\nB) Di éischt Kaart vum Streech ass keng Tromp (=einfache Streech)',
        image: '/lovable-uploads/Tutorial/Spillen/03.png',
        highlights: [{
          x: 30,
          y: 50,
          content: 'Déi éischt Kaart vum Streech leet d\'Richtung fest.'
        }, {
          x: 70,
          y: 40,
          content: 'Déi éischt Kaart ass KENG Tromp: Einfache Streech'
          }, {
          x: 70,
          y: 8,
          content: 'Déi éischt Kaart ass eng Tromp: Trompstreech'
        }]
      },
      {
        title: 'A) Am Trompstreech',
        description: 'Am Trompstreech ass déi éischt Kaart vum Streech eng Tromp. \n\n1. Et muss en eng Tromp spillen.\n\n2. A just wann e keng Tromp huet, kann en all aner Kaart spillen.',
        image: '/lovable-uploads/Tutorial/Spillen/04.png',
        highlights: [{
          x: 80,
          y: 30,
          content: 'Tromp ass ugespillt ginn'
        }, {
          x: 30,
          y: 20,
          content: 'Muss Tromp bekennen'
        }, {
          x: 30,
          y: 55,
          content: 'Keng Tromp? All Kaart OK'
        }]
      },
      {
        title: 'B) Am einfache Streech',
        description: 'Am einfache Streech ass déi éischt Kaart vum Streech keng Tromp. \n\n1. Et KANN en eng Tromp spillen oder et muss e bekennen. \n2. Wann e keng Kaart vun der selwechter Faarf huet, kann en all aner Kaart spillen.',
        image: '/lovable-uploads/Tutorial/Spillen/05.png',
        highlights: [{
          x: 20,
          y: 40,
          content: 'Et ass keng Tromp ugespillt ginn'
        }, {
          x: 65,
          y: 40,
          content: 'Faarf bekennen'
        }, {
          x: 87,
          y: 50,
          content: 'Kee Bekenne méiglech? All Kaart ass OK'
          }, {
          x: 60,
          y: 20,
          content: 'Tromp ass ëmmer erlaabt!'
        }]
      }
    ]
  },
  {
    id: 'scoring',
    title: '4: Punkten',
    description: 'Punktesystem a Lee',
    icon: React.createElement(Trophy, { className: "w-6 h-6" }),
    color: '',
    steps: [
      {
        title: 'De Streechgewënner',
        description: 'Déi héchste Kaart am Streech gewënnt de Streech.\n\nD\'Kaarte vum Streech lande verdeckt beim Gewënner vum Streech.\nEt ass net wichteg, wéi vill Streech ee gewënnt, mee wéivill Punkten d\'Kaarten vun de gewonnene Streech zesummen hunn.',
        image: '/lovable-uploads/Tutorial/Punkten/01.png',
        highlights: [{
          x: 50,
          y: 70,
          content: 'Punkten zielen, net Streech'
        }]
      },
      {
        title: 'Kaarte-Punkten / Schrom',
        description: 'D\'Ekipp déi de Streech gewënnt, kritt all de Schrom aus deem Streech.\n\nD\'Kaarten hu verschidde Punktwäerter (=Schrom):\nAss=4, Kinnek=3, Damm=2, Bauer=1, 10=0 a 9=0',
        image: '/lovable-uploads/Tutorial/Punkten/02.png',
        highlights: [{
          x: 30,
          y: 50,
          content: 'E Kinnek ass 3 Punkte wäert'
        }, {
          x: 70,
          y: 50,
          content: 'E Bauer ass 1 Punkt wäert'
          }, {
          x: 60,
          y: 46,
          content: 'Eng Damm ass 2 Punkte wäert'
          }, {
          x: 43,
          y: 40,
          content: 'En Ass ass 4 Punkte wäert'
          }, {
          x: 64,
          y: 90,
          content: 'Eng 10 ass 0 Punkte wäert'
          }, {
          x: 10,
          y: 90,
          content: 'Eng 9 ass 0 Punkte wäert'
        }]
      },
      {
        title: 'Gewënnerekipp',
        description: 'Déi Ekipp, déi no 6 Streech am meeschte Schrom huet, gewënnt d\'Spill.\n\nEt si 40 Punkten am Spill, deemno ginn 21 Punkten duer fir ze gewannen.\n\nEt gëtt och e Gläichstand (=Stänner) bei 20:20.',
        image: '/lovable-uploads/Tutorial/Punkten/03.png',
        highlights: [{
          x: 30,
          y: 40,
          content: '40 Punkten am Spill'
        }, {
          x: 70,
          y: 40,
          content: '21 Punkten = Gewënn'
        }, {
          x: 50,
          y: 70,
          content: '20:20 = Stänner'
        }]
      },
      {
        title: 'Lee-System',
        description: 'D\'Gewënnerekipp gëtt festgehalen an engem spezielle Punktesystem (=eng Lee).\n\nAll Team fänkt mat 9 Linnen op der Lee un an déi éischt Ekipp, déi all hir Linnen duerchgestrach huet, gewënnt d\'ganz Partie!',
        image: '/lovable-uploads/Tutorial/Punkten/04.png',
        highlights: [{
          x: 30,
          y: 50,
          content: 'Start: 9 Linnen'
        }, {
          x: 30,
          y: 60,
          content: 'Zil: 0 Linnen'
        }]
      },
      {
        title: 'Rappel: D\'Tromp maachen = méi ze verléieren!',
        description: 'Generell: Eng Ekipp déi e Spill gewënnt, kritt 1-4 Linnen duerchgestrach (=gutt).\n\nWann d\'Ekipp gewënnt, déi Tromp gemaach huet, kritt si Linnen duerchgestrach.\n\nAWER: Wann d\'Ekipp verléiert, déi Tromp gemaach huet, kritt si Linnen dobäigemaach (=schlecht).',
        image: '/lovable-uploads/Tutorial/Punkten/05.png',
        highlights: [{
          x: 30,
          y: 50,
          content: 'Tromp-Team gewënnt: gutt'
        }, {
          x: 50,
          y: 60,
          content: 'Tromp-Team verléiert: besonneg schlecht'
        }]
      },
      {
        title: 'D\'Lee ausfëllen',
        description: 'Fir d\'Lee korrekt auszefëllen, ass et wichteg:\n\n• ween d\'Spill gewonnen huet (>21 Punkten), \n• wéi eng Annoncë gemaach gi sinn, \n• ween d\'Tromp gemaach huet.',
        image: '/lovable-uploads/Tutorial/Punkten/06.png',
        highlights: [{
          x: 15,
          y: 65,
          content: 'Gewënner'
        }, {
          x: 50,
          y: 50,
          content: 'Annonce'
        }, {
          x: 75,
          y: 50,
          content: 'Tromp-Team'
        }]
      },
      {
        title: 'Linnen 1/3: Gewënnerekipp',
        description: 'D\'Ekipp, déi gewënnt, kritt nom Spill Strécher ausgestrach:\n\n• 1 Stréch fir de Gewënn .\n• Zousätzlech: +1 Stréch, wa „Konter" oder „Matt" gesot ginn ass;\n• +2 Strécher, wa „Konter & Matt" oder "Konter" a "Matt" gesot ginn ass;\n• +1 Stréch, wa si all Streech gewonnen hunn.',
        image: '/lovable-uploads/Tutorial/Punkten/07.png',
        highlights: [{
          x: 20,
          y: 60,
          content: 'Mindestens 1'
        }, {
          x: 50,
          y: 50,
          content: '+1 Konter/Matt'
        }, {
          x: 70,
          y: 60,
          content: '+2 Konter&Matt'
        }, {
          x: 90,
          y: 50,
          content: '+1 all 6 Streech'
        }]
      },
      {
        title: 'Linnen 2/3: Verléiererekipp',
        description: 'D\'Ekipp, déi verléiert, kritt nom Spill:\n\n• Wa si d\'Tromp net gemaach huet: näischt ännert bei hire Strécher.\n\n• Wa si d\'Tromp gemaach huet: Si kritt esou vill Strécher bäi, wéi d\'Gewënner-Ekipp der ausgestrach krut.',
        image: '/lovable-uploads/Tutorial/Punkten/08.png',
        highlights: [{
          x: 30,
          y: 50,
          content: 'Keng Tromp: näischt'
        }, {
          x: 30,
          y: 20,
          content: 'Tromp: Strécher bäi'
        }]
      },
      {
        title: 'Linnen 3/3: Gläichspill',
        description: 'Am Fall vun engem Gläichspill (=Stänner/Rampo):\n\nJust d\'Ekipp, déi d\'Tromp gemaach huet, kritt 1 Stréch bäi – egal wat gesot gouf. Fir déi aner Ekipp ännert näischt.',
        image: '/lovable-uploads/Tutorial/Punkten/09.png',
        highlights: [{
          x: 20,
          y: 50,
          content: 'Tromp-Team: +1 Stréch bei Gläichspill'
        }]
      }
    ]
  },
  {
    id: 'minigames',
    title: 'Mini-Spillecher',
    description: 'Interaktiv Übungen',
    icon: React.createElement(Gamepad2, { className: "w-6 h-6" }),
    color: 'orange',
    steps: [
      {
        title: 'Mini-Spill 1: Spillbar Kaarten',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'playable-cards',
          question: 'Mini-Spill 1: Wéi eng Kaarte kënne gespillt ginn?',
          scenarios: [
            {
              hand: ['♠A', '♠K', '♥Q', '♦10', '♣9', '♣J'],
              trumpSuit: '♥ Häerzer',
              leadSuit: '♠ Schëppen',
              playableCards: ['♠A', '♠K', '♥Q'],
              options: [], // Not needed for card selection interface
              correct: '♠A,♠K,♥Q', // User must select exactly these cards
              explanation: '♠A, ♠K (=Schëppe bekennen) oder ♥Q (Häerzer-Damm = Tromp kann ëmmer gespillt ginn).'
            },
            {
              hand: ['♦A', '♣K', '♦Q', '♠9', '♦10', '♣J'],
              trumpSuit: '♦ Rauten',
              leadSuit: '♦ Rauten',
              playableCards: ['♦A', '♦Q', '♦10'],
              options: [], // Not needed for card selection interface
              correct: '♦A,♦Q,♦10', // User must select exactly these cards
              explanation: 'Tromp gouf ugespillt: Et muss en Tromp bekennen. ♦A, ♦10 (=Tromp, well Rauten ass Tromp) oder ♦Q (= ëmmer Tromp).'
            },
            {
              hand: ['♦A', '♣K', '♠Q', '♥9', '♦10', '♣J'],
              trumpSuit: '♠ Schëppen',
              leadSuit: '♥ Häerzer',
              playableCards: ['♥9', '♠Q'],
              options: [], // Not needed for card selection interface
              correct: '♥9,♠Q', // User must select exactly these cards
              explanation: 'Dir musst Häerzer bekennen (♥9) oder kënnt Tromp spillen (♠Q = ëmmer Tromp).'
            },
            {
              hand: ['♥9', '♣A', '♣K', '♣10', '♥10', '♣J'],
              trumpSuit: '♠ Schëppen',
              leadSuit: '♦ Rauten',
              playableCards: ['♥9', '♣A', '♣K', '♣10', '♥10', '♣J'],
              options: [], // Not needed for card selection interface
              correct: '♥9,♣A,♣K,♣10,♥10,♣J', // User must select exactly these cards
              explanation: 'Dir kënnt net bekennen, well dir keng Rauten hutt; also kënnt dir all Kaart spillen.'
            },
            {
              hand: ['♣A', '♣K', '♦Q', '♥A', '♠10', '♣9'],
              trumpSuit: '♣ Kräizer',
              leadSuit: '♣ Kräizer',
              playableCards: ['♣A', '♣K', '♦Q', '♣9'],
              options: [], // Not needed for card selection interface
              correct: '♣A,♣K,♦Q,♣9', // User must select exactly these cards
              explanation: 'Tromp gouf ugespillt: Dir musst Tromp bekennen = ♣A, ♣K, ♣9 (well Kräizer Tromp ass) oder ♦Q (= ëmmer Tromp).'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 2: Tromp wielen',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'trump-selection',
          question: 'Mini-Spill 2: Wat wier déi bescht Tromp-Faarf fir dës Hand?',
          scenarios: [
            {
              hand: ['♠A', '♠K', '♠Q', '♥9', '♦10', '♣J'],
              options: ['♠ Schëppen', '♥ Häerzer', '♦ Rauten', '♣ Kräizer'],
              correct: '♠ Schëppen',
              explanation: 'Mat 3 héije Schëppen (Ass, Kinnek, Damm) ass Schëppen déi bescht Wiel!'
            },
            {
              hand: ['♥A', '♥K', '♦Q', '♠Q', '♣9', '♦10'],
              options: ['♠ Schëppen', '♥ Häerzer', '♦ Rauten', '♣ Kräizer'],
              correct: '♥ Häerzer',
              explanation: 'Mat Häerzer-Ass a Kinnek plus de Konteren (♠Q,♦Q) ass Häerzer optimal!'
            },
            {
              hand: ['♣A', '♣K', '♣J', '♠Q', '♥10', '♦9'],
              options: ['♠ Schëppen', '♥ Häerzer', '♦ Rauten', '♣ Kräizer'],
              correct: '♣ Kräizer',
              explanation: 'Dräi staark Kräizer plus d\'Schëppen-Damm maache Kräizer zur beschter Wiel!'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 3: Trëmp zielen',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'count-trumps',
          question: 'Mini-Spill 3: Wéi eng Kaarten sinn Tromp an dëser Hand?',
          scenarios: [
            {
              hand: ['♠Q', '♥A', '♥K', '♦Q', '♣Q', '♣10'],
              trumpSuit: '♥ Häerzer',
              playableCards: ['♠Q', '♥A', '♥K', '♦Q'], // All trump cards are selectable
              options: [], // Not needed for card selection interface
              correct: '♠Q,♥A,♥K,♦Q', // User must select exactly these trump cards
              explanation: '♠Q, ♦Q (ëmmer Tromp), ♥A, ♥K (Häerzer ass Trompfaarf) = 4 Trëmp'
            },
            {
              hand: ['♠Q', '♥Q', '♦Q', '♣A', '♣K', '♦9'],
              trumpSuit: '♣ Kräizer',
              playableCards: ['♠Q', '♥Q', '♦Q', '♣A', '♣K'], // All trump cards are selectable
              options: [], // Not needed for card selection interface
              correct: '♠Q,♥Q,♦Q,♣A,♣K', // User must select exactly these trump cards
              explanation: '♠Q, ♥Q, ♦Q (ëmmer Tromp), ♣A, ♣K (Kräizer ass Trompfaarf) = 5 Trëmp'
            },
            {
              hand: ['♦A', '♦K', '♦J', '♣Q', '♥9', '♠Q'],
              trumpSuit: '♦ Rauten',
              playableCards: ['♦A', '♦K', '♦J', '♠Q'], // All trump cards are selectable
              options: [], // Not needed for card selection interface
              correct: '♦A,♦K,♦J,♠Q', // User must select exactly these trump cards
              explanation: '♦A, ♦K, ♦J (Rauten ass Trompfaarf), ♠Q (ëmmer Tromp) = 4 Trëmp'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 4: Streech-Gewënner',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'trick-winner',
          question: 'Mini-Spill 4: Wéi eng Kaart gewënnt de Streech?',
          scenarios: [
            {
              cards: [
                { card: '♥10', player: 'Spiller 1' },
                { card: '♥K', player: 'Spiller 2' },
                { card: '♣9', player: 'Spiller 3' },
                { card: '♥A', player: 'Spiller 4' }
              ],
              trumpSuit: '♣ Kräizer',
              leadSuit: '♥',
              playableCards: ['♥10', '♥K', '♣9', '♥A'], // All cards in the trick are selectable
              options: [], // Not needed for card selection interface
              correct: '♣9', // User must select exactly this winning card
              explanation: 'Tromp (♣9) gewënnt ëmmer géint Nët-Tromp Kaarten!'
            },
            {
              cards: [
                { card: '♠J', player: 'Spiller 1' },
                { card: '♥A', player: 'Spiller 2' },
                { card: '♠K', player: 'Spiller 3' },
                { card: '♠10', player: 'Spiller 4' }
              ],
              trumpSuit: '♥ Häerzer',
              leadSuit: '♠',
              playableCards: ['♠J', '♥A', '♠K', '♠10'], // All cards in the trick are selectable
              options: [], // Not needed for card selection interface
              correct: '♥A', // User must select exactly this winning card
              explanation: 'Tromp-Ass (an dësem Fall: ♥A) ass ëmmer déi héchste Kaart!'
            },
            {
              cards: [
                { card: '♥Q', player: 'Spiller 1' },
                { card: '♠A', player: 'Spiller 2' },
                { card: '♥K', player: 'Spiller 3' },
                { card: '♦Q', player: 'Spiller 4' }
              ],
              trumpSuit: '♥ Häerzer',
              leadSuit: 'Tromp',
              playableCards: ['♥Q', '♠A', '♥K', '♦Q'], // All cards in the trick are selectable
              options: [], // Not needed for card selection interface
              correct: '♥Q', // User must select exactly this winning card
              explanation: '♥Q ass méi héich wéi ♥K!'
            },
            {
              cards: [
                { card: '♦Q', player: 'Spiller 1' },
                { card: '♦K', player: 'Spiller 2' },
                { card: '♥Q', player: 'Spiller 3' },
                { card: '♦J', player: 'Spiller 4' }
              ],
              trumpSuit: '♦ Rauten',
              leadSuit: 'Tromp',
              playableCards: ['♦Q', '♦K', '♥Q', '♦J'], // All cards in the trick are selectable
              options: [], // Not needed for card selection interface
              correct: '♥Q', // CORRECTED: Diamond Queen is always the highest trump
              explanation: 'Häerzer-Damm (♥Q) ass ëmmer méi héisch wéi Rauten-Damm (♦Q), och wa Rauten Tromp ass!'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 5: Punkten zielen',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'count-points',
          question: 'Mini-Spill 5: Wéivill Punkten sinn an dësem Streech?',
          scenarios: [
            {
              simpleCards: ['♠A', '♥K', '♦Q', '♣J'],
              options: ['8', '9', '10', '11'],
              correct: '10',
              explanation: 'Ass=4 + Kinnek=3 + Damm=2 + Bauer=1 = 10 Punkten'
            },
            {
              simpleCards: ['♠A', '♥A', '♦K', '♣10'],
              options: ['11', '12', '13', '14'],
              correct: '11',
              explanation: 'Ass=4 + Ass=4 + Kinnek=3 + 10=0 = 11 Punkten'
            },
            {
              simpleCards: ['♠Q', '♥Q', '♦J', '♣9'],
              options: ['4', '5', '6', '7'],
              correct: '5',
              explanation: 'Damm=2 + Damm=2 + Bauer=1 + 9=0 = 5 Punkten'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 6: Kaart-Spilllogik',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'card-play-logic',
          question: 'Mini-Spill 6: Wéi eng Kaart sollt dir spillen?',
          scenarios: [
            {
              hand: ['♥A', '♥K', '♦10', '♠9'],
              currentTrick: [
                { card: '♠K', player: 'Spiller 1 - Matspiller' },
                { card: '♠Q', player: 'Spiller 2' }
              ],
              playerPosition: 'Spiller 3',
              trumpSuit: '♥ Häerzer',
              leadSuit: '♠',
              playableCards: ['♥A', '♥K', '♠9'],
              options: [], // Not needed for card selection interface
              correct: '♥A', // User must select exactly this winning card
              explanation: '♥A, ♥K & ♠9 si méiglech, mee mam ♥A kënnt Dir de Streech nach gewannen!'
            },
            {
              hand: ['♦9', '♣10', '♥Q', '♠9'],
              currentTrick: [
                { card: '♦A', player: 'Spiller 1' },
                { card: '♦K', player: 'Spiller 2 - Matspiller' },
                { card: '♦J', player: 'Spiller 3' }
              ],
              playerPosition: 'Spiller 4',
              trumpSuit: '♦ Rauten',
              leadSuit: '♦',
              playableCards: ['♦9', '♥Q', '♠9'], // Must follow suit (♦9) or can play trump (♥Q always trump, ♠9 trump suit)
              options: [], // Not needed for card selection interface
              correct: '♦9', // User must select exactly this card (strategic play)
              explanation: 'Dir musst Tromp bekennen (♦9 & ♥Q). De Streech ass scho verluer, also spillt déi klengst Kaart.'
            },
            {
              hand: ['♣A', '♠Q', '♦K', '♣J'],
              currentTrick: [
                { card: '♣9', player: 'Spiller 1 - Géigner' }
              ],
              playerPosition: 'Spiller 2',
              trumpSuit: '♥ Häerzer',
              leadSuit: '♣',
              playableCards: ['♣A', '♠Q', '♣J'], // Must follow suit (♣J) or can play trump (♥A trump suit, ♠Q always trump)
              options: [], // Not needed for card selection interface
              correct: '♣A', // User must select exactly this winning card
              explanation: '♣A & ♠Q si méiglech. Spillt roueg ♣A, a probéiert fir de Streech sou ze gewannen (♠Q ass ze staark fir e Streech mat 0 Punkten)!'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 7: Annonce-Entscheedung',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'announcement-decision',
          question: 'Mini-Spill 7: Wat kënnt Dir (maximal) annoncéieren?',
          scenarios: [
            {
              hand: ['♠Q', '♥Q', '♦Q', '♣A', '♣K', '♣J'],
              trumpSuit: '♣ Kräizer',
              options: ['Konter a Matt', 'Konter', 'Matt', 'Näischt'],
              correct: 'Konter a Matt',
              explanation: 'Mat den 3 Dammen kënnt Dir "Konter a Matt" soen fir de maximale Gewënn!'
            },
            {
              hand: ['♥Q', '♦Q', '♠A', '♠K', '♣10', '♦9'],
              trumpSuit: '♠ Schëppen',
              options: ['Konter a Matt', 'Konter', 'Matt', 'Näischt'],
              correct: 'Konter',
              explanation: 'Mat Häerzer-Damm an Rauten-Damm kënnt Dir "Konter" soen!'
            },
            {
              hand: ['♠Q', '♥A', '♥Q', '♦10', '♣9', '♣10'],
              trumpSuit: '♥ Häerzer',
              options: ['Konter a Matt', 'Konter', 'Matt', 'Näischt'],
              correct: 'Matt',
              explanation: 'Mat der Schëppen-Damm kënnt Dir "Matt" soen!'
            },
            {
              hand: ['♥A', '♥K', '♦A', '♠10', '♣Q', '♦J'],
              trumpSuit: '♥ Häerzer',
              options: ['Konter a Matt', 'Konter', 'Matt', 'Näischt'],
              correct: 'Näischt',
              explanation: 'Ouni eng speziell Damm kënnt Dir keng Annonce maachen.'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 8: Hand bewäerten',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'hand-evaluation',
          question: 'Mini-Spill 8: Wéi staark ass dës Hand?',
          scenarios: [
            {
              hand: ['♠Q', '♠A', '♠K', '♥Q', '♦Q', '♣A'],
              trumpSuit: '♠ Schëppen',
              options: ['Ganz staark', 'Staark', 'Mëttel', 'Schwaach'],
              correct: 'Ganz staark',
              explanation: 'Mat 3 Damm-Trëmp, Schëppen-Ass a Kinnek ass dës Hand extrem staark!'
            },
            {
              hand: ['♥A', '♥K', '♠Q', '♦J', '♣10', '♦9'],
              trumpSuit: '♥ Häerzer',
              options: ['Ganz staark', 'Staark', 'Mëttel', 'Schwaach'],
              correct: 'Staark',
              explanation: 'Mat Häerzer-Ass, Kinnek an Schëppen-Damm ass dëst eng staark Hand.'
            },
            {
              hand: ['♦A', '♦10', '♣K', '♠A', '♥J', '♣J'],
              trumpSuit: '♦ Rauten',
              options: ['Ganz staark', 'Staark', 'Mëttel', 'Schwaach'],
              correct: 'Mëttel',
              explanation: 'Mat just engem Tromp-Ass, awer engem Ass a Kinnek dobäi, ass dëst eng mëttelstaark Hand.'
            },
            {
              hand: ['♣10', '♣9', '♠10', '♥9', '♥10', '♠9'],
              trumpSuit: '♣ Rauten',
              options: ['Ganz staark', 'Staark', 'Mëttel', 'Schwaach'],
              correct: 'Schwaach',
              explanation: 'Mat just klenge Kaarten a kenger Tromp ass dëst eng schwaach Hand.'
            }
          ]
        }
      },
      {
        title: 'Mini-Spill 9: D\'Lee',
        description: '',
        image: '',
        highlights: [],
        miniGame: {
          type: 'lee-scoring',
          question: 'Mini-Spill 9: Wat ännert sech op der Lee fir all Ekipp? (-=ausgestrach, +=bäigemaach)',
          scenarios: [
            {
              gameInfo: {
                trumpTeam: 'Ekipp A',
                winnerTeam: 'Ekipp A',
                score: '25-15',
                announcements: ['Konter']
              },
              options: ['Ekipp A: -2, Ekipp B: +0', 'Ekipp A: -1, Ekipp B: +0', 'Ekipp A: -3, Ekipp B: +0', 'Ekipp A: -2, Ekipp B: +2'],
              correct: 'Ekipp A: -2, Ekipp B: +0',
              explanation: 'Tromp-Team gewënnt: 1 Gewënn + 1 Konter = 2 Linnen duerchsträichen. Keng Konsequenz fir Verléierer-Team.'
            },
            {
              gameInfo: {
                trumpTeam: 'Ekipp A',
                winnerTeam: 'Ekipp B',
                score: '18-22',
                announcements: ['Matt']
              },
              options: ['Ekipp A: +2, Ekipp B: -2', 'Ekipp A: +1, Ekipp B: -1', 'Ekipp A: +0, Ekipp B: -2', 'Ekipp A: +2, Ekipp B: -0'],
              correct: 'Ekipp A: +2, Ekipp B: -2',
              explanation: 'Tromp-Team verléiert: kritt esou vill Linne bäi, wéi Gewënner-Team der aus kritt (1 Gewënn + 1 Matt = 2).'
            },
            {
              gameInfo: {
                trumpTeam: 'Ekipp A',
                winnerTeam: 'Ekipp B',
                score: '0-40',
                announcements: ['Konter&Matt']
              },
              options: ['Ekipp A: +3, Ekipp B: -3', 'Ekipp A: +0, Ekipp B: -3', 'Ekipp A: +0, Ekipp B: -4', 'Ekipp A: +4, Ekipp B: -4'],
              correct: 'Ekipp A: +4, Ekipp B: -4',
              explanation: 'Tromp-Team verléiert: kritt esou vill Linne bäi, wéi Gewënner-Team der aus kritt (1 Gewënn + 2 Konter&Matt + 1 All Streech = 4).'
            },
            {
              gameInfo: {
                trumpTeam: 'Ekipp B',
                winnerTeam: 'Gläichstand',
                score: '20-20',
                announcements: []
              },
              options: ['Ekipp A: +0, Ekipp B: +1', 'Ekipp A: +1, Ekipp B: +0', 'Ekipp A: +0, Ekipp B: +0', 'Ekipp A: +1, Ekipp B: +1'],
              correct: 'Ekipp A: +0, Ekipp B: +1',
              explanation: 'Bei Gläichstand kritt just d\'Tromp-Team 1 Linn bäi, egal wat gesot gouf.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'quiz',
    title: 'Ofschloss-Quiz',
    description: 'Test däi Wëssen',
    icon: React.createElement(GraduationCap, { className: "w-6 h-6" }),
    color: 'purple',
    steps: [
      {
        title: 'Quiz: Test däi Wëssen!',
        description: 'Beäntwert dës Froen iwwer Konter & Matt.',
        image: '/lovable-uploads/Tutorial/Quiz/01.png',
        highlights: [],
        quiz: {
          questions: [
            {
              question: 'Wéivill Trëmp sinn am ganzen Spill?',
              options: ['8', '9', '10', '8 oder 9'],
              correct: '8 oder 9',
              explanation: 'Bei ♠/♥/♦ als Trompfaarf sinn et 8 Trëmp. Bei ♣ sinn et 9 Trëmp.'
            },
            {
              question: 'Mat wéivill Linnen op der Lee fänkt all Team un?',
              options: ['7', '8', '9', '10'],
              correct: '9',
              explanation: 'All Team fänkt mat 9 Linnen un.'
            },
            {
              question: 'Wéivill Kaarten kritt all Spiller ausgedeelt?',
              options: ['5', '6', '7', '8'],
              correct: '6',
              explanation: 'All Spiller kritt 6 Kaarten (3 + 3).'
            },
            {
              question: 'Wat brauch een fir "Ech konteren" ze soen?',
              options: ['♠Q', '♥Q + ♦Q', '3 Dammen', '♣Q'],
              correct: '♥Q + ♦Q',
              explanation: 'Fir ze konteren brauch een d\'Häerzer-Damm an d\'Rauten-Damm.'
            },
            {
              question: 'Wéivill Punkten/Schrom huet en Ass?',
              options: ['3', '4', '5', '6'],
              correct: '4',
              explanation: 'En Ass huet 4 Punkten.'
            },
            {
              question: 'Wéivill Linnen kritt een fir e gewonnent Spill mat "Konter a Matt" ausgestrach?',
              options: ['2', '3', '4', '3 oder 4'],
              correct: '3 oder 4',
              explanation: '"Konter a Matt" gëtt 3 Linnen aus (1 gewonnen + 2 fir Konter a Matt). Wann en awer och nach all Streech gewonnen huet gëtt +1 Linn aus, also 4.'
            },
            {
              question: 'Wien deelt d\'Kaarten um Ufank vum Spill aus?',
              options: ['Den eelste Spiller', 'Zoufälleg', 'Ëmmer de selwechten', 'All Kéier e neie Spiller'],
              correct: 'All Kéier e neie Spiller',
              explanation: 'D\'Ausdeeler-Roll wiesselt mat der Auer no all Spill.'
            },
            {
              question: 'Wéi vill Punkten/Schrom ginn et am Ganzen an engem Spill?',
              options: ['32', '36', '40', '44'],
              correct: '40',
              explanation: 'All Kaarten zesummen: 4+3+2+1+0+0 pro Faarf = 10x4 = 40.'
            },
            {
              question: 'Wéi vill Streech ginn an engem Spill gespillt?',
              options: ['4', '5', '6', '8'],
              correct: '6',
              explanation: 'All Streech gëtt 1 Kaart gespillt an all Spiller huet um Ufank 6 Kaarten: Et gi 6 Streech pro Spill.'
            },
            {
              question: 'Wien dierf d\'Trompfaarf wielen?',
              options: ['De Spiller lénks vum Ausdeeler', 'De Spiller mat de meeschte Punkten', 'Den Ausdeeler', 'Zoufälleg'],
              correct: 'De Spiller lénks vum Ausdeeler',
              explanation: 'De Spiller direkt lénks vum Ausdeeler decidéiert d\'Trompfaarf.'
            },
            {
              question: 'Wéini dierf een eng Annonce maachen?',
              options: ['Ier d\'Kaarten ausgedeelt ginn', 'Während dem zweete Streech', 'Soubal een um Zuch ass beim éischte Streech', 'No de 6 Streech'],
              correct: 'Soubal een um Zuch ass beim éischte Streech',
              explanation: 'Annoncen dierfe gemaach ginn, soubal een am éischten Streech drun ass.'
            },
            {
              question: 'Wéi eng Kaart ass ëmmer Tromp?',
              options: ['♠Q', '♥J', '♦A', '♣K'],
              correct: '♠Q',
              explanation: 'D\'Schëppen-Damm (♠Q) ass ëmmer Tromp, onofhängeg vun der Trompfaarf.'
            },
            {
              question: 'Wat geschitt bei engem Gläichspill (20:20)?',
              options: ['Kee kritt Linne bäi', 'Tromp-Team kritt 1 Linn bäi', 'D\'Gewënner kréien 2 Linne bäi', 'All Ekipp kritt 1 Linn duerchgestrach'],
              correct: 'Tromp-Team kritt 1 Linn bäi',
              explanation: 'Just d\'Tromp-Team kritt eng Linn bäi bei Gläichspill.'
            },
            {
              question: 'Wat muss e maachen, wann een d\'Faarf vun der éischter gespillter Kaart net huet?',
              options: [
                'Egal wéi eng Kaart spillen',
                'Et muss en Tromp spillen, wa méiglech',
                'Et duerf e net spillen',
                'Et duerf en eng Kaart zéien'
              ],
              correct: 'Egal wéi eng Kaart spillen',
              explanation: 'Wann e keng Kaart vun där Faarf an der Hand huet, dierf een all Kaart spillen (Tromp souwisou).'
            },
            {
              question: 'Wat geschitt wann d\'Tromp-Ekipp verléiert?',
              options: [
                'Näischt',
                'D\'Ekipp kritt souvill Linne bäi, wéi d\'Gewënner-Ekipp gestrach krut',
                'Dat ass net méiglech',
                'Déi aner Ekipp kritt extra Punkten'
              ],
              correct: 'D\'Ekipp kritt souvill Linne bäi, wéi d\'Gewënner-Ekipp gestrach krut',
              explanation: 'D\'Ekipp déi d\'Tromp mécht huet méi ze verléieren: d\'Tromp-Ekipp kritt 1 Linn bäigemolt, wa si verléiert.'
            }
          ]
        }
      }
    ]
  }
];
