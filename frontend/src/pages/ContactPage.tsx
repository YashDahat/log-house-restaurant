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
        <div className="text-center z-10 max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Contact Log House Restaurant</h1>
          <p className="text-xl text-white mt-4">We'd love to hear from you. Reach out for reservations, inquiries, or feedback.</p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-8">
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Address</h3>
              <p className="text-gray-700 leading-relaxed">Baner Rd, Baner, Pune, Maharashtra 411069</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Phone</h3>
              <p className="text-gray-700 leading-relaxed">093075 24224</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Opening Hours</h3>
              <p className="text-gray-700 leading-relaxed">Mon-Sun: 12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Send Us a Message</h2>
          <form className="mt-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Subject of your message"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea
                id="message"
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E97451]"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Find Us Here</h2>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.016301297926!2d73.7632150749871!3d18.55628498253818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf19b33a76e7%3A0x867a5b3a4a7b7a6!2sBaner%20Rd%2C%20Baner%2C%20Pune%2C%20Maharashtra%20411069!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
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