import { useState, useRef, useCallback, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Animates a numeric value from `start` to `end` over `duration` ms
 * using an ease-out-expo curve.
 *
 * Call `startCount()` when you want the animation to begin
 * (e.g., when the element enters the viewport).
 *
 * @param {{ end: number, start?: number, duration?: number }} opts
 * @returns {{ count: number, startCount: () => void }}
 */
export function useCountUp({ end, start = 0, duration = 1800 }) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(start);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  const startCount = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Skip animation for reduced-motion users
    if (prefersReduced) {
      setCount(end);
      return;
    }

    const startTime = performance.now();

    function animate(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [end, start, duration, prefersReduced]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return { count, startCount };
}
