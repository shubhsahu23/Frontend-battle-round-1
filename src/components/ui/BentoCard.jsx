import React, { useState, useRef, useCallback, lazy, Suspense } from 'react';
import Icon from './Icon';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BentoScene3D = lazy(() => import('../3d/BentoScene3D'));

const COL_SPAN = {
  large: 'md:col-span-2',
  small: 'md:col-span-1',
};

/**
 * BentoCard — React.memo'd.
 * Enhancements over base version:
 *  - 3D perspective tilt on mousemove (direct DOM transform, no state)
 *  - Lazy-loaded Three.js mini-scene (mounted only when hovered)
 *  - Spotlight radial gradient follows cursor (via CSS custom property)
 *  - All effects respect prefers-reduced-motion
 */
const BentoCard = React.memo(function BentoCard({ feature, isActive, onClick }) {
  const colSpan        = COL_SPAN[feature.size] ?? 'md:col-span-1';
  const cardRef        = useRef(null);
  const prefersReduced = useReducedMotion();
  const [showScene, setShowScene] = useState(false);

  /* Tilt effect */
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect    = cardRef.current.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;

    /* Spotlight radial gradient */
    cardRef.current.style.setProperty('--spot-x', `${x}px`);
    cardRef.current.style.setProperty('--spot-y', `${y}px`);

    if (prefersReduced) return;

    const rotY = ((x - centerX) / centerX) *  6;
    const rotX = ((centerY - y) / centerY) *  4;
    cardRef.current.style.transition = 'transform 40ms linear, box-shadow 200ms ease';
    cardRef.current.style.transform  =
      `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.025)`;
  }, [prefersReduced]);

  const handleMouseEnter = useCallback(() => {
    setShowScene(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 400ms cubic-bezier(0.4,0,0.2,1), box-shadow 400ms ease';
      cardRef.current.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      cardRef.current.style.removeProperty('--spot-x');
      cardRef.current.style.removeProperty('--spot-y');
    }
    /* Keep scene mounted for a moment so it doesn't pop out abruptly */
    setTimeout(() => setShowScene(false), 400);
  }, []);

  return (
    <article
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-selected={isActive}
      aria-label={`${feature.title} — click to learn more`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={{ willChange: 'transform' }}
      className={[
        'relative overflow-hidden rounded-2xl border-2 cursor-pointer',
        'col-span-1',
        colSpan,
        'transition-colors duration-300 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2',
        isActive
          ? 'border-brand-yellow bg-navy bento-card-active'
          : 'border-mint-mid bg-mint-light hover:border-teal-deep/40 bento-card-hover',
        'bento-spotlight',
      ].join(' ')}
    >
      {/* ── 3D mini-scene (absolute, top-right corner) ── */}
      {showScene && (
        <div
          className="absolute top-3 right-3 w-[68px] h-[68px] rounded-xl overflow-hidden opacity-80 pointer-events-none"
          style={{ zIndex: 5 }}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <BentoScene3D icon={feature.icon} />
          </Suspense>
        </div>
      )}

      <div className="h-full p-6 flex flex-col justify-between min-h-[200px]">
        {/* Header row */}
        <div>
          {/* Icon badge */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
            style={{
              background: isActive
                ? `${feature.accentColor}25`
                : `${feature.accentColor}18`,
            }}
          >
            <Icon
              name={feature.icon}
              size={22}
              color={feature.accentColor}
            />
          </div>

          {/* Title */}
          <h3
            className={[
              'font-mono font-bold text-lg mb-2 transition-colors duration-300',
              isActive ? 'text-mint-light' : 'text-navy',
            ].join(' ')}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            className={[
              'font-sans text-sm leading-relaxed transition-all duration-300',
              isActive
                ? 'text-mint-mid/80 line-clamp-none'
                : 'text-navy/55 line-clamp-2',
            ].join(' ')}
          >
            {feature.description}
          </p>
        </div>

        {/* Stat chip */}
        <div
          className={[
            'mt-4 flex items-center gap-2 transition-all duration-300',
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
          ].join(' ')}
          aria-hidden={!isActive}
        >
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold"
            style={{
              background: `${feature.accentColor}22`,
              color:       feature.accentColor,
            }}
          >
            {feature.stat}
          </span>
          <span className="font-sans text-xs text-mint-mid/50">
            {feature.statLabel}
          </span>
        </div>
      </div>

      {/* Active indicator dot */}
      {isActive && (
        <span
          className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full animate-pulse-glow"
          style={{ background: feature.accentColor }}
          aria-hidden="true"
        />
      )}
    </article>
  );
});

export default BentoCard;
