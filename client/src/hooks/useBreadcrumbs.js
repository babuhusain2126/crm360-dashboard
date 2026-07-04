import { useLocation } from 'react-router-dom';

const LABELS = {
  '': 'Dashboard',
  customers: 'Customers',
  leads: 'Leads',
  orders: 'Orders',
  products: 'Products',
  employees: 'Employees',
  reports: 'Reports',
  'ai-assistant': 'AI Assistant',
  notifications: 'Notifications',
  settings: 'Settings',
  add: 'Add',
  edit: 'Edit',
};

export default function useBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return [{ label: 'Dashboard' }];
  }

  let path = '';
  return segments.map((seg, i) => {
    path += `/${seg}`;
    const label = LABELS[seg] || seg;
    return { label, to: i < segments.length - 1 ? path : undefined };
  });
}
