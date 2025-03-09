import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className={`w-full max-w-md md:max-w-lg lg:max-w-xl ${isDark ? "bg-[#0A0E26] text-white" : "bg-white text-gray-800"} p-6 md:p-8 rounded-lg shadow-lg transition-colors duration-300`}>
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
          Contact Us
        </h2>
        
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your message has been sent. We'll get back to you soon.</span>
          </div>
        ) : null}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Full Name:
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Email Address:
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="message" 
              className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Your Message:
            </label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-2 px-4 ${isSubmitting ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}