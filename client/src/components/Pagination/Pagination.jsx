import { classNames } from '../../utils/formatters';
import './Pagination.css';

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <span className="pagination-summary">
        Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} of {total}
      </span>
      <div className="pagination-controls">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">‹</button>
        {pages.map((p) => (
          <button key={p} className={classNames(p === page && 'pagination-active')} onClick={() => onPageChange(p)}>
            {p}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">›</button>
      </div>
    </div>
  );
}
