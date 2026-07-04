import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filter from '../../components/Filter/Filter';
import Avatar from '../../components/Avatar/Avatar';
import Badge from '../../components/Badge/Badge';
import EmptyState from '../../components/EmptyState/EmptyState';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import useDebounce from '../../hooks/useDebounce';
import { employeeService, DEPARTMENTS } from '../../services/employeeService';
import '../Customers/Customers.css';
import './Employees.css';

export default function Employees() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 300);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await employeeService.list({ search: debouncedSearch, department });
    setEmployees(data);
    setLoading(false);
  }, [debouncedSearch, department]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="page-title">Employees</h2>
          <p className="text-secondary">{employees.length} team members</p>
        </div>
      </div>

      <div className="table-toolbar" style={{ padding: 0 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search employees..." />
        <Filter
          value={department}
          onChange={setDepartment}
          options={[{ value: 'all', label: 'All teams' }, ...DEPARTMENTS.map((d) => ({ value: d, label: d }))]}
        />
      </div>

      {loading ? (
        <div className="employee-grid">
          {Array.from({ length: 6 }).map((_, i) => <Card key={i}><SkeletonLoader height="120px" /></Card>)}
        </div>
      ) : employees.length === 0 ? (
        <EmptyState title="No employees found" description="Try a different search or department." />
      ) : (
        <div className="employee-grid">
          {employees.map((emp) => (
            <Card key={emp.id} hoverable className="employee-card" onClick={() => navigate(`/employees/${emp.id}`)}>
              <div className="employee-top">
                <Avatar name={emp.name} color={emp.avatarColor} size="lg" />
                <Badge tone={emp.status === 'Active' ? 'success' : 'warning'}>{emp.status}</Badge>
              </div>
              <strong>{emp.name}</strong>
              <span className="text-tertiary">{emp.role} · {emp.department}</span>
              <div className="employee-metrics">
                <div>
                  <span className="text-tertiary">Attendance</span>
                  <div className="metric-bar"><div style={{ width: `${emp.attendance}%` }} className="metric-fill" /></div>
                </div>
                <div>
                  <span className="text-tertiary">Performance</span>
                  <div className="metric-bar"><div style={{ width: `${emp.performance}%` }} className="metric-fill metric-fill-alt" /></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
