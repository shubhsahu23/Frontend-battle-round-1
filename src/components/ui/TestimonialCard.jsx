import React from 'react';
import Icon from './Icon';

/**
 * Single testimonial card used inside the marquee track.
 * React.memo — stable props, never re-renders after mount.
 */
const TestimonialCard = React.memo(function TestimonialCard({ testimonial }) {
  return (
    <article
      aria-label={`Testimonial from ${testimonial.name}, ${testimonial.role}`}
      className={[
        'flex-shrink-0 w-80 rounded-2xl border border-mint-mid/20 bg-navy/60',
        'backdrop-blur-sm p-6 mx-3',
        'hover:border-brand-yellow/50 hover:bg-navy/80 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(255,200,1,0.15)]',
        'transition-all duration-300 ease-out',
      ].join(' ')}
    >
      {/* Star rating */}
      <div
        className="flex gap-0.5 mb-4"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <Icon key={i} name="star" size={13} color="#FFC801" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mb-5">
        <p className="font-sans text-sm text-mint-mid/75 leading-relaxed">
          "{testimonial.quote}"
        </p>
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: testimonial.color }}
          aria-hidden="true"
        >
          <span className="font-mono text-xs font-bold text-mint-light">
            {testimonial.initials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold text-mint-light truncate">
            {testimonial.name}
          </p>
          <p className="font-sans text-xs text-mint-mid/50 truncate">
            {testimonial.role}
          </p>
        </div>
      </footer>
    </article>
  );
});

export default TestimonialCard;
