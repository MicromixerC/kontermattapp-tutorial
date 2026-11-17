/**
 * Konter a Matt — rules engine.
 * Single source of truth for: trumps, legal moves, trick winner, points (Schrom),
 * announcements and Lee scoring. Used by the mini-games, the "play a hand" mode
 * and the scenario tests (npm test).
 *
 * Card notation: suit symbol + rank, e.g. '♠A', '♥10', '♦Q'.
 * Ranks: A (=1), K (=R), Q (=D), J (=V), 10, 9.
 */

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | 'K' | 'Q' | 'J' | '10' | '9';
export type Card = string;
export type Team = 'A' | 'B';
export type Announcement = 'matt' | 'konter' | 'konterMatt';

export const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
export const RANKS: Rank[] = ['A', 'K', 'Q', 'J', '10', '9'];

/** Queens that are always trump, highest first. ♣Q is trump only when ♣ is trump. */
export const PERMANENT_TRUMPS: Card[] = ['♠Q', '♥Q', '♦Q'];

const POINTS: Record<Rank, number> = { A: 4, K: 3, Q: 2, J: 1, '10': 0, '9': 0 };
const PLAIN_ORDER: Rank[] = ['A', 'K', 'Q', 'J', '10', '9'];

export function parseCard(card: Card): { suit: Suit; rank: Rank } {
  const clean = card.replace(/️/g, '').trim();
  const suit = clean[0] as Suit;
  const rank = clean.slice(1) as Rank;
  if (!SUITS.includes(suit) || !RANKS.includes(rank)) throw new Error(`Invalid card: ${card}`);
  return { suit, rank };
}

export const normalize = (card: Card): Card => {
  const { suit, rank } = parseCard(card);
  return suit + rank;
};

/** Accepts '♥', '♥ Häerzer', 'hearts' … and returns the suit symbol. */
export function toSuit(value: string): Suit {
  const v = value.trim();
  if (SUITS.includes(v[0] as Suit)) return v[0] as Suit;
  const map: Record<string, Suit> = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
  if (map[v]) return map[v];
  throw new Error(`Unknown suit: ${value}`);
}

export function fullDeck(): Card[] {
  return SUITS.flatMap((s) => RANKS.map((r) => s + r));
}

export function isTrump(card: Card, trump: Suit): boolean {
  const c = normalize(card);
  if (PERMANENT_TRUMPS.includes(c)) return true;
  return parseCard(c).suit === trump;
}

/** Trump order, highest first. 8 trumps (9 when ♣ is trump). */
export function trumpOrder(trump: Suit): Card[] {
  const rest = (['K', 'Q', 'J', '10', '9'] as Rank[])
    .filter((r) => !(r === 'Q' && trump !== '♣'))
    .map((r) => trump + r)
    .filter((c) => !PERMANENT_TRUMPS.includes(c));
  return [trump + 'A', ...PERMANENT_TRUMPS, ...rest];
}

/** Suit a card "belongs to" for following: 'trump' or its plain suit. */
export function effectiveSuit(card: Card, trump: Suit): Suit | 'trump' {
  return isTrump(card, trump) ? 'trump' : parseCard(card).suit;
}

export function cardPoints(card: Card): number {
  return POINTS[parseCard(card).rank];
}

export function sumPoints(cards: Card[]): number {
  return cards.reduce((s, c) => s + cardPoints(c), 0);
}

/**
 * Cards that may be played.
 * - Trump led: must play a trump if you have one; otherwise anything.
 * - Plain suit led: follow suit OR play a trump; if you have neither, anything.
 * - Leading: anything.
 */
export function legalMoves(hand: Card[], leadCard: Card | null, trump: Suit): Card[] {
  if (!leadCard) return [...hand];
  const led = effectiveSuit(leadCard, trump);
  const trumps = hand.filter((c) => isTrump(c, trump));
  if (led === 'trump') return trumps.length ? trumps : [...hand];
  const follow = hand.filter((c) => effectiveSuit(c, trump) === led);
  if (follow.length) return [...follow, ...trumps];
  return [...hand]; // can't follow and no trump → free choice
}

export type MoveReason = 'lead' | 'follow' | 'trump' | 'free' | 'mustFollow' | 'mustTrump';

