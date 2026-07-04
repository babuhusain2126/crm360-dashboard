export const CATEGORIES = ['Software Seats', 'Hardware', 'Add-ons', 'Support Plans', 'Integrations'];

const productNames = ['Core CRM Seat', 'AI Insight Pack', 'Data Sync Connector', 'Priority Support', 'Analytics Suite', 'Mobile Add-on', 'Workflow Automations', 'Custom Reports', 'Team Collaboration', 'API Access Tier', 'Onboarding Kit', 'Storage Expansion'];

export function generateProducts(count = 24) {
  return Array.from({ length: count }, (_, i) => ({
    id: `PRD-${300 + i}`,
    name: productNames[i % productNames.length] + (i >= productNames.length ? ` ${Math.floor(i / productNames.length) + 1}` : ''),
    category: CATEGORIES[i % CATEGORIES.length],
    price: Math.round((19 + Math.random() * 480) * 100) / 100,
    stock: Math.floor(Math.random() * 300),
    sku: `SKU-${8000 + i}`,
    status: i % 7 === 0 ? 'Low Stock' : 'In Stock',
    image: null,
  }));
}

export const products = generateProducts();
