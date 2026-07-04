import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { notificationService } from '../services/notificationService';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  const refresh = useCallback(async () => {
    const data = await notificationService.list();
    setNotifications(data);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markAsRead = useCallback(async (id) => {
    const data = await notificationService.markAsRead(id);
    setNotifications(data);
  }, []);

  const markAllAsRead = useCallback(async () => {
    const data = await notificationService.markAllAsRead();
    setNotifications(data);
  }, []);

  const removeNotification = useCallback(async (id) => {
    const data = await notificationService.remove(id);
    setNotifications(data);
  }, []);

  const pushToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type: 'info', duration: 3500, ...toast }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, pushToast, dismissToast, toasts }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
