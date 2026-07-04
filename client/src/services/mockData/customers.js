const firstNames = ['Ava', 'Liam', 'Maya', 'Noah', 'Priya', 'Ethan', 'Sofia', 'Kabir', 'Grace', 'Omar', 'Zara', 'Leo', 'Nina', 'Ravi', 'Elena', 'Yusuf'];
const lastNames = ['Sharma', 'Chen', 'Okafor', 'Martinez', 'Novak', 'Patel', 'Kim', 'Rossi', 'Alvarez', 'Singh', 'Dubois', 'Nguyen'];
const companies = ['Northwind Traders', 'Vertex Labs', 'Bluepeak Retail', 'Orbit Health', 'Fernway Logistics', 'Cascade Finance', 'Lumen Media', 'Anchorpoint', 'Solace Foods', 'Kite & Co', 'Driftline', 'Everfield'];
const statuses = ['active', 'inactive', 'pending'];
const tiers = ['Standard', 'Gold', 'Platinum'];

export function generateCustomers(count = 48) {
  return Array.from({ length: count }, (_, i) => {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[(i * 3) % lastNames.length];
    return {
      id: `CUST-${1000 + i}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${companies[i % companies.length].split(' ')[0].toLowerCase()}.com`,
      phone: `+1 (${200 + (i % 700)}) 555-${String(1000 + i).slice(-4)}`,
      company: companies[i % companies.length],
      status: statuses[i % statuses.length],
      tier: tiers[i % tiers.length],
      value: Math.round(2000 + Math.random() * 48000),
      lastContact: new Date(Date.now() - i * 86400000 * 1.7).toISOString(),
      avatarColor: ['#3b6bf6', '#17b26a', '#f5a524', '#6366f1', '#ef4444'][i % 5],
      location: ['New York, US', 'Bengaluru, IN', 'Berlin, DE', 'Toronto, CA', 'Singapore', 'Sao Paulo, BR'][i % 6],
      notes: 'Engaged during last quarterly review; interested in the AI insights add-on.',
    };
  });
}

export const customers = generateCustomers();
