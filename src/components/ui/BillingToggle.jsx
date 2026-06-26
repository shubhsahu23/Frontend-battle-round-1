import React from 'react';
import { BILLING_OPTIONS } from '../../constants/pricing';

/**
 * Monthly / Annual toggle.
 * Both buttons are React.memo'd-safe — only re-renders when `billing` changes.
 * Transition: 200 ms ease-out on background-color and color.
 */
const BillingToggle = React.memo(function BillingToggle({ billing, onChange }) {
  return (
    <div
      role="group"
      aria-label="Billing cycle"
      className="flex items-center bg-mint-mid rounded-full p-1 gap-1"
    >
      {BILLING_OPTIONS.map((option) => {
        const isActive = billing === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option)}
            className={[
              'relative flex items-center gap-2 px-4 py-2 rounded-full',
              'font-sans text-sm font-semibold capitalize',
              'transition-all duration-200 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-1',
              isActive
                ? 'bg-navy text-mint-light shadow-sm'
                : 'text-navy/55 hover:text-navy',
            ].join(' ')}
          >
            {option}
            {option === 'annual' && (
              <span
                className={[
                  'text-xs font-mono px-1.5 py-0.5 rounded-full transition-all duration-200',
                  isActive
                    ? 'bg-brand-yellow text-navy'
                    : 'bg-brand-yellow/25 text-teal-deep',
                ].join(' ')}
                aria-label="20 percent discount"
              >
                −20%
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
});

export default BillingToggle;
