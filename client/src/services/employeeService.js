import { mockDelay } from '../utils/mockDelay';
import { employees as seedEmployees, DEPARTMENTS } from './mockData/employees';

let employees = [...seedEmployees];

export { DEPARTMENTS };

export const employeeService = {
  async list({ search = '', department = 'all' } = {}) {
    const filtered = employees.filter((e) => {
      const matchesSearch = !search || e.name.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === 'all' || e.department === department;
      return matchesSearch && matchesDept;
    });
    return mockDelay(filtered);
  },
  async getById(id) {
    return mockDelay(employees.find((e) => e.id === id));
  },
};
