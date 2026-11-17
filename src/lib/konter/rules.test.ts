import { describe, it, expect } from 'vitest';
import {
  trumpOrder, isTrump, legalMoves, trickWinner, sumPoints, fullDeck, leeResult,
  possibleAnnouncement, toSuit, normalize, mulberry32, Suit,
} from './rules';
import { generateScenario, GENERATABLE } from './generators';
import { chaptersLux } from '@/data/tutorial/chapters-lux';
import { chaptersDe } from '@/data/tutorial/chapters-de';
import { chaptersEn } from '@/data/tutorial/chapters-en';
import { chaptersFr } from '@/data/tutorial/chapters-fr';
import type { MiniGameStep, MiniGameScenario } from '@/types/tutorial';

const sameSet = (a: string[], b: string[]) =>
  expect([...a].map(normalize).sort()).toEqual([...b].map(normalize).sort());

describe('rules', () => {
  it('trump order matches the rules chapter', () => {
    expect(trumpOrder('♠')).toEqual(['♠A', '♠Q', '♥Q', '♦Q', '♠K', '♠J', '♠10', '♠9']);
    expect(trumpOrder('♥')).toEqual(['♥A', '♠Q', '♥Q', '♦Q', '♥K', '♥J', '♥10', '♥9']);
    expect(trumpOrder('♣')).toEqual(['♣A', '♠Q', '♥Q', '♦Q', '♣K', '♣Q', '♣J', '♣10', '♣9']);
  });
  it('♣Q is trump only when clubs are trump', () => {
    expect(isTrump('♣Q', '♥')).toBe(false);
    expect(isTrump('♣Q', '♣')).toBe(true);
    expect(isTrump('♦Q', '♠')).toBe(true);
  });
  it('40 points in the deck', () => expect(sumPoints(fullDeck())).toBe(40));
  it('legal moves', () => {
    sameSet(legalMoves(['♠A', '♠K', '♥Q', '♦10', '♣9', '♣J'], '♠J', '♥'), ['♠A', '♠K', '♥Q']);
    // ♠Q is a trump, so it does not count as a spade for following
    sameSet(legalMoves(['♠Q', '♣9'], '♠K', '♥'), ['♠Q', '♣9']);
    sameSet(legalMoves(['♠Q', '♠9'], '♠K', '♥'), ['♠Q', '♠9']);
    sameSet(legalMoves(['♦9', '♣10', '♥Q', '♠9'], '♦A', '♦'), ['♦9', '♥Q']);
  });
  it('trick winner', () => {
    expect(trickWinner(['♦Q', '♦K', '♥Q', '♦J'], '♦')).toBe(2);
    expect(trickWinner(['♥10', '♥K', '♣9', '♥A'], '♣')).toBe(2);
    expect(trickWinner(['♠J', '♠A', '♣A', '♠10'], '♥')).toBe(1);
  });
  it('announcements', () => {
    expect(possibleAnnouncement(['♠Q', '♥Q', '♦Q'])).toBe('konterMatt');
    expect(possibleAnnouncement(['♥Q', '♦Q', '♣Q'])).toBe('konter');
    expect(possibleAnnouncement(['♥Q', '♣Q'])).toBe(null);
  });
  it('lee', () => {
    expect(leeResult({ trumpTeam: 'A', pointsA: 25, announcements: ['konter'] })).toMatchObject({ deltaA: -2, deltaB: 0 });
    expect(leeResult({ trumpTeam: 'A', pointsA: 18, announcements: ['matt'] })).toMatchObject({ deltaA: 2, deltaB: -2 });
    expect(leeResult({ trumpTeam: 'A', pointsA: 0, announcements: ['konterMatt'], allTricksBy: 'B' })).toMatchObject({ deltaA: 4, deltaB: -4 });
    expect(leeResult({ trumpTeam: 'B', pointsA: 20, announcements: ['konterMatt'] })).toMatchObject({ deltaA: 0, deltaB: 1 });
  });
});

/* ---------- validate every hand-written mini-game scenario ---------- */

const LEE_ANN: Record<string, 'matt' | 'konter' | 'konterMatt'> = { Matt: 'matt', Konter: 'konter', 'Konter&Matt': 'konterMatt', 'Konter a Matt': 'konterMatt' };

