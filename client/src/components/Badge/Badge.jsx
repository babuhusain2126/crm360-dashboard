import { classNames } from '../../utils/formatters';
import './Badge.css';

export default function Badge({ children, tone = 'neutral', className }) {
  return <span className={classNames('badge', `badge-${tone}`, className)}>{children}</span>;
}
