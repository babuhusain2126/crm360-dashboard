import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiEdit2, FiArrowLeft } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Avatar from '../../components/Avatar/Avatar';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import Tabs from '../../components/Tabs/Tabs';
import Loader from '../../components/Loader/Loader';
import { customerService } from '../../services/customerService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './Customers.css';

const STATUS_TONE = { active: 'success', inactive: 'neutral', pending: 'warning' };

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    customerService.getById(id).then(setCustomer);
  }, [id]);

  if (!customer) return <Loader label="Loading customer..." />;

  return (
    <div className="page-stack">
      <Link to="/customers" className="back-link"><FiArrowLeft /> Back to customers</Link>

      <div className="detail-grid">
        <Card className="detail-profile">
          <Avatar name={customer.name} color={customer.avatarColor} size="lg" />
          <h3>{customer.name}</h3>
          <Badge tone={STATUS_TONE[customer.status]}>{customer.status}</Badge>
          <Button icon={<FiEdit2 />} variant="secondary" size="sm" onClick={() => navigate(`/customers/${id}/edit`)} style={{ marginTop: 12 }}>
            Edit customer
          </Button>

          <div className="detail-info-list">
            <div className="detail-info-row"><span className="text-tertiary"><FiMail /> Email</span><span>{customer.email}</span></div>
            <div className="detail-info-row"><span className="text-tertiary"><FiPhone /> Phone</span><span>{customer.phone}</span></div>
            <div className="detail-info-row"><span className="text-tertiary"><FiMapPin /> Location</span><span>{customer.location}</span></div>
            <div className="detail-info-row"><span className="text-tertiary">Company</span><span>{customer.company}</span></div>
            <div className="detail-info-row"><span className="text-tertiary">Tier</span><span>{customer.tier}</span></div>
            <div className="detail-info-row"><span className="text-tertiary">Lifetime value</span><strong>{formatCurrency(customer.value)}</strong></div>
            <div className="detail-info-row"><span className="text-tertiary">Last contact</span><span>{formatDate(customer.lastContact)}</span></div>
          </div>
        </Card>

        <Card>
          <Tabs
            tabs={[
              { label: 'Overview', content: <p className="text-secondary">{customer.notes}</p> },
              {
                label: 'Activity',
                content: (
                  <ul className="activity-list">
                    <li><span className="activity-dot" /><div><p>Renewed annual plan</p><span className="text-tertiary">2 weeks ago</span></div></li>
                    <li><span className="activity-dot activity-order" /><div><p>Placed order ORD-9021</p><span className="text-tertiary">1 month ago</span></div></li>
                    <li><span className="activity-dot activity-deal" /><div><p>Upgraded to {customer.tier} tier</p><span className="text-tertiary">3 months ago</span></div></li>
                  </ul>
                ),
              },
              { label: 'Notes', content: <p className="text-secondary">{customer.notes}</p> },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
