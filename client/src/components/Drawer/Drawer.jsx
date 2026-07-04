import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Drawer.css';

export default function Drawer({ open, onClose, title, children }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h3>{title}</h3>
              <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="drawer-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
