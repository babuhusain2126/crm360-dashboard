import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filter from '../../components/Filter/Filter';
import Pagination from '../../components/Pagination/Pagination';
import Badge from '../../components/Badge/Badge';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import EmptyState from '../../components/EmptyState/EmptyState';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import useDebounce from '../../hooks/useDebounce';
import { customerService } from '../../services/customerService';
import { useNotifications } from '../../context/NotificationContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './Customers.css';

const STATUS_TONE = { active: 'success', inactive: 'neutral', pending: 'warning' };

export default function CustomerList() {
  const navigate = useNavigate();
  const { pushToast } = useNotifications();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const debouncedSearch = useDebounce(search, 300);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await customerService.list({ search: debouncedSearch, status, page, pageSize: 8 });
    setData(result);
    setLoading(false);
  }, [debouncedSearch, status, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [debouncedSearch, status]);

  const handleDelete = async () => {
    await customerService.remove(toDelete.id);
    pushToast({ type: 'success', message: `${toDelete.name} was removed.` });
    setToDelete(null);
    load();
  };

  const columns = [
    {
      key: 'name', header: 'Customer',
      render: (row) => (
        <div className="cell-with-avatar">
          <Avatar name={row.name} color={row.avatarColor} size="sm" />
          <div>
            <div className="cell-primary">{row.name}</div>
            <div className="text-tertiary cell-secondary">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'company', header: 'Company' },
    { key: 'status', header: 'Status', render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge> },
    { key: 'tier', header: 'Tier' },
    { key: 'value', header: 'Lifetime value', render: (row) => formatCurrency(row.value) },
    { key: 'lastContact', header: 'Last contact', render: (row) => formatDate(row.lastContact) },
    {
      key: 'actions', header: '', width: 120,
      render: (row) => (
        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
          <button aria-label="View" onClick={() => navigate(`/customers/${row.id}`)}><FiEye /></button>
          <button aria-label="Edit" onClick={() => navigate(`/customers/${row.id}/edit`)}><FiEdit2 /></button>
          <button aria-label="Delete" onClick={() => setToDelete(row)}><FiTrash2 /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="page-title">Customers</h2>
          <p className="text-secondary">{data.total} customers in your workspace</p>
        </div>
        <Button icon={<FiPlus />} onClick={() => navigate('/customers/add')}>Add customer</Button>
      </div>

      <Card padded={false}>
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search customers..." />
          <Filter
            value={status}
            onChange={setStatus}
            options={[
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'pending', label: 'Pending' },
            ]}
          />
        </div>

        {loading ? (
          <div style={{ padding: 24 }}><SkeletonLoader height="40px" count={5} /></div>
        ) : data.items.length === 0 ? (
          <EmptyState title="No customers found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <Table
              columns={columns}
              data={data.items}
              onRowClick={(row) => navigate(`/customers/${row.id}`)}
              renderMobileCard={(row) => (
                <Card className="mobile-row-card">
                  <div className="cell-with-avatar">
                    <Avatar name={row.name} color={row.avatarColor} size="sm" />
                    <div>
                      <div className="cell-primary">{row.name}</div>
                      <div className="text-tertiary cell-secondary">{row.company}</div>
                    </div>
                  </div>
                  <div className="mobile-row-meta">
                    <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>
                    <span>{formatCurrency(row.value)}</span>
                  </div>
                </Card>
              )}
            />
            <div style={{ padding: '0 var(--space-5) var(--space-5)' }}>
              <Pagination page={page} pageSize={8} total={data.total} onPageChange={setPage} />
            </div>
          </>
        )}
      </Card>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Remove customer"
        message={`This will permanently remove ${toDelete?.name} from your workspace.`}
        confirmLabel="Remove"
      />
    </div>
  );
}
