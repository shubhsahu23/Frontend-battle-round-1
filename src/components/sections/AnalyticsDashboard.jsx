import React, { lazy, Suspense } from 'react';
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from 'recharts';
import { REVENUE_DATA, USER_DATA, PLAN_DISTRIBUTION, API_DATA } from '../../constants/dashboard';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

/* ─── Shared tooltip style ────────────────────────────────────────────────── */
const TOOLTIP_STYLE = {
  contentStyle: {
    background:   'rgba(23,43,54,0.96)',
    border:       '1px solid rgba(217,232,226,0.15)',
    borderRadius: 10,
    fontSize:     12,
    fontFamily:   '"JetBrains Mono", monospace',
    color:        'rgba(217,232,226,0.85)',
    boxShadow:    '0 8px 32px rgba(0,0,0,0.4)',
  },
  labelStyle:  { color: 'rgba(217,232,226,0.5)', marginBottom: 4 },
  itemStyle:   { color: '#FFC801' },
  cursor:      { stroke: 'rgba(255,200,1,0.2)', strokeWidth: 1 },
};

const AXIS_TICK  = { fill: 'rgba(217,232,226,0.35)', fontSize: 10, fontFamily: '"JetBrains Mono", monospace' };
const GRID_STYLE = { stroke: 'rgba(217,232,226,0.06)', strokeDasharray: '3 3' };

