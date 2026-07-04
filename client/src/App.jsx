import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { LoadingProvider } from './context/LoadingContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LoadingProvider>
          <AuthProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
