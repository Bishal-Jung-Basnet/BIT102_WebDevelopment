import React, { useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const form = useRef();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ""
  });
  
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
    
    // Initialize the service with your EmailJS credentials
    // Replace these with your actual EmailJS service ID, template ID, and public key
    const serviceID = "service_5qieh89";
    const templateID = "template_fthnhr8";
    const publicKey = "pOszfDQ1dqxkSQWRw";
    
    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setIsSubmitting(false);
        setSubmitStatus({
          success: true,
          message: "Your message has been sent. We'll get back to you soon."
        });
        
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          message: ""
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({
            success: false,
            message: ""
          });
        }, 5000);
      })
      .catch((error) => {
        console.error("Failed to send email:", error.text);
        setIsSubmitting(false);
        setSubmitStatus({
          success: false, 
          message: "Failed to send your message. Please try again later."
        });
      });
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className={`w-full max-w-md md:max-w-lg lg:max-w-xl ${isDark ? "bg-[#0A0E26] text-white" : "bg-white text-gray-800"} p-6 md:p-8 rounded-lg shadow-lg transition-colors duration-300`}>
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
          Contact Us
        </h2>
        
        {submitStatus.message && (
          <div className={`${submitStatus.success ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"} px-4 py-3 rounded relative mb-4 border`} role="alert">
            <strong className="font-bold">{submitStatus.success ? "Success!" : "Error!"}</strong>
            <span className="block sm:inline"> {submitStatus.message}</span>
          </div>
        )}
        
        <form ref={form} onSubmit={handleSubmit}>
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