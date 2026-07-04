import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import PublicRoute from '../components/ProtectedRoute/PublicRoute';
import Loader from '../components/Loader/Loader';

const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'));

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const CustomerList = lazy(() => import('../pages/Customers/CustomerList'));
const CustomerDetails = lazy(() => import('../pages/Customers/CustomerDetails'));
const CustomerForm = lazy(() => import('../pages/Customers/CustomerForm'));
const Leads = lazy(() => import('../pages/Leads/Leads'));
const Products = lazy(() => import('../pages/Products/Products'));
const OrderList = lazy(() => import('../pages/Orders/OrderList'));
const OrderDetails = lazy(() => import('../pages/Orders/OrderDetails'));
const Employees = lazy(() => import('../pages/Employees/Employees'));
const EmployeeDetails = lazy(() => import('../pages/Employees/EmployeeDetails'));
const Reports = lazy(() => import('../pages/Reports/Reports'));
const AIAssistant = lazy(() => import('../pages/AIAssistant/AIAssistant'));
const Notifications = lazy(() => import('../pages/Notifications/Notifications'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader label="Loading..." />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/add" element={<CustomerForm />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/customers/:id/edit" element={<CustomerForm />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
