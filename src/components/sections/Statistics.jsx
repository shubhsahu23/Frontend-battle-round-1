import React, { useEffect, useRef } from 'react';
import { STATS } from '../../constants/dashboard';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

/* ─── Sparkline (inline SVG) ──────────────────────────────────────────────── */
function Sparkline({ data, color, isVisible }) {
  const W = 88, H = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / range) * H,
  ]);
  const pathD = pts.reduce((acc, [x, y], i) =>
    i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`, '');
  const areaD = `${pathD} L ${pts[pts.length-1][0]},${H} L ${pts[0][0]},${H} Z`;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="overflow-visible"
    >
      <path d={areaD} fill={color} fillOpacity={0.08} />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray:  W * 3,
          strokeDashoffset: isVisible ? 0 : W * 3,
          transition:       'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.5s',
        }}
      />
    </svg>
  );
}

/* ─── Circular progress ring ──────────────────────────────────────────────── */
function ProgressRing({ progress, color, isVisible, size = 96, strokeWidth = 7 }) {
  const radius       = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset       = circumference * (1 - progress / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(17,76,90,0.25)"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={isVisible ? offset : circumference}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) 0.3s',
          filter: `drop-shadow(0 0 4px ${color}66)`,
        }}
      />
    </svg>
  );
}

/* ─── Individual stat card ────────────────────────────────────────────────── */
function StatCard({ stat, isVisible }) {
  const { count, startCount } = useCountUp({ end: stat.end, duration: 1800 });
  const isTenK = stat.id === 'teams';

  useEffect(() => {
    if (isVisible) startCount();
  }, [isVisible, startCount]);

  /* Format display */
  const displayCount = isTenK
    ? count.toLocaleString('en-US')
    : stat.id === 'rating'
    ? (count / 10).toFixed(1)
    : count;

  return (
    <article
      className={[
        'relative flex flex-col items-center text-center p-7 rounded-2xl',
        'bg-mint-light border-2 border-mint-mid',
        'transition-all duration-500 ease-out',
        'hover:border-teal-deep/40 hover:shadow-lg hover:-translate-y-1',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      ].join(' ')}
    >
      {/* Ring + number stack */}
      <div className="relative mb-4">
        <ProgressRing
          progress={stat.progress}
          color={stat.color}
          isVisible={isVisible}
          size={96}
          strokeWidth={7}
        />
        {/* Number centered inside ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono font-bold text-navy leading-none"
            style={{ fontSize: 22 }}
            aria-live="polite"
            aria-atomic="true"
          >
            {displayCount}{stat.suffix}
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="font-sans text-sm font-medium text-navy/60 mb-3">
        {stat.label}
      </p>

      {/* Sparkline */}
      <Sparkline data={stat.sparkline} color={stat.color} isVisible={isVisible} />
    </article>
  );
}

/* ─── Statistics section ─────────────────────────────────────────────────── */
export default function Statistics() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="statistics"
      aria-labelledby="statistics-heading"
      className="py-24 lg:py-32 bg-mint-mid/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="mb-5">
            <Icon name="zap" size={11} />
            By the Numbers
          </Badge>
          <h2
            id="statistics-heading"
            className="font-sans font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-navy"
          >
            Metrics that speak
            <br />
            <span className="text-teal-deep">for themselves.</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : '0ms',
              }}
            >
              <StatCard stat={stat} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
