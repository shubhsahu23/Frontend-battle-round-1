// ─── Feature cards for Bento grid (desktop) & Accordion (mobile) ─────────
// Layout pattern in 3-col bento grid:
//   Row 1:  [0 large: col 1-2]  [1 small: col 3]
//   Row 2:  [2 small: col 1]    [3 large: col 2-3]
//   Row 3:  [4 small: col 1]    [5 large: col 2-3]

export const FEATURES = [
  {
    id:          'realtime',
    title:       'Real-time Analytics',
    shortTitle:  'Real-time',
    description: 'Monitor your business as it happens. Live dashboards update in under 100 ms with streaming data pipelines — no refresh required. React to shifts before they become problems.',
    icon:        'chart',
    size:        'large',   // col-span-2
    accentColor: '#FFC801',
    stat:        '< 100 ms latency',
    statLabel:   'Live data lag',
  },
  {
    id:          'ai',
    title:       'AI Insights',
    shortTitle:  'AI',
    description: `Prism's AI surfaces patterns you'd never find manually — anomaly detection, predictive forecasts, and automated recommendations delivered daily.`,
    icon:        'brain',
    size:        'small',   // col-span-1
    accentColor: '#FF9932',
    stat:        '94% accuracy',
    statLabel:   'Forecast precision',
  },
  {
    id:          'collab',
    title:       'Team Collaboration',
    shortTitle:  'Collaboration',
    description: 'Share dashboards, leave threaded comments on any metric, and keep every stakeholder aligned on one source of truth.',
    icon:        'team',
    size:        'small',   // col-span-1
    accentColor: '#114C5A',
    stat:        'Unlimited seats',
    statLabel:   'All plans',
  },
  {
    id:          'dashboards',
    title:       'Custom Dashboards',
    shortTitle:  'Dashboards',
    description: 'Drag-and-drop builder with 40+ chart types, custom filters, calculated fields, and saved view layouts. Build exactly the dashboard your team needs.',
    icon:        'grid',
    size:        'large',   // col-span-2
    accentColor: '#FFC801',
    stat:        '40+ chart types',
    statLabel:   'Visualization library',
  },
  {
    id:          'security',
    title:       'Enterprise Security',
    shortTitle:  'Security',
    description: 'SOC 2 Type II certified. End-to-end encryption, SSO / SAML, role-based access control, and full audit logs.',
    icon:        'shield',
    size:        'small',   // col-span-1
    accentColor: '#FF9932',
    stat:        'SOC 2 Type II',
    statLabel:   'Certified',
  },
  {
    id:          'integrations',
    title:       '200+ Integrations',
    shortTitle:  'Integrations',
    description: 'Connect your entire data stack in minutes. Native connectors for Snowflake, BigQuery, Salesforce, HubSpot, Stripe, and 200+ more — no code required.',
    icon:        'connect',
    size:        'large',   // col-span-2
    accentColor: '#114C5A',
    stat:        '200+ connectors',
    statLabel:   'Data sources',
  },
];
