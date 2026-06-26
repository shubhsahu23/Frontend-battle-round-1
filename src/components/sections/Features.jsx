import React, { useCallback } from 'react';
import { FEATURES } from '../../constants/features';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useActiveFeature } from '../../hooks/useActiveFeature';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import BentoCard from '../ui/BentoCard';
import AccordionItem from '../ui/AccordionItem';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

/* ── Bento Grid ─────────────────────────────────────────────────────────── */
const BentoGrid = React.memo(function BentoGrid({ features, activeIndex, onSelect, isVisible }) {
  return (
    /*
     * Grid pattern (3 columns):
     *   Row 1: [0: col-span-2]  [1: col-span-1]
     *   Row 2: [2: col-span-1]  [3: col-span-2]
     *   Row 3: [4: col-span-1]  [5: col-span-2]
     */
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      role="list"
      aria-label="Feature cards"
    >
      {features.map((feature, index) => (
        <div 
          key={feature.id} 
          role="listitem"
          className={[
            'transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          ].join(' ')}
          style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
        >
          <BentoCard
            feature={feature}
            isActive={activeIndex === index}
            onClick={() => onSelect(index)}
          />
        </div>
      ))}
    </div>
  );
});

/* ── Accordion List ──────────────────────────────────────────────────────── */
const AccordionList = React.memo(function AccordionList({ features, activeIndex, onSelect, isVisible }) {
  return (
    <div
      className="space-y-3"
      role="list"
      aria-label="Feature accordion"
    >
      {features.map((feature, index) => (
        <div 
          key={feature.id} 
          role="listitem"
          className={[
            'transition-all duration-500 ease-out',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          ].join(' ')}
          style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
        >
          <AccordionItem
            feature={feature}
            isOpen={activeIndex === index}
            onClick={() => onSelect(activeIndex === index ? index : index)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
});

/* ── Features section ────────────────────────────────────────────────────── */
/**
 * Features — React.memo'd.
 * Internally manages `activeIndex` via useActiveFeature.
 * Same index drives bento highlight (desktop) AND accordion open panel (mobile),
 * so resizing seamlessly preserves the active state in both directions.
 */
const Features = React.memo(function Features() {
  const { isMobile } = useWindowSize();
  const { activeIndex, setActiveIndex } = useActiveFeature();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const handleSelect = useCallback((index) => {
    setActiveIndex(index);
  }, [setActiveIndex]);

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 lg:py-32 bg-mint-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <Badge className="mb-5">
            <Icon name="zap" size={11} />
            Features
          </Badge>
          <h2
            id="features-heading"
            className="font-sans font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-navy mb-5"
          >
            Everything you need to make
            <br className="hidden sm:block" />
            <span className="text-teal-deep"> data your edge.</span>
          </h2>
          <p className="font-sans text-lg text-navy/55 max-w-2xl mx-auto">
            From real-time dashboards to AI-powered anomaly detection, Prism is the complete analytics platform for modern teams.
          </p>
        </div>

        {/* Bento (desktop) or Accordion (mobile) — same activeIndex */}
        <div ref={ref}>
          {isMobile ? (
            <AccordionList
              features={FEATURES}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              isVisible={isVisible}
            />
          ) : (
            <BentoGrid
              features={FEATURES}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              isVisible={isVisible}
            />
          )}
        </div>
      </div>
    </section>
  );
});

export default Features;
