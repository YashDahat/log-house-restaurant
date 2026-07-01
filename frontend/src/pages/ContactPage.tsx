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
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Contact Log House Restaurant</h1>
          <p className="text-xl text-white mt-4">We'd love to hear from you. Reach out for reservations, inquiries, or feedback.</p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-gray-700 leading-relaxed">
            <div className="text-center">
              <h3 className="font-semibold text-xl mb-2 text-[#4A2C2A]">Address</h3>
              <p>Baner Rd, Baner, Pune, Maharashtra 411069</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xl mb-2 text-[#4A2C2A]">Phone</h3>
              <p>093075 24224</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xl mb-2 text-[#4A2C2A]">Opening Hours</h3>
              <p>Mon-Sun: 12:00 PM - 3:00 PM</p>
              <p>7:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">Send Us a Message</h2>
          <form className="mt-8 max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E97451] focus:border-[#E97451] sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E97451] focus:border-[#E97451] sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E97451] focus:border-[#E97451] sm:text-sm"
                placeholder="Regarding your inquiry"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E97451] focus:border-[#E97451] sm:text-sm"
                placeholder="Your message..."
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
          <div className="mt-8 relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15129.58980894084!2d73.76321597498703!3d18.55628408254714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTguNTU2Mjg0LDczLjc2NTc5MA!5e0!3m2!1sen!2sin!4v1678912345678!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
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