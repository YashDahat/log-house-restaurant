import React from 'react';
import Layout from '@/components/Layout';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero-like Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Contact Log House Restaurant</h1>
          <p className="text-xl text-white mt-4">We'd love to hear from you. Reach out for reservations, inquiries, or feedback.</p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Address</h3>
              <p className="text-gray-700 leading-relaxed">Baner Rd, Baner, Pune, Maharashtra 411069</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Phone</h3>
              <p className="text-gray-700 leading-relaxed">093075 24224</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Opening Hours</h3>
              <p className="text-gray-700 leading-relaxed">Mon-Sun: 12:00 PM - 3:00 PM</p>
              <p className="text-gray-700 leading-relaxed">7:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Send Us a Message</h2>
          <form className="max-w-lg mx-auto mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Subject of your message"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Find Us Here</h2>
          <div className="mt-8 relative" style={{ paddingBottom: '56.25%', height: 0 }}> {/* 16:9 Aspect Ratio */}
            <iframe
              src="https://maps.google.com/maps?q=18.556284,73.765790&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Log House Restaurant Location"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;