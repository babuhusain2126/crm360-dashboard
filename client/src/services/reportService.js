import { mockDelay } from '../utils/mockDelay';
import { revenueTrend, customerGrowth } from './mockData/dashboard';

const monthlySales = revenueTrend.map((r) => ({ month: r.month, sales: r.revenue }));
const yearlySales = [
  { year: '2022', sales: 412000 },
  { year: '2023', sales: 498000 },
  { year: '2024', sales: 586000 },
  { year: '2025', sales: 671000 },
  { year: '2026', sales: 389000 },
];

export const reportService = {
  async getRevenue() {
    return mockDelay(revenueTrend);
  },
  async getCustomerGrowth() {
    return mockDelay(customerGrowth);
  },
  async getMonthlySales() {
    return mockDelay(monthlySales);
  },
  async getYearlySales() {
    return mockDelay(yearlySales);
  },
};
