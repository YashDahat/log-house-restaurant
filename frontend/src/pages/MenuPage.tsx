import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useMenu, useMenuCategories } from '@/hooks/useMenu';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types/menu'; // Import MenuItem for type safety in addItem

function MenuPage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // '' represents 'All'

  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useMenuCategories();
  const { data: menuItems, isLoading: isLoadingMenuItems, error: menuItemsError } = useMenu(
    selectedCategory === '' ? undefined : selectedCategory
  );
  const { addItem } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative bg-[#4A2C2A] text-white py-20 md:py-32 overflow-hidden"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Log House Restaurant: Our Delicious North Indian Menu
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Explore a rich selection of authentic North Indian dishes, crafted with passion and tradition. Value, quality, and taste in every bite.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory('')}
            className={`font-semibold rounded-full px-6 py-2 transition-all duration-200 ${
              selectedCategory === ''
                ? 'bg-[#D2691E] hover:bg-[#A0522D] text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            All
          </button>
          {isLoadingCategories && <p className="text-gray-700">Loading categories...</p>}
          {categoriesError && <p className="text-red-500">Error loading categories: {categoriesError.message}</p>}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`font-semibold rounded-full px-6 py-2 transition-all duration-200 ${
                selectedCategory === category.name
                  ? 'bg-[#D2691E] hover:bg-[#A0522D] text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Items Grid Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoadingMenuItems && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 w-2/3 rounded-full"></div>
                </div>
              ))}
            </div>
          )}
          {menuItemsError && (
            <p className="text-red-500 text-center text-lg">Error loading menu items: {menuItemsError.message}</p>
          )}
          {!isLoadingMenuItems && !menuItemsError && menuItems.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600 text-xl">No menu items found for this category.</p>
            </div>
          )}
          {!isLoadingMenuItems && !menuItemsError && menuItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#4A2C2A] mb-2">{item.name}</h3>
                  <p className="text-gray-700 text-sm mb-3 flex-grow">{item.description}</p>
                  <p className="text-lg font-bold text-[#D2691E] mb-4">₹{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
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
}

export default MenuPage;