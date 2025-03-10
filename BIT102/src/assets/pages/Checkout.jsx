import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import games from "../data/gameData";

export default function Checkout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  
  // Use the cart context
  const { cartItems, clearCart, getCartTotal } = useCart();

  // Calculate order totals
  const subtotal = getCartTotal();
  const shipping = 120;
  const total = subtotal + shipping;

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  // Order state
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate random order ID
    const newOrderId = `ORD-${Math.floor(Math.random() * 900000) + 100000}`;
    setOrderId(newOrderId);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  // Function to get game details by ID
  const getGameDetails = (gameId) => {
    return games.find(g => g.id === gameId) || null;
  };

  // Function to get game image
  const getGameImage = (gameId) => {
    const game = getGameDetails(gameId);
    return game ? game.image : "/api/placeholder/400/320";
  };

  // Function to generate and download receipt
  const generateReceipt = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let receiptContent = `
gameBazar - PURCHASE RECEIPT
===============================
Order ID: ${orderId}
Date: ${date}
Time: ${time}
Customer: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

ITEMS PURCHASED:
`;

    cartItems.forEach(item => {
      const gameDetails = getGameDetails(item.id);
      const gameTitle = gameDetails ? gameDetails.title : item.title;
      const gamePrice = gameDetails ? gameDetails.price : item.price;
      
      receiptContent += `
- ${gameTitle} 
  Quantity: ${item.quantity} 
  Price: Rs. ${gamePrice.toFixed(2)}
  Subtotal: Rs. ${(gamePrice * item.quantity).toFixed(2)}
`;
    });

    receiptContent += `
===============================
Subtotal: Rs. ${subtotal.toFixed(2)}
Shipping: Rs. ${shipping.toFixed(2)}
TOTAL: Rs. ${total.toFixed(2)}

Thank you for your purchase!
Your games are now available in your library.
For support, contact support@nexusgaming.com
`;
  };

  return (
    <div
      className={`${
        isDark ? "bg-[#050A18] text-white" : "bg-gray-50 text-gray-800"
      } min-h-screen pt-24 pb-12 px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto">
        {!orderComplete ? (
          <>
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Checkout form */}
              <div className="lg:col-span-2">
                <div className={`rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
                  <form onSubmit={handleSubmit}>
                    {/* Shipping details section */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            First Name*
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div>
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Last Name*
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Email*
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Address*
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div>
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            City*
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div>
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Postal Code*
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div>
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Country*
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          >
                            <option value="">Select Country</option>
                            <option value="Nepal">Nepal</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment details section */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Card Number*
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                              placeholder="XXXX XXXX XXXX XXXX"
                              className={`w-full px-3 py-2 rounded-lg border ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-700"
                              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            />
                            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Name on Card*
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div>
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Expiry Date*
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            required
                            placeholder="MM/YY"
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                        <div>
                          <label className={`block mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Security Code (CVV)*
                          </label>
                          <input
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                            placeholder="***"
                            className={`w-full px-3 py-2 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t border-gray-700">
                      <Link
                        to="/cart"
                        className="flex items-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back to Cart
                      </Link>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Complete Purchase
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Order summary section */}
              <div className="lg:col-span-1">
                <div className={`rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img 
                          src={getGameImage(item.id)} 
                          alt={item.title} 
                          className="w-12 h-12 object-cover rounded" 
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Qty: {item.quantity}</span>
                            <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4 mb-6 pt-4 border-t border-gray-700">
                    <div className="flex justify-between">
                      <span className={isDark ? "text-gray-400" : "text-gray-600"}>Subtotal</span>
                      <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? "text-gray-400" : "text-gray-600"}>Shipping</span>
                      <span className="font-medium">Rs. {shipping.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-700 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">Rs. {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`mt-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
                  <h2 className="text-lg font-bold mb-4">Purchase Protection</h2>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    All transactions are secured and encrypted. We offer a 7-day refund policy for games with less than 2 hours of playtime.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={`max-w-2xl mx-auto rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg p-8 text-center`}>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Complete!</h1>
            <p className="text-lg mb-2">Thank you for your purchase</p>
            <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Your order ID is: <span className="font-medium">{orderId}</span>
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <button
                onClick={generateReceipt}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
              
              <Link
                to="/games"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-left">
              <h3 className="font-bold mb-2">What's Next?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Your games are now available in your library</li>
                <li>Download codes have been sent to your email</li>
                <li>You can access your purchase history in your account</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}