// ─── Annual discount (20%) ────────────────────────────────────────────────
export const ANNUAL_DISCOUNT = 0.20;

// ─── Currency configuration ───────────────────────────────────────────────
export const CURRENCIES = {
  USD: { symbol: '$',  rate: 1,    code: 'USD', label: 'USD — US Dollar'    },
  INR: { symbol: '₹',  rate: 83.5, code: 'INR', label: 'INR — Indian Rupee'  },
  EUR: { symbol: '€',  rate: 0.92, code: 'EUR', label: 'EUR — Euro'           },
};

export const CURRENCY_OPTIONS = ['USD', 'INR', 'EUR'];

export const BILLING_OPTIONS = ['monthly', 'annual'];

// ─── Plan configuration ────────────────────────────────────────────────────
export const PLANS = [
  {
    id:          'starter',
    name:        'Starter',
    description: 'Perfect for individuals and early-stage projects.',
    baseUSD:     12,
    badge:       null,
    highlighted: false,
    cta:         'Get Started Free',
    features: [
      '5 Projects',
      '10 GB Storage',
      'Basic Analytics',
      'Email Support',
      'REST API Access',
      'Community Forums',
    ],
  },
  {
    id:          'professional',
    name:        'Professional',
    description: 'For growing teams that need power and flexibility.',
    baseUSD:     39,
    badge:       'Most Popular',
    highlighted: true,
    cta:         'Start Free Trial',
    features: [
      'Unlimited Projects',
      '100 GB Storage',
      'Advanced Analytics',
      'Priority Support',
      'Full API Access',
      'Team Collaboration',
      'Custom Dashboards',
      'Webhooks & Alerts',
    ],
  },
  {
    id:          'enterprise',
    name:        'Enterprise',
    description: 'Built for large organisations with complex needs.',
    baseUSD:     99,
    badge:       null,
    highlighted: false,
    cta:         'Contact Sales',
    features: [
      'Unlimited Everything',
      '1 TB Storage',
      'Real-time Analytics',
      '24/7 Dedicated Support',
      'Full API & Webhooks',
      'SSO & SAML',
      'Custom Integrations',
      'SLA Guarantee',
      'Audit Logs',
    ],
  },
];
