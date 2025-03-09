import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User, Mail, Calendar, Edit, ShoppingBag, ShoppingCart, Clock } from 'lucide-react';
import authService from '../services/authService';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import games from '../data/gameData';

const Profile = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Import cart functionality from context
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        toast.error('Unable to fetch user data');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  // Function to get game image from gameData.js
  const getGameImage = (gameId) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.image : "/api/placeholder/400/320";
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen pt-24 flex items-center justify-center ${
        isDark ? "bg-[#050A18] text-white" : "bg-gray-50 text-gray-800"
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const tabContent = {
    profile: (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Name</p>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Email</p>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Member Since</p>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                  {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={() => setActiveTab('edit')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className={`p-6 rounded-lg ${isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
            Account Actions
          </h3>
          <button 
            onClick={handleLogout}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    ),
    orders: (
      <div className={`p-6 rounded-lg ${isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"} shadow-md`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
          Order History
        </h3>
        <div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-40" />
          <p>You haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate('/games')}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            Browse Games
          </button>
        </div>
      </div>
    ),
    cart: (
      <div className={`p-6 rounded-lg ${isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"} shadow-md`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
          Your Cart
        </h3>
        {cartItems.length === 0 ? (
          <div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p>Your cart is empty.</p>
            <button 
              onClick={() => navigate('/games')}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              Browse Games
            </button>
          </div>
        ) : (
          <div>
            <div className="max-h-96 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={getGameImage(item.id)} 
                      alt={item.title} 
                      className="w-12 h-12 object-cover rounded" 
                    />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center space-x-3">
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className={`text-sm text-red-500 hover:text-red-600`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-700">
              <span className="font-bold">Total:</span>
              <span className="font-bold">Rs. {getCartTotal().toFixed(2)}</span>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => navigate('/cart')}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                View Cart
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    ),
    activity: (
      <div className={`p-6 rounded-lg ${isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"} shadow-md`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
          Recent Activity
        </h3>
        <div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          <Clock className="w-12 h-12 mx-auto mb-2 opacity-40" />
          <p>No recent activity.</p>
        </div>
      </div>
    ),
    edit: (
      <div className={`p-6 rounded-lg ${isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"} shadow-md`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
          Edit Profile
        </h3>
        <form className="space-y-4">
          <div>
            <label 
              htmlFor="profileName" 
              className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Name
            </label>
            <input 
              type="text" 
              id="profileName"
              defaultValue={user.name}
              className={`w-full py-2 px-4 rounded-md border ${
                isDark 
                  ? "bg-[#111827] border-gray-700 text-white focus:border-purple-500" 
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors`}
            />
          </div>
          
          <div>
            <label 
              htmlFor="profileEmail" 
              className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Email
            </label>
            <input 
              type="email" 
              id="profileEmail"
              defaultValue={user.email}
              className={`w-full py-2 px-4 rounded-md border ${
                isDark 
                  ? "bg-[#111827] border-gray-700 text-white focus:border-purple-500" 
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors`}
            />
          </div>
          
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button 
              type="button"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 px-4 md:px-8 transition-all duration-300 ${
      isDark ? "bg-[#050A18] text-white" : "bg-gray-50 text-gray-800"
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Profile header */}
        <div className={`relative rounded-xl overflow-hidden mb-6 ${
          isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"
        } shadow-md`}>
          {/* Banner */}
          <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
          
          {/* Profile info */}
          <div className="p-6 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-6 rounded-full border-4 border-white dark:border-[#0A0E26] overflow-hidden bg-white dark:bg-gray-700 w-24 h-24 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500 dark:text-gray-300" />
            </div>
            
            <div className="ml-28">
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                {user.name}
              </h2>
              <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {user.email}
              </p>
            </div>
            
            <div className="absolute top-6 right-6">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="px-6 border-t border-gray-200 dark:border-gray-700 flex overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'orders', label: 'Orders' },
              { id: 'cart', label: 'Cart' },
              { id: 'activity', label: 'Activity' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? isDark 
                      ? "border-purple-500 text-purple-400" 
                      : "border-purple-600 text-purple-600"
                    : isDark
                      ? "border-transparent text-gray-400 hover:text-gray-300" 
                      : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab content */}
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default Profile;