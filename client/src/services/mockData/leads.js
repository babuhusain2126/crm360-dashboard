export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

const sources = ['Website', 'Referral', 'LinkedIn', 'Cold Outreach', 'Webinar', 'Partner'];
const names = ['Jordan Blake', 'Amara Diallo', 'Hiro Tanaka', 'Isla Fraser', 'Marco Bianchi', 'Chidi Obi', 'Freya Lund', 'Tariq Hassan', 'Wren Ostby', 'Sana Malik'];

export function generateLeads(count = 30) {
  return Array.from({ length: count }, (_, i) => ({
    id: `LEAD-${500 + i}`,
    name: names[i % names.length],
    company: ['Vantage Corp', 'Rivermark', 'Haloform', 'Bright Path', 'Ninepoint', 'Coral Systems'][i % 6],
    email: `${names[i % names.length].split(' ')[0].toLowerCase()}@leadmail.com`,
    status: LEAD_STATUSES[i % LEAD_STATUSES.length],
    source: sources[i % sources.length],
    value: Math.round(1500 + Math.random() * 30000),
    owner: ['Babu Husain', 'Anika Rao', 'Sam Patel'][i % 3],
    createdAt: new Date(Date.now() - i * 86400000 * 2.3).toISOString(),
  }));
}

export const leads = generateLeads();
