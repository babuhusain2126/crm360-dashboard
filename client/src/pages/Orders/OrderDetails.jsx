import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Loader from '../../components/Loader/Loader';
import { orderService } from '../../services/orderService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { classNames } from '../../utils/formatters';
import '../Customers/Customers.css';
import './Orders.css';

const PAYMENT_TONE = { Paid: 'success', Pending: 'warning', Refunded: 'neutral', Failed: 'danger' };

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => { orderService.getById(id).then(setOrder); }, [id]);

  if (!order) return <Loader label="Loading order..." />;

  return (
    <div className="page-stack">
      <Link to="/orders" className="back-link"><FiArrowLeft /> Back to orders</Link>

      <div className="detail-grid">
        <Card>
          <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
            <div>
              <h3>{order.id}</h3>
              <p className="text-tertiary">Placed on {formatDate(order.date)}</p>
            </div>
            <Badge tone={PAYMENT_TONE[order.paymentStatus]}>{order.paymentStatus}</Badge>
          </div>

          <div className="invoice-row"><span>Customer</span><strong>{order.customer}</strong></div>
          <div className="invoice-row"><span>Email</span><span>{order.email}</span></div>
          <div className="invoice-row"><span>Items</span><span>{order.items}</span></div>
          <div className="invoice-row"><span>Shipping status</span><span>{order.shippingStatus}</span></div>
          <div className="invoice-row invoice-total"><span>Total</span><strong>{formatCurrency(order.total)}</strong></div>
        </Card>

        <Card>
          <h4 style={{ marginBottom: 'var(--space-5)' }}>Order timeline</h4>
          <div className="order-timeline">
            {order.timeline.map((step, i) => (
              <div key={i} className={classNames('timeline-step', step.done && 'timeline-step-done')}>
                <span className="timeline-marker">{step.done && <FiCheck />}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p className="text-tertiary">{formatDate(step.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
