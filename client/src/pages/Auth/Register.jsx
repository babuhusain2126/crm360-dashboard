import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import './Auth.css';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register: registerUser } = useAuth();
  const { pushToast } = useNotifications();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const password = watch('password');

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      await registerUser(data);
      pushToast({ type: 'success', title: 'Account created', message: 'Welcome to AiCRM.' });
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-subtitle">Start your free AiCRM workspace in minutes.</p>

      {serverError && <div className="auth-alert" style={{ marginBottom: 16 }}>{serverError}</div>}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Full name"
          placeholder="Jane Cooper"
          icon={<FiUser />}
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
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
          placeholder="Create a password"
          icon={<FiLock />}
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          icon={<FiLock />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />

        <Button type="submit" fullWidth loading={loading}>Create account</Button>
      </form>

      <p className="auth-footer-text">
        Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
      </p>
    </>
  );
}
