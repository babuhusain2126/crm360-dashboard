import { mockDelay } from '../utils/mockDelay';
import { leads as seedLeads, LEAD_STATUSES } from './mockData/leads';

let leads = [...seedLeads];

export { LEAD_STATUSES };

export const leadService = {
  async list() {
    return mockDelay([...leads]);
  },
  async updateStatus(id, status) {
    leads = leads.map((l) => (l.id === id ? { ...l, status } : l));
    return mockDelay(leads.find((l) => l.id === id));
  },
  async create(payload) {
    const newLead = { id: `LEAD-${500 + leads.length}`, status: 'New', createdAt: new Date().toISOString(), ...payload };
    leads = [newLead, ...leads];
    return mockDelay(newLead);
  },
  async remove(id) {
    leads = leads.filter((l) => l.id !== id);
    return mockDelay({ success: true });
  },
};
