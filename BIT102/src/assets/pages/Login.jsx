import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Mail, LogIn } from 'lucide-react';
import authService from '../services/authService';
import toast from 'react-hot-toast'; 

const Login = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    setIsLoading(true);
    
    try {
      await authService.login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
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
        {/* Image section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
          <div className={`absolute inset-0 ${isDark ? "bg-black/50" : "bg-white/30"} flex items-center justify-center`}>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">gameBazar</h1>
          </div>
        </div>

        {/* Form section */}
        <div className={`w-full md:w-1/2 p-8 ${isDark ? "bg-[#0A0E26]" : "bg-white"}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-purple-700"}`}>
            LOGIN
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password" 
                className={`w-full py-2 px-4 rounded-md border ${
                  isDark 
                    ? "bg-[#111827] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500" 
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors`}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="rememberMe" 
                  name="rememberMe" 
                  type="checkbox" 
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className={`h-4 w-4 rounded ${
                    isDark ? "bg-gray-700 border-gray-600 text-purple-600" : "bg-gray-100 border-gray-300 text-purple-600"
                  } focus:ring-purple-500`}
                />
                <label 
                  htmlFor="rememberMe" 
                  className={`ml-2 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className={`font-medium ${
                    isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
                  }`}
                >
                  Forgot password?
                </Link>
              </div>
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
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className={`mt-6 text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Don't have an account? {' '}
            <Link 
              to="/signup" 
              className={`font-medium ${
                isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
              }`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;