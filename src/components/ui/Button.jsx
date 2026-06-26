import React, { useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const VARIANTS = {
  primary:   'bg-brand-yellow text-navy border-2 border-brand-yellow hover:bg-brand-orange hover:border-brand-orange active:scale-95',
  secondary: 'bg-transparent text-teal-deep border-2 border-teal-deep hover:bg-teal-deep hover:text-mint-light active:scale-95',
  ghost:     'bg-transparent text-navy border-2 border-transparent hover:bg-mint-mid active:scale-95',
  outline:   'bg-transparent text-mint-light border-2 border-mint-mid/50 hover:bg-mint-mid/20 hover:border-mint-mid active:scale-95',
  dark:      'bg-navy text-mint-light border-2 border-navy hover:bg-teal-deep hover:border-teal-deep active:scale-95',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

/**
 * Reusable Button component.
 * Enhancements over base version:
 *  - Ripple on click (Web Animations API — no animation libraries)
 *  - Shine sweep on hover (CSS ::after + CSS animation class toggle)
 *  - Lift on hover (translateY via CSS transition)
 *  - All animations respect prefers-reduced-motion
 */
const Button = React.memo(function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  className  = '',
  onClick,
  type      = 'button',
  disabled  = false,
  'aria-label': ariaLabel,
  id,
  ...rest
}) {
  const btnRef         = useRef(null);
  const prefersReduced = useReducedMotion();

  /* Ripple using Web Animations API */
  const handleClick = useCallback((e) => {
    if (onClick) onClick(e);
    if (prefersReduced || !btnRef.current) return;

    const btn    = btnRef.current;
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    Object.assign(ripple.style, {
      position:      'absolute',
      width:         `${size}px`,
      height:        `${size}px`,
      left:          `${x}px`,
      top:           `${y}px`,
      borderRadius:  '50%',
      background:    'rgba(255,255,255,0.2)',
      pointerEvents: 'none',
      zIndex:        0,
    });
    btn.appendChild(ripple);

    const anim = ripple.animate(
      [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(1)', opacity: 0 },
      ],
      { duration: 560, easing: 'ease-out', fill: 'forwards' },
    );
    anim.onfinish = () => ripple.remove();
  }, [onClick, prefersReduced]);

  return (
    <button
      ref={btnRef}
      id={id}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={[
        'inline-flex items-center justify-center rounded-xl font-sans font-semibold',
        'relative overflow-hidden',                   /* required for ripple + shine */
        'transition-all duration-150 ease-out',
        'hover:-translate-y-0.5 hover:shadow-md',     /* subtle lift */
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        'select-none whitespace-nowrap',
        'btn-shine',                                  /* shine sweep CSS class */
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size]       ?? SIZES.md,
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
