export const PAYMENT_STATUSES = ['Paid', 'Pending', 'Refunded', 'Failed'];
export const SHIPPING_STATUSES = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

import { customers } from './customers';

export function generateOrders(count = 40) {
  return Array.from({ length: count }, (_, i) => {
    const customer = customers[i % customers.length];
    const items = Math.floor(1 + Math.random() * 4);
    return {
      id: `ORD-${9000 + i}`,
      customer: customer.name,
      customerId: customer.id,
      email: customer.email,
      date: new Date(Date.now() - i * 86400000 * 1.2).toISOString(),
      items,
      total: Math.round((80 + Math.random() * 2400) * 100) / 100,
      paymentStatus: PAYMENT_STATUSES[i % PAYMENT_STATUSES.length],
      shippingStatus: SHIPPING_STATUSES[i % SHIPPING_STATUSES.length],
      timeline: [
        { label: 'Order placed', date: new Date(Date.now() - i * 86400000 * 1.2).toISOString(), done: true },
        { label: 'Payment confirmed', date: new Date(Date.now() - i * 86400000 * 1.1).toISOString(), done: i % 4 !== 3 },
        { label: 'Shipped', date: new Date(Date.now() - i * 86400000 * 0.8).toISOString(), done: i % 4 === 2 || i % 4 === 0 },
        { label: 'Delivered', date: new Date(Date.now() - i * 86400000 * 0.2).toISOString(), done: i % 4 === 0 },
      ],
    };
  });
}

export const orders = generateOrders();