/** Why a card is (or isn't) allowed — used for hints. */
export function explainMove(card: Card, hand: Card[], leadCard: Card | null, trump: Suit): { legal: boolean; reason: MoveReason } {
  if (!leadCard) return { legal: true, reason: 'lead' };
  const legal = legalMoves(hand, leadCard, trump).map(normalize).includes(normalize(card));
  const led = effectiveSuit(leadCard, trump);
  const mine = effectiveSuit(card, trump);
  if (legal) {
    if (mine === led) return { legal, reason: 'follow' };
    if (mine === 'trump') return { legal, reason: 'trump' };
    return { legal, reason: 'free' };
  }
  return { legal, reason: led === 'trump' ? 'mustTrump' : 'mustFollow' };
}

/** Strength within a trick: higher wins. Non-matching plain cards get -1. */
function strength(card: Card, ledSuit: Suit | 'trump', trump: Suit): number {
  if (isTrump(card, trump)) {
    const order = trumpOrder(trump);
    return 100 + (order.length - order.indexOf(normalize(card)));
  }
  const { suit, rank } = parseCard(card);
  if (suit !== ledSuit) return -1;
  return 10 + (PLAIN_ORDER.length - PLAIN_ORDER.indexOf(rank));
}

/** Index (in play order) of the card winning the trick. cards[0] is the lead. */
export function trickWinner(cards: Card[], trump: Suit): number {
  const led = effectiveSuit(cards[0], trump);
  let best = 0;
  cards.forEach((c, i) => {
    if (strength(c, led, trump) > strength(cards[best], led, trump)) best = i;
  });
  return best;
}

/** Highest announcement this hand allows, or null. */
export function possibleAnnouncement(hand: Card[]): Announcement | null {
  const h = hand.map(normalize);
  const matt = h.includes('♠Q');
  const konter = h.includes('♥Q') && h.includes('♦Q');
  if (matt && konter) return 'konterMatt';
  if (konter) return 'konter';
  if (matt) return 'matt';
  return null;
}

export const ANNOUNCEMENT_LINES: Record<Announcement, number> = { matt: 1, konter: 1, konterMatt: 2 };

export interface LeeInput {
  trumpTeam: Team;
  pointsA: number;            // Schrom of team A (team B = 40 - pointsA)
  announcements: Announcement[]; // all announcements, from any player
  allTricksBy?: Team | null;  // team that won all 6 tricks
}

export interface LeeResult {
  winner: Team | 'tie';
  /** Negative = lines struck (auskréien), positive = lines added (ukréien). */
  deltaA: number;
  deltaB: number;
  lines: number;
}

export function leeResult({ trumpTeam, pointsA, announcements, allTricksBy = null }: LeeInput): LeeResult {
  const pointsB = 40 - pointsA;
  if (pointsA === pointsB) {
    return { winner: 'tie', deltaA: trumpTeam === 'A' ? 1 : 0, deltaB: trumpTeam === 'B' ? 1 : 0, lines: 1 };
  }
  const winner: Team = pointsA > pointsB ? 'A' : 'B';
  const lines =
    1 +
    announcements.reduce((s, a) => s + ANNOUNCEMENT_LINES[a], 0) +
    (allTricksBy === winner ? 1 : 0);
  const loserAdds = winner !== trumpTeam ? lines : 0;
  return {
    winner,
    lines,
    deltaA: winner === 'A' ? -lines : loserAdds,
    deltaB: winner === 'B' ? -lines : loserAdds,
  };
}

/* ---------- randomness helpers (seedable for tests) ---------- */

export type Rng = () => number;

export function mulberry32(seed: number): Rng {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: T[], rng: Rng = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const pick = <T,>(arr: T[], rng: Rng = Math.random): T => arr[Math.floor(rng() * arr.length)];

/** Deal 4 hands of 6 cards. */
export function deal(rng: Rng = Math.random): Card[][] {
  const d = shuffle(fullDeck(), rng);
  return [0, 1, 2, 3].map((p) => d.slice(p * 6, p * 6 + 6));
}

/** Sort a hand for display: trumps first (high→low), then suits. */
export function sortHand(hand: Card[], trump?: Suit): Card[] {
  const key = (c: Card) => {
    if (trump && isTrump(c, trump)) return trumpOrder(trump).indexOf(normalize(c));
    const { suit, rank } = parseCard(c);
    return 100 + SUITS.indexOf(suit) * 10 + PLAIN_ORDER.indexOf(rank);
  };
  return [...hand].sort((a, b) => key(a) - key(b));
}
