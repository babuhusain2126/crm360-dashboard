import { useState } from 'react';
import { FiUser, FiLock, FiBell, FiGlobe, FiSliders } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Avatar from '../../components/Avatar/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import './Settings.css';

const SECTIONS = [
  { key: 'profile', label: 'Profile', icon: FiUser },
  { key: 'security', label: 'Security', icon: FiLock },
  { key: 'notifications', label: 'Notifications', icon: FiBell },
  { key: 'company', label: 'Company', icon: FiSliders },
  { key: 'preferences', label: 'Preferences', icon: FiGlobe },
];

export default function Settings() {
  const [active, setActive] = useState('profile');
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { pushToast } = useNotifications();

  const save = () => pushToast({ type: 'success', message: 'Settings saved.' });

  return (
    <div className="page-stack">
      <div>
        <h2 className="page-title">Settings</h2>
        <p className="text-secondary">Manage your account, security, and workspace preferences</p>
      </div>

      <div className="settings-layout">
        <Card className="settings-nav" padded={false}>
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`settings-nav-item ${active === key ? 'settings-nav-active' : ''}`}
              onClick={() => setActive(key)}
            >
              <Icon /> {label}
            </button>
          ))}
        </Card>

        <Card className="settings-content">
          {active === 'profile' && (
            <>
              <h4>Profile</h4>
              <div className="profile-row">
                <Avatar name={user?.name} size="lg" color={user?.avatarColor} />
                <div>
                  <Button variant="secondary" size="sm">Change photo</Button>
                </div>
              </div>
              <div className="form-grid">
                <Input label="Full name" defaultValue={user?.name} />
                <Input label="Email address" defaultValue={user?.email} type="email" />
                <Input label="Role" defaultValue={user?.role} disabled />
                <Input label="Phone number" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-actions"><Button onClick={save}>Save changes</Button></div>
            </>
          )}

          {active === 'security' && (
            <>
              <h4>Security</h4>
              <div className="form-grid">
                <Input label="Current password" type="password" />
                <div />
                <Input label="New password" type="password" />
                <Input label="Confirm new password" type="password" />
              </div>
              <div className="form-actions"><Button onClick={save}>Update password</Button></div>
            </>
          )}

          {active === 'notifications' && (
            <>
              <h4>Notification preferences</h4>
              <div className="toggle-list">
                {['New leads', 'Order updates', 'Weekly reports', 'Product announcements'].map((label) => (
                  <label key={label} className="toggle-row">
                    <span>{label}</span>
                    <input type="checkbox" defaultChecked className="toggle-switch" />
                  </label>
                ))}
              </div>
              <div className="form-actions"><Button onClick={save}>Save preferences</Button></div>
            </>
          )}

          {active === 'company' && (
            <>
              <h4>Company settings</h4>
              <div className="form-grid">
                <Input label="Company name" defaultValue="AiCRM Workspace" />
                <Select label="Industry" options={[{ value: 'saas', label: 'SaaS' }, { value: 'retail', label: 'Retail' }, { value: 'finance', label: 'Finance' }]} />
                <Input label="Company size" defaultValue="11-50 employees" />
                <Input label="Website" defaultValue="https://aicrm.example.com" />
              </div>
              <div className="form-actions"><Button onClick={save}>Save changes</Button></div>
            </>
          )}

          {active === 'preferences' && (
            <>
              <h4>Preferences</h4>
              <div className="form-grid">
                <Select
                  label="Theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
                />
                <Select label="Language" options={[{ value: 'en', label: 'English' }, { value: 'ta', label: 'Tamil' }, { value: 'hi', label: 'Hindi' }]} />
              </div>
              <div className="form-actions"><Button onClick={save}>Save preferences</Button></div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
