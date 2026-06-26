import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Triggers a CSS reveal when the referenced element enters the viewport.
 * Respects prefers-reduced-motion — elements become visible immediately
 * when the user prefers reduced motion.
 *
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold  = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once       = true,
} = {}) {
  const ref             = useRef(null);
  const prefersReduced  = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect reduced motion — show immediately without animation
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, prefersReduced]);

  return { ref, isVisible };
}
