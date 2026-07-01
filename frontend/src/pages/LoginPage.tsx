import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Layout from '@/components/Layout';

const LoginPage: React.FC = () => {
  const { login, token, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      // Redirection handled by useEffect if login is successful and token is set
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome, Administrator</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#F9A825] focus:border-transparent outline-none w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#F9A825] focus:border-transparent outline-none w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}
              <button
                type="submit"
                className="bg-[#F9A825] hover:bg-[#E67E22] text-white font-semibold rounded-md px-6 py-3 transition-all duration-200 w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login to Log House Admin'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;