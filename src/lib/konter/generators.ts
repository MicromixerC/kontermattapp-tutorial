/**
 * Random scenario generators for the mini-games.
 * Every scenario is computed by the rules engine, so it is always correct.
 */
import { MiniGameScenario } from '@/types/tutorial';
import {
  Card, Suit, Rng, Announcement, Team, SUITS, fullDeck, shuffle, pick, isTrump, legalMoves,
  trickWinner, sumPoints, cardPoints, possibleAnnouncement, leeResult, sortHand, effectiveSuit, parseCard,
} from './rules';

/* Luxembourgish labels (other languages: see translation step) */
export const SUIT_NAME: Record<Suit, string> = { '♠': 'Schëppen', '♥': 'Häerzer', '♦': 'Rauten', '♣': 'Kräizer' };
const RANK_LABEL: Record<string, string> = { A: '1', K: 'R', Q: 'D', J: 'V', '10': '10', '9': '9' };
export const label = (c: Card) => { const { suit, rank } = parseCard(c); return suit + RANK_LABEL[rank]; };
export const suitLabel = (s: Suit) => `${s} ${SUIT_NAME[s]}`;
const list = (cards: Card[]) => cards.map(label).join(', ');

const ANN_LABEL: Record<Announcement, string> = { matt: 'Matt', konter: 'Konter', konterMatt: 'Konter a Matt' };

export const GENERATABLE = [
  'playable-cards', 'count-trumps', 'trick-winner', 'count-points', 'announcement-decision', 'lee-scoring',
] as const;

export function canGenerate(type: string) {
  return (GENERATABLE as readonly string[]).includes(type);
}

export function generateScenario(type: string, rng: Rng = Math.random): MiniGameScenario | null {
  switch (type) {
    case 'playable-cards': return genPlayable(rng);
    case 'count-trumps': return genCountTrumps(rng);
    case 'trick-winner': return genTrickWinner(rng);
    case 'count-points': return genCountPoints(rng);
    case 'announcement-decision': return genAnnouncement(rng);
    case 'lee-scoring': return genLee(rng);
    default: return null;
  }
}

function genPlayable(rng: Rng): MiniGameScenario {
  const trump = pick(SUITS, rng);
  // Prefer interesting cases (some cards are not allowed) most of the time
  for (let tries = 0; tries < 50; tries++) {
    const deck = shuffle(fullDeck(), rng);
    const lead = deck[0];
    const hand = sortHand(deck.slice(1, 7), trump);
    const legal = legalMoves(hand, lead, trump);
    if (legal.length === hand.length && rng() < 0.8 && tries < 49) continue;
    const led = effectiveSuit(lead, trump);
    const trumps = hand.filter((c) => isTrump(c, trump));
    let explanation: string;
    if (led === 'trump') {
      explanation = trumps.length
        ? `Tromp gouf ugespillt: Dir musst Tromp bekennen → ${list(trumps)}.`
        : 'Tromp gouf ugespillt, mee Dir hutt keng Tromp → Dir kënnt all Kaart spillen.';
    } else {
      const follow = hand.filter((c) => effectiveSuit(c, trump) === led);
      if (follow.length)
        explanation = `${SUIT_NAME[led]} bekennen (${list(follow)})` + (trumps.length ? ` oder trompen (${list(trumps)}).` : '.');
      else if (trumps.length)
        explanation = `Dir hutt keng ${SUIT_NAME[led]} → Dir kënnt all Kaart spillen (och trompen).`;
      else explanation = `Dir hutt keng ${SUIT_NAME[led]} an keng Tromp → all Kaart ass erlaabt.`;
    }
    return {
      hand, trumpSuit: suitLabel(trump), leadCard: lead,
      leadSuit: led === 'trump' ? 'Tromp' : suitLabel(led),
      playableCards: legal, options: [], correct: legal.join(','), explanation,
    };
  }
  throw new Error('unreachable');
}

function genCountTrumps(rng: Rng): MiniGameScenario {
  const trump = pick(SUITS, rng);
  const deck = shuffle(fullDeck(), rng);
  // make sure there's at least one trump and one non-trump
  let hand = deck.slice(0, 6);
  for (let i = 6; i < deck.length && (hand.every((c) => isTrump(c, trump)) || !hand.some((c) => isTrump(c, trump))); i++) {
    hand = [...hand.slice(1), deck[i]];
  }
  hand = shuffle(hand, rng);
  const trumps = hand.filter((c) => isTrump(c, trump));
  return {
    hand, trumpSuit: suitLabel(trump), playableCards: trumps, options: [], correct: trumps.join(','),
    explanation: `${trumps.length} Trëmp: ${list(trumps)}.` + (hand.includes('♣Q') && trump !== '♣' ? ' (♣D ass just Tromp wann ♣ Tromp ass.)' : ''),
  };
}

const PLAYERS = ['Spiller 1', 'Spiller 2', 'Spiller 3', 'Spiller 4'];

function genTrickWinner(rng: Rng): MiniGameScenario {
  const trump = pick(SUITS, rng);
  // Build a plausible, legal trick
  const hands = [0, 1, 2, 3].map(() => [] as Card[]);
  shuffle(fullDeck(), rng).forEach((c, i) => hands[i % 4].push(c));
  const cards: Card[] = [];
  for (let p = 0; p < 4; p++) {
    const options = legalMoves(hands[p], cards[0] ?? null, trump);
    cards.push(pick(options, rng));
  }
  const w = trickWinner(cards, trump);
  const winCard = cards[w];
  const anyTrump = cards.some((c) => isTrump(c, trump));
  const led = effectiveSuit(cards[0], trump);
  const explanation = anyTrump
    ? `${label(winCard)} ass déi héchsten Tromp am Streech.`
    : `Keng Tromp gespillt: déi héchst ${SUIT_NAME[led as Suit]} (=ausgaang Faarf) gewënnt → ${label(winCard)}.`;
  return {
    cards: cards.map((card, i) => ({ card, player: PLAYERS[i] })),
    trumpSuit: suitLabel(trump), leadSuit: led === 'trump' ? 'Tromp' : (led as string),
    playableCards: cards, options: [], correct: winCard, explanation,
  };
}

function genCountPoints(rng: Rng): MiniGameScenario {
  const cards = shuffle(fullDeck(), rng).slice(0, 4);
  const total = sumPoints(cards);
  const opts = new Set<number>([total]);
  while (opts.size < 4) {
    const d = Math.floor(rng() * 7) - 3;
    if (total + d >= 0 && total + d <= 16) opts.add(total + d);
  }
  return {
    simpleCards: cards,
    options: [...opts].sort((a, b) => a - b).map(String),
    correct: String(total),
    explanation: cards.map((c) => `${label(c)}=${cardPoints(c)}`).join(' + ') + ` = ${total} Punkten`,
  };
}

function genAnnouncement(rng: Rng): MiniGameScenario {
  const trump = pick(SUITS, rng);
  const target = pick<Announcement | null>(['konterMatt', 'konter', 'matt', null], rng);
  const need = target === 'konterMatt' ? ['♠Q', '♥Q', '♦Q'] : target === 'konter' ? ['♥Q', '♦Q'] : target === 'matt' ? ['♠Q'] : [];
  const forbidden = target === 'konter' ? ['♠Q'] : target === 'matt' ? (rng() < 0.5 ? ['♥Q'] : ['♦Q']) : target === null ? ['♠Q', rng() < 0.5 ? '♥Q' : '♦Q'] : [];
  const rest = shuffle(fullDeck().filter((c) => !need.includes(c) && !forbidden.includes(c)), rng);
  const hand = sortHand([...need, ...rest.slice(0, 6 - need.length)], trump);
  const ann = possibleAnnouncement(hand);
  const correct = ann ? ANN_LABEL[ann] : 'Näischt';
  const why: Record<string, string> = {
    'Konter a Matt': 'Mat ♠D, ♥D an ♦D kënnt Dir "Konter a Matt" soen!',
    Konter: 'Mat ♥D an ♦D kënnt Dir "Konter" soen!',
    Matt: 'Mat der ♠D kënnt Dir "Matt" soen!',
    Näischt: 'Ouni ♠D an ouni ♥D+♦D kënnt Dir näischt soen.',
  };
  return {
    hand, trumpSuit: suitLabel(trump), options: ['Konter a Matt', 'Konter', 'Matt', 'Näischt'], correct,
    explanation: why[correct] + (hand.includes('♣Q') ? ' (♣D zielt net fir Annoncen.)' : ''),
  };
}

