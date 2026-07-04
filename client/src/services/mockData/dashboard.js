export const revenueTrend = [
  { month: 'Jan', revenue: 42000, target: 40000 },
  { month: 'Feb', revenue: 45500, target: 42000 },
  { month: 'Mar', revenue: 48200, target: 44000 },
  { month: 'Apr', revenue: 46800, target: 46000 },
  { month: 'May', revenue: 52300, target: 48000 },
  { month: 'Jun', revenue: 58900, target: 50000 },
  { month: 'Jul', revenue: 61200, target: 53000 },
  { month: 'Aug', revenue: 59700, target: 55000 },
  { month: 'Sep', revenue: 64500, target: 57000 },
  { month: 'Oct', revenue: 68100, target: 59000 },
  { month: 'Nov', revenue: 71800, target: 61000 },
  { month: 'Dec', revenue: 76400, target: 64000 },
];

export const salesAnalytics = [
  { name: 'Direct', value: 38 },
  { name: 'Referral', value: 24 },
  { name: 'Partner', value: 21 },
  { name: 'Organic', value: 17 },
];

export const customerGrowth = [
  { month: 'Jan', customers: 320 },
  { month: 'Feb', customers: 356 },
  { month: 'Mar', customers: 401 },
  { month: 'Apr', customers: 438 },
  { month: 'May', customers: 489 },
  { month: 'Jun', customers: 542 },
  { month: 'Jul', customers: 611 },
];

export const recentActivities = [
  { id: 1, type: 'deal', text: 'Babu Husain closed a deal with Vertex Labs', time: '12 minutes ago' },
  { id: 2, type: 'lead', text: 'New lead captured from the pricing page', time: '48 minutes ago' },
  { id: 3, type: 'order', text: 'Order ORD-9021 marked as delivered', time: '1 hour ago' },
  { id: 4, type: 'note', text: 'Anika Rao added a note to Northwind Traders', time: '3 hours ago' },
  { id: 5, type: 'employee', text: 'Sam Patel logged attendance for the sales floor', time: '5 hours ago' },
  { id: 6, type: 'deal', text: 'Proposal sent to Coral Systems', time: 'Yesterday' },
];

export const aiInsights = [
  { id: 1, title: 'Churn risk detected', body: '4 accounts show declining engagement over the last 30 days. Consider a check-in.', severity: 'warning' },
  { id: 2, title: 'Upsell opportunity', body: 'Bluepeak Retail is trending toward the usage ceiling on their current plan.', severity: 'info' },
  { id: 3, title: 'Pipeline healthy', body: 'Qualified lead volume is up 18% versus last month.', severity: 'success' },
];

export const notificationsSeed = [
  { id: 1, title: 'New lead assigned', body: 'A lead from LinkedIn was assigned to you.', time: '10m ago', unread: true, type: 'lead' },
  { id: 2, title: 'Invoice overdue', body: 'ORD-9014 payment is 3 days overdue.', time: '1h ago', unread: true, type: 'order' },
  { id: 3, title: 'Weekly report ready', body: 'Your weekly performance report has been generated.', time: '3h ago', unread: false, type: 'report' },
  { id: 4, title: 'Employee check-in', body: 'Mei Lin submitted a performance self-review.', time: 'Yesterday', unread: false, type: 'employee' },
  { id: 5, title: 'Deal won', body: 'Northwind Traders upgraded to Platinum.', time: '2 days ago', unread: false, type: 'deal' },
];

export const calendarEvents = [
  { id: 1, title: 'Pipeline review', date: 'Today, 3:00 PM' },
  { id: 2, title: 'Onboarding call — Coral Systems', date: 'Tomorrow, 10:30 AM' },
  { id: 3, title: 'Quarterly business review', date: 'Fri, 1:00 PM' },
];
