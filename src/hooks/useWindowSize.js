import { useState, useEffect, useCallback, useRef } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Debounce helper — delays invocation until after `delay` ms of silence.
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Returns the current window size and derived breakpoint booleans.
 * Uses a debounced resize listener to avoid layout thrashing.
 */
export function useWindowSize() {
  const getSize = () => ({
    width:  typeof window !== 'undefined' ? window.innerWidth  : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const [size, setSize] = useState(getSize);
  const debouncedSet = useRef(debounce(setSize, 120));

  useEffect(() => {
    const handler = () => debouncedSet.current(getSize());
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  return {
    width:     size.width,
    height:    size.height,
    isMobile:  size.width <  MOBILE_BREAKPOINT,
    isTablet:  size.width >= MOBILE_BREAKPOINT && size.width < 1024,
    isDesktop: size.width >= 1024,
  };
}
