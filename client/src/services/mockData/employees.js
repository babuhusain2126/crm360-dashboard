export const DEPARTMENTS = ['Sales', 'Support', 'Engineering', 'Marketing', 'Success', 'Finance'];
const roles = {
  Sales: ['Account Executive', 'Sales Manager', 'SDR'],
  Support: ['Support Specialist', 'Support Lead'],
  Engineering: ['Frontend Engineer', 'Backend Engineer', 'QA Engineer'],
  Marketing: ['Content Strategist', 'Growth Marketer'],
  Success: ['Customer Success Manager', 'Onboarding Specialist'],
  Finance: ['Financial Analyst', 'Accounts Manager'],
};
const names = ['Babu Husain S', 'Anika Rao', 'Sam Patel', 'Dana Wolfe', 'Idris Kone', 'Mei Lin', 'Carlos Rivas', 'Petra Novak', 'Femi Adeyemi', 'Grace Han', 'Oliver Wren', 'Salma Idris'];

export function generateEmployees(count = 18) {
  return Array.from({ length: count }, (_, i) => {
    const dept = DEPARTMENTS[i % DEPARTMENTS.length];
    return {
      id: `EMP-${100 + i}`,
      name: names[i % names.length],
      department: dept,
      role: roles[dept][i % roles[dept].length],
      email: `${names[i % names.length].split(' ')[0].toLowerCase()}@aicrm.com`,
      status: i % 9 === 0 ? 'On Leave' : 'Active',
      attendance: Math.round(85 + Math.random() * 15),
      performance: Math.round(60 + Math.random() * 40),
      joined: new Date(Date.now() - (200 + i * 40) * 86400000).toISOString(),
      avatarColor: ['#3b6bf6', '#17b26a', '#f5a524', '#6366f1', '#ef4444'][i % 5],
    };
  });
}

export const employees = generateEmployees();
