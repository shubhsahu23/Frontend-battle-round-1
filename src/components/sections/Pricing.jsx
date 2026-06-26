import React, { useMemo } from 'react';
import { usePricing } from '../../hooks/usePricing';
import { PLANS } from '../../constants/pricing';
import { calculatePrice } from '../../utils/priceCalculator';
import PricingCard from '../ui/PricingCard';
import BillingToggle from '../ui/BillingToggle';
import CurrencyToggle from '../ui/CurrencyToggle';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

/* ──────────────────────────────────────────────────────────────────────────
 * STATE ISOLATION GUARANTEE
 *
 *  • usePricing() lives INSIDE this component — currency & billing state
 *    never propagates to Navbar, Hero, Features, Testimonials, or Footer.
 *  • PricingHeader is React.memo'd with ZERO props → never re-renders.
 *  • PricingCard is React.memo'd → re-renders only when its price changes
 *    (which is expected and correct — the price text must update).
 *  • calculatedPrices is memoised → recomputed only when currency/billing
 *    change, never on unrelated state.
 * ────────────────────────────────────────────────────────────────────────── */

/* ── Static header — zero props, never re-renders ─────────────────────── */
const PricingHeader = React.memo(function PricingHeader() {
  return (
    <div className="text-center mb-12">
      <Badge className="mb-5">
        <Icon name="zap" size={11} />
        Pricing
      </Badge>
      <h2
        id="pricing-heading"
        className="font-sans font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-navy mb-5"
      >
        Simple, transparent
        <br />
        <span className="text-teal-deep">pricing.</span>
      </h2>
      <p className="font-sans text-lg text-navy/55 max-w-xl mx-auto">
        Start free, scale as you grow. No hidden fees. Cancel anytime.
      </p>
    </div>
  );
});

/* ── Main Pricing section ──────────────────────────────────────────────── */
function Pricing() {
  const { currency, billing, handleCurrencyChange, handleBillingChange } = usePricing();

  /**
   * calculatedPrices is recomputed only when currency or billing changes.
   * Each PricingCard receives a stable price object from this memo.
   */
  const calculatedPrices = useMemo(() => {
    return PLANS.reduce((acc, plan) => {
      acc[plan.id] = calculatePrice(plan.baseUSD, currency, billing);
      return acc;
    }, {});
  }, [currency, billing]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-24 lg:py-32 bg-mint-mid/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Static header — React.memo, zero re-renders */}
        <PricingHeader />

        {/* Controls — only these re-render on state change */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <BillingToggle
            billing={billing}
            onChange={handleBillingChange}
          />
          <CurrencyToggle
            currency={currency}
            onChange={handleCurrencyChange}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              price={calculatedPrices[plan.id]}
              billing={billing}
              currency={currency}
            />
          ))}
        </div>

        {/* Trust line */}
        <p className="text-center font-sans text-sm text-navy/40 mt-10">
          All plans include a{' '}
          <span className="font-semibold text-teal-deep">14-day free trial</span>.
          No credit card required.
        </p>
      </div>
    </section>
  );
}

export default Pricing;
