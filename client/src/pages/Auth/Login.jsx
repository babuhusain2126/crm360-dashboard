import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import './Auth.css';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const { pushToast } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      await login(data);
      pushToast({ type: 'success', title: 'Welcome back', message: 'Signed in successfully.' });
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-subtitle">Sign in to your AiCRM workspace.</p>

      {serverError && <div className="auth-alert" style={{ marginBottom: 16 }}>{serverError}</div>}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="you@company.com"
          icon={<FiMail />}
          error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<FiLock />}
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
        />

        <div className="auth-row-between">
          <label className="auth-checkbox">
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
        </div>

        <Button type="submit" fullWidth loading={loading}>Sign in</Button>
      </form>

      <p className="auth-footer-text">
        Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
      </p>
    </>
  );
}
