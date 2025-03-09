import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Heart, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get cart context
  const { getCartCount } = useCart() || { getCartCount: () => 0 };
  
  // Get count of items in cart with a fallback
  const cartCount = typeof getCartCount === 'function' ? getCartCount() : 0;

  // Function to determine if a link is active
  const isActiveLink = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) {
      return true;
    }
    return location.pathname === path;
  };

  // Here we need to handle the user authentication properly
  // Since there's no useAuth defined in the imports but it's used in the code
  const handleUserClick = () => {
    // Check if user is logged in
    const isLoggedIn = authService.isAuthenticated();
    
    if (isLoggedIn) {
      // Redirect to profile if logged in
      navigate('/profile');
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  };

  // Navigate to cart page
  const navigateToCart = () => {
    navigate('/cart');
  };

  // Dropdown categories
  const categoryItems = [
    { name: "Action", path: "/categories/action" },
    { name: "Adventure", path: "/categories/adventure" },
    { name: "RPG", path: "/categories/rpg" },
    { name: "Strategy", path: "/categories/strategy" },
    { name: "Sports", path: "/categories/sports" },
  ];

  const handleCategoriesClick = () => {
    navigate('/categories');
  };

  return (
    <nav className={`${isDark ? "bg-[#050A18] text-white" : "bg-white text-gray-800"} px-6 py-4 flex justify-between items-center shadow-md w-full fixed top-0 left-0 z-50 transition-all duration-300`}>
      <div className="flex items-center space-x-6 pl-10">
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-purple-700"}`}>gameBazar</h2>
        <div className="hidden md:flex space-x-6 items-center">
          {[
            { name: "Home", path: "/home" },
            { name: "Games", path: "/games" },
            { 
              name: "Categories", 
              dropdown: true 
            },
            { name: "Contact Us", path: "/contact" },
            { name: "About", path: "/about" }
          ].map((item) => (
            <div 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => item.dropdown && setCategoriesOpen(true)}
              onMouseLeave={() => item.dropdown && setCategoriesOpen(false)}
            >
              {item.dropdown ? (
                <div className="flex items-center">
                  <span 
                    onClick={handleCategoriesClick}
                    className={`text-sm font-medium cursor-pointer ${isDark ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900"}`}
                  >
                    Categories
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 ml-1 cursor-pointer ${isDark ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900"}`} 
                  />
                  
                  {/* Dropdown Menu */}
                  {categoriesOpen && (
                    <div 
                      onMouseEnter={() => setCategoriesOpen(true)}
                      onMouseLeave={() => setCategoriesOpen(false)}
                      className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg 
                      ${isDark ? "bg-[#0A0E26] text-white" : "bg-white text-gray-800"} 
                      ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}
                    >
                      <div className="py-1">
                        {categoryItems.map((category) => (
                          <NavLink
                            key={category.name}
                            to={category.path}
                            className={({ isActive }) => `
                              block px-4 py-2 text-sm 
                              ${isActive 
                                ? "bg-purple-500 text-white" 
                                : isDark 
                                  ? "hover:bg-gray-700 text-gray-300 hover:text-white" 
                                  : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                              }`
                            }
                          >
                            {category.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={
                    isActiveLink(item.path)
                      ? "text-sm font-medium text-purple-500"
                      : `text-sm font-medium transition-all ${
                          isDark 
                            ? "text-gray-400 hover:text-white" 
                            : "text-gray-600 hover:text-gray-900"
                        }`
                  }
                >
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-6 pr-15">
        <Search className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} />
        <button onClick={toggleTheme} className="focus:outline-none" aria-label="Toggle theme">
          {isDark ? 
            <Sun className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" /> : 
            <Moon className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
          }
        </button>
        <Heart className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} />
        <User 
          onClick={handleUserClick}
          className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} 
        />
        <div className="relative" onClick={navigateToCart}>
          <ShoppingCart className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
      <button 
        className="md:hidden focus:outline-none" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? 
          <X className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-800"}`} /> : 
          <Menu className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-800"}`} />
        }
      </button>
      <div className={`absolute top-16 left-0 w-full ${isDark ? "bg-[#050A18] text-white" : "bg-white text-gray-800"} flex flex-col items-center space-y-4 py-4 transition-all ${menuOpen ? "block" : "hidden"} md:hidden shadow-md`}>
        {[
          { name: "Home", path: "/home" },
          { name: "Games", path: "/games" },
          { name: "Categories", path: "/categories" },
          { name: "Contact Us", path: "/contact" },
          { name: "About", path: "/about" }
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={
              isActiveLink(item.path)
                ? "text-sm font-medium text-purple-500"
                : `text-sm font-medium ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
        <div className="flex space-x-6">
          <Search className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} />
          <button onClick={toggleTheme} className="focus:outline-none" aria-label="Toggle theme">
            {isDark ? 
              <Sun className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" /> : 
              <Moon className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
            }
          </button>
          <Heart className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} />
          <button onClick={handleUserClick} className="focus:outline-none">
            <User className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} />
          </button>
          <div className="relative" onClick={navigateToCart}>
            <ShoppingCart className={`w-5 h-5 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer`} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}