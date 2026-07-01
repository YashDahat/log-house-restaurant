import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';

import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMenuPage from './pages/admin/AdminMenuPage'; // Assuming this file exists as per instructions
import AdminReservationsPage from './pages/admin/AdminReservationsPage'; // Assuming this file exists as per instructions
import AdminOrdersPage from './pages/admin/AdminOrdersPage'; // Assuming this file exists as per instructions
import AdminPromotionsPage from './pages/admin/AdminPromotionsPage'; // Assuming this file exists as per instructions

import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

const queryClient = new QueryClient();

const App: React.FC = () => {
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
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboardPage />} />
                      <Route path="menu" element={<AdminMenuPage />} />
                      <Route path="reservations" element={<AdminReservationsPage />} />
                      <Route path="orders" element={<AdminOrdersPage />} />
                      <Route path="promotions" element={<AdminPromotionsPage />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </QueryClientProvider>
  );
};

export default App;