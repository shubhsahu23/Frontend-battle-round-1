import React from 'react';
import Icon from './Icon';

/**
 * A single accordion item for the mobile Features view.
 * Uses CSS grid-template-rows trick for smooth height animation (320 ms ease-in-out).
 * ARIA: aria-expanded, aria-controls, role="region".
 */
const AccordionItem = React.memo(function AccordionItem({ feature, isOpen, onClick, index }) {
  const panelId  = `accordion-panel-${feature.id}`;
  const headerId = `accordion-header-${feature.id}`;

  return (
    <article
      className={[
        'rounded-2xl border-2 overflow-hidden',
        'transition-colors duration-300 ease-in-out',
        isOpen
          ? 'border-brand-yellow bg-navy'
          : 'border-mint-mid bg-mint-light hover:border-teal-deep/30',
      ].join(' ')}
    >
      {/* Trigger button */}
      <button
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onClick}
        className={[
          'w-full flex items-center justify-between gap-3 p-5 text-left',
          'transition-colors duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-yellow',
        ].join(' ')}
      >
        {/* Left: icon + title */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${feature.accentColor}20` }}
            aria-hidden="true"
          >
            <Icon name={feature.icon} size={18} color={feature.accentColor} />
          </div>
          <span
            className={[
              'font-mono font-semibold text-base truncate transition-colors duration-300',
              isOpen ? 'text-mint-light' : 'text-navy',
            ].join(' ')}
          >
            {feature.title}
          </span>
        </div>

        {/* Chevron */}
        <span
          className={[
            'flex-shrink-0 transition-all duration-300 ease-in-out',
            isOpen ? 'rotate-180 text-brand-yellow' : 'rotate-0 text-navy/40',
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon name="chevron" size={20} />
        </span>
      </button>

      {/* Collapsible panel — grid-template-rows trick for smooth animation */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={['accordion-content', isOpen ? 'open' : ''].join(' ')}
      >
        <div className="accordion-inner">
          <div className="px-5 pb-5 pt-1">
            <p className="font-sans text-sm text-mint-mid/75 leading-relaxed mb-4">
              {feature.description}
            </p>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold"
              style={{
                background: `${feature.accentColor}22`,
                color:       feature.accentColor,
              }}
            >
              {feature.stat} &nbsp;·&nbsp; {feature.statLabel}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

export default AccordionItem;
