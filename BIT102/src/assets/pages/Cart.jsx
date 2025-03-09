import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ChevronLeft, Minus, Plus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import games from "../data/gameData";

export default function Cart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  
  // Use the cart context instead of local state
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal 
  } = useCart();

  // Calculate subtotal, shipping, and total
  const subtotal = getCartTotal();
  const shipping = 120;
  const total = subtotal + shipping;

  // Apply promo code (placeholder functionality)
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  const applyPromo = () => {
    if (promoCode) {
      setPromoApplied(true);
    }
  };

  // Function to get game image from gameData.js
  const getGameImage = (gameId) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.image : "/api/placeholder/400/320";
  };

  return (
    <div
      className={`${
        isDark ? "bg-[#050A18] text-white" : "bg-gray-50 text-gray-800"
      } min-h-screen pt-24 pb-12 px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main cart section */}
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              <div className={`rounded-lg overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                {/* Header row */}
                <div className="grid grid-cols-12 p-4 border-b border-gray-700">
                  <div className="col-span-6">
                    <h2 className="font-medium">Product</h2>
                  </div>
                  <div className="col-span-2 text-center">
                    <h2 className="font-medium">Price</h2>
                  </div>
                  <div className="col-span-2 text-center">
                    <h2 className="font-medium">Quantity</h2>
                  </div>
                  <div className="col-span-2 text-center">
                    <h2 className="font-medium">Total</h2>
                  </div>
                </div>

                {/* Cart items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 p-4 items-center border-b border-gray-700">
                    <div className="col-span-6 flex items-center gap-4">
                      <img 
                        src={getGameImage(item.id)} 
                        alt={item.title} 
                        className="w-16 h-16 object-cover rounded" 
                      />
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      Rs. {(item.price).toFixed(2)}
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                      <div className="flex items-center border border-gray-600 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-between items-center">
                      <span className="mx-auto">Rs. {((item.price) * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg text-center`}>
                <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
                <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Add some great games to your cart and start your gaming adventure!
                </p>
                <Link
                  to="/games"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                >
                  Browse Games
                </Link>
              </div>
            )}
            
            {cartItems.length > 0 && (
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => navigate("/games")}
                  className="flex items-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Continue Shopping
                </button>
                <button
                  onClick={clearCart}
                  className={`px-4 py-2 rounded-lg ${
                    isDark 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition-colors`}
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>

          {/* Order summary section */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className={`rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
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
                
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      onClick={applyPromo}
                      className={`px-4 py-2 rounded-lg ${
                        isDark 
                          ? "bg-gray-700 hover:bg-gray-600" 
                          : "bg-gray-200 hover:bg-gray-300"
                      } transition-colors`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate("/checkout")}  // Add this onClick handler
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <p className="text-center text-xs mt-4 text-gray-500">
                  
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}