import React, { lazy, Suspense } from 'react';
import Navbar           from './components/layout/Navbar';
import Footer           from './components/layout/Footer';
import Hero             from './components/sections/Hero';
import Features         from './components/sections/Features';
import Statistics       from './components/sections/Statistics';
import Pricing          from './components/sections/Pricing';
import Testimonials     from './components/sections/Testimonials';
import CTA              from './components/sections/CTA';

/* Lazy-load the heavy AnalyticsDashboard (Recharts bundle ~200KB) */
const AnalyticsDashboard = lazy(() => import('./components/sections/AnalyticsDashboard'));

/**
 * Root app shell.
 *
 * State isolation architecture:
 *  • usePricing() lives inside <Pricing> — pricing state never reaches here.
 *  • Every section is React.memo'd and receives NO pricing props.
 *  • A currency/billing toggle triggers a re-render only within <Pricing>
 *    and its memoised children.
 *  • AnalyticsDashboard is lazy-loaded so Recharts (~200KB) doesn't bloat
 *    the initial JS bundle.
 */
function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <Statistics />
        <Pricing />
        <Suspense fallback={
          <div className="py-24 bg-navy flex items-center justify-center" aria-label="Loading dashboard">
            <span className="w-8 h-8 rounded-full border-2 border-brand-yellow/30 border-t-brand-yellow animate-spin" />
          </div>
        }>
          <AnalyticsDashboard />
        </Suspense>
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
