import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps): React.JSX.Element => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <></>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4A2C2A] text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-[#5A3E36]">
          Log House Restaurant Admin
        </h2>
        <nav className="flex-1 mt-4">
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `py-2 px-4 block transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36]' : 'hover:bg-[#5A3E36]'
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
                  `py-2 px-4 block transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36]' : 'hover:bg-[#5A3E36]'
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
                  `py-2 px-4 block transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36]' : 'hover:bg-[#5A3E36]'
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
                  `py-2 px-4 block transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36]' : 'hover:bg-[#5A3E36]'
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
                  `py-2 px-4 block transition-all duration-200 ${
                    isActive ? 'bg-[#5A3E36]' : 'hover:bg-[#5A3E36]'
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
            className="w-full text-left py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

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
