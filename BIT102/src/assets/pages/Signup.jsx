import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Key, UserPlus } from 'lucide-react';
import authService from '../services/authService';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed

const Signup = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Validate terms agreement
    if (!formData.agreeToTerms) {
      toast.error('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 px-4 flex items-center justify-center transition-all duration-300 ${
      isDark ? "bg-gradient-to-b from-[#050A18] to-[#111827] text-white" : "bg-gradient-to-b from-[#F9FAFB] to-white text-gray-800"
    }`}>
      <div className={`w-full max-w-5xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl ${
        isDark ? "bg-[#0A0E26] border border-gray-700" : "bg-white border border-gray-200"
      }`}>
        {/* Form section */}
        <div className={`w-full md:w-1/2 p-8 ${isDark ? "bg-[#0A0E26]" : "bg-white"} order-2 md:order-1`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-purple-700"}`}>
            CREATE ACCOUNT
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Name
              </label>
              <div className={`relative`}>
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`} />
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name" 
                  className={`pl-10 w-full py-2 px-4 rounded-md border ${
                    isDark 
                      ? "bg-[#111827] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500" 
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors`}
                  required
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                E-Mail
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`} />
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  className={`pl-10 w-full py-2 px-4 rounded-md border ${
                    isDark 
                      ? "bg-[#111827] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500" 
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors`}
                  required
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Password
              </label>
              <div className="relative">
                <Key className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`} />
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password" 
                  className={`pl-10 w-full py-2 px-4 rounded-md border ${
                    isDark 
                      ? "bg-[#111827] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500" 
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors`}
                  minLength="6"
                  required
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Key className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`} />
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password" 
                  className={`pl-10 w-full py-2 px-4 rounded-md border ${
                    isDark 
                      ? "bg-[#111827] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500" 
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors`}
                  minLength="6"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input 
                id="agreeToTerms" 
                name="agreeToTerms" 
                type="checkbox" 
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`h-4 w-4 rounded ${
                  isDark ? "bg-gray-700 border-gray-600 text-purple-600" : "bg-gray-100 border-gray-300 text-purple-600"
                } focus:ring-purple-500`}
                required
              />
              <label 
                htmlFor="agreeToTerms" 
                className={`ml-2 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                I agree to the <Link to="/terms" className={`font-medium ${
                  isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
                }`}>Terms of Service</Link> and <Link to="/privacy" className={`font-medium ${
                  isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
                }`}>Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70"
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className={`mt-6 text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Already have an account? {' '}
            <Link 
              to="/login" 
              className={`font-medium ${
                isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
              }`}
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Image section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden order-1 md:order-2">
          <div className={`absolute inset-0 ${isDark ? "bg-black/50" : "bg-white/30"} flex flex-col items-center justify-center`}>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">gameBazar</h1>
            <p className="text-xl text-white mt-2 drop-shadow-lg">Join our gaming community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;