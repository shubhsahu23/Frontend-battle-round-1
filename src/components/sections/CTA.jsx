import React from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

/**
 * CTA section — React.memo'd.
 * Teal-deep background with decorative blurred gradient orbs.
 * No pricing props → never re-renders.
 */
const CTA = React.memo(function CTA() {
  return (
    <section
      id="about"
      aria-labelledby="cta-heading"
      className="relative py-24 lg:py-32 bg-teal-deep overflow-hidden"
    >
      {/* Decorative orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15 pointer-events-none animate-float-reverse"
        style={{ background: 'radial-gradient(circle, #FF9932, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #D9E8E2, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border border-mint-mid/20 bg-mint-mid/10">
          <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse-glow" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold text-mint-light/70 uppercase tracking-wider">
            No credit card required
          </span>
        </div>

        <h2
          id="cta-heading"
          className="font-sans font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-mint-light mb-6 leading-tight"
        >
          Ready to make data
          <br />
          <span className="text-brand-yellow">your advantage?</span>
        </h2>

        <p className="font-sans text-lg text-mint-mid/65 mb-10 max-w-xl mx-auto">
          Start your 14-day free trial today. No credit card. No commitment. Cancel anytime — but we're confident you'll stay.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            id="cta-primary-btn"
            aria-label="Start your 14-day free trial"
            className="btn-shimmer"
          >
            Start Free Trial
            <Icon name="arrow" size={18} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            id="cta-demo-btn"
            aria-label="Schedule a personalised product demo"
          >
            Schedule a Demo
          </Button>
        </div>

        {/* Micro social proof */}
        <p className="mt-8 font-sans text-sm text-mint-mid/40">
          Join 10,000+ teams already using Prism.
        </p>
      </div>
    </section>
  );
});

export default CTA;
