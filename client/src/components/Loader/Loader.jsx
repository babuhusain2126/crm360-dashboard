import './Loader.css';

export default function Loader({ size = 32, label }) {
  return (
    <div className="loader-wrap">
      <span className="loader-spin" style={{ width: size, height: size }} />
      {label && <span className="loader-label">{label}</span>}
    </div>
  );
}
