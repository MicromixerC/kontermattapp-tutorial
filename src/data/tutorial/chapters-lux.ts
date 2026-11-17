import React from 'react';
import { BookOpen, Layers, Megaphone, Trophy, Play, Gamepad2, GraduationCap, Info, Spade } from 'lucide-react';
import { TutorialChapter } from '@/types/tutorial';

export const chaptersLux: TutorialChapter[] = [
  {
    id: 'intro',
    title: 'Konter a Matt',
    description: 'D\'Ursprong vum Spill',
    icon: React.createElement(Info, { className: "w-6 h-6" }),
    color: '',
    steps: [
      {
        title: 'Konter a Matt',
        description: 'Konter a Matt ass en tradionnellt Lëtzebuerger Kaartespill fir 4 Spiller. Et gehéiert zur Famill vun den Streechspiller a gëtt zanter Generatioune vu Lëtzebuerger Familljen a Frëndeskreesser gespillt.\n\nD\'Spill ass och ënner follgende Nimm bekannt:\n• Kontramitt\n• Konter & Matt\n• Kontermatt\n• Konter a Matt',
        image: '', highlights: []
      },
      {
        title: 'Ursprong a Geschicht',
        description: 'D\'Lëtzebuerger Kaartespill Konter a Matt gehéiert zur sougennanter „Couillon Group", enger Famill vu Streechspiller, déi virun allem an der Belsch, Lëtzebuerg an am Süde vun Holland gespillt ginn. Ursprénglech kënnt dës Spillfamill vum belsche Spill [Couillon](Couillon: Den éischten a simplsten Stammpapp vun der ganzer Spillfamill. Gëtt nach haut an der Belsch gespillt.), dat als déi einfachst Form vum Spill gëllt. A flämesche Géigenden gëtt et „Kwajongen" genannt, zu Lëtzebuerg huet sech och nach eng aner Variant entwéckelt, genannt „Kujong".\n\nIwwer d\'Joren huet sech d\'Spill lues a lues ugepasst, bis et seng haiteg Form kritt huet.\n\nTypesch fir dës Spillfamill ass, datt et am Ganze 40 Punkten am Spill ginn an d\'Punktverdeelung: Ass=4, Kinnek=3, Damm=2, Bauer=1. Och de bekannte System mat de „Leeën", wou d\'Equipe no all gewonnene Streech eng Linn ewechsträicht, kënnt aus dëser Traditioun.\n\nKonter a Matt ass eng méi komplex lëtzebuergesch Variant: hei si verschidde Dammen permanent Trëmp, wat d\'Spill méi taktesch mécht. Aner Variante vun der selwechter Spillfamill sinn z. B. „Troeven" an Holland oder „Brûte" an der Géigend vu Malmedy an der Belsch.\n\n🇱🇺 Haut ass Konter a Matt en onverzichtbaren Deel vun der lëtzebuergescher Spillkultur, an dat virun allem am Norde vum Land — gespillt an Dierfer, Caféen a Familljen.',
        image: '', highlights: []
      },
      {
        title: 'Wéi benotzt een dësen Tutorial?',
        description: 'Dësen Tutorial erkläert d\'Spillreegelen vu Konter a Matt Schrëtt fir Schrëtt.\n\n• Benotz de Menü op der rietser Säit fir tëscht de Kapitelen ze wiesselen.\n• Benotz d\'Knäppercher ënnen fir vun Etapp zu Etapp no vir ze goen oder zréckzegoen.\n• An de Mini-Spillecher kanns du d\'Reegelen aüben — an duerno eng ganz Partie géint de Computer spillen.\n• Um Enn waart e Quiz op dech!\n\nVill Spaass beim Léieren! 🎴',
        image: '', highlights: []
      }
    ]
  },
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
        image: '', highlights: []
      },
      {
        title: 'D\'Kaarten',
        description: 'Et gëtt mat 24 Kaarten gespillt:\n\n1(Ass), R(Kinnek), D(Damm), V(Bauer), 10 an 9 vun all Faarf (♠ ♥ ♦ ♣)',
        image: '', highlights: []
      },
      {
        title: 'Streech',
        description: 'Am Spill gëtt ee [Streech](Ee Streech dat si véier gespillte Kaarten — eng Kaart vun all Spiller) nom aner gespillt.\n\nAll Spiller spillt genau eng Kaart, een nom aner, der Auer no — déi 4 Kaarten um Dësch nennt en dann e Streech.\nDe Spiller mat der stäerkste Kaart, no de [Reegelen](D\'Rangfolleg vun de Kaarten bestëmmt, wéi eng Kaart e Streech gewënnt. Tromp schléit ëmmer Nët-Tromp. Ënnert de Trëmp gëllt: 1>♠D>♥D>♦D>R>V>10>9.) vu Konter & Matt, kann déi 4 Kaarten asammelen (a leet se verdeckt bei sech op e Koup).',
        image: '', highlights: []
      },
      {
        title: 'Tromp & Spezial-Trëmp',
        description: 'All Ronn/Spill gëtt, um Ufank vum Spill, eng vun de véier Faarwen zur Tromp erklärt. Doduerch ginn all d\'Kaarte vun där Faarf zur Tromp. [Trëmp](Tromp-Kaarten si méi staark wéi all aner Kaarten. Si gewannen ëmmer géint Nët-Tromp Kaarten, egal wéi héich dës sinn.) sinn déi stäerkste Kaarten am Spill.\n\nD\'[♠D](♠D = d\'Matt. Si ass ëmmer Tromp, egal wat d\'Trompfaarf ass.), [♥D](♥D = déi kleng Konter. Si ass ëmmer Tromp, egal wat d\'Trompfaarf ass.) an [♦D](♦D = déi kleng Konter. Si ass ëmmer Tromp, egal wat d\'Trompfaarf ass.) sinn ëmmer Tromp, egal wat d\'Trompfaarf ass!\n\nD\'♣D ass just Tromp, wann d\'Trompfaarf ♣Kräizer ass.\n\nDéi Ekipp déi d\'Tromp mécht, huet méi ze verléieren!',
        image: '', highlights: []
      },
      {
        title: 'D\'Rangfolleg vun de Kaarten',
        description: 'Je nodeems wéieng Faarf Tromp ass, ännert d\'Rangfolleg vun de Kaarten.\n\nTromp-Ass ass ëmmer déi stäerkste Kaart am Spill. Direkt hannendru kommen déi 3 Dammen (♠♥♦) an dann all di aner Kaarte vun der Trompfaarf. Dono réischt kommen d\'Kaarte vun deenen aner 3 Faarwen.',
        image: '', highlights: []
      },
      {
        title: 'E Spill/eng Ronn',
        description: 'No 6 gespillte Streech ginn d\'Punkte vun de gewonnene Kaarte vun all Ekipp gezielt fir d\'Gewënnerekipp vun dëser Ronn ze ermëttelen.\n\nD\'Punkte gi mat Hëllef vum [Schrom](All Kaart huet onofhängeg vun hirer Rangfolleg, an onofhängeg dovun ob se Tromp ass oder net, ee feste Punktwäert = Schrom.) gezielt:\n• Ass = 4 Punkten\n• R = 3 Punkten\n• D = 2 Punkten\n• V = 1 Punkt\n• 10 & 9 = 0 Punkten\n\nD\'Ekipp mat de meeschte Punkten um Enn vu 6 Streech gewënnt dëst Spill.',
        image: '', highlights: []
      },
      {
        title: 'D\'Lee',
        description: 'No all Spill (=6 Streech) gëtt an engem Linnen-System (=eng [Lee](D\'Lee ass e Linnen-System, deen d\'Resultater vun all Spill festhält. All Ekipp huet 9 Linnen. Wann eng Ekipp keng Linnen méi huet, huet si d\'Partie gewonnen.)) festgehal, wee gewonnen huet.\n\nAll Ekipp fänkt mat 9 Linnen un.\n• D\'Ekipp, déi e Spill gewënnt, kritt Linnen ausgestrach (=auskréien).\n• D\'Ekipp, déi e Spill verléiert, ka Linnen bäikréien, jee no Fall (=ukréien).\n\nWann eng Ekipp all hir Linnen duerchgestrach huet, huet se d\'Partie gewonnen (=d\'Lee ass fäerdeg).',
        image: '', highlights: []
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
        title: 'Vum Stécken bis zum éischte Streech',
        description: '   1. Den Ausdeeler stéckt d\'Kaarten a leet de gestéckte Koup viru säi rietse Noper\n   2. De rietse Noper dierf* de Koup elo an zwee deelen, an deen ënneschten Deel vum Koup op den ieweschten Deel vum Koup setzen (=[ofhiewen](Ofhiewe: De rietse Noper vum Ausdeeler deelt de Koup an zwee a leet den ënneschten Deel uewen drop. Hie kann och op d\'Ofhiewen verzichten — dann klappt e just emol op de Koup.)).\n   3. Den Ausdeeler hëllt de Koup zréck an deelt all Spiller 3 Kaarten aus\n   4. All Spiller kann elo seng 3 Kaarte kucken.\n   5. De Spiller lénks vum Ausdeeler wielt d\'Trompfaarf fir dës Ronn aus a verkënnegt se haart an däitlech (=hie [mécht d\'Tromp](Tromp maachen: De Spiller lénks vum Ausdeeler wielt eng vun de 4 Faarwen als Trompfaarf. Déi Faarf gëllt dann fir dat ganzt Spill. Seng Ekipp ass dann d\'Tromp-Ekipp.))\n   6. Dono deelt den Ausdeeler nach emol all Spiller 3 Kaarten aus\n   7. De Spiller lénks vum Ausdeeler spillt elo déi éischt Kaart vum Spill\n\n   8. No engem Spill (also no 6 Streech) wiesselen d\'[Rollen](D\'Rollen déi wiesselen: De Spiller dee stéckt an ausdeelt & de Spiller deen ofhiewt & de Spiller deen d\'Tromp mécht.) ëm eng Positioun no lénks',
        image: '', highlights: []
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
        title: 'Annoncen — Wat ass Schwätzen?',
        description: 'Beim Spill Konter & Matt kann all Spiller eng [Annonce](Eng Annonce = schwätzen: E Spiller mécht virum Spille vu senger éischter Kaart eng Erklärung, dass en eng speziell Damm huet. Dëst erhéicht de Wäert vum Spill.) maachen (virausgesat en huet déi néideg Kaarten an der Hand).\n\nEt ginn 3 méiglech Annoncen:\n• [Matt](Matt: E Spiller, deen d\'♠D huet, kann « Matt » soen. Dëst erhéicht de Wäert vum Spill ëm 1 Linn.) (♠D) — mat der Schëppen-Damm\n• [Konter](Konter: E Spiller, deen ♥D+♦D huet, kann « Konter » soen. Dëst erhéicht de Wäert vum Spill ëm 1 Linn.) (♥D+♦D) — mat Häerzer-Damm an Rauten-Damm\n• [Konter & Matt](Konter & Matt: E Spiller, deen all 3 Dammen (♠D+♥D+♦D) huet, kann « Konter a Matt » soen. Dëst erhéicht de Wäert vum Spill ëm 2 Linnen.) — mat all 3 Dammen\n\nWärend dem Spill gëtt näischt gesot, wat d\'Spill ka beaflossen, an et duerf ee sech keng Zeeche ginn.',
        image: '', highlights: []
      },
      {
        title: 'Konditioune fir schwätzen ze kënnen',
        description: 'Spiller, déi follgend Dammen hunn, dierfe virum Spille vun hirer éischter Kaart eng Annonce maachen (=schwätzen):\n\n• ♠D → « Matt » oder « ech huelen et matt »\n• ♥D+♦D → « Konter » oder « ech konteren »\n• ♠D+♥D+♦D → « Konter a Matt »\n\n   1. D\'Annoncen erhéijen de Wäert vum Spill fir all d\'Spiller; änlech wéi bei enger Wett geet den Asaz (fir d\'Spill) an d\'Luucht.\n   2. All Ausruff vu « Matt », « Konter » oder « Konter a Matt » ass net méi widderuffbar an zielt fir e ganzt Spill a fir all Ekipp.\n   3. All d\'Annoncen, egal vu wéi engem Spiller oder Ekipp, gi summéiert an zéilen fir e ganzt Spill a fir all Ekipp.',
        image: '', highlights: []
      },
      {
        title: 'Wéivill Linnen stinn op dem Spill?',
        description: 'All Annonce erhéicht de Wäert vum Spill ëm 1 Linn.\n\nKlick dech duerch d\'verschidde Szenarien fir ze gesi wéi vill Linnen d\'Gewënnerekipp ausgestrach kritt — jee nodeems wéi vill Annoncen am Spill gemaach gi sinn.',
        image: '', highlights: []
      },
      {
        title: 'Ween huet d\'Tromp gemaach?',
        description: 'Et mécht e groussen Ënnerscheed, wéi eng Ekipp d\'Tromp gemaach huet.\n\nWann d\'[Tromp-Ekipp](D\'Tromp-Ekipp ass d\'Ekipp, déi d\'Tromp gemaach huet — also de Spiller lénks vum Ausdeeler an säi Partner.) gewënnt: kritt si Linnen duerchgestrach (=auskréien).\nWann d\'Tromp-Ekipp verléiert: kritt si Linnen dobäigemaach (=ukréien).',
        image: '', highlights: []
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
        description: 'All Kaart kann als éischt Kaart vum Streech gespillt ginn.\n\nDéi éischt Kaart vun all Streech leet fest, wéi eng Kaarten dono an dësem Streech duerfe gespillt ginn:\n• Wann déi 1. Kaart vum Streech eng Tromp ass (=[Tromp geet aus](Tromp geet aus: Deen deen ausspillt, spillt eng Tromp. All aner Spiller mussen dann och Tromp spillen, wa se eng hunn.)):\n   — Jidderee muss eng Tromp spillen (=[bekennen](Bekennen: E Spiller muss eng Kaart vun der gefuerderter Faarf spillen, wann en eng huet. Déi éischt Kaart vum Streech leet déi gefuerdert Faarf fest.)).\n   — Et kann en all aner Kaart spillen, wann e keng Tromp huet.\n• Wann déi 1. Kaart vum Streech keng Tromp ass (=♠/♥/♦/♣ geet aus):\n   — Jidderee muss eng Kaart vun der selwechter Faarf wéi déi éischt Kaart spillen (=bekennen) oder kann eng Tromp spillen (=[trompen](Trompen: E Spiller spillt eng Tromp, obwuel keng Tromp gefuerdert war. Dëst ass ëmmer erlaabt.)).\n   — Et kann en all aner Kaart spillen, wann e keng Kaart vun der selwechter Faarf huet, wéi ausgaangen ass, an en och keng Tromp huet.\n\nTromp-Kaarte si giel markéiert — si kënnen ëmmer gespillt ginn.',
        image: '', highlights: []
      },
      {
        title: 'Tromp- a Nët-Tromp-Streech',
        description: 'Klick eng Kaart aus Jeanny senger Hand — dat ass déi éischt gespillt Kaart vum Streech. De Luca muss als nächst spillen.\n\nTromp-Streech: All Spiller muss Tromp spillen (falls méiglech).\nNët-Tromp-Streech: Spiller muss déi gespillt Faarf bekennen — oder kann Tromp spillen.',
        image: '', highlights: []
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
        description: 'De Streech gëtt gewonne vun der héchster Kaart am Streech:\n• Wa mindestens eng Tromp gespillt ginn ass, da gewënnt deen de Streech, deen déi héchsten Tromp gespillt huet.\n• Wa keng Tromp gespillt ginn ass, gewënnt deen de Streech, deen déi héchst Kaart gespillt huet vun där Faarf, déi als éischt am Streech gespillt ginn ass (=déi ausgaang ass). Hei gëllt dann: A>K>Q>J>10>9.\n\nD\'Kaarte vum Streech lande verdeckt beim Gewënner vum Streech. D\'Punkte vum gewonnene Streech ginn un dem Gewënner seng Ekipp, an de Gewënner spillt déi éischt Kaart vum nächste Streech.\nEt ass net wichteg, wéi vill Streech ee gewënnt, mee wéivill Punkten d\'Kaarten vun de gewonnene Streech zesummen hunn.',
        image: '', highlights: []
      },
      {
        title: 'Punkten / Schrom',
        description: 'D\'Kaarten hunn onofhängeg vun hirer Rangfolleg, an onofhängeg dovun ob se Tromp sinn oder net, ee feste Punktwäert (=[Schrom](Schrom = de Punktwäert vun enger Kaart. Dëse Wäert ännert sech net, egal ob d\'Kaart Tromp ass oder net.)), dee gekuckt gëtt fir de Gewënner no all Spill ze ermëttelen.\n\nAll Ekipp zielt d\'Punkte vun hire gewonnene Streech zesummen.\n\nD\'Wäerter vun de Kaarte sinn:\n• Ass: 4 Punkten\n• Kinnek: 3 Punkten\n• Damm: 2 Punkten\n• Bauer: 1 Punkt\n• 10 & 9: 0 Punkten',
        image: '', highlights: []
      },
      {
        title: 'Gewënnerekipp',
        description: 'Déi Ekipp, déi no 6 Streech am meeschte Schrom huet, gewënnt d\'Spill.\n\nEt si 40 Punkten am Spill, deemno ginn 21 Punkten duer fir ze gewannen.\n• D\'Ekipp mat méi wéi 20 Punkten um Enn vu 6 Streech gewënnt d\'Spill.\n• Wann déi 2 Ekippen 20 Punkten hunn, ass et e [Gläichspill](Gläichspill = Stänner / Rampo: Béid Ekippen hunn 20 Punkten. D\'Tromp-Ekipp kritt 1 Linn bäi op der Lee.) (=[Stänner](Stänner / Rampo: Bei 20:20 kritt d\'Tromp-Ekipp 1 Linn bäi op der Lee.) / Rampo).',
        image: '', highlights: []
      },
      {
        title: 'Lee-System',
        description: 'D\'Resultater vun all Spill gi mat engem Linnen-System (=eng [Lee](D\'Lee ass e Linnen-System fir d\'Partie ze entscheeden. Éischt Ekipp ouni Linnen gewënnt d\'Partie.)) festgehalen:\n• All Ekipp huet ganz um Ufank vum Spill 9 (oder 11) vertikal Linnen.\n• D\'Ekipp, déi e Spill gewënnt, kritt Linnen ausgestrach (=auskréien).\n• D\'Ekipp, déi e Spill verléiert, ka Linnen bäikréien, jee no Fall (=ukréien).\n\nD\'Spill ass gewonnen, wann eng Ekipp keng Linnen méi op der Lee huet — se sinn all ausgestrach.',
        image: '', highlights: []
      },
      {
        title: 'D\'Lee ausfëllen',
        description: 'No follgendem System ginn d\'Linnen ausgestrach oder bäigemaach:\n• D\'Ekipp, déi gewënnt:\n   — Kritt nom Spill mindestens 1 Linn ausgestrach.\n   — Zousätzlech, jee no Fall, ginn nach weider Linnen ausgestrach:\n   — +1 Linn, wa « Konter » oder « Matt » gesot ginn ass\n   — +2 Linnen, wa « Konter & Matt » gesot ginn ass\n   — +1 Linn, wann si all 6 Streech gewonnen hunn\n• D\'Ekipp, déi verléiert:\n   — Wa si d\'Tromp net gemaach huet: näischt ännert bei hire Linnen.\n   — Wa si d\'Tromp gemaach huet: Si kritt esou vill Linnen bäi, wéi d\'Gewënnerekipp der ausgestrach krut.\n• Am Fall vun engem [Gläichspill](Gläichspill = Stänner / Rampo: Bei 20:20 kritt d\'Tromp-Ekipp 1 Linn bäi — egal wat gesot gouf.) (=[Stänner](Stänner = Rampo: Béid Ekippen hunn 20 Punkten. D\'Tromp-Ekipp kritt 1 Linn bäi.) / Kapo):\n   — D\'Ekipp, déi d\'Tromp gemaach huet, kritt 1 Linn bäi — egal wat gesot gouf.',
        image: '', highlights: []
      }
    ]
  },
  {
    id: 'rules',
    title: "D'Spillreegelen",
    description: 'Komplett Regelwierk',
    icon: React.createElement(BookOpen, { className: "w-6 h-6" }),
    color: '',
    steps: [
      {
        title: 'iwwer Konter a Matt',
        description: '**Konter & Matt** ass e **L\u00ebtzebuerger Kaartespill**, wou **4 Spiller**, an **zwou Ekippen** opgedeelt, g\u00e9inteneen \u00ebm Streech spillen.\n\nGespillt g\u00ebtt mat **24 Spillkaarten**, jeeweils Ass, Kinnek, Damm, Bauer, 10 a 9 vun alle v\u00e9ier Faarwen (Sch\u00ebppen\u2660, H\u00e4erzer\u2665, Rauten\u2666, Kr\u00e4izer\u2663).\n\n**All Ronn ass eng vun deene 4 Faarwen Tromp**.',
        image: '', highlights: []
      },
      {
        title: '1) Ausdeelen & Tromp maachen',
        description: "   1. De Spiller, deen d'Kaarte fir d\u00e9i \u00e9ischt Partie ausdeelt, st\u00e9ckelt d'Kaarten.\n   2. De Spiller riets vun him dierf de Koup, nom St\u00e9ckelen, an zwee deelen, an deen \u00ebnneschten Deel vum Koup op den ieweschten Deel vum Koup setzen (=[ofhiewen](Ofhiewe: De rietse Noper vum Ausdeeler deelt de Koup an zwee a leet den \u00ebnneschten Deel uewen drop. Hie kann och op d'Ofhiewen verzichten.)).\n   3. All Spiller kritt dono 6 Kaarten ausgedeelt, d\u00e9i an zwou K\u00e9iere verdeelt ginn:\n      \u2014 **\u00c9ischt Verdeelung:** All Spiller kritt 3 Kaarten\n      \u2014 (da g\u00ebtt d'Ausdeele paus\u00e9iert, bis de Spiller l\u00e9nks vum Verdeeler d'Tromp gewielt huet)\n      \u2014 **Zweet Verdeelung:** All Spiller kritt nach emol 3 Kaarten\n   4. T\u00ebscht der \u00e9ischter an zweeter Verdeelung leet de Spiller l\u00e9nks vum Verdeeler d'Faarf fest, d\u00e9i fir dat \u00e9ischt Spill Tromp ass (=hie [m\u00e9cht d'Tromp](Tromp maachen: De Spiller l\u00e9nks vum Ausdeeler wielt eng vun de 4 Faarwen als Trompfaarf. D\u00e9i Faarf g\u00eblt dann fir dat ganzt Spill.)).",
        image: '', highlights: []
      },
      {
        title: '2) Streech a Spill',
        description: "\u2022 D\u00e9i 4 Spiller (**2 Ekippe mat jeeweils 2 Spiller**) s\u00ebtzen un engem D\u00ebsch.\n\u2022 W\u00e4hrend dem Spill g\u00ebtt n\u00e4ischt gesot, wat d'Spill ka beaflossen, an et duerf ee sech keng Zeeche ginn.\n\u2022 D'Spiller vun enger Ekipp s\u00ebtzen sech jeeweils g\u00e9inteniwwer, an d'Ekippe **s\u00ebtzen iwwer Kr\u00e4iz**.\n\u2022 De Spiller l\u00e9nks vum Verdeeler spillt als \u00c9ischten. Duerno g\u00ebtt et der Auer no.\n\u2022 Wa bis all Spiller eng Kaart gespillt huet, leie 4 Kaarten um D\u00ebsch (=*1 Streech*).\n\u2022 **D\u00e9i h\u00e9chste Kaart um D\u00ebsch gew\u00ebnt de Streech**. D'Punkte vum Streech ginn u seng Ekipp.\n\u2022 Et gi **6 Streech pro Spill** gespillt.",
        image: '', highlights: []
      },
      {
        title: '3) Trompreegelen',
        description: "   1. All Ronn/Spill g\u00ebtt **eng Faarf** zur **Tromp** gemaach. Et g\u00ebtt **8 Tr\u00ebmp bei \u2660, \u2665, \u2666** an et g\u00ebtt **9 Tr\u00ebmp bei \u2663**.\n   2. D\u00e9i **h\u00e9chste Kaart** vun all Spill ass \u00ebmmer den **Tromp-Ass**.\n   3. D'**Damme** vu **Sch\u00ebppen** (=*d'Matt*), **H\u00e4erz** (=*d\u00e9i d\u00e9ck Konter*) a **Rauten** (=*d\u00e9i kleng Konter*) sinn **\u00ebmmer Tromp**. Hir Rangfolleg: \u2660Q > \u2665Q > \u2666Q.\n   4. N\u00ebmme wa Kr\u00e4izer Tromp ass, ass d'Kr\u00e4izer Damm \u2663Q och Tromp.",
        image: '', highlights: []
      },
      {
        title: "4) D'Rangl\u00ebscht vun den Tr\u00ebmp",
        description: "Tr\u00ebmp sinn \u00ebmmer m\u00e9i h\u00e9ich an der Rangl\u00ebscht, w\u00e9i Kaarten, d\u00e9i net Tromp sinn.\n\n\u2022 **Wa \u2660 Tromp ass:** \u2660A > \u2660Q > \u2665Q > \u2666Q > \u2660K > \u2660J > \u266010 > \u26609 (8 Tr\u00ebmp)\n\u2022 **Wa \u2665 Tromp ass:** \u2665A > \u2660Q > \u2665Q > \u2666Q > \u2665K > \u2665J > \u266510 > \u26659 (8 Tr\u00ebmp)\n\u2022 **Wa \u2666 Tromp ass:** \u2666A > \u2660Q > \u2665Q > \u2666Q > \u2666K > \u2666J > \u266610 > \u26669 (8 Tr\u00ebmp)\n\u2022 **Wa \u2663 Tromp ass:** \u2663A > \u2660Q > \u2665Q > \u2666Q > \u2663K > \u2663Q > \u2663J > \u266310 > \u26639 (9 Tr\u00ebmp)\n\nD'Rangl\u00ebscht vu Kaarten, d\u00e9i net Tromp sinn: A > K > Q > J > 10 > 9",
        image: '', highlights: []
      },
      {
        title: '5) Schw\u00e4tzen/Annoncen',
        description: "Spiller, d\u00e9i follgend Dammen hunn, dierfe **virum Spille vun hirer \u00e9ischter Kaart** eng **Annonce** maachen:\n\n\u2022 \u2660Q \u2192 \u00ab *Matt* \u00bb\n\u2022 \u2665Q + \u2666Q \u2192 \u00ab *Konter* \u00bb\n\u2022 \u2660Q + \u2665Q + \u2666Q \u2192 \u00ab *Konter a Matt* \u00bb\n\nD\u00ebse Annoncen **erh\u00e9ijen de W\u00e4ert vum Spill** fir all d'Spiller.\nAll Ausruff ass net m\u00e9i widderuffbar an z\u00eblt fir e ganzt Spill a fir all Ekipp.",
        image: '', highlights: []
      },
      {
        title: '6) Spille vu Kaarten',
        description: "D\u00e9i \u00e9ischt Kaart vun all Streech decid\u00e9iert, w\u00e9i eng Kaarten dono dierfe gespillt ginn:\n\n\u2022 **Wann d\u00e9i 1. Kaart eng Tromp ass:**\n   \u2014 Jidderee muss eng Tromp spillen (=[bekennen](Bekennen: E Spiller muss eng Kaart vun der gefuerderter Faarf spillen, wann en eng huet. D\u00e9i \u00e9ischt Kaart vum Streech leet d\u00e9i gefuerdert Faarf fest.)).\n   \u2014 Et kann en all aner Kaart spillen, wann e keng Tromp huet.\n\n\u2022 **Wann d\u00e9i 1. Kaart keng Tromp ass:**\n   \u2014 Jidderee muss eng Kaart vun der selwechter Faarf spillen (=bekennen) **oder** kann eng Tromp spillen (=[trompen](Trompen: E Spiller spillt eng Tromp, obwuel keng Tromp gefuerdert war. D\u00ebst ass \u00ebmmer erlaabt.)).\n   \u2014 Et kann en all aner Kaart spillen, wann e keng Kaart vun der selwechter Faarf huet.\n\n*(Eng Tromp kann deemno \u00ebmmer gespillt ginn.)*",
        image: '', highlights: []
      },
      {
        title: '7) Evaluatioun vum Streech',
        description: "De Streech g\u00ebtt gewonne vun der h\u00e9chster Kaart:\n\n\u2022 **Wa mindestens eng Tromp gespillt ginn ass**, gew\u00ebnt deen de Streech, deen **d\u00e9i h\u00e9chsten Tromp** gespillt huet.\n\u2022 **Wa keng Tromp gespillt ginn ass**, gew\u00ebnt deen de Streech, deen d\u00e9i **h\u00e9chste Kaart** vun der **Faarf d\u00e9i als \u00e9ischt gespillt ginn ass**, gespillt huet.\n\nD\u00e9ee Spiller, deen de Streech gew\u00ebnt, leet d'Kaarte vum Streech verdeckt bei sech op ee Koup.",
        image: '', highlights: []
      },
      {
        title: '8) Evaluatioun vun engem Spill',
        description: "   1. D'Kaarten hunn e feste Punktw\u00e4ert (=[Schrom](Schrom = de Punktw\u00e4ert vun enger Kaart. D\u00ebse W\u00e4ert \u00e4nnert sech net, egal ob d'Kaart Tromp ass oder net.)), onof\u00e4ngeg vun der Rangfolleg a vun Tromp.\n   2. D'Ekipp mat de meeschte Punkten um Enn vu 6 Streech gew\u00ebnt d\u00ebst Spill.\n   3. D'W\u00e4erter vun de Kaarte sinn:\n      \u2014 Ass: 4 Punkten\n      \u2014 Kinnek: 3 Punkten\n      \u2014 Damm: 2 Punkten\n      \u2014 Bauer: 1 Punkt\n      \u2014 10 & 9: 0 Punkten\n   4. D\u00e9i 24 Kaarten hunn zesummen **40 Punkten**: > 20 Punkten gew\u00ebnt; 20:20 = [St\u00e4nner](St\u00e4nner / Rampo: Bei 20:20 kritt d'Tromp-Ekipp 1 Linn b\u00e4i.) (Rampo).\n   5. No engem f\u00e4erdegem Spill wiesselen d'Rollen eng Positioun no l\u00e9nks.\n   6. Feeler oder Fuddele = Spill verluer fir d\u00e9i Ekipp, d\u00e9i de Feeler gemaach huet.",
        image: '', highlights: []
      },
      {
        title: '9) Evaluatioun vun der Lee',
        description: "D'Resultater gi mat engem Linnen-System (=eng [Lee](D'Lee ass e Linnen-System fir d'Partie ze entscheeden. \u00c9ischt Ekipp ouni Linnen gew\u00ebnt.)) festgehalen:\n\n\u2022 All Ekipp huet 9 (oder 11) vertikal Linnen.\n\u2022 D'Gew\u00ebnnerekipp kritt Linnen ausgestrach (=auskr\u00e9ien).\n\u2022 D'Verleererekipp ka Linnen b\u00e4ikr\u00e9ien (=ukr\u00e9ien).\n\n**D'Gew\u00ebnnerekipp:**\n\u2022 Mindestens **1 Linn** ausgestrach.\n\u2022 +1 Linn, wa \u00abKonter\u00bb oder \u00abMatt\u00bb gesot ginn ass\n\u2022 +2 Linnen, wa \u00abKonter & Matt\u00bb gesot ginn ass\n\u2022 +1 Linn, wa si d\u00e9i 6 Streech gewonnen hunn\n\n**D'Verleererekipp:**\n\u2022 Wa si d'Tromp **net** gemaach huet: n\u00e4ischt \u00e4nnert.\n\u2022 Wa si d'Tromp gemaach huet: kritt esou vill Linnen b\u00e4i, w\u00e9i d'Gew\u00ebnnerekipp der ausgestrach krut.\n\n**Gl\u00e4ichspill ([St\u00e4nner](St\u00e4nner / Rampo: Bei 20:20 kritt d'Tromp-Ekipp 1 Linn b\u00e4i.) / Rampo):**\n\u2022 D'Tromp-Ekipp kritt **1 Linn** b\u00e4i.\n\n**D'Spill ass gewonnen**, wann eng Ekipp **keng Linnen m\u00e9i** op der Lee huet.\n\nEng [Z\u00e4nnbiischt](Z\u00e4nnbiischt: Wann eng Ekipp d'Partie gew\u00ebnt, an d\u00e9i aner Ekipp keen eenzegt Spill gewonnen huet.) ass, wann eng Ekipp d'Partie gew\u00ebnt ouni datt d\u00e9i aner Ekipp eng eenzeg Str\u00ebpp gewonnen huet.",
        image: '', highlights: []
      },
      {
        title: '10) Tipps & Tricks',
        description: "Gutt Spiller w\u00ebssen \u00ebmmer:\n\u2022 W\u00e9i vill Tr\u00ebmp nach am Spill sinn\n\u2022 Wat fir Kaarten nach am Spill sinn (Fr\u00e4ikaarten: d\u00e9i st\u00e4erkst Kaart vun all Faarf, d\u00e9i nach am Spill ass; d\u00e9i Kaart l\u00e9t *blank*)\n\u2022 W\u00e9i vill Punkten all Ekipp schonn huet\n\n\u2022 Et soll een n\u00ebmme schw\u00e4tzen, wann en sech och reell Chancen ausrechent ze gewannen.\n\u2022 Wann een net selwer d'Tromp gemaach huet, ass de Risiko manner grouss wann ee schw\u00e4tzt, well een am Fall vun enger verluerener Lee keng Linnen ukritt.\n\u2022 Wann d\u00e9i g\u00e9igneresch Ekipp just nach ee Spill muss gewannen fir d\u00e9i ganz Partie ze gewannen, da soll d\u00e9i eege Ekipp beschtefalls schw\u00e4tzen.",
        image: '', highlights: []
      },
      {
        title: 'Glossar',
        description: "**Faarf:** D'Faarwe vum Spill sinn: Sch\u00ebppen\u2660, H\u00e4erzer\u2665, Rauten\u2666, Kr\u00e4izer\u2663.\n\n**Tromp:** D\u00e9i Faarf, d\u00e9i an engem Spill m\u00e9i staark ass w\u00e9i d\u00e9i aner Faarwen.\n\n**bekennen:** Eng Kaart vun der als \u00e9ischt ausgespillter Faarf spillen. Resp. eng Tromp spillen, wann d\u00e9i \u00e9ischt Kaart vum Streech eng Tromp war.\n\n**trompen:** Eng Tromp spillen, wann ee keng Tromp h\u00e4tt misste spillen.\n\n**Lee:** Eng Serie vu Spiller, bis eng Ekipp all hir Linnen ausgestrach huet.\n\n**Streech:** All Spiller leet eng Kaart, an domat ass ee Streech gespillt.\n\n**schw\u00e4tzen:** Virum Ausspille vun der \u00e9ischter Kaart eng Aussoe maachen (Matt, Konter, Konter a Matt).\n\n**Str\u00ebpp:** Een eenzegt Spill vu 6 Streech.\n\n**Z\u00e4nnbiischt:** Wann eng Ekipp d'Partie gew\u00ebnt ouni datt d\u00e9i aner Ekipp eng eenzeg Str\u00ebpp gewonnen huet.",
        image: '', highlights: []
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
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'playable-cards',
          question: 'Wéi eng Kaarte kënne gespillt ginn?',
          scenarios: [
            { hand: ['♠A','♠K','♥Q','♦10','♣9','♣J'], trumpSuit: '♥ Häerzer', leadSuit: '♠ Schëppen', leadCard: '♠J', playableCards: ['♠A','♠K','♥Q'], options: [], correct: '♠A,♠K,♥Q', explanation: '♠1, ♠R (=Schëppe bekennen) oder ♥D (Häerzer-Damm = Tromp kann ëmmer gespillt ginn).' },
            { hand: ['♦A','♣K','♦Q','♠9','♦10','♣J'], trumpSuit: '♦ Rauten', leadSuit: '♦ Rauten', leadCard: '♦K', playableCards: ['♦A','♦Q','♦10'], options: [], correct: '♦A,♦Q,♦10', explanation: 'Tromp gouf ugespillt: Et muss en Tromp bekennen. ♦1, ♦10 (=Tromp) oder ♦D (= ëmmer Tromp).' },
            { hand: ['♦A','♣K','♠Q','♥9','♦10','♣J'], trumpSuit: '♠ Schëppen', leadSuit: '♥ Häerzer', leadCard: '♥K', playableCards: ['♥9','♠Q'], options: [], correct: '♥9,♠Q', explanation: 'Dir musst Häerzer bekennen (♥9) oder kënnt Tromp spillen (♠D = ëmmer Tromp).' },
            { hand: ['♥9','♣A','♣K','♣10','♥10','♣J'], trumpSuit: '♠ Schëppen', leadSuit: '♦ Rauten', leadCard: '♦K', playableCards: ['♥9','♣A','♣K','♣10','♥10','♣J'], options: [], correct: '♥9,♣A,♣K,♣10,♥10,♣J', explanation: 'Dir kënnt net bekennen, well dir keng Rauten hutt; also kënnt dir all Kaart spillen.' },
            { hand: ['♣A','♣K','♦Q','♥A','♠10','♣9'], trumpSuit: '♣ Kräizer', leadSuit: '♣ Kräizer', leadCard: '♣J', playableCards: ['♣A','♣K','♦Q','♣9'], options: [], correct: '♣A,♣K,♦Q,♣9', explanation: 'Tromp gouf ugespillt: Dir musst Tromp bekennen = ♣1, ♣R, ♣9 (Kräizer Tromp) oder ♦D (= ëmmer Tromp).' }
          ]
        }
      },
      {
        title: 'Mini-Spill 2: Tromp wielen',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'trump-selection',
          question: 'Wat wier déi bescht Tromp-Faarf fir dës Hand?',
          scenarios: [
            { hand: ['♠A','♠K','♠Q','♥9','♦10','♣J'], options: ['♠ Schëppen','♥ Häerzer','♦ Rauten','♣ Kräizer'], correct: '♠ Schëppen', explanation: 'Mat 3 héije Schëppen (1, R, D) ass Schëppen déi bescht Wiel!' },
            { hand: ['♥A','♥K','♦Q','♠Q','♣9','♦10'], options: ['♠ Schëppen','♥ Häerzer','♦ Rauten','♣ Kräizer'], correct: '♥ Häerzer', explanation: 'Mat Häerzer-1 a R plus de Konteren (♠D, ♦D) ass Häerzer optimal!' },
            { hand: ['♣A','♣K','♣J','♠Q','♥10','♦9'], options: ['♠ Schëppen','♥ Häerzer','♦ Rauten','♣ Kräizer'], correct: '♣ Kräizer', explanation: 'Dräi staark Kräizer plus d\'Schëppen-Damm maache Kräizer zur beschter Wiel!' }
          ]
        }
      },
      {
        title: 'Mini-Spill 3: Trëmp zielen',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'count-trumps',
          question: 'Wéi eng Kaarten sinn Tromp an dëser Hand?',
          scenarios: [
            { hand: ['♠Q','♥A','♥K','♦Q','♣Q','♣10'], trumpSuit: '♥ Häerzer', playableCards: ['♠Q','♥A','♥K','♦Q'], options: [], correct: '♠Q,♥A,♥K,♦Q', explanation: '♠D, ♦D (ëmmer Tromp), ♥1, ♥R (Häerzer ass Trompfaarf) = 4 Trëmp' },
            { hand: ['♠Q','♥Q','♦Q','♣A','♣K','♦9'], trumpSuit: '♣ Kräizer', playableCards: ['♠Q','♥Q','♦Q','♣A','♣K'], options: [], correct: '♠Q,♥Q,♦Q,♣A,♣K', explanation: '♠D, ♥D, ♦D (ëmmer Tromp), ♣1, ♣R (Kräizer ass Trompfaarf) = 5 Trëmp' },
            { hand: ['♦A','♦K','♦J','♣Q','♥9','♠Q'], trumpSuit: '♦ Rauten', playableCards: ['♦A','♦K','♦J','♠Q'], options: [], correct: '♦A,♦K,♦J,♠Q', explanation: '♦1, ♦R, ♦V (Rauten ass Trompfaarf), ♠D (ëmmer Tromp) = 4 Trëmp' }
          ]
        }
      },
      {
        title: 'Mini-Spill 4: Streech-Gewënner',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'trick-winner',
          question: 'Wéi eng Kaart gewënnt de Streech?',
          scenarios: [
            { cards: [{ card: '♥10', player: 'Spiller 1' },{ card: '♥K', player: 'Spiller 2' },{ card: '♣9', player: 'Spiller 3' },{ card: '♥A', player: 'Spiller 4' }], trumpSuit: '♣ Kräizer', leadSuit: '♥', playableCards: ['♥10','♥K','♣9','♥A'], options: [], correct: '♣9', explanation: 'Tromp (♣9) gewënnt ëmmer géint Nët-Tromp Kaarten!' },
            { cards: [{ card: '♠J', player: 'Spiller 1' },{ card: '♥A', player: 'Spiller 2' },{ card: '♠K', player: 'Spiller 3' },{ card: '♠10', player: 'Spiller 4' }], trumpSuit: '♥ Häerzer', leadSuit: '♠', playableCards: ['♠J','♥A','♠K','♠10'], options: [], correct: '♥A', explanation: 'Tromp-1 (an dësem Fall: ♥1) ass ëmmer déi héchste Kaart!' },
            { cards: [{ card: '♥Q', player: 'Spiller 1' },{ card: '♠A', player: 'Spiller 2' },{ card: '♥K', player: 'Spiller 3' },{ card: '♦Q', player: 'Spiller 4' }], trumpSuit: '♥ Häerzer', leadSuit: 'Tromp', playableCards: ['♥Q','♠A','♥K','♦Q'], options: [], correct: '♥Q', explanation: '♥D ass méi héich wéi ♥R!' },
            { cards: [{ card: '♦Q', player: 'Spiller 1' },{ card: '♦K', player: 'Spiller 2' },{ card: '♥Q', player: 'Spiller 3' },{ card: '♦J', player: 'Spiller 4' }], trumpSuit: '♦ Rauten', leadSuit: 'Tromp', playableCards: ['♦Q','♦K','♥Q','♦J'], options: [], correct: '♥Q', explanation: 'Häerzer-Damm (♥D) ass ëmmer méi héich wéi Rauten-Damm (♦D), och wa Rauten Tromp ass!' }
          ]
        }
      },
      {
        title: 'Mini-Spill 5: Punkten zielen',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'count-points',
          question: 'Wéivill Punkten sinn an dësem Streech?',
          scenarios: [
            { simpleCards: ['♠A','♥K','♦Q','♣J'], options: ['8','9','10','11'], correct: '10', explanation: '1(Ass)=4 + R=3 + D=2 + V=1 = 10 Punkten' },
            { simpleCards: ['♠A','♥A','♦K','♣10'], options: ['11','12','13','14'], correct: '11', explanation: '1=4 + 1=4 + R=3 + 10=0 = 11 Punkten' },
            { simpleCards: ['♠Q','♥Q','♦J','♣9'], options: ['4','5','6','7'], correct: '5', explanation: 'D=2 + D=2 + V=1 + 9=0 = 5 Punkten' }
          ]
        }
      },
      {
        title: 'Mini-Spill 6: Kaart-Spilllogik',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'card-play-logic',
          question: 'Wéi eng Kaart sollt dir spillen?',
          scenarios: [
            { hand: ['♥A','♥K','♦10','♠9'], currentTrick: [{ card: '♠K', player: 'Spiller 1 - Matspiller' },{ card: '♠Q', player: 'Spiller 2' }], playerPosition: 'Spiller 3', trumpSuit: '♥ Häerzer', leadSuit: '♠', playableCards: ['♥A','♥K','♠9'], options: [], correct: '♥A', explanation: '♥1, ♥R & ♠9 si méiglech, mee mam ♥1 kënnt Dir de Streech nach gewannen!' },
            { hand: ['♦9','♣10','♥Q','♠9'], currentTrick: [{ card: '♦A', player: 'Spiller 1' },{ card: '♦K', player: 'Spiller 2 - Matspiller' },{ card: '♦J', player: 'Spiller 3' }], playerPosition: 'Spiller 4', trumpSuit: '♦ Rauten', leadSuit: '♦', playableCards: ['♦9','♥Q'], options: [], correct: '♦9', explanation: 'Dir musst Tromp bekennen (♦9 & ♥D). De Streech ass scho verluer, also spillt déi klengst Kaart.' },
            { hand: ['♣A','♠Q','♦K','♣J'], currentTrick: [{ card: '♣9', player: 'Spiller 1 - Géigner' }], playerPosition: 'Spiller 2', trumpSuit: '♥ Häerzer', leadSuit: '♣', playableCards: ['♣A','♠Q','♣J'], options: [], correct: '♣A', explanation: '♣1 & ♠D si méiglech. Spillt roueg ♣1 (♠D ass ze staark fir e Streech mat 0 Punkten)!' }
          ]
        }
      },
      {
        title: 'Mini-Spill 7: Annonce-Entscheedung',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'announcement-decision',
          question: 'Wat kënnt Dir (maximal) annoncéieren?',
          scenarios: [
            { hand: ['♠Q','♥Q','♦Q','♣A','♣K','♣J'], trumpSuit: '♣ Kräizer', options: ['Konter a Matt','Konter','Matt','Näischt'], correct: 'Konter a Matt', explanation: 'Mat den 3 Dammen kënnt Dir "Konter a Matt" soen!' },
            { hand: ['♥Q','♦Q','♠A','♠K','♣10','♦9'], trumpSuit: '♠ Schëppen', options: ['Konter a Matt','Konter','Matt','Näischt'], correct: 'Konter', explanation: 'Mat Häerzer-Damm an Rauten-Damm kënnt Dir "Konter" soen!' },
            { hand: ['♠Q','♥A','♥Q','♦10','♣9','♣10'], trumpSuit: '♥ Häerzer', options: ['Konter a Matt','Konter','Matt','Näischt'], correct: 'Matt', explanation: 'Mat der Schëppen-Damm kënnt Dir "Matt" soen!' },
            { hand: ['♥A','♥K','♦A','♠10','♣Q','♦J'], trumpSuit: '♥ Häerzer', options: ['Konter a Matt','Konter','Matt','Näischt'], correct: 'Näischt', explanation: 'Ouni eng speziell Damm kënnt Dir keng Annonce maachen.' }
          ]
        }
      },
      {
        title: 'Mini-Spill 8: Hand bewäerten',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'hand-evaluation',
          question: 'Wéi staark ass dës Hand?',
          scenarios: [
            { hand: ['♠Q','♠A','♠K','♥Q','♦Q','♣A'], trumpSuit: '♠ Schëppen', options: ['Ganz staark','Staark','Mëttel','Schwaach'], correct: 'Ganz staark', explanation: 'Mat 3 Damm-Trëmp, Schëppen-1 a R ass dës Hand extrem staark!' },
            { hand: ['♥A','♥K','♠Q','♦J','♣10','♦9'], trumpSuit: '♥ Häerzer', options: ['Ganz staark','Staark','Mëttel','Schwaach'], correct: 'Staark', explanation: 'Mat Häerzer-1, R an Schëppen-Damm ass dëst eng staark Hand.' },
            { hand: ['♦A','♦10','♣K','♠A','♥J','♣J'], trumpSuit: '♦ Rauten', options: ['Ganz staark','Staark','Mëttel','Schwaach'], correct: 'Mëttel', explanation: 'Mat just engem Tromp-1, awer engem 1 a R dobäi, ass dëst eng mëttelstaark Hand.' },
            { hand: ['♣10','♣9','♠10','♥9','♥10','♠9'], trumpSuit: '♣ Kräizer', options: ['Ganz staark','Staark','Mëttel','Schwaach'], correct: 'Schwaach', explanation: 'Mat just klenge Kaarten a kenger Tromp ass dëst eng schwaach Hand.' }
          ]
        }
      },
      {
        title: 'Mini-Spill 9: D\'Lee',
        description: '', image: '', highlights: [],
        miniGame: {
          type: 'lee-scoring',
          question: 'Wat ännert sech op der Lee fir all Ekipp? (-=ausgestrach, +=bäigemaach)',
          scenarios: [
            { gameInfo: { trumpTeam: 'Ekipp A', winnerTeam: 'Ekipp A', score: '25-15', announcements: ['Konter'] }, options: ['Ekipp A: -2, Ekipp B: +0','Ekipp A: -1, Ekipp B: +0','Ekipp A: -3, Ekipp B: +0','Ekipp A: -2, Ekipp B: +2'], correct: 'Ekipp A: -2, Ekipp B: +0', explanation: 'Tromp-Team gewënnt: 1 Gewënn + 1 Konter = 2 Linnen duerchsträichen.' },
            { gameInfo: { trumpTeam: 'Ekipp A', winnerTeam: 'Ekipp B', score: '18-22', announcements: ['Matt'] }, options: ['Ekipp A: +2, Ekipp B: -2','Ekipp A: +1, Ekipp B: -1','Ekipp A: +0, Ekipp B: -2','Ekipp A: +2, Ekipp B: -0'], correct: 'Ekipp A: +2, Ekipp B: -2', explanation: 'Tromp-Team verléiert: kritt esou vill Linnen bäi, wéi Gewënner-Team der aus kritt (1 Gewënn + 1 Matt = 2).' },
            { gameInfo: { trumpTeam: 'Ekipp A', winnerTeam: 'Ekipp B', score: '0-40', announcements: ['Konter&Matt'] }, options: ['Ekipp A: +3, Ekipp B: -3','Ekipp A: +0, Ekipp B: -3','Ekipp A: +0, Ekipp B: -4','Ekipp A: +4, Ekipp B: -4'], correct: 'Ekipp A: +4, Ekipp B: -4', explanation: 'Tromp-Team verléiert: 1 Gewënn + 2 Konter&Matt + 1 All Streech = 4.' },
            { gameInfo: { trumpTeam: 'Ekipp B', winnerTeam: 'Gläichstand', score: '20-20', announcements: [] }, options: ['Ekipp A: +0, Ekipp B: +1','Ekipp A: +1, Ekipp B: +0','Ekipp A: +0, Ekipp B: +0','Ekipp A: +1, Ekipp B: +1'], correct: 'Ekipp A: +0, Ekipp B: +1', explanation: 'Bei Gläichstand kritt just d\'Tromp-Team 1 Linn bäi, egal wat gesot gouf.' }
          ]
        }
      }
    ]
  },
  {
    id: 'playhand',
    title: 'Spill eng Partie',
    description: 'Komplett Spill géint de Computer',
    icon: React.createElement(Spade, { className: "w-6 h-6" }),
    color: 'green',
    steps: [
      {
        title: 'Elo bass du drun!',
        description: 'Spill eng richteg Partie mat der Mariette als Partner géint d\'Jeanny an de Jupp.\n\n• Am éischte Spill maachs du d\'Tromp: kuck deng éischt 3 Kaarten a wiel eng Faarf.\n• Hues du eng speziell Damm, da kanns du virun denger éischter Kaart schwätzen.\n• Kaarten, déi s du net spille darfs, sinn däischter. Mat 💡 Tipp kriss du e Virschlag.\n• Nom 6. Streech gëtt gezielt an d\'Lee ugepasst — wee fir d\'éischt keng Linne méi huet, gewënnt!',
        image: '', highlights: []
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
        image: '', highlights: [],
        quiz: {
          questions: [
            { question: 'Wéivill Trëmp sinn am ganzen Spill?', options: ['8','9','10','8 oder 9'], correct: '8 oder 9', explanation: 'Bei ♠/♥/♦ als Trompfaarf sinn et 8 Trëmp. Bei ♣ sinn et 9 Trëmp.' },
            { question: 'Mat wéivill Linnen op der Lee fänkt all Team un?', options: ['7','8','9','10'], correct: '9', explanation: 'All Team fänkt mat 9 Linnen un.' },
            { question: 'Wéivill Kaarten kritt all Spiller ausgedeelt?', options: ['5','6','7','8'], correct: '6', explanation: 'All Spiller kritt 6 Kaarten (3 + 3).' },
            { question: 'Wat brauch een fir "Ech konteren" ze soen?', options: ['♠D','♥D + ♦D','3 Dammen','♣D'], correct: '♥D + ♦D', explanation: 'Fir ze konteren brauch een d\'Häerzer-Damm an d\'Rauten-Damm.' },
            { question: 'Wéivill Punkten/Schrom huet en Ass?', options: ['3','4','5','6'], correct: '4', explanation: 'En Ass (=1) huet 4 Punkten.' },
            { question: 'Wéivill Linnen kritt een fir e gewonnent Spill mat "Konter a Matt" ausgestrach?', options: ['2','3','4','3 oder 4'], correct: '3 oder 4', explanation: '"Konter a Matt" gëtt 3 Linnen aus (1 gewonnen + 2). Wann all Streech gewonnen: +1, also 4.' },
            { question: 'Wien deelt d\'Kaarten um Ufank vum Spill aus?', options: ['Den eelste Spiller','Zoufälleg','Ëmmer de selwechten','All Kéier e neie Spiller'], correct: 'All Kéier e neie Spiller', explanation: 'D\'Ausdeeler-Roll wiesselt mat der Auer no all Spill.' },
            { question: 'Wéi vill Punkten/Schrom ginn et am Ganzen an engem Spill?', options: ['32','36','40','44'], correct: '40', explanation: 'All Kaarten zesummen: 4+3+2+1+0+0 pro Faarf = 10x4 = 40.' },
            { question: 'Wéi vill Streech ginn an engem Spill gespillt?', options: ['4','5','6','8'], correct: '6', explanation: 'Et gi 6 Streech pro Spill.' },
            { question: 'Wien dierf d\'Trompfaarf wielen?', options: ['De Spiller lénks vum Ausdeeler','De Spiller mat de meeschte Punkten','Den Ausdeeler','Zoufälleg'], correct: 'De Spiller lénks vum Ausdeeler', explanation: 'De Spiller direkt lénks vum Ausdeeler decidéiert d\'Trompfaarf.' },
            { question: 'Wéini dierf een eng Annonce maachen?', options: ['Ier d\'Kaarten ausgedeelt ginn','Während dem zweete Streech','Soubal een um Zuch ass beim éischte Streech','No de 6 Streech'], correct: 'Soubal een um Zuch ass beim éischte Streech', explanation: 'Annoncen dierfe gemaach ginn, soubal een am éischten Streech drun ass.' },
            { question: 'Wéi eng Kaart ass ëmmer Tromp?', options: ['♠D','♥V','♦1','♣R'], correct: '♠D', explanation: 'D\'Schëppen-Damm (♠D) ass ëmmer Tromp.' },
            { question: 'Wat geschitt bei engem Gläichspill (20:20)?', options: ['Kee kritt Linnen bäi','Tromp-Team kritt 1 Linn bäi','D\'Gewënner kréien 2 Linnen bäi','All Ekipp kritt 1 Linn duerchgestrach'], correct: 'Tromp-Team kritt 1 Linn bäi', explanation: 'Just d\'Tromp-Team kritt eng Linn bäi bei Gläichspill.' },
            { question: 'Wat muss e maachen, wann een d\'Faarf vun der éischter gespillter Kaart net huet?', options: ['Egal wéi eng Kaart spillen','Et muss en Tromp spillen, wa méiglech','Et duerf e net spillen','Et duerf en eng Kaart zéien'], correct: 'Egal wéi eng Kaart spillen', explanation: 'Wann e keng Kaart vun där Faarf an der Hand huet, dierf een all Kaart spillen.' },
            { question: 'Wat geschitt wann d\'Tromp-Ekipp verléiert?', options: ['Näischt','D\'Ekipp kritt souvill Linnen bäi, wéi d\'Gewënner-Ekipp gestrach krut','Dat ass net méiglech','Déi aner Ekipp kritt extra Punkten'], correct: 'D\'Ekipp kritt souvill Linnen bäi, wéi d\'Gewënner-Ekipp gestrach krut', explanation: 'D\'Tromp-Ekipp kritt esou vill Linnen bäi, wéi d\'Gewënner-Ekipp gestrach krut.' }
          ]
        }
      }
    ]
  }
];
