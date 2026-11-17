import { useCallback, useEffect, useState } from 'react';

/**
 * Remembers which steps the visitor has seen (in this browser only) and where they stopped.
 * Storage can be missing or blocked (private mode) — everything still works without it.
 */
const KEY = 'kontermatt-tutorial-progress-v1';

interface Stored { visited: string[]; last?: { chapter: string; step: number } }

function load(): Stored {
  try { return JSON.parse(localStorage.getItem(KEY) || '') as Stored; } catch { return { visited: [] }; }
}
function save(s: Stored) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

export const stepKey = (chapter: string, step: number) => `${chapter}-${step}`;

export const useProgress = () => {
  const [visited, setVisited] = useState<Set<string>>(() => new Set(load().visited));

  const markVisited = useCallback((chapter: string, step: number) => {
    setVisited((prev) => {
      const k = stepKey(chapter, step);
      const nextSet = prev.has(k) ? prev : new Set(prev).add(k);
      save({ visited: [...nextSet], last: { chapter, step } });
      return nextSet;
    });
  }, []);

  const resetProgress = useCallback(() => { save({ visited: [] }); setVisited(new Set()); }, []);

  return { visited, markVisited, resetProgress, lastPosition: load().last };
};

/* ---------- deep links: #basics-5 = chapter "basics", step 5 (1-based) ---------- */

export function parseHash(hash: string, chapterIds: string[]): { chapter: string; step: number } | null {
  const h = decodeURIComponent(hash.replace(/^#/, ''));
  if (!h) return null;
  const m = h.match(/^(.*?)(?:-(\d+))?$/);
  if (!m || !chapterIds.includes(m[1])) return null;
  return { chapter: m[1], step: m[2] ? Math.max(0, Number(m[2]) - 1) : 0 };
}

export function writeHash(chapter: string, step: number) {
  const h = `#${chapter}-${step + 1}`;
  if (location.hash !== h) {
    try { history.replaceState(null, '', h); } catch { /* sandboxed frames may refuse */ }
  }
}

export function useHashNavigation(chapterIds: string[], open: (chapter: string, step: number) => void) {
  useEffect(() => {
    const onHash = () => {
      const t = parseHash(location.hash, chapterIds);
      if (t) open(t.chapter, t.step);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [chapterIds.join(), open]); // eslint-disable-line react-hooks/exhaustive-deps
}
