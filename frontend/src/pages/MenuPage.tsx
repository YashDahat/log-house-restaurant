import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useMenu, useMenuCategories } from '../hooks/useMenu';
import { useCart } from '../context/CartContext';
import clsx from 'clsx'; // For conditional class merging

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useMenuCategories();

  const {
    data: menuItems,
    isLoading: isLoadingMenuItems,
    error: errorMenuItems,
  } = useMenu(selectedCategory);

  const { addItem } = useCart();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-[#4A2C2A] text-white py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Log House Restaurant: Our Delicious North Indian Menu</h1>
          <p className="text-xl text-center text-white max-w-3xl mx-auto">Explore a rich selection of authentic North Indian dishes, crafted with passion and tradition. Value, quality, and taste in every bite.</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {isLoadingCategories && <p className="text-gray-700">Loading categories...</p>}
          {errorCategories && <p className="text-red-500">Error loading categories: {errorCategories.message}</p>}
          {!isLoadingCategories && !errorCategories && (
            <>
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={clsx(
                  "font-semibold rounded-full px-6 py-2 transition-all duration-200",
                  {
                    "bg-[#D2691E] hover:bg-[#A0522D] text-white": selectedCategory === undefined,
                    "bg-gray-200 hover:bg-gray-300 text-gray-800": selectedCategory !== undefined,
                  }
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={clsx(
                    "font-semibold rounded-full px-6 py-2 transition-all duration-200",
                    {
                      "bg-[#D2691E] hover:bg-[#A0522D] text-white": selectedCategory === category.name,
                      "bg-gray-200 hover:bg-gray-300 text-gray-800": selectedCategory !== category.name,
                    }
                  )}
                >
                  {category.name}
                </button>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Menu Items Grid Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoadingMenuItems && <p className="text-center text-gray-700">Loading menu items...</p>}
          {errorMenuItems && <p className="text-red-500 text-center">Error loading menu items: {errorMenuItems.message}</p>}
          {!isLoadingMenuItems && !errorMenuItems && menuItems.length === 0 && (
            <div className="text-center text-gray-600 py-8">
              <p>No menu items found for this category.</p>
            </div>
          )}
          {!isLoadingMenuItems && !errorMenuItems && menuItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">{item.name}</h3>
                  <p className="text-gray-700 text-sm mb-3 flex-grow">{item.description}</p>
                  <p className="text-lg font-bold text-[#D2691E] mb-4">₹{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="bg-[#D2691E] hover:bg-[#A0522D] text-white font-semibold rounded-full px-6 py-2 transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;