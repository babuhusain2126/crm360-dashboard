import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import './Toast.css';

const ICONS = { success: '✓', error: '✕', warning: '!', info: 'i' };

export default function ToastContainer() {
  const { toasts, dismissToast } = useNotifications();

  return createPortal(
    <div className="toast-stack">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2 }}
          >
            <span className="toast-icon">{ICONS[toast.type] || ICONS.info}</span>
            <div className="toast-content">
              {toast.title && <strong>{toast.title}</strong>}
              <span>{toast.message}</span>
            </div>
            <button className="toast-close" onClick={() => dismissToast(toast.id)} aria-label="Dismiss">✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}
