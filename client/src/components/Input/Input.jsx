import { forwardRef, useState } from 'react';
import { classNames } from '../../utils/formatters';
import './Input.css';

const Input = forwardRef(function Input(
  { label, error, hint, type = 'text', icon, id, className, containerClassName, ...rest },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputId = id || label?.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={classNames('field', containerClassName)}>
      {label && <label htmlFor={inputId} className="field-label">{label}</label>}
      <div className={classNames('field-control', error && 'field-control-error', icon && 'field-control-icon')}>
        {icon && <span className="field-icon">{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          type={isPassword && showPassword ? 'text' : type}
          className={classNames('field-input', className)}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="field-toggle"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {error && <span className="field-error">{error}</span>}
      {!error && hint && <span className="field-hint">{hint}</span>}
    </div>
  );
});

export default Input;