function checkScenario(type: string, s: MiniGameScenario, where: string) {
  const trump = s.trumpSuit ? toSuit(s.trumpSuit) : ('♠' as Suit);
  const allCards = [...(s.hand ?? []), ...(s.currentTrick ?? []).map((t) => t.card), ...(s.leadCard ? [s.leadCard] : [])];
  expect(new Set(allCards.map(normalize)).size, `${where}: duplicate card`).toBe(allCards.length);

  switch (type) {
    case 'playable-cards': {
      expect(s.leadCard, `${where}: leadCard missing`).toBeTruthy();
      const legal = legalMoves(s.hand!, s.leadCard!, trump);
      sameSet(s.correct.split(','), legal);
      break;
    }
    case 'count-trumps':
      sameSet(s.correct.split(','), s.hand!.filter((c) => isTrump(c, trump)));
      break;
    case 'trick-winner': {
      const cards = s.cards!.map((c) => c.card);
      expect(normalize(s.correct), where).toBe(normalize(cards[trickWinner(cards, trump)]));
      break;
    }
    case 'count-points':
      expect(Number(s.correct), where).toBe(sumPoints(s.simpleCards!));
      break;
    case 'card-play-logic': {
      const trick = s.currentTrick!.map((t) => t.card);
      const legal = legalMoves(s.hand!, trick[0], trump);
      sameSet(s.playableCards!, legal);
      expect(legal.map(normalize), `${where}: answer must be legal`).toContain(normalize(s.correct));
      break;
    }
    case 'announcement-decision': {
      const a = possibleAnnouncement(s.hand!);
      const expected = a === 'konterMatt' ? 'Konter a Matt' : a === 'konter' ? 'Konter' : a === 'matt' ? 'Matt' : null;
      if (expected) expect(s.correct, where).toBe(expected);
      else expect(s.options.indexOf(s.correct), where).toBe(3);
      break;
    }
    case 'lee-scoring': {
      const g = s.gameInfo!;
      const team = (t: string) => (t.trim().endsWith('A') ? 'A' : 'B');
      const pointsA = Number(g.score.split('-')[0]);
      const r = leeResult({
        trumpTeam: team(g.trumpTeam), pointsA,
        announcements: g.announcements.map((a) => LEE_ANN[a]),
        allTricksBy: pointsA === 40 ? 'A' : pointsA === 0 ? 'B' : null,
      });
      const nums = s.correct.match(/[+-]\d+/g)!.map(Number);
      expect(nums, where).toEqual([r.deltaA, r.deltaB]);
      break;
    }
  }
}

describe.each([
  ['lux', chaptersLux], ['de', chaptersDe], ['en', chaptersEn], ['fr', chaptersFr],
])('hand-written scenarios (%s)', (_lang, chapters) => {
  const games = chapters.flatMap((ch) => ch.steps).filter((st): st is MiniGameStep => 'miniGame' in st);
  for (const g of games) {
    g.miniGame.scenarios.forEach((s, i) => {
      it(`${g.title} #${i + 1}`, () => checkScenario(g.miniGame.type, s, `${g.title} #${i + 1}`));
    });
  }
});

describe('generated scenarios are always valid', () => {
  for (const type of GENERATABLE) {
    it(type, () => {
      const rng = mulberry32(42);
      for (let i = 0; i < 300; i++) {
        const s = generateScenario(type, rng)!;
        checkScenario(type, s, `${type} #${i}`);
        if (s.options.length) expect(s.options).toContain(s.correct);
      }
    });
  }
});

/* ---------- bots ---------- */
import { chooseCard, chooseTrump, chooseAnnouncement } from './bot';
import { deal as dealCards } from './rules';

describe('bots', () => {
  it('always play legal cards and every game adds up to 40 points', () => {
    const rng = mulberry32(7);
    for (let g = 0; g < 400; g++) {
      const hands = dealCards(rng);
      const trump = chooseTrump(hands[1].slice(0, 3));
      let leader = 1;
      const pts = [0, 0];
      for (let t = 0; t < 6; t++) {
        const trick: string[] = [];
        for (let k = 0; k < 4; k++) {
          const p = (leader + k) % 4;
          const partnerIdx = k >= 2 ? k - 2 : -1;
          const c = chooseCard(hands[p], trick, trump, partnerIdx);
          expect(legalMoves(hands[p], trick[0] ?? null, trump)).toContain(c);
          hands[p] = hands[p].filter((x) => x !== c);
          trick.push(c);
        }
        const w = (leader + trickWinner(trick, trump)) % 4;
        pts[w % 2] += sumPoints(trick);
        leader = w;
      }
      expect(pts[0] + pts[1]).toBe(40);
    }
  });
  it('announcement only when allowed', () => {
    expect(chooseAnnouncement(['♣9', '♣10'], '♥', false)).toBe(null);
    expect(chooseAnnouncement(['♠Q', '♥Q', '♦Q', '♥A', '♥K', '♣9'], '♥', true)).toBe('konterMatt');
  });
});
