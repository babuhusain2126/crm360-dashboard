import { mockDelay } from '../utils/mockDelay';
import { products as seedProducts, CATEGORIES } from './mockData/products';

let products = [...seedProducts];

export { CATEGORIES };

export const productService = {
  async list({ search = '', category = 'all', page = 1, pageSize = 8 } = {}) {
    let filtered = products.filter((p) => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      return matchesSearch && matchesCategory;
    });
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return mockDelay({ items, total, page, pageSize });
  },
  async getById(id) {
    return mockDelay(products.find((p) => p.id === id));
  },
};
