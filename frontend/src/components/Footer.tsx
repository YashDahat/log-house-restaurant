import React from 'react';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-[#4A2C2A] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Log House Restaurant</h3>
          <p className="text-gray-300 mb-2">Baner Rd, Baner, Pune, Maharashtra 411069</p>
          <p className="text-gray-300">Phone: 093075 24224</p>
        </div>
    
        {/* Column 2: Opening Hours */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
          <p className="text-gray-300">Mon-Fri: 11 AM - 10 PM</p>
          <p className="text-gray-300">Sat-Sun: 11 AM - 11 PM</p>
        </div>
    
        {/* Column 3: Location Map */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.16453664326!2d73.7723250749457!3d18.55628408255953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf38d58a3641%3A0x8f7f2b9b7f2b9b7f!2sLog%20House%20Restaurant!5e0!3m2!1sen!2sin!4v1678912345678!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Log House Restaurant Location"
          ></iframe>
        </div>
      </div>
    
      {/* Copyright Notice */}
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>© 2024 Log House Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}
