import { initials, classNames } from '../../utils/formatters';
import './Avatar.css';

export default function Avatar({ name, color = 'var(--color-primary-500)', size = 'md', src, className }) {
  return (
    <div className={classNames('avatar', `avatar-${size}`, className)} style={{ background: src ? 'transparent' : color }}>
      {src ? <img src={src} alt={name} /> : <span>{initials(name)}</span>}
    </div>
  );
}
