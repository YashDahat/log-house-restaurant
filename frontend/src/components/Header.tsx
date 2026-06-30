import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#4A2C2A] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#F2CC8F]">
              Log House Restaurant
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#F2CC8F] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A4C4A] w-full text-center" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A4C4A] w-full text-center" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/reservations" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A4C4A] w-full text-center" onClick={() => setIsMenuOpen(false)}>Reservations</Link>
          <Link
            to="/order"
            className="mt-4 bg-[#F2CC8F] hover:bg-[#E07A5F] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200 text-center w-fit"
            onClick={() => setIsMenuOpen(false)}
          >
            Order Online
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;