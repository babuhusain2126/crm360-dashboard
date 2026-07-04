import Card from '../Card/Card';
import './ChartCard.css';

export default function ChartCard({ title, subtitle, action, children }) {
  return (
    <Card className="chart-card">
      <div className="chart-card-header">
        <div>
          <h4>{title}</h4>
          {subtitle && <p className="text-tertiary chart-card-subtitle">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="chart-card-body">{children}</div>
    </Card>
  );
}
