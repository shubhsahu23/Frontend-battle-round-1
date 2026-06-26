import React, { useRef, useCallback } from 'react';
import Icon from './Icon';
import Button from './Button';
import Badge from './Badge';

/**
 * PricingCard — React.memo'd.
 * Enhancements (visual only, zero pricing logic changes):
 *  - Mouse spotlight radial gradient via CSS custom property
 *  - Light sweep animation on hover via CSS pseudo-element
 *  - Glass card effect (backdrop-blur + reduced opacity)
 *  - Glow border on highlighted card
 *  - Hover elevation (translateY + shadow)
 * None of these cause React re-renders (direct DOM style updates).
 */
const PricingCard = React.memo(function PricingCard({ plan, price, billing, currency }) {
  const isHighlighted = plan.highlighted;
  const cardRef       = useRef(null);

  /* Spotlight: track mouse → update CSS custom properties */
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.removeProperty('--mx');
    cardRef.current.style.removeProperty('--my');
  }, []);

  return (
    <article
      ref={cardRef}
      aria-label={`${plan.name} pricing plan`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={[
        'pricing-spotlight',          /* spotlight CSS custom property hook */
        'relative flex flex-col rounded-2xl border-2 p-7 lg:p-8',
        'transition-all duration-300 ease-in-out',
        'hover:-translate-y-1.5 hover:shadow-xl',
        isHighlighted
          ? 'border-brand-yellow bg-navy/90 backdrop-blur-sm pricing-glow md:scale-105'
          : 'border-mint-mid bg-mint-light/90 backdrop-blur-sm hover:border-teal-deep/40',
      ].join(' ')}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="solid">{plan.badge}</Badge>
        </div>
      )}

      {/* Plan name & description */}
      <header className="mb-6">
        <h3
          className={[
            'font-mono text-xl font-bold mb-2',
            isHighlighted ? 'text-mint-light' : 'text-navy',
          ].join(' ')}
        >
          {plan.name}
        </h3>
        <p
          className={[
            'font-sans text-sm leading-relaxed',
            isHighlighted ? 'text-mint-mid/65' : 'text-navy/55',
          ].join(' ')}
        >
          {plan.description}
        </p>
      </header>

      {/* ── Price display — the ONLY part that truly changes ── */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className={[
              'font-mono text-4xl font-bold tracking-tight',
              'transition-all duration-200 ease-out',
              isHighlighted ? 'text-mint-light' : 'text-navy',
            ].join(' ')}
            aria-live="polite"
            aria-atomic="true"
          >
            {price.perMonth}
          </span>
          <span
            className={[
              'font-sans text-sm',
              isHighlighted ? 'text-mint-mid/50' : 'text-navy/40',
            ].join(' ')}
          >
            / mo
          </span>
        </div>
        <div className="mt-1.5 min-h-[20px] transition-all duration-200 ease-out" aria-live="polite">
          {billing === 'annual' ? (
            <p
              className={[
                'font-sans text-xs font-medium',
                isHighlighted ? 'text-brand-yellow' : 'text-teal-deep',
              ].join(' ')}
            >
              Billed {price.annualTotal}/year — save {price.savings}
            </p>
          ) : (
            <p
              className={[
                'font-sans text-xs',
                isHighlighted ? 'text-mint-mid/40' : 'text-navy/35',
              ].join(' ')}
            >
              Switch to annual and save 20%
            </p>
          )}
        </div>
      </div>

      {/* CTA */}
      <Button
        variant={isHighlighted ? 'primary' : 'secondary'}
        size="md"
        className="w-full mb-7"
        aria-label={`${plan.cta} — ${plan.name} plan`}
      >
        {plan.cta}
      </Button>

      {/* Divider */}
      <div
        className={[
          'border-t mb-5',
          isHighlighted ? 'border-mint-mid/15' : 'border-mint-mid',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Feature list */}
      <ul className="space-y-3 flex-1" role="list" aria-label={`${plan.name} features`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
              style={{
                background: isHighlighted
                  ? 'rgba(255,200,1,0.18)'
                  : 'rgba(17,76,90,0.12)',
              }}
              aria-hidden="true"
            >
              <Icon
                name="check"
                size={11}
                color={isHighlighted ? '#FFC801' : '#114C5A'}
              />
            </span>
            <span
              className={[
                'font-sans text-sm',
                isHighlighted ? 'text-mint-mid/80' : 'text-navy/70',
              ].join(' ')}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
});

export default PricingCard;
