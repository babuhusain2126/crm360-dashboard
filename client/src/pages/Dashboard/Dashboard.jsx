import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign, FiShoppingBag, FiUsers, FiTarget, FiUserCheck, FiZap, FiClock, FiCalendar,
} from 'react-icons/fi';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import StatCard from '../../components/StatCard/StatCard';
import ChartCard from '../../components/ChartCard/ChartCard';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { formatCurrency } from '../../utils/formatters';
import { revenueTrend, salesAnalytics, customerGrowth, recentActivities, aiInsights, calendarEvents } from '../../services/mockData/dashboard';
import './Dashboard.css';

const PIE_COLORS = ['#3b6bf6', '#17b26a', '#f5a524', '#6366f1'];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { label: 'Revenue', value: formatCurrency(676400), change: '+12.4% this month', icon: <FiDollarSign />, accent: 'primary' },
    { label: 'Orders', value: '3,842', change: '+6.1% this month', icon: <FiShoppingBag />, accent: 'info' },
    { label: 'Customers', value: '1,204', change: '+18 this week', icon: <FiUsers />, accent: 'success' },
    { label: 'Leads', value: '312', change: '-3.2% this week', changeType: 'down', icon: <FiTarget />, accent: 'warning' },
    { label: 'Employees', value: '18', change: 'Fully staffed', icon: <FiUserCheck />, accent: 'primary' },
  ];

  if (loading) {
    return (
      <div className="dashboard-grid">
        <div className="stat-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}><SkeletonLoader height="80px" /></Card>
          ))}
        </div>
        <Card><SkeletonLoader height="280px" /></Card>
      </div>
    );
  }

  return (
    <motion.div className="dashboard-grid" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h2 className="page-title">Good to see you back, Babu 👋</h2>
        <p className="text-secondary">Here's what's happening across your CRM today.</p>
      </motion.div>

      <motion.div className="stat-grid" variants={item}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </motion.div>

      <motion.div className="dashboard-charts" variants={item}>
        <ChartCard title="Monthly revenue" subtitle="Actual revenue vs. target" action={<Badge tone="success">+12.4%</Badge>}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <RTooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-primary-500)" strokeWidth={2.5} fill="url(#revFill)" />
              <Area type="monotone" dataKey="target" stroke="var(--text-tertiary)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sales by channel" subtitle="Last 30 days">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={salesAnalytics} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {salesAnalytics.map((entry, i) => <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <RTooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {salesAnalytics.map((entry, i) => (
              <div key={entry.name} className="pie-legend-item">
                <span className="pie-dot" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {entry.name} · {entry.value}%
              </div>
            ))}
          </div>
        </ChartCard>
      </motion.div>

      <motion.div className="dashboard-lower" variants={item}>
        <ChartCard title="Customer growth" subtitle="New customers per month">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <RTooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Line type="monotone" dataKey="customers" stroke="var(--color-success-500)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="ai-insights-card">
          <div className="card-heading"><FiZap /> AI Insights</div>
          <div className="ai-insights-list">
            {aiInsights.map((insight) => (
              <div key={insight.id} className={`ai-insight ai-insight-${insight.severity}`}>
                <strong>{insight.title}</strong>
                <p>{insight.body}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="activity-card">
          <div className="card-heading"><FiClock /> Recent activity</div>
          <ul className="activity-list">
            {recentActivities.map((a) => (
              <li key={a.id}>
                <span className={`activity-dot activity-${a.type}`} />
                <div>
                  <p>{a.text}</p>
                  <span className="text-tertiary">{a.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="calendar-card">
          <div className="card-heading"><FiCalendar /> Upcoming</div>
          <ul className="calendar-list">
            {calendarEvents.map((e) => (
              <li key={e.id}>
                <strong>{e.title}</strong>
                <span className="text-tertiary">{e.date}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </motion.div>
  );
}
