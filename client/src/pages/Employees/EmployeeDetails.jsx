import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Avatar from '../../components/Avatar/Avatar';
import Badge from '../../components/Badge/Badge';
import Loader from '../../components/Loader/Loader';
import { employeeService } from '../../services/employeeService';
import { formatDate } from '../../utils/formatters';
import '../Customers/Customers.css';
import './Employees.css';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => { employeeService.getById(id).then(setEmp); }, [id]);

  if (!emp) return <Loader label="Loading employee..." />;

  return (
    <div className="page-stack">
      <Link to="/employees" className="back-link"><FiArrowLeft /> Back to employees</Link>

      <div className="detail-grid">
        <Card className="detail-profile">
          <Avatar name={emp.name} color={emp.avatarColor} size="lg" />
          <h3>{emp.name}</h3>
          <Badge tone={emp.status === 'Active' ? 'success' : 'warning'}>{emp.status}</Badge>
          <div className="detail-info-list">
            <div className="detail-info-row"><span className="text-tertiary"><FiMail /> Email</span><span>{emp.email}</span></div>
            <div className="detail-info-row"><span className="text-tertiary">Department</span><span>{emp.department}</span></div>
            <div className="detail-info-row"><span className="text-tertiary">Role</span><span>{emp.role}</span></div>
            <div className="detail-info-row"><span className="text-tertiary">Joined</span><span>{formatDate(emp.joined)}</span></div>
          </div>
        </Card>

        <Card>
          <h4 style={{ marginBottom: 'var(--space-4)' }}>Performance overview</h4>
          <div className="employee-metrics">
            <div>
              <span className="text-tertiary">Attendance — {emp.attendance}%</span>
              <div className="metric-bar"><div style={{ width: `${emp.attendance}%` }} className="metric-fill" /></div>
            </div>
            <div>
              <span className="text-tertiary">Performance score — {emp.performance}%</span>
              <div className="metric-bar"><div style={{ width: `${emp.performance}%` }} className="metric-fill metric-fill-alt" /></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
