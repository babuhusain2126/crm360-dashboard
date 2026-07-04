import './EmptyState.css';

export default function EmptyState({ icon = '📭', title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h4>{title}</h4>
      {description && <p className="text-secondary">{description}</p>}
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}