function genLee(rng: Rng): MiniGameScenario {
  const trumpTeam: Team = rng() < 0.5 ? 'A' : 'B';
  const roll = rng();
  const pointsA = roll < 0.12 ? 20 : roll < 0.2 ? (rng() < 0.5 ? 0 : 40) : 8 + Math.floor(rng() * 25);
  const allTricksBy: Team | null = pointsA === 40 ? 'A' : pointsA === 0 ? 'B' : null;
  const annPool: Announcement[][] = [[], [], ['matt'], ['konter'], ['konterMatt'], ['matt', 'konter']];
  const announcements = pick(annPool, rng);
  const r = leeResult({ trumpTeam, pointsA, announcements, allTricksBy });
  const fmt = (a: number, b: number) =>
    `Ekipp A: ${a > 0 ? '+' + a : a < 0 ? String(a) : '+0'}, Ekipp B: ${b > 0 ? '+' + b : b < 0 ? String(b) : '+0'}`;
  const correct = fmt(r.deltaA, r.deltaB);
  const wrong = new Set<string>();
  const alt = [
    [r.deltaA - Math.sign(r.deltaA || 1), r.deltaB],
    [r.deltaA, r.deltaB === 0 ? (r.winner === 'A' ? r.lines : 0) : 0],
    [r.winner === 'B' ? r.lines : -r.lines, r.winner === 'A' ? r.lines : -r.lines],
    [r.deltaA === 0 ? 1 : r.deltaA + Math.sign(r.deltaA), r.deltaB === 0 ? 0 : r.deltaB + Math.sign(r.deltaB)],
    [r.deltaB, r.deltaA],
    [0, 0],
  ];
  for (const [a, b] of alt) { const s = fmt(a, b); if (s !== correct) wrong.add(s); if (wrong.size === 3) break; }
  const options = shuffle([correct, ...wrong], rng);
  const annText = announcements.length ? announcements.map((a) => ANN_LABEL[a]).join(' + ') : 'keng';
  let explanation: string;
  if (r.winner === 'tie') explanation = `20:20 = Stänner: just d'Tromp-Ekipp (${trumpTeam}) kritt 1 Linn bäi.`;
  else {
    const parts = ['1 Gewënn'];
    announcements.forEach((a) => parts.push(`${a === 'konterMatt' ? 2 : 1} ${ANN_LABEL[a]}`));
    if (allTricksBy === r.winner) parts.push('1 all Streech');
    explanation = `Ekipp ${r.winner} gewënnt: ${parts.join(' + ')} = ${r.lines} Linn${r.lines > 1 ? 'en' : ''} ausgestrach. ` +
      (r.winner !== trumpTeam ? `Tromp-Ekipp ${trumpTeam} huet verluer → kritt ${r.lines} bäi.` : 'Déi aner Ekipp huet d\'Tromp net gemaach → näischt ännert.');
  }
  return {
    gameInfo: {
      trumpTeam: `Ekipp ${trumpTeam}`,
      winnerTeam: r.winner === 'tie' ? 'Gläichstand' : `Ekipp ${r.winner}`,
      score: `${pointsA}-${40 - pointsA}`,
      announcements: announcements.map((a) => (a === 'konterMatt' ? 'Konter&Matt' : ANN_LABEL[a])),
    },
    options, correct, explanation: explanation + ` (Annoncen: ${annText})`,
  };
}
