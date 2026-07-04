import { mockDelay } from '../utils/mockDelay';
import { notificationsSeed } from './mockData/dashboard';

let notifications = [...notificationsSeed];

export const notificationService = {
  async list() {
    return mockDelay([...notifications]);
  },
  async markAsRead(id) {
    notifications = notifications.map((n) => (n.id === id ? { ...n, unread: false } : n));
    return mockDelay([...notifications]);
  },
  async markAllAsRead() {
    notifications = notifications.map((n) => ({ ...n, unread: false }));
    return mockDelay([...notifications]);
  },
  async remove(id) {
    notifications = notifications.filter((n) => n.id !== id);
    return mockDelay([...notifications]);
  },
};
