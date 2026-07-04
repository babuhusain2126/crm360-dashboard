import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { customerService } from '../../services/customerService';
import { useNotifications } from '../../context/NotificationContext';
import './Customers.css';

export default function CustomerForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { pushToast } = useNotifications();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      customerService.getById(id).then((data) => {
        reset(data);
        setLoading(false);
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (isEdit) {
        await customerService.update(id, data);
        pushToast({ type: 'success', message: 'Customer updated successfully.' });
      } else {
        await customerService.create(data);
        pushToast({ type: 'success', message: 'Customer added successfully.' });
      }
      navigate('/customers');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Loading customer..." />;

  return (
    <div className="page-stack">
      <Link to="/customers" className="back-link"><FiArrowLeft /> Back to customers</Link>
      <h2 className="page-title">{isEdit ? 'Edit customer' : 'Add customer'}</h2>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-grid">
            <Input label="Full name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
            <Input label="Company" error={errors.company?.message} {...register('company', { required: 'Company is required' })} />
            <Input label="Email address" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
            <Input label="Phone number" error={errors.phone?.message} {...register('phone', { required: 'Phone is required' })} />
            <Input label="Location" {...register('location')} />
            <Select
              label="Status"
              options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'pending', label: 'Pending' }]}
              {...register('status')}
            />
            <Select
              label="Tier"
              options={[{ value: 'Standard', label: 'Standard' }, { value: 'Gold', label: 'Gold' }, { value: 'Platinum', label: 'Platinum' }]}
              {...register('tier')}
            />
            <Input label="Lifetime value" type="number" {...register('value', { valueAsNumber: true })} />
          </div>

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => navigate('/customers')}>Cancel</Button>
            <Button type="submit" loading={saving}>{isEdit ? 'Save changes' : 'Add customer'}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
