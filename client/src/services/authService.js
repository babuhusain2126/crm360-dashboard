import { mockDelay } from '../utils/mockDelay';

const MOCK_USER = {
  id: 'USR-1',
  name: 'Babu Husain S',
  email: 'babu@aicrm.com',
  role: 'Administrator',
  avatarColor: '#3b6bf6',
};

export const authService = {
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }
    const token = 'mock-jwt-token';
    await mockDelay(null, 600);
    return { token, user: { ...MOCK_USER, email } };
  },

  async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('All fields are required.');
    }
    await mockDelay(null, 700);
    return { token: 'mock-jwt-token', user: { ...MOCK_USER, name, email } };
  },

  async forgotPassword(email) {
    if (!email) throw new Error('Email is required.');
    await mockDelay(null, 600);
    return { message: 'Password reset link sent.' };
  },

  async resetPassword({ password }) {
    if (!password) throw new Error('Password is required.');
    await mockDelay(null, 600);
    return { message: 'Password updated successfully.' };
  },

  async getCurrentUser() {
    await mockDelay(null, 200);
    return MOCK_USER;
  },
};
