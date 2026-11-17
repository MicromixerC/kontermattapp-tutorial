/**
 * Simple computer players for the "play a hand" mode.
 * Goal: plausible, rule-abiding play that a beginner can learn from — not a strong AI.
 */
import {
  Card, Suit, Announcement, SUITS, isTrump, legalMoves, trickWinner, cardPoints, trumpOrder,
  normalize, parseCard, possibleAnnouncement, effectiveSuit,
} from './rules';

/** Rough hand strength for a given trump suit. */
export function handStrength(hand: Card[], trump: Suit): number {
  const order = trumpOrder(trump);
  return hand.reduce((s, c) => {
    if (isTrump(c, trump)) return s + 3 + (order.length - order.indexOf(normalize(c))) * 0.6;
    const { rank } = parseCard(c);
    return s + (rank === 'A' ? 2 : rank === 'K' ? 0.8 : 0);
  }, 0);
}

/** Pick the trump suit that makes these (3) cards strongest. */
export function chooseTrump(hand: Card[]): Suit {
  return [...SUITS].sort((a, b) => handStrength(hand, b) - handStrength(hand, a))[0];
}

/** Decide whether to announce. Being the trump team is riskier (you get lines added if you lose). */
export function chooseAnnouncement(hand: Card[], trump: Suit, isTrumpTeam: boolean): Announcement | null {
  const ann = possibleAnnouncement(hand);
  if (!ann) return null;
  const trumps = hand.filter((c) => isTrump(c, trump)).length;
  const need = isTrumpTeam ? 4 : 3;
  return trumps >= need ? ann : null;
}

const strength = (card: Card, trick: Card[], trump: Suit) => {
  // a card "wins" if it would be the winner when added to the current trick
  const w = trickWinner([...trick, card], trump);
  return w === trick.length;
};

/**
 * Choose a card.
 * @param trick cards already in the current trick (in play order)
 * @param partnerIndex index in `trick` of the partner's card, or -1
 */
export function chooseCard(hand: Card[], trick: Card[], trump: Suit, partnerIndex: number): Card {
  const legal = legalMoves(hand, trick[0] ?? null, trump);
  const byPoints = (a: Card, b: Card) => cardPoints(a) - cardPoints(b);
  const trumpRank = (c: Card) => trumpOrder(trump).indexOf(normalize(c)); // lower = stronger
  const weakestFirst = (a: Card, b: Card) => {
    const ta = isTrump(a, trump), tb = isTrump(b, trump);
    if (ta !== tb) return ta ? 1 : -1;               // keep trumps
    if (ta && tb) return trumpRank(b) - trumpRank(a); // weakest trump first
    return byPoints(a, b);
  };

  // Leading
  if (trick.length === 0) {
    const plainAces = legal.filter((c) => !isTrump(c, trump) && parseCard(c).rank === 'A');
    if (plainAces.length) return plainAces[0];
    const trumps = legal.filter((c) => isTrump(c, trump));
    // holding the trump ace → pull trumps
    if (trumps.some((c) => normalize(c) === trump + 'A')) return trump + 'A';
    if (trumps.length >= 4) return [...trumps].sort((a, b) => trumpRank(a) - trumpRank(b))[0];
    return [...legal].sort(weakestFirst)[0];
  }

  const winnerNow = trickWinner(trick, trump);
  const partnerWinning = partnerIndex >= 0 && winnerNow === partnerIndex;
  const lastToPlay = trick.length === 3;

  if (partnerWinning) {
    // give points to the partner ("schmieren") if the trick is likely safe, else play cheap
    const safe = lastToPlay || isTrump(trick[winnerNow], trump);
    const plain = legal.filter((c) => !isTrump(c, trump));
    if (safe && plain.length) return [...plain].sort((a, b) => cardPoints(b) - cardPoints(a))[0];
    return [...legal].sort(weakestFirst)[0];
  }

  // try to win as cheaply as possible
  const winners = legal.filter((c) => strength(c, trick, trump));
  if (winners.length) {
    const pts = trick.reduce((s, c) => s + cardPoints(c), 0);
    const cheapest = [...winners].sort(weakestFirst)[0];
    // don't waste a big trump on a worthless trick early on
    const isBigTrump = isTrump(cheapest, trump) && trumpRank(cheapest) <= 1;
    if (!(isBigTrump && pts === 0 && !lastToPlay)) return cheapest;
  }
  // can't (or won't) win: throw the least valuable card
  return [...legal].sort(weakestFirst)[0];
}

/** Short, beginner-friendly reason for the suggested card (used by the 💡 hint). */
export function hintFor(hand: Card[], trick: Card[], trump: Suit, partnerIndex: number): { card: Card; why: string } {
  const card = chooseCard(hand, trick, trump, partnerIndex);
  if (!trick.length) {
    if (!isTrump(card, trump) && parseCard(card).rank === 'A') return { card, why: 'En Ass vun enger Nët-Tromp-Faarf gewënnt dacks direkt.' };
    if (normalize(card) === trump + 'A') return { card, why: 'Mam Tromp-Ass zitts de Trëmp vun de Géigner eraus.' };
    return { card, why: 'Spill eng kleng Kaart aus a spuer deng staark Kaarten.' };
  }
  const winnerNow = trickWinner(trick, trump);
  if (partnerIndex >= 0 && winnerNow === partnerIndex)
    return { card, why: cardPoints(card) >= 3 ? 'Däi Partner gewënnt — gëff him Punkten!' : 'Däi Partner gewënnt: spill eng bëlleg Kaart.' };
  if (strength(card, trick, trump))
    return { card, why: isTrump(card, trump) && effectiveSuit(trick[0], trump) !== 'trump' ? 'Mat enger Tromp gewënns de de Streech.' : 'Domat gewënns de de Streech — sou bëlleg wéi méiglech.' };
  return { card, why: 'Du kanns de Streech net gewannen: gëff sou wéineg Punkte wéi méiglech.' };
}
