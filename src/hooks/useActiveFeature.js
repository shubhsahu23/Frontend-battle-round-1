import { useState, useCallback } from 'react';

/**
 * Manages the single active feature index shared by both the Bento Grid
 * (desktop) and the Accordion (mobile).
 *
 * Because both views read from the same `activeIndex`, resizing the window
 * seamlessly carries the active state across layouts — no sync logic needed.
 *
 * Desktop → Mobile: the highlighted bento card becomes the open accordion panel.
 * Mobile → Desktop: the open accordion panel becomes the highlighted bento card.
 *
 * @returns {{ activeIndex: number, setActiveIndex: (i: number) => void }}
 */
export function useActiveFeature() {
  const [activeIndex, setActiveIndexRaw] = useState(0);

  const setActiveIndex = useCallback((index) => {
    setActiveIndexRaw(index);
  }, []);

  return { activeIndex, setActiveIndex };
}
