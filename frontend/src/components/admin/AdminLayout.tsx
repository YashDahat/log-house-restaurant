import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null; // Or a loading spinner, to prevent flickering before redirect
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-[#4A2C2A] text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-[#5A3E36]">Log House Restaurant Admin</h2>
        <nav className="flex-1 mt-4">
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-[#5A3E36] transition-all duration-200 ${isActive ? 'bg-[#5A3E36] font-semibold' : ''}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/menu"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-[#5A3E36] transition-all duration-200 ${isActive ? 'bg-[#5A3E36] font-semibold' : ''}`
                }
              >
                Menu Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reservations"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-[#5A3E36] transition-all duration-200 ${isActive ? 'bg-[#5A3E36] font-semibold' : ''}`
                }
              >
                Reservations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-[#5A3E36] transition-all duration-200 ${isActive ? 'bg-[#5A3E36] font-semibold' : ''}`
                }
              >
                Order Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/promotions"
                className={({ isActive }) =>
                  `py-2 px-4 block hover:bg-[#5A3E36] transition-all duration-200 ${isActive ? 'bg-[#5A3E36] font-semibold' : ''}`
                }
              >
                Promotions
              </NavLink>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto py-2 px-4 text-left hover:bg-[#5A3E36] transition-all duration-200"
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#FDFBF6] flex flex-col">
        <header className="bg-[#5A3E36] text-white p-4 shadow-md">
          <h1 className="text-xl font-semibold">Admin Portal</h1>
        </header>
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;