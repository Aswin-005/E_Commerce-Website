import React from 'react';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';

const Navbar = ({ onAuthClick }) => {
  return (
    <header className="marketplace-header">
      <div className="container flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="md:hidden"><Menu size={24} /></div>
          <span className="text-xl italic font-bold tracking-tight">FlipStore</span>
          <span className="text-[10px] italic font-medium text-[#ffe500] -mt-2 hidden sm:block">Explore Plus</span>
        </div>

        {/* Search Bar */}
        <div className="search-bar hidden md:flex">
          <input type="text" placeholder="Search for products, brands and more" />
          <Search size={20} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-8 ml-auto font-semibold text-sm">
          <button 
            onClick={onAuthClick}
            className="bg-white text-primary-color px-8 py-1.5 rounded-sm hover:bg-gray-100 transition-colors"
          >
            Login
          </button>
          
          <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-gray-200">
            <span>Become a Seller</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
