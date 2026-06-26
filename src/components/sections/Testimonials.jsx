import React, { useRef } from 'react';
import { TESTIMONIALS } from '../../constants/testimonials';
import TestimonialCard from '../ui/TestimonialCard';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

// Duplicate for seamless looping marquee (width = 2× the original set)
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

/**
 * Testimonials — React.memo'd.
 * Uses a CSS `animate-marquee` infinite scroll.
 * Pauses on hover via `.marquee-container:hover .marquee-inner` CSS rule.
 * No pricing props → never re-renders from pricing state.
 */
const Testimonials = React.memo(function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 lg:py-32 bg-navy overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <Badge className="mb-5">
          <Icon name="star" size={11} />
          Testimonials
        </Badge>
        <h2
          id="testimonials-heading"
          className="font-sans font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-mint-light mb-5"
        >
          Loved by data teams
          <br />
          <span className="text-brand-yellow">worldwide.</span>
        </h2>
        <p className="font-sans text-lg text-mint-mid/55 max-w-xl mx-auto">
          Join 10,000+ teams who trust Prism to drive better decisions every day.
        </p>
      </div>

      {/* Marquee track */}
      <div
        className="marquee-container relative"
        role="region"
        aria-label="Customer testimonials — scrolling"
        aria-live="off"
      >
        {/* Left / right edge fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #172B36, transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #172B36, transparent)' }}
          aria-hidden="true"
        />

        <div
          className="marquee-inner flex animate-marquee"
          style={{ width: 'max-content' }}
        >
          {MARQUEE_ITEMS.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { value: '10K+',  label: 'Teams worldwide'    },
            { value: '98%',   label: 'Customer retention' },
            { value: '4.9/5', label: 'Average rating'     },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-3xl font-bold text-brand-yellow mb-1">
                {stat.value}
              </p>
              <p className="font-sans text-sm text-mint-mid/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
