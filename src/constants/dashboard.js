// ─── Revenue Growth (12 months) ───────────────────────────────────────────
export const REVENUE_DATA = [
  { month: 'Jan', revenue: 42,  target: 40  },
  { month: 'Feb', revenue: 48,  target: 44  },
  { month: 'Mar', revenue: 51,  target: 48  },
  { month: 'Apr', revenue: 58,  target: 52  },
  { month: 'May', revenue: 63,  target: 56  },
  { month: 'Jun', revenue: 71,  target: 60  },
  { month: 'Jul', revenue: 76,  target: 65  },
  { month: 'Aug', revenue: 84,  target: 70  },
  { month: 'Sep', revenue: 91,  target: 75  },
  { month: 'Oct', revenue: 103, target: 80  },
  { month: 'Nov', revenue: 117, target: 88  },
  { month: 'Dec', revenue: 128, target: 95  },
];

// ─── Active Users (12 months) ─────────────────────────────────────────────
export const USER_DATA = [
  { month: 'Jan', active: 8400,  newUsers: 1200 },
  { month: 'Feb', active: 9200,  newUsers: 1400 },
  { month: 'Mar', active: 10100, newUsers: 1700 },
  { month: 'Apr', active: 11400, newUsers: 1900 },
  { month: 'May', active: 12800, newUsers: 2100 },
  { month: 'Jun', active: 14200, newUsers: 2300 },
  { month: 'Jul', active: 15600, newUsers: 2500 },
  { month: 'Aug', active: 17400, newUsers: 2800 },
  { month: 'Sep', active: 19200, newUsers: 3100 },
  { month: 'Oct', active: 21000, newUsers: 3400 },
  { month: 'Nov', active: 23100, newUsers: 3700 },
  { month: 'Dec', active: 24800, newUsers: 4000 },
];

// ─── Plan distribution (pie chart) ────────────────────────────────────────
export const PLAN_DISTRIBUTION = [
  { name: 'Starter',      value: 4850, color: '#D9E8E2' },
  { name: 'Professional', value: 3200, color: '#FFC801' },
  { name: 'Enterprise',   value:  950, color: '#114C5A' },
];

// ─── API Requests last 7 days (bar chart) ─────────────────────────────────
export const API_DATA = [
  { day: 'Mon', calls: 124000, errors: 340 },
  { day: 'Tue', calls: 138000, errors: 290 },
  { day: 'Wed', calls: 131000, errors: 410 },
  { day: 'Thu', calls: 152000, errors: 280 },
  { day: 'Fri', calls: 168000, errors: 320 },
  { day: 'Sat', calls: 104000, errors: 190 },
  { day: 'Sun', calls:  98000, errors: 160 },
];

// ─── KPI stats for Statistics section ─────────────────────────────────────
export const STATS = [
  {
    id:       'teams',
    label:    'Teams Worldwide',
    end:      10247,
    display:  '10,247',
    suffix:   '+',
    progress: 84,
    color:    '#FFC801',
    sparkline:[40, 48, 52, 61, 68, 74, 82, 91, 103, 112, 124],
  },
  {
    id:       'retention',
    label:    'Customer Retention',
    end:      98,
    display:  '98',
    suffix:   '%',
    progress: 98,
    color:    '#FF9932',
    sparkline:[91, 92, 93, 94, 94, 95, 96, 96, 97, 97, 98],
  },
  {
    id:       'rating',
    label:    'Average Rating',
    end:      49,
    display:  '4.9',
    suffix:   '★',
    progress: 98,
    color:    '#FFC801',
    sparkline:[4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.8, 4.8, 4.8, 4.9, 4.9],
  },
  {
    id:       'latency',
    label:    'Data Latency',
    end:      100,
    display:  '<100',
    suffix:   'ms',
    progress: 96,
    color:    '#114C5A',
    sparkline:[140, 128, 118, 110, 104, 99, 96, 93, 91, 94, 92],
  },
];
