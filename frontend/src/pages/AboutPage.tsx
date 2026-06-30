import React from 'react';
import Layout from '@/components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero-like Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Our Story at Log House Restaurant
          </h1>
          <p className="text-xl text-white mt-4">
            A journey of passion, tradition, and authentic North Indian cuisine.
          </p>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">
            Our Culinary Philosophy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-center">
            At Log House Restaurant, our philosophy is simple: honor tradition, embrace quality, and create unforgettable dining experiences. We believe that true North Indian cuisine is a symphony of fresh, hand-picked ingredients, time-honored recipes, and the passion of our chefs.
          </p>
          <p className="text-gray-700 leading-relaxed text-center">
            Every dish is a testament to our commitment to authenticity, prepared with meticulous care to bring out the rich, complex flavors that define this incredible culinary heritage. We strive to provide a warm, inviting atmosphere where every guest feels like family.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member Card 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/150/FFC107/4A2C2A?text=Chef"
                alt="Chef Rahul Sharma"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Chef Rahul Sharma</h3>
              <p className="text-gray-600">Head Chef & Culinary Visionary</p>
            </div>

            {/* Team Member Card 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/150/FFC107/4A2C2A?text=Owner"
                alt="Owner Anjali Singh"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Owner Anjali Singh</h3>
              <p className="text-gray-600">Founder & Hospitality Lead</p>
            </div>

            {/* Team Member Card 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/150/FFC107/4A2C2A?text=Manager"
                alt="Manager Vikram Patel"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Manager Vikram Patel</h3>
              <p className="text-gray-600">Restaurant Manager & Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Quality</h3>
              <p>We are unwavering in our commitment to sourcing the freshest, highest-quality ingredients, ensuring every dish meets our exacting standards.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Hospitality</h3>
              <p>We believe in creating a warm, welcoming environment where every guest feels valued and experiences exceptional service.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Authenticity</h3>
              <p>We proudly uphold the rich traditions of North Indian cuisine, preparing dishes with authentic recipes and techniques passed down through generations.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Community</h3>
              <p>We are dedicated to being a positive part of our community, fostering connections and sharing the joy of food with everyone.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;