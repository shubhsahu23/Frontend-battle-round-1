import React from 'react';
import { CURRENCY_OPTIONS, CURRENCIES } from '../../constants/pricing';

/**
 * Currency selector (USD / INR / EUR).
 * React.memo — only re-renders when `currency` prop changes.
 * Transition: 200 ms ease-out.
 */
const CurrencyToggle = React.memo(function CurrencyToggle({ currency, onChange }) {
  return (
    <div
      role="group"
      aria-label="Currency selection"
      className="flex items-center bg-mint-mid rounded-full p-1 gap-1"
    >
      {CURRENCY_OPTIONS.map((code) => {
        const isActive = currency === code;
        const { symbol } = CURRENCIES[code];
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={CURRENCIES[code].label}
            onClick={() => onChange(code)}
            className={[
              'flex items-center gap-1 px-3 py-2 rounded-full',
              'font-mono text-sm font-semibold',
              'transition-all duration-200 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-1',
              isActive
                ? 'bg-teal-deep text-mint-light shadow-sm'
                : 'text-navy/55 hover:text-navy',
            ].join(' ')}
          >
            <span aria-hidden="true" className="text-xs">{symbol}</span>
            {code}
          </button>
        );
      })}
    </div>
  );
});

export default CurrencyToggle;
