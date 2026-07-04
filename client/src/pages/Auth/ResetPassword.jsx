import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { authService } from '../../services/authService';
import { useNotifications } from '../../context/NotificationContext';
import './Auth.css';

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { pushToast } = useNotifications();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      await authService.resetPassword(data);
      pushToast({ type: 'success', title: 'Password updated', message: 'You can now sign in.' });
      navigate('/login');
    } catch (err) {
      setServerError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="auth-title">Set a new password</h1>
      <p className="auth-subtitle">Choose a strong password you haven't used before.</p>

      {serverError && <div className="auth-alert" style={{ marginBottom: 16 }}>{serverError}</div>}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="New password"
          type="password"
          placeholder="Enter a new password"
          icon={<FiLock />}
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
        />
        <Input
          label="Confirm new password"
          type="password"
          placeholder="Re-enter your password"
          icon={<FiLock />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />
        <Button type="submit" fullWidth loading={loading}>Update password</Button>
      </form>

      <p className="auth-footer-text">
        <Link to="/login" className="auth-link">Back to sign in</Link>
      </p>
    </>
  );
}
