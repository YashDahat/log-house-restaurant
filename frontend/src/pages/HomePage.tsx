import React from 'react';
import Layout from '@/components/Layout';
import PromotionBanner from '@/components/PromotionBanner';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Log House Restaurant: Authentic North Indian Flavors
          </h1>
          <p className="text-xl text-white mt-4">
            Experience the rich culinary heritage of North India, crafted with passion and tradition. Value for money, unforgettable taste.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/menu"
              className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              View Menu
            </Link>
            <Link
              to="/reservations"
              className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Promotion Banner Section */}
      <PromotionBanner />

      {/* Featured Dishes Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-8 text-center">
            Our Signature Dishes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/300x200?text=Butter+Chicken"
                alt="Butter Chicken"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Butter Chicken</h3>
              <p className="text-gray-700 leading-relaxed">
                A rich and creamy classic, tender chicken cooked in a tomato and butter gravy.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/300x200?text=Dal+Makhani"
                alt="Dal Makhani"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Dal Makhani</h3>
              <p className="text-gray-700 leading-relaxed">
                Slow-cooked black lentils simmered with butter, cream, and aromatic spices.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center">
              <img
                src="https://via.placeholder.com/300x200?text=Paneer+Tikka"
                alt="Paneer Tikka"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Paneer Tikka</h3>
              <p className="text-gray-700 leading-relaxed">
                Marinated paneer cubes grilled to perfection, a delightful vegetarian starter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Snippet Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
            Log House Restaurant brings the authentic flavors of North India to your table. We are
            dedicated to preserving traditional recipes, using only the freshest ingredients, and
            providing a warm, inviting atmosphere for all our guests. Our culinary journey is a
            tribute to the rich heritage of Indian cuisine.
          </p>
          <Link
            to="/about"
            className="inline-block text-[#E97451] hover:text-[#D2691E] font-semibold transition-all duration-200"
          >
            Learn More About Us &rarr;
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-8 text-center">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <p className="italic text-gray-700 leading-relaxed mb-4">
                "Absolutely delightful! The butter chicken was heavenly, and the service was impeccable. A truly authentic experience."
              </p>
              <p className="font-semibold text-[#4A2C2A]">- Priya S.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <p className="italic text-gray-700 leading-relaxed mb-4">
                "Every dish felt like a journey through India. The flavors were rich and perfectly balanced. Highly recommend the Dal Makhani!"
              </p>
              <p className="font-semibold text-[#4A2C2A]">- Rohan M.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <p className="italic text-gray-700 leading-relaxed mb-4">
                "A fantastic dining spot! The ambiance is lovely, and the food is consistently excellent. My go-to for Indian cuisine."
              </p>
              <p className="font-semibold text-[#4A2C2A]">- Anjali K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4">Ready to Indulge?</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Book your table or order online for an unforgettable North Indian dining experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/reservations"
              className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              Book a Table
            </Link>
            <Link
              to="/menu"
              className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;