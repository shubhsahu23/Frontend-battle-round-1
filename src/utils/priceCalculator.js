import { CURRENCIES, ANNUAL_DISCOUNT } from '../constants/pricing';

/**
 * Format a numeric amount into a localised currency string.
 * @param {number} amount  - Raw numeric value
 * @param {string} code    - Currency code (USD | INR | EUR)
 * @param {string} symbol  - Currency symbol ($, ₹, €)
 * @returns {string}
 */
function formatAmount(amount, code, symbol) {
  const rounded = Math.round(amount);
  const locale =
    code === 'INR' ? 'en-IN' :
    code === 'EUR' ? 'de-DE' : 'en-US';

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded);

  return `${symbol}${formatted}`;
}

/**
 * Calculate the display price for a given plan, currency, and billing cycle.
 *
 * @param {number} baseUSD    - Plan's base monthly price in USD
 * @param {string} currency   - One of: 'USD' | 'INR' | 'EUR'
 * @param {string} billing    - One of: 'monthly' | 'annual'
 * @returns {{
 *   perMonth: string,       // price per month (discounted when annual)
 *   annualTotal: string,    // total billed annually (only relevant for annual billing)
 *   savings: string,        // amount saved per year compared to monthly billing
 * }}
 */
export function calculatePrice(baseUSD, currency, billing) {
  const { symbol, rate, code } = CURRENCIES[currency];

  const monthlyRaw  = baseUSD * rate;
  const annualMonthlyRaw = monthlyRaw * (1 - ANNUAL_DISCOUNT);

  const perMonthRaw    = billing === 'annual' ? annualMonthlyRaw : monthlyRaw;
  const annualTotalRaw = annualMonthlyRaw * 12;
  const savingsRaw     = (monthlyRaw - annualMonthlyRaw) * 12;

  return {
    perMonth:    formatAmount(perMonthRaw,    code, symbol),
    annualTotal: formatAmount(annualTotalRaw, code, symbol),
    savings:     formatAmount(savingsRaw,     code, symbol),
  };
}
