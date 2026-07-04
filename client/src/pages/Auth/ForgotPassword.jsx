import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { authService } from '../../services/authService';
import './Auth.css';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setSent(true);
    } catch (err) {
      setServerError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="auth-title">Reset your password</h1>
      <p className="auth-subtitle">Enter your email and we'll send you a link to reset your password.</p>

      {sent ? (
        <div className="auth-success">Check your inbox — a reset link is on its way.</div>
      ) : (
        <>
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
            <Button type="submit" fullWidth loading={loading}>Send reset link</Button>
          </form>
        </>
      )}

      <p className="auth-footer-text">
        Remembered your password? <Link to="/login" className="auth-link">Back to sign in</Link>
      </p>
    </>
  );
}
