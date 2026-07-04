import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-panel">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="auth-panel-inner"
        >
          <Link to="/login" className="auth-brand">
            <div className="sidebar-logo">AI</div>
            <span>AiCRM</span>
          </Link>
          <Outlet />
        </motion.div>
      </div>

      <div className="auth-showcase">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Run every customer relationship from one intelligent workspace.</h2>
          <p>Pipeline, orders, and support — with AI insights surfaced exactly when you need them.</p>
          <ul className="auth-showcase-points">
            <li>Real-time revenue and pipeline analytics</li>
            <li>AI assistant trained on your account activity</li>
            <li>One workflow for sales, support, and success teams</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
