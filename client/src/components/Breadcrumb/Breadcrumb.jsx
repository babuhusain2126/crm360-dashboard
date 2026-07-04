import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import './Breadcrumb.css';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="breadcrumb-item">
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span className="breadcrumb-current">{item.label}</span>}
          {i < items.length - 1 && <FiChevronRight className="breadcrumb-sep" />}
        </span>
      ))}
    </nav>
  );
}
