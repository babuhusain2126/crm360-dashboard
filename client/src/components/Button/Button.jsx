import { classNames } from '../../utils/formatters';
import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      className={classNames('btn', `btn-${variant}`, `btn-${size}`, fullWidth && 'btn-full', loading && 'btn-loading', className)}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {!loading && icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
}
