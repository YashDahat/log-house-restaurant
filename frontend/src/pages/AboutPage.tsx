import React from 'react';
import Layout from '@/components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero-like Section */}
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
               style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Story at Log House Restaurant</h1>
          <p className="text-xl text-white mt-4">A journey of passion, tradition, and authentic North Indian cuisine.</p>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4">Our Culinary Philosophy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Log House Restaurant, our philosophy is simple: to honor the rich culinary heritage of North India by using only the freshest, highest-quality ingredients. We believe that great food starts with great ingredients, and we meticulously source everything from our spices to our produce to ensure an authentic and unforgettable dining experience.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our chefs, trained in traditional techniques, craft each dish with passion and precision, bringing time-honored recipes to life. We are committed to providing a warm, inviting atmosphere where every guest feels like family, making your visit to Log House Restaurant a truly special occasion.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member Card 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img src="https://via.placeholder.com/150" alt="Chef Rahul Sharma" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Chef Rahul Sharma</h3>
              <p className="text-gray-600">Head Chef & Culinary Visionary</p>
            </div>
            {/* Team Member Card 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img src="https://via.placeholder.com/150" alt="Owner Anjali Singh" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Anjali Singh</h3>
              <p className="text-gray-600">Owner & Hospitality Director</p>
            </div>
            {/* Team Member Card 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img src="https://via.placeholder.com/150" alt="Manager Vikram Patel" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Vikram Patel</h3>
              <p className="text-gray-600">Restaurant Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Quality</h3>
              <p>We are unwavering in our commitment to quality, from the ingredients we select to the service we provide. Every aspect of your dining experience is crafted to exceed expectations.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Hospitality</h3>
              <p>Warmth, attentiveness, and genuine care define our approach to hospitality. We strive to create an inviting atmosphere where every guest feels cherished and at home.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Authenticity</h3>
              <p>Our cuisine is a true reflection of North Indian culinary traditions. We honor age-old recipes and techniques, ensuring an authentic taste that transports you to the heart of India.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Community</h3>
              <p>We believe in fostering a sense of community, both within our restaurant and with our patrons. We aim to be a place where people connect over delicious food and shared experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;