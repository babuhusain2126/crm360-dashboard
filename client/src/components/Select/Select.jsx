import { classNames } from '../../utils/formatters';
import './Select.css';

export default function Select({ label, error, options = [], className, containerClassName, ...rest }) {
  return (
    <div className={classNames('field', containerClassName)}>
      {label && <label className="field-label">{label}</label>}
      <select className={classNames('select-input', error && 'field-control-error', className)} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
