import './Table.css';

export default function Table({ columns, data, keyField = 'id', onRowClick, renderMobileCard }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[keyField]} onClick={() => onRowClick?.(row)} className={onRowClick ? 'row-clickable' : ''}>
              {columns.map((col) => (
                <td key={col.key} data-label={col.header}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {renderMobileCard && (
        <div className="table-mobile-cards">
          {data.map((row) => (
            <div key={row[keyField]} onClick={() => onRowClick?.(row)}>
              {renderMobileCard(row)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
