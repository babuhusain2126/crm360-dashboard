import { FiBell, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useNotifications } from '../../context/NotificationContext';
import { classNames } from '../../utils/formatters';
import './Notifications.css';

const ICONS = { lead: '🎯', order: '📦', report: '📊', employee: '👤', deal: '💰' };

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotifications();

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="page-title">Notifications</h2>
          <p className="text-secondary">Stay on top of everything happening in your workspace</p>
        </div>
        <Button variant="secondary" icon={<FiCheckCircle />} onClick={markAllAsRead}>Mark all as read</Button>
      </div>

      <Card padded={false}>
        {notifications.length === 0 ? (
          <EmptyState icon={<FiBell />} title="You're all caught up" description="New notifications will show up here." />
        ) : (
          <ul className="notif-list">
            {notifications.map((n) => (
              <li key={n.id} className={classNames('notif-item', n.unread && 'notif-unread')} onClick={() => markAsRead(n.id)}>
                <span className="notif-icon">{ICONS[n.type] || '🔔'}</span>
                <div className="notif-body">
                  <strong>{n.title}</strong>
                  <p className="text-secondary">{n.body}</p>
                  <span className="text-tertiary">{n.time}</span>
                </div>
                {n.unread && <span className="notif-dot" />}
                <button
                  className="notif-delete"
                  onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                  aria-label="Delete notification"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
