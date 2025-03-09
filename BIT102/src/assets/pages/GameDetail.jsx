import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, CheckCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext"; // Import the useCart hook
import games from "../data/gameData";

export default function GameDetail() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showNotification, setShowNotification] = useState(false);
  
  // Use the cart context
  const { addToCart } = useCart();

  // Find the game by ID from the imported games data
  const game = games.find(game => game.id === id) || games[0];

  // Hide notification after timeout
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Generate rating stars
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-purple-500">★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-purple-500">★</span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400">★</span>
        );
      }
    }

    return stars;
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Format price to show with decimal places and currency symbol
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Generate thumbnails for the game using actual screenshots from gameData
  const generateThumbnails = () => {
    const screenshots = [
      game.screenshot1,
      game.screenshot2,
      game.screenshot3
    ];
    
    // Return available screenshots, or placeholders if screenshots don't exist
    return screenshots.map((screenshot, index) => 
      screenshot || `/api/placeholder/200/120`
    );
  };

  // Get system requirements in formatted text
  const getSystemRequirements = () => {
    if (!game.systemRequirements) return "System requirements not available.";
    
    const { minimum, recommended } = game.systemRequirements;
    
    let minReqs = "Minimum:\n";
    for (const [key, value] of Object.entries(minimum || {})) {
      minReqs += `${key}: ${value}\n`;
    }
    
    let recReqs = "\nRecommended:\n";
    for (const [key, value] of Object.entries(recommended || {})) {
      recReqs += `${key}: ${value}\n`;
    }
    
    return minReqs + recReqs;
  };

  // Generate tags for the game (using category if no tags available)
  const getTags = () => {
    return game.tags || [game.category];
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    // Add the game to cart with the selected quantity
    const gameWithQuantity = {
      ...game,
      quantity: quantity
    };
    addToCart(gameWithQuantity);
    setShowNotification(true);
  };

  return (
    <div className={`${isDark ? "bg-[#050A18] text-white" : "bg-gray-50 text-gray-800"} min-h-screen pt-24 pb-12 px-6 md:px-12 relative`}>
      {/* Cart Notification */}
      {showNotification && (
        <div className={`fixed top-20 right-4 z-50 flex items-center p-4 mb-4 ${
          isDark ? "bg-gray-800" : "bg-white"
        } border ${
          isDark ? "border-green-700" : "border-green-500"
        } rounded-lg shadow-lg transition-all duration-300 transform translate-x-0`}>
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {game.title} has been added to your cart!
          </div>
          <button
            type="button"
            className={`ml-4 -mx-1.5 -my-1.5 ${
              isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-white text-gray-500 hover:text-gray-900"
            } rounded-lg p-1.5 inline-flex h-8 w-8`}
            onClick={() => setShowNotification(false)}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-purple-500`}>Home</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/games" className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-purple-500`}>Games</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-purple-500">{game.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left column - images */}
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              <img src={game.image || "/api/placeholder/760/426"} alt={game.title} className="w-full h-auto object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {generateThumbnails().map((thumb, index) => (
                <div key={index} className="rounded-lg overflow-hidden border-2 border-transparent hover:border-purple-500 cursor-pointer">
                  <img src={thumb} alt={`${game.title} screenshot ${index + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right column - game details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRatingStars(game.rating)}
              </div>
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>({game.reviews || "No"} reviews)</span>
            </div>
            
            <div className="text-3xl font-bold mb-6">{formatPrice(game.price)}</div>
            
            <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {game.description}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Developer</h3>
                <p className="font-medium">{game.developer || "Unknown"}</p>
              </div>
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Publisher</h3>
                <p className="font-medium">{game.publisher || "Unknown"}</p>
              </div>
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Release Date</h3>
                <p className="font-medium">{game.releaseDate || "N/A"}</p>
              </div>
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Platforms</h3>
                <p className="font-medium">{game.platforms || "PC"}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {getTags().map((tag, index) => (
                <span 
                  key={index} 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDark ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-4 mb-4">
              <div className={`flex items-center rounded-lg overflow-hidden border ${
                isDark ? "border-gray-700" : "border-gray-300"
              }`}>
                <button 
                  onClick={decrementQuantity}
                  className={`p-3 ${
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-2 font-medium">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className={`p-3 ${
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button 
                className={`flex items-center justify-center py-3 px-6 rounded-lg transition-colors ${
                  isDark 
                    ? "bg-gray-800 text-white hover:bg-gray-700" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs for Description, Features, System Requirements */}
        <div className="mb-6 border-b border-gray-700">
          <div className="flex space-x-8">
            {["description", "features", "system-requirements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium capitalize ${
                  activeTab === tab 
                    ? "text-purple-500 border-b-2 border-purple-500" 
                    : isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab content */}
        <div className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-12`}>
          {activeTab === "description" && (
            <p>{game.description}</p>
          )}
          
          {activeTab === "features" && (
            <p>{game.features || "Features information not available."}</p>
          )}
          
          {activeTab === "system-requirements" && (
            <div className="whitespace-pre-line">{getSystemRequirements()}</div>
          )}
        </div>
      </div>
    </div>
  );
}