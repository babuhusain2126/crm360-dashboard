import './Filter.css';

export default function Filter({ label, value, onChange, options }) {
  return (
    <div className="filter-chip-group">
      {label && <span className="filter-label">{label}</span>}
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`filter-chip ${value === opt.value ? 'filter-chip-active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
