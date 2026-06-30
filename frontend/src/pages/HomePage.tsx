import React from 'react';
import Layout from '@/components/Layout';
import PromotionBanner from '@/components/PromotionBanner';
import { Link } from 'react-router-dom';

function HomePage(): JSX.Element {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Log House Restaurant: Authentic North Indian Flavors
          </h1>
          <p className="text-xl text-white mt-4">
            Experience the rich culinary heritage of North India, crafted with passion and tradition. Value for money, unforgettable taste.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/menu" className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200">
              View Menu
            </Link>
            <Link to="/reservations" className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200">
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
            {/* Placeholder Dish Card 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <img src="https://via.placeholder.com/300x200?text=Butter+Chicken" alt="Butter Chicken" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Butter Chicken</h3>
              <p className="text-gray-700 leading-relaxed">A rich and creamy classic, tender chicken cooked in a tomato-based sauce with butter and cream.</p>
            </div>
            {/* Placeholder Dish Card 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <img src="https://via.placeholder.com/300x200?text=Dal+Makhani" alt="Dal Makhani" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Dal Makhani</h3>
              <p className="text-gray-700 leading-relaxed">Slow-cooked black lentils simmered with butter, cream, and aromatic spices.</p>
            </div>
            {/* Placeholder Dish Card 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <img src="https://via.placeholder.com/300x200?text=Paneer+Tikka" alt="Paneer Tikka" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Paneer Tikka</h3>
              <p className="text-gray-700 leading-relaxed">Marinated paneer cubes grilled to perfection, served with mint chutney.</p>
            </div>
            {/* Placeholder Dish Card 4 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <img src="https://via.placeholder.com/300x200?text=Hyderabadi+Biryani" alt="Hyderabadi Biryani" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">Hyderabadi Biryani</h3>
              <p className="text-gray-700 leading-relaxed">Fragrant basmati rice cooked with tender meat or vegetables and aromatic spices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Snippet Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            At Log House Restaurant, we are passionate about bringing the authentic flavors of North India to your table. Our journey began with a simple vision: to create a dining experience that celebrates rich culinary traditions, uses the freshest ingredients, and offers a warm, inviting ambiance. Every dish is a testament to our heritage and dedication to taste.
          </p>
          <Link to="/about" className="inline-block text-[#E97451] hover:text-[#D2691E] font-semibold transition-all duration-200 border-b-2 border-[#E97451] hover:border-[#D2691E] pb-1">
            Learn More About Us
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
            {/* Testimonial Card 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <p className="italic text-gray-700 mb-4">"Absolutely delightful! The butter chicken was heavenly, and the service was impeccable. A true taste of India."</p>
              <p className="font-semibold text-[#4A2C2A]">- Priya S.</p>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <p className="italic text-gray-700 mb-4">"Log House is our go-to for authentic North Indian food. Every dish is bursting with flavor, and the ambiance is perfect for family dinners."</p>
              <p className="font-semibold text-[#4A2C2A]">- Rahul K.</p>
            </div>
            {/* Testimonial Card 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <p className="italic text-gray-700 mb-4">"Highly recommend! The biryani was fragrant and perfectly spiced. A fantastic culinary experience from start to finish."</p>
              <p className="font-semibold text-[#4A2C2A]">- Anjali M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4A2C2A] mb-4">
            Ready to Indulge?
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Book your table or order online for an unforgettable North Indian dining experience.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/reservations" className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200">
              Book a Table
            </Link>
            <Link to="/menu" className="bg-[#FFC107] hover:bg-[#E97451] text-[#4A2C2A] font-semibold rounded-full px-8 py-3 transition-all duration-200">
              Order Online
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;