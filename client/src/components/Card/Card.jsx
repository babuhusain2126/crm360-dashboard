import { classNames } from '../../utils/formatters';
import './Card.css';

export default function Card({ children, className, padded = true, hoverable = false, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={classNames('card', padded && 'card-padded', hoverable && 'card-hoverable', className)} {...rest}>
      {children}
    </Tag>
  );
}
