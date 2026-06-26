import React, { lazy, Suspense } from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Badge from '../ui/Badge';

const HeroScene3D = lazy(() => import('../3d/HeroScene3D'));

/* ── Fake dashboard metrics data (static decorative content) ───────────── */
const METRICS = [
  { label: 'Revenue',     value: '$2.4M', trend: '+12%', color: '#FFC801' },
  { label: 'Active Users', value: '48.2K', trend: '+8%',  color: '#FF9932' },
  { label: 'Conversion',  value: '3.6%',  trend: '+2%',  color: '#D9E8E2' },
];

const CHART_BARS = [38, 55, 45, 72, 58, 85, 68, 92, 74, 88, 80, 100];

/**
 * Hero section — React.memo'd.
 * Entrance animations: CSS keyframes (fadeUp) staggered 100–500 ms.
 * 3D scene (globe + particles + nodes) is lazy-loaded and rendered as an
 * absolute background behind all content.
 * Static CSS decoratives are replaced by the 3D canvas.
 */
const Hero = React.memo(function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy pt-16"
    >
      {/* Subtle grid overlay — stays on top of 3D scene for depth */}
      <div
        className="absolute inset-0 z-[2] hero-grid-pattern pointer-events-none"
        aria-hidden="true"
      />

      {/* ── 3D Scene (lazy loaded) ── */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 z-[1]" aria-hidden="true">
          <HeroScene3D />
        </div>
      </Suspense>

      {/* Radial vignette — keeps content readable against 3D */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(23,43,54,0.75) 80%, rgba(23,43,54,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Launch badge */}
        <div className="animate-fade-up">
          <Badge className="mb-6 cursor-default">
            <Icon name="zap" size={11} />
            Introducing Prism 2.0
          </Badge>
        </div>

        {/* Primary headline */}
        <h1
          id="hero-heading"
          className="font-sans font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-mint-light leading-[1.05] mb-6 animate-fade-up animate-delay-100"
        >
          Turn Data Into
          <br />
          <span className="text-gradient-yellow">Decisions.</span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-lg sm:text-xl text-mint-mid/65 max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200">
          Real-time dashboards, AI-powered insights, and seamless team collaboration — all in one platform built for modern data teams.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-up animate-delay-300">
          <Button
            variant="primary"
            size="lg"
            id="hero-primary-cta"
            aria-label="Start your free 14-day trial"
            className="btn-shimmer"
          >
            Start Free Trial
            <Icon name="arrow" size={18} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            id="hero-secondary-cta"
            aria-label="Watch product demo"
          >
            <Icon name="play" size={14} />
            Watch Demo
          </Button>
        </div>

        {/* Social proof */}
        <p className="font-sans text-sm text-mint-mid/40 animate-fade-up animate-delay-400">
          Trusted by 10,000+ teams at{' '}
          <span className="text-mint-mid/70 font-medium">Stripe</span>,{' '}
          <span className="text-mint-mid/70 font-medium">Notion</span>,{' '}
          <span className="text-mint-mid/70 font-medium">Linear</span> and more.
        </p>

        {/* Dashboard preview card — now below the 3D scene with glass styling */}
        <div
          className="relative mt-16 animate-fade-up animate-delay-500"
          aria-hidden="true"
        >
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 dashboard-fade z-10 pointer-events-none rounded-b-2xl" />

          <div className="rounded-2xl border border-mint-mid/15 bg-navy/50 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
            {/* Metric chips */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="bg-navy/80 border border-mint-mid/10 rounded-xl p-3 text-left"
                >
                  <p className="font-sans text-xs text-mint-mid/40 mb-1">{m.label}</p>
                  <p className="font-mono text-lg font-bold text-mint-light leading-none">
                    {m.value}
                  </p>
                  <span className="font-sans text-xs font-semibold mt-1 block" style={{ color: m.color }}>
                    {m.trend} ↑
                  </span>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div
              className="bg-navy/80 border border-mint-mid/10 rounded-xl p-4 h-32 flex items-end gap-1.5"
              role="img"
              aria-label="Sample revenue chart"
            >
              {CHART_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    background:
                      i === CHART_BARS.length - 1
                        ? '#FFC801'
                        : i >= CHART_BARS.length - 4
                        ? 'rgba(17,76,90,0.8)'
                        : 'rgba(217,232,226,0.12)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
