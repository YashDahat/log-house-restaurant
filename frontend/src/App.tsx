import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';

// Admin Pages and Layout
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminReservationsPage from './pages/admin/AdminReservationsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminPromotionsPage from './pages/admin/AdminPromotionsPage';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Protected Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboardPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/menu" element={<ProtectedRoute><AdminLayout><AdminMenuPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/reservations" element={<ProtectedRoute><AdminLayout><AdminReservationsPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminLayout><AdminOrdersPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/promotions" element={<ProtectedRoute><AdminLayout><AdminPromotionsPage /></AdminLayout></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;