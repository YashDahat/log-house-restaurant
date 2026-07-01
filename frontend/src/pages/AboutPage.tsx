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
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center md:text-left">Our Culinary Philosophy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Log House Restaurant, our philosophy is simple yet profound: to bring the authentic, rich flavors of North India to your table. We believe that great food starts with great ingredients. That's why we meticulously source the freshest, highest-quality produce, spices, and meats, ensuring every dish is a testament to culinary excellence.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our chefs, with years of experience and a deep understanding of traditional North Indian cooking techniques, craft each meal with passion and precision. From slow-cooked dals to perfectly grilled tandoori delights, we honor age-old recipes while infusing them with a touch of modern artistry. We are committed to creating a warm, inviting dining experience where every guest feels like family, savoring not just a meal, but a journey through India's vibrant culinary heritage.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/150/FFC107/4A2C2A?text=Chef"
                alt="Chef Rahul Sharma"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Chef Rahul Sharma</h3>
              <p className="text-gray-700 leading-relaxed">Head Chef & Culinary Visionary</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/150/FFC107/4A2C2A?text=Owner"
                alt="Owner Anjali Singh"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Anjali Singh</h3>
              <p className="text-gray-700 leading-relaxed">Owner & Hospitality Director</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/150/FFC107/4A2C2A?text=Manager"
                alt="Manager Vikram Patel"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Vikram Patel</h3>
              <p className="text-gray-700 leading-relaxed">Restaurant Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4 text-center md:text-left">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Quality</h3>
              <p className="text-gray-700 leading-relaxed">
                We are unwavering in our commitment to using only the finest ingredients and maintaining the highest standards in food preparation and presentation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Hospitality</h3>
              <p className="text-gray-700 leading-relaxed">
                Every guest is treated with warmth, respect, and personalized attention, ensuring a memorable and comfortable dining experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Authenticity</h3>
              <p className="text-gray-700 leading-relaxed">
                We honor the rich culinary traditions of North India, preserving authentic flavors and techniques passed down through generations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Community</h3>
              <p className="text-gray-700 leading-relaxed">
                We believe in fostering a sense of community, both within our team and with our patrons, creating a welcoming space for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;