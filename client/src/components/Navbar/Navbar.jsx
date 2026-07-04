import { FiMenu, FiSun, FiMoon, FiBell, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import SearchBar from '../SearchBar/SearchBar';
import Avatar from '../Avatar/Avatar';
import Dropdown from '../Dropdown/Dropdown';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import './Navbar.css';

export default function Navbar({ onMenuClick, breadcrumbItems = [] }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <FiMenu />
        </button>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="navbar-right">
        <SearchBar value="" onChange={() => {}} placeholder="Search customers, orders..." />

        <button className="navbar-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>

        <button className="navbar-icon-btn" onClick={() => navigate('/notifications')} aria-label="Notifications">
          <FiBell />
          {unreadCount > 0 && <span className="navbar-badge">{unreadCount}</span>}
        </button>

        <Dropdown
          trigger={
            <div className="navbar-profile">
              <Avatar name={user?.name} size="sm" color={user?.avatarColor} />
            </div>
          }
        >
          <div className="dropdown-profile-header">
            <strong>{user?.name}</strong>
            <span className="text-tertiary">{user?.email}</span>
          </div>
          <div className="dropdown-divider" />
          <button className="dropdown-item" onClick={() => navigate('/settings')}><FiUser /> Profile</button>
          <button className="dropdown-item" onClick={() => navigate('/settings')}><FiSettings /> Settings</button>
          <div className="dropdown-divider" />
          <button className="dropdown-item" onClick={logout}><FiLogOut /> Log out</button>
        </Dropdown>
      </div>
    </header>
  );
}
