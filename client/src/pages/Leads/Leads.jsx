import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Dropdown from '../../components/Dropdown/Dropdown';
import Loader from '../../components/Loader/Loader';
import { leadService, LEAD_STATUSES } from '../../services/leadService';
import { useNotifications } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/formatters';
import { useForm } from 'react-hook-form';
import './Leads.css';

const STATUS_COLOR = {
  New: '#6366f1', Contacted: '#3b6bf6', Qualified: '#f5a524', Proposal: '#f97316', Won: '#17b26a', Lost: '#ef4444',
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { pushToast } = useNotifications();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const load = () => leadService.list().then((data) => { setLeads(data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleDrop = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await leadService.updateStatus(id, status);
  };

  const handleRemove = async (id) => {
    await leadService.remove(id);
    pushToast({ type: 'success', message: 'Lead removed.' });
    load();
  };

  const onCreate = async (data) => {
    await leadService.create({ ...data, value: Number(data.value) });
    pushToast({ type: 'success', message: 'Lead added to pipeline.' });
    setModalOpen(false);
    reset();
    load();
  };

  if (loading) return <Loader label="Loading pipeline..." />;

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h2 className="page-title">Leads pipeline</h2>
          <p className="text-secondary">Drag cards between stages as deals progress.</p>
        </div>
        <Button icon={<FiPlus />} onClick={() => setModalOpen(true)}>Add lead</Button>
      </div>

      <div className="kanban-board">
        {LEAD_STATUSES.map((status) => {
          const columnLeads = leads.filter((l) => l.status === status);
          return (
            <div
              key={status}
              className="kanban-column"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e.dataTransfer.getData('leadId'), status)}
            >
              <div className="kanban-column-header">
                <span className="kanban-dot" style={{ background: STATUS_COLOR[status] }} />
                <span>{status}</span>
                <span className="kanban-count">{columnLeads.length}</span>
              </div>
              <div className="kanban-cards">
                {columnLeads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('leadId', lead.id)}
                    className="kanban-card"
                  >
                    <div className="kanban-card-top">
                      <strong>{lead.name}</strong>
                      <Dropdown
                        trigger={<button className="kanban-menu-btn"><FiMoreVertical /></button>}
                        align="right"
                      >
                        <button className="dropdown-item" onClick={() => handleRemove(lead.id)}><FiTrash2 /> Remove lead</button>
                      </Dropdown>
                    </div>
                    <span className="text-tertiary">{lead.company}</span>
                    <div className="kanban-card-footer">
                      <span className="kanban-value">{formatCurrency(lead.value)}</span>
                      <span className="text-tertiary">{lead.source}</span>
                    </div>
                  </motion.div>
                ))}
                {columnLeads.length === 0 && <div className="kanban-empty">No leads</div>}
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add a new lead">
        <form onSubmit={handleSubmit(onCreate)} className="lead-form">
          <Input label="Contact name" error={errors.name?.message} {...register('name', { required: 'Required' })} />
          <Input label="Company" error={errors.company?.message} {...register('company', { required: 'Required' })} />
          <Input label="Email" type="email" {...register('email')} />
          <Input label="Estimated value" type="number" {...register('value', { required: 'Required' })} />
          <Select label="Source" options={['Website', 'Referral', 'LinkedIn', 'Cold Outreach', 'Webinar', 'Partner'].map((s) => ({ value: s, label: s }))} {...register('source')} />
          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add lead</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
