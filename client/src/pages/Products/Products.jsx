import { useEffect, useState, useCallback } from 'react';
import { FiBox, FiSearch } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filter from '../../components/Filter/Filter';
import Badge from '../../components/Badge/Badge';
import Pagination from '../../components/Pagination/Pagination';
import EmptyState from '../../components/EmptyState/EmptyState';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import useDebounce from '../../hooks/useDebounce';
import { productService, CATEGORIES } from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';
import './Products.css';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 300);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await productService.list({ search: debouncedSearch, category, page, pageSize: 8 });
    setData(result);
    setLoading(false);
  }, [debouncedSearch, category, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [debouncedSearch, category]);

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="page-title">Products & inventory</h2>
          <p className="text-secondary">{data.total} products across your catalog</p>
        </div>
      </div>

      <div className="table-toolbar" style={{ padding: 0 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
        <Filter
          value={category}
          onChange={setCategory}
          options={[{ value: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
        />
      </div>

      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => <Card key={i}><SkeletonLoader height="140px" /></Card>)}
        </div>
      ) : data.items.length === 0 ? (
        <EmptyState icon={<FiSearch />} title="No products found" description="Try a different search term or category." />
      ) : (
        <>
          <div className="product-grid">
            {data.items.map((p) => (
              <Card key={p.id} hoverable className="product-card">
                <div className="product-thumb"><FiBox size={28} /></div>
                <div className="product-body">
                  <div className="product-top">
                    <strong>{p.name}</strong>
                    <Badge tone={p.status === 'Low Stock' ? 'warning' : 'success'}>{p.status}</Badge>
                  </div>
                  <span className="text-tertiary">{p.category} · {p.sku}</span>
                  <div className="product-footer">
                    <span className="product-price">{formatCurrency(p.price)}</span>
                    <span className="text-tertiary">{p.stock} in stock</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Pagination page={page} pageSize={8} total={data.total} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
