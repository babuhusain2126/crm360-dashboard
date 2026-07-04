import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import Card from '../Card/Card';
import { classNames } from '../../utils/formatters';
import './StatCard.css';

export default function StatCard({ label, value, change, changeType = 'up', icon, accent = 'primary' }) {
  return (
    <Card className={classNames('stat-card', `stat-card-${accent}`)} hoverable>
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-icon">{icon}</span>
      </div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={classNames('stat-card-change', changeType === 'up' ? 'stat-up' : 'stat-down')}>
          {changeType === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
          <span>{change}</span>
        </div>
      )}
    </Card>
  );
}
