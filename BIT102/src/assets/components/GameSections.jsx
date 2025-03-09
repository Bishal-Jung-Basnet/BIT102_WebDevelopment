import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import games from "../data/gameData";
import { toast } from "react-hot-toast"; // If you have toast library

export default function GameSections() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationGame, setNotificationGame] = useState(null);
  
  // Filter games for New Releases section (first 4 games)
  const newReleases = games.slice(0, 4);
  
  // Filter games for Trending section (next 4 games)
  const trendingGames = games.slice(4, 8);

  // Handle adding to cart with notification
  const handleAddToCart = (game) => {
    // Prepare the game for cart (convert the price format)
    const gameToAdd = {
      ...game,
      quantity: 1
    };
    
    // Add to cart using context
    addToCart(gameToAdd);
    
    // Show notification
    setNotificationGame(game);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    
    // If toast library is available, use it too
    if (typeof toast !== 'undefined') {
      toast.success(`${game.title} added to cart!`);
    }
  };

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

  // Format price to display correctly
  const formatPrice = (price) => {
    return `Rs. ${price}`;
  };

  // Game card component to avoid repetition
  const GameCard = ({ game, isNew }) => (
    <div 
      className={`rounded-lg overflow-hidden shadow-lg ${
        isDark ? "bg-gray-800" : "bg-white"
      } transition-transform duration-300 hover:scale-105`}
    >
      <div className="relative">
        <Link to={`/game/${game.id}`}>
          <img 
            src={game.image || "/api/placeholder/400/320"} 
            alt={game.title} 
            className="w-full h-48 object-cover"
          />
        </Link>
        {game.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {game.discount}% OFF
          </div>
        )}
        {isNew && !game.discount && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-900 bg-opacity-60 hover:bg-opacity-80 transition-all"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="p-4">
        <Link to={`/game/${game.id}`} className="block">
          <h3 className="text-lg font-semibold hover:text-purple-500 transition-colors">{game.title}</h3>
        </Link>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{game.category}</p>
        
        <div className="flex mt-2 mb-4">
          {renderRatingStars(game.rating)}
          <span className={`ml-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{game.rating}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{formatPrice(game.price)}</span>
          <button 
            onClick={() => handleAddToCart(game)}
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5 mr-1" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${isDark ? "bg-[#050A18] text-white" : "bg-gray-50 text-gray-800"} min-h-screen pt-24 pb-12 relative`}>
      {/* Cart Notification */}
      {showNotification && notificationGame && (
        <div className={`fixed top-20 right-4 z-50 flex items-center p-4 mb-4 ${
          isDark ? "bg-gray-800" : "bg-white"
        } border border-green-500 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0`}>
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">
            {notificationGame.title} has been added to your cart!
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
      
      {/* Hero Section */}
      <div className={`${isDark ? "bg-gray-900" : "bg-purple-100"} py-16 px-6 md:px-12 mb-12`}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Next Gaming Adventure
            </h1>
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-8`}>
              Discover, buy, and play the best video games from indie gems to AAA titles.
            </p>
            <Link 
              to="/games" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Browse Games
            </Link>
          </div>
        </div>
      </div>
      
      {/* New Releases Section */}
      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Releases</h2>
            <Link 
              to="/games" 
              className="text-purple-500 hover:text-purple-600 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map((game) => (
              <GameCard key={game.id} game={game} isNew={true} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Trending Now Section */}
      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link 
              to="/games" 
              className="text-purple-500 hover:text-purple-600 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingGames.map((game) => (
              <GameCard key={game.id} game={game} isNew={false} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className={`${isDark ? "bg-gray-900" : "bg-purple-100"} py-12 px-6 md:px-12`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Subscribe to our newsletter for the latest game releases, updates, and exclusive offers.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className={`px-4 py-3 rounded-lg ${
                  isDark 
                    ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400" 
                    : "bg-white border border-gray-300 text-gray-800 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 md:min-w-64`}
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}