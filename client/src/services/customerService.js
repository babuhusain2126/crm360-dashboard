import { mockDelay } from '../utils/mockDelay';
import { customers as seedCustomers } from './mockData/customers';

let customers = [...seedCustomers];

export const customerService = {
  async list({ search = '', status = 'all', page = 1, pageSize = 8 } = {}) {
    let filtered = customers.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' || c.status === status;
      return matchesSearch && matchesStatus;
    });
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return mockDelay({ items, total, page, pageSize });
  },

  async getById(id) {
    const item = customers.find((c) => c.id === id);
    return mockDelay(item);
  },

  async create(payload) {
    const newCustomer = {
      id: `CUST-${1000 + customers.length}`,
      status: 'active',
      tier: 'Standard',
      value: 0,
      lastContact: new Date().toISOString(),
      avatarColor: '#3b6bf6',
      ...payload,
    };
    customers = [newCustomer, ...customers];
    return mockDelay(newCustomer);
  },

  async update(id, payload) {
    customers = customers.map((c) => (c.id === id ? { ...c, ...payload } : c));
    return mockDelay(customers.find((c) => c.id === id));
  },

  async remove(id) {
    customers = customers.filter((c) => c.id !== id);
    return mockDelay({ success: true });
  },
};
