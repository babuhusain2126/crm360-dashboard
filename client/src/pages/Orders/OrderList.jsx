import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import SearchBar from '../../components/SearchBar/SearchBar';
import Badge from '../../components/Badge/Badge';
import Pagination from '../../components/Pagination/Pagination';
import EmptyState from '../../components/EmptyState/EmptyState';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import StatCard from '../../components/StatCard/StatCard';
import { FiShoppingBag, FiCheckCircle, FiTruck, FiAlertCircle } from 'react-icons/fi';
import useDebounce from '../../hooks/useDebounce';
import { orderService } from '../../services/orderService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import '../Customers/Customers.css';

const PAYMENT_TONE = { Paid: 'success', Pending: 'warning', Refunded: 'neutral', Failed: 'danger' };
const SHIP_TONE = { Delivered: 'success', Shipped: 'info', Processing: 'warning', 'Out for Delivery': 'info', Cancelled: 'danger' };

export default function OrderList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 300);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await orderService.list({ search: debouncedSearch, page, pageSize: 8 });
    setData(result);
    setLoading(false);
  }, [debouncedSearch, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [debouncedSearch]);

  const columns = [
    { key: 'id', header: 'Order ID', render: (row) => <strong>{row.id}</strong> },
    { key: 'customer', header: 'Customer' },
    { key: 'date', header: 'Date', render: (row) => formatDate(row.date) },
    { key: 'items', header: 'Items' },
    { key: 'total', header: 'Total', render: (row) => formatCurrency(row.total) },
    { key: 'paymentStatus', header: 'Payment', render: (row) => <Badge tone={PAYMENT_TONE[row.paymentStatus]}>{row.paymentStatus}</Badge> },
    { key: 'shippingStatus', header: 'Shipping', render: (row) => <Badge tone={SHIP_TONE[row.shippingStatus]}>{row.shippingStatus}</Badge> },
    {
      key: 'actions', header: '', width: 60,
      render: (row) => (
        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
          <button aria-label="View" onClick={() => navigate(`/orders/${row.id}`)}><FiEye /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="page-title">Orders</h2>
          <p className="text-secondary">{data.total} orders total</p>
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatCard label="Total orders" value="3,842" icon={<FiShoppingBag />} accent="primary" />
        <StatCard label="Delivered" value="2,910" icon={<FiCheckCircle />} accent="success" />
        <StatCard label="In transit" value="612" icon={<FiTruck />} accent="info" />
        <StatCard label="Payment issues" value="34" icon={<FiAlertCircle />} accent="warning" />
      </div>

      <Card padded={false}>
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by order or customer..." />
        </div>
        {loading ? (
          <div style={{ padding: 24 }}><SkeletonLoader height="40px" count={5} /></div>
        ) : data.items.length === 0 ? (
          <EmptyState title="No orders found" description="Try a different search term." />
        ) : (
          <>
            <Table columns={columns} data={data.items} onRowClick={(row) => navigate(`/orders/${row.id}`)} />
            <div style={{ padding: '0 var(--space-5) var(--space-5)' }}>
              <Pagination page={page} pageSize={8} total={data.total} onPageChange={setPage} />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
