import React from 'react';
import Layout from '@/components/Layout';

function AboutPage(): JSX.Element {
  return (
    <Layout>
      {/* Hero-like Section */}
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')` }}>
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
            At Log House Restaurant, our philosophy is simple: to bring the authentic, rich flavors of North India to your table. We believe that great food starts with the finest ingredients. That's why we meticulously source fresh, high-quality produce, aromatic spices, and premium meats to craft every dish.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our chefs, with years of experience and a deep understanding of traditional North Indian recipes, prepare each meal with passion and precision. We honor age-old cooking techniques while infusing a touch of modern culinary artistry, ensuring every bite is a delightful journey through India's diverse gastronomic landscape. We are committed to providing a warm, inviting dining experience where every guest feels like family.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member Card 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img src="https://via.placeholder.com/150" alt="Chef Rahul Sharma" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Chef Rahul Sharma</h3>
              <p className="text-gray-600">Head Chef & Culinary Visionary</p>
            </div>
            {/* Team Member Card 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img src="https://via.placeholder.com/150" alt="Owner Anjali Singh" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Owner Anjali Singh</h3>
              <p className="text-gray-600">Founder & Hospitality Lead</p>
            </div>
            {/* Team Member Card 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img src="https://via.placeholder.com/150" alt="Manager Vikram Patel" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Manager Vikram Patel</h3>
              <p className="text-gray-600">Restaurant Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4">Our Core Values</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>
              <strong className="text-[#E97451]">Quality:</strong> We are uncompromising in our commitment to using the freshest ingredients and maintaining the highest standards in food preparation.
            </li>
            <li>
              <strong className="text-[#E97451]">Hospitality:</strong> Every guest is treated with warmth, respect, and personalized attention, ensuring a memorable dining experience.
            </li>
            <li>
              <strong className="text-[#E97451]">Authenticity:</strong> We stay true to the traditional flavors and cooking methods of North Indian cuisine, offering a genuine taste of India.
            </li>
            <li>
              <strong className="text-[#E97451]">Community:</strong> We believe in fostering a sense of community, both within our team and with our cherished guests, creating a welcoming environment for all.
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;