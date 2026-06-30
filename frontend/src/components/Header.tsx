import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#4A2C2A] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#F2CC8F] transition-all duration-200">
              Log House Restaurant
            </Link>
          </div>

          {/* Desktop Nav Links and CTA */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-[#F2CC8F] transition-all duration-200">Home</Link>
              <Link to="/menu" className="hover:text-[#F2CC8F] transition-all duration-200">Menu</Link>
              <Link to="/reservations" className="hover:text-[#F2CC8F] transition-all duration-200">Reservations</Link>
            </div>
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
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#F2CC8F] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
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
      <div className={clsx("md:hidden", { "block": isMenuOpen, "hidden": !isMenuOpen })}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A3C3A] hover:text-[#F2CC8F] transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A3C3A] hover:text-[#F2CC8F] transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/reservations" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6A3C3A] hover:text-[#F2CC8F] transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Reservations</Link>
          <Link
            to="/order"
            className="block w-full text-center mt-4 bg-[#F2CC8F] hover:bg-[#E07A5F] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Order Online
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;