/* ─── Glass card wrapper ─────────────────────────────────────────────────── */
function ChartCard({ title, subtitle, children, className = '', style = {} }) {
  return (
    <div className={[
      'rounded-2xl border border-mint-mid/15 bg-navy/80 backdrop-blur-sm',
      'p-5 sm:p-6 flex flex-col gap-4 overflow-hidden',
      'transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(23,43,54,0.4)] hover:border-mint-mid/30',
      className,
    ].join(' ')} style={style}>
      <div>
        <p className="font-mono text-xs font-semibold text-mint-mid/45 uppercase tracking-widest mb-1">
          {title}
        </p>
        {subtitle && (
          <p className="font-sans text-2xl font-bold text-mint-light">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
}

/* ─── Revenue Line Chart ─────────────────────────────────────────────────── */
function RevenueChart({ isVisible, delay }) {
  return (
    <ChartCard
      title="Revenue Growth"
      subtitle="$128K MRR"
      className={[
        'lg:col-span-2',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      ].join(' ')}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#FFC801" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FFC801" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#FF9932" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#FF9932" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}K`} />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(v, n) => [`$${v}K`, n === 'revenue' ? 'Actual' : 'Target']}
          />
          <Area type="monotone" dataKey="target"  stroke="#FF9932" strokeWidth={1.5} fill="url(#gradTarget)" strokeDasharray="4 3" dot={false} />
          <Area type="monotone" dataKey="revenue" stroke="#FFC801" strokeWidth={2.5} fill="url(#gradRevenue)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─── User Activity Bar Chart ────────────────────────────────────────────── */
function UsersChart({ isVisible, delay }) {
  return (
    <ChartCard 
      title="Active Users" 
      subtitle="24.8K"
      className={isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={USER_DATA.slice(6)} margin={{ top: 0, right: 0, left: -28, bottom: 0 }} barCategoryGap="35%">
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(v) => [v.toLocaleString(), 'Active Users']}
          />
          <Bar dataKey="active" radius={[4, 4, 0, 0]}>
            {USER_DATA.slice(6).map((_, i) => (
              <Cell key={i} fill={i === 5 ? '#FFC801' : i > 3 ? '#114C5A' : 'rgba(17,76,90,0.4)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─── Plan Distribution Donut ────────────────────────────────────────────── */
function PlanChart({ isVisible, delay }) {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x      = cx + radius * Math.cos(-midAngle * RADIAN);
    const y      = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x} y={y}
        fill="rgba(241,246,244,0.8)"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={9}
        fontFamily='"JetBrains Mono", monospace'
        fontWeight={600}
      >
        {name.substring(0, 3).toUpperCase()}
      </text>
    );
  };

  const total = PLAN_DISTRIBUTION.reduce((s, d) => s + d.value, 0);

  return (
    <ChartCard
      title="Plan Distribution"
      subtitle={`${total.toLocaleString()} users`}
      className={isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={130} height={130}>
          <PieChart>
            <Pie
              data={PLAN_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={58}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderLabel}
            >
              {PLAN_DISTRIBUTION.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ul className="space-y-2 flex-1">
          {PLAN_DISTRIBUTION.map((entry) => (
            <li key={entry.name} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: entry.color }}
                  aria-hidden="true"
                />
                <span className="font-sans text-xs text-mint-mid/55">{entry.name}</span>
              </span>
              <span className="font-mono text-xs font-semibold text-mint-light">
                {((entry.value / total) * 100).toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}

/* ─── API Requests Bar Chart ─────────────────────────────────────────────── */
function ApiChart({ isVisible, delay }) {
  return (
    <ChartCard 
      title="API Requests" 
      subtitle="168K peak" 
      className={[
        'lg:col-span-2',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      ].join(' ')}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <ResponsiveContainer width="100%" height={145}>
        <BarChart data={API_DATA} margin={{ top: 0, right: 0, left: -28, bottom: 0 }} barGap={4} barCategoryGap="30%">
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="day" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(v, n) => [v.toLocaleString(), n === 'calls' ? 'Requests' : 'Errors']}
          />
          <Bar dataKey="calls"  radius={[4, 4, 0, 0]}>
            {API_DATA.map((_, i) => (
              <Cell key={i} fill={i === 4 ? '#FFC801' : 'rgba(17,76,90,0.55)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ─── Real-time status indicators ────────────────────────────────────────── */
function StatusPanel({ isVisible, delay }) {
  const services = [
    { name: 'API Gateway',    status: 'Operational', uptime: '99.99%' },
    { name: 'Data Pipeline',  status: 'Operational', uptime: '99.97%' },
    { name: 'AI Inference',   status: 'Operational', uptime: '99.95%' },
    { name: 'Storage',        status: 'Operational', uptime: '100%'   },
  ];

  return (
    <ChartCard 
      title="System Health" 
      subtitle="All Systems Normal"
      className={isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <ul className="space-y-3">
        {services.map((s) => (
          <li key={s.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse-glow" aria-hidden="true" />
              <span className="font-sans text-xs text-mint-mid/60 truncate">{s.name}</span>
            </div>
            <span className="font-mono text-xs font-semibold text-mint-mid/40 flex-shrink-0">
              {s.uptime}
            </span>
          </li>
        ))}
      </ul>
      {/* Mini storage bars */}
      <div className="mt-4 space-y-2">
        {[
          { label: 'Compute', pct: 42, color: '#FFC801' },
          { label: 'Storage', pct: 67, color: '#FF9932' },
          { label: 'Network', pct: 28, color: '#114C5A' },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-mint-mid/40 w-14 flex-shrink-0">{r.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-mint-mid/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${r.pct}%`, background: r.color }}
                aria-hidden="true"
              />
            </div>
            <span className="font-mono text-[10px] text-mint-mid/40 w-6">{r.pct}%</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ─── Analytics Dashboard section ───────────────────────────────────────── */
export default function AnalyticsDashboard() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="py-24 lg:py-32 bg-navy overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="mb-5">
            <Icon name="chart" size={11} />
            Live Dashboard
          </Badge>
          <h2
            id="dashboard-heading"
            className="font-sans font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-mint-light mb-5"
          >
            Enterprise analytics,
            <br />
            <span className="text-brand-yellow">beautifully simple.</span>
          </h2>
          <p className="font-sans text-lg text-mint-mid/55 max-w-2xl mx-auto">
            Everything your team needs in one unified, real-time dashboard.
          </p>
        </div>

        {/* Dashboard grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Row 1: Revenue (wide) */}
          <RevenueChart isVisible={isVisible} delay={0} />
          <StatusPanel  isVisible={isVisible} delay={150} />

          {/* Row 2: Users + Plan + API */}
          <UsersChart isVisible={isVisible} delay={300} />
          <PlanChart  isVisible={isVisible} delay={450} />
          <ApiChart   isVisible={isVisible} delay={600} />
        </div>

        {/* Caption */}
        <p className="text-center font-sans text-xs text-mint-mid/30 mt-8">
          Sample data for illustration purposes. Connect your data sources in minutes.
        </p>
      </div>
    </section>
  );
}
