import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer,
} from 'recharts';
import ChartCard from '../../components/ChartCard/ChartCard';
import Button from '../../components/Button/Button';
import { reportService } from '../../services/reportService';
import { customers } from '../../services/mockData/customers';
import { employees } from '../../services/mockData/employees';
import { formatCurrency } from '../../utils/formatters';
import './Reports.css';

export default function Reports() {
  const [revenue, setRevenue] = useState([]);
  const [growth, setGrowth] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [yearlySales, setYearlySales] = useState([]);

  useEffect(() => {
    reportService.getRevenue().then(setRevenue);
    reportService.getCustomerGrowth().then(setGrowth);
    reportService.getMonthlySales().then(setMonthlySales);
    reportService.getYearlySales().then(setYearlySales);
  }, []);

  const exportBtn = <Button variant="secondary" size="sm" icon={<FiDownload />}>Export</Button>;

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="page-title">Reports</h2>
          <p className="text-secondary">Performance across revenue, customers, and your team</p>
        </div>
      </div>

      <div className="reports-grid">
        <ChartCard title="Revenue vs target" subtitle="Monthly performance" action={exportBtn}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="month" fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <YAxis fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <RTooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Bar dataKey="revenue" fill="var(--color-primary-500)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="target" fill="var(--border-strong)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer growth" subtitle="Cumulative customers" action={exportBtn}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="month" fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <YAxis fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <RTooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Line type="monotone" dataKey="customers" stroke="var(--color-success-500)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly sales" subtitle="Units of revenue by month" action={exportBtn}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="month" fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <YAxis fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <RTooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Bar dataKey="sales" fill="var(--color-info-500)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Yearly sales" subtitle="Year-over-year revenue" action={exportBtn}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={yearlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="year" fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <YAxis fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <RTooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Bar dataKey="sales" fill="var(--color-warning-500)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Employee performance" subtitle={`${employees.length} team members`} action={exportBtn}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={employees.slice(0, 8).map((e) => ({ name: e.name.split(' ')[0], score: e.performance }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
              <XAxis type="number" fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} width={70} />
              <RTooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Bar dataKey="score" fill="var(--color-success-500)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer tiers" subtitle={`${customers.length} customers`} action={exportBtn}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={['Standard', 'Gold', 'Platinum'].map((tier) => ({ tier, count: customers.filter((c) => c.tier === tier).length }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis dataKey="tier" fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <YAxis fontSize={12} stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
              <RTooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} />
              <Bar dataKey="count" fill="var(--color-primary-500)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
