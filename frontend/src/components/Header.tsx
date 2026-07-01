import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#4A2C2A] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#F2CC8F]">
              Log House Restaurant
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-[#F2CC8F] transition-all duration-200">Home</Link>
            <Link to="/menu" className="hover:text-[#F2CC8F] transition-all duration-200">Menu</Link>
            <Link to="/reservations" className="hover:text-[#F2CC8F] transition-all duration-200">Reservations</Link>
            <Link
              to="/order"
              className="bg-[#F2CC8F] hover:bg-[#E07A5F] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              Order Online
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#F2CC8F] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                // Close icon (X)
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A4C4A] hover:text-[#F2CC8F] transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A4C4A] hover:text-[#F2CC8F] transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <Link to="/reservations" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A4C4A] hover:text-[#F2CC8F] transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>Reservations</Link>
          <Link
            to="/order"
            className="block w-fit mx-3 mt-4 bg-[#F2CC8F] hover:bg-[#E07A5F] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Order Online
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;