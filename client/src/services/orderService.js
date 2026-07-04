import { mockDelay } from '../utils/mockDelay';
import { orders as seedOrders, PAYMENT_STATUSES, SHIPPING_STATUSES } from './mockData/orders';

let orders = [...seedOrders];

export { PAYMENT_STATUSES, SHIPPING_STATUSES };

export const orderService = {
  async list({ search = '', page = 1, pageSize = 8 } = {}) {
    let filtered = orders.filter(
      (o) => !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    );
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return mockDelay({ items, total, page, pageSize });
  },
  async getById(id) {
    return mockDelay(orders.find((o) => o.id === id));
  },
  async remove(id) {
    orders = orders.filter((o) => o.id !== id);
    return mockDelay({ success: true });
  },
};
