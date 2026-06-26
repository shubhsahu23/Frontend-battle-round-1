import { useState, useCallback } from 'react';
import { CURRENCY_OPTIONS, BILLING_OPTIONS } from '../constants/pricing';

/**
 * Manages currency + billing state for the Pricing section.
 * Lives entirely within Pricing — other sections are never aware of this state,
 * so they never re-render when currency or billing changes.
 *
 * @returns {{
 *   currency:             string,
 *   billing:              string,
 *   handleCurrencyChange: (c: string) => void,
 *   handleBillingChange:  (b: string) => void,
 * }}
 */
export function usePricing() {
  const [currency, setCurrency] = useState('USD');
  const [billing,  setBilling]  = useState('monthly');

  const handleCurrencyChange = useCallback((newCurrency) => {
    if (CURRENCY_OPTIONS.includes(newCurrency)) {
      setCurrency(newCurrency);
    }
  }, []);

  const handleBillingChange = useCallback((newBilling) => {
    if (BILLING_OPTIONS.includes(newBilling)) {
      setBilling(newBilling);
    }
  }, []);

  return { currency, billing, handleCurrencyChange, handleBillingChange };
}
