import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner, but null is fine for immediate redirect
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-[#4A2C2A] text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-[#5A3E36]">
          Log House Restaurant Admin
        </h2>
        <nav className="flex-1 mt-4">
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `block py-2 px-4 hover:bg-[#5A3E36] transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36] font-semibold' : ''
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/menu"
                className={({ isActive }) =>
                  `block py-2 px-4 hover:bg-[#5A3E36] transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36] font-semibold' : ''
                  }`
                }
              >
                Menu Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reservations"
                className={({ isActive }) =>
                  `block py-2 px-4 hover:bg-[#5A3E36] transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36] font-semibold' : ''
                  }`
                }
              >
                Reservations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `block py-2 px-4 hover:bg-[#5A3E36] transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36] font-semibold' : ''
                  }`
                }
              >
                Order Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/promotions"
                className={({ isActive }) =>
                  `block py-2 px-4 hover:bg-[#5A3E36] transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36] font-semibold' : ''
                  }`
                }
              >
                Promotions
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-[#5A3E36]">
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#FDFBF6] flex flex-col">
        <header className="bg-[#5A3E36] text-white p-4 shadow-md">
          <h1 className="text-xl font-semibold">Admin Portal</h1>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;