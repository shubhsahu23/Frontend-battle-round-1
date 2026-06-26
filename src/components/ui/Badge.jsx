import React from 'react';

/**
 * Small pill badge — always brand-yellow background with navy text.
 * Accepts an optional `variant` for use on dark backgrounds.
 */
const Badge = React.memo(function Badge({ children, className = '', variant = 'default' }) {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider';

  const styles = {
    default: 'bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30',
    solid:   'bg-brand-yellow text-navy',
    outline: 'bg-transparent text-teal-deep border border-teal-deep/40',
  };

  return (
    <span className={[base, styles[variant] ?? styles.default, className].join(' ')}>
      {children}
    </span>
  );
});

export default Badge;
