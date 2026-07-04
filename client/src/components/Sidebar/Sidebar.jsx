import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiUsers, FiTarget, FiShoppingBag, FiBox, FiUserCheck,
  FiBarChart2, FiCpu, FiBell, FiSettings, FiChevronsLeft, FiChevronsRight,
} from 'react-icons/fi';
import { classNames } from '../../utils/formatters';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/customers', label: 'Customers', icon: FiUsers },
  { to: '/leads', label: 'Leads', icon: FiTarget },
  { to: '/orders', label: 'Orders', icon: FiShoppingBag },
  { to: '/products', label: 'Products', icon: FiBox },
  { to: '/employees', label: 'Employees', icon: FiUserCheck },
  { to: '/reports', label: 'Reports', icon: FiBarChart2 },
  { to: '/ai-assistant', label: 'AI Assistant', icon: FiCpu },
  { to: '/notifications', label: 'Notifications', icon: FiBell },
  { to: '/settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  return (
    <>
      {mobileOpen && <div className="sidebar-scrim" onClick={onCloseMobile} />}
      <aside className={classNames('sidebar', collapsed && 'sidebar-collapsed', mobileOpen && 'sidebar-mobile-open')}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">AI</div>
          {!collapsed && <span className="sidebar-brand-name">AiCRM</span>}
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onCloseMobile}
              className={({ isActive }) => classNames('sidebar-link', isActive && 'sidebar-link-active')}
            >
              <Icon className="sidebar-link-icon" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>
    </>
  );
}
