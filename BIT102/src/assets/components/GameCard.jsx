import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast"; // If you have a toast library installed

const renderRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="text-purple-500">★</span>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<span key={i} className="text-purple-500">★</span>);
    } else {
      stars.push(<span key={i} className="text-gray-400">★</span>);
    }
  }

  return stars;
};

export default function GameCard({ game, isDark }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      image: game.image
    });
    
    // Show notification if you have a toast library
    if (toast) {
      toast.success(`${game.title} added to cart!`);
    }
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg ${
        isDark ? "bg-gray-800" : "bg-white"
      } transition-transform duration-300 hover:scale-105`}
    >
      <div className="relative">
        <Link to={`/game/${game.id}`}>
          <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
        </Link>
        {game.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {game.discount}
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
          <h3 className="text-lg font-semibold hover:text-purple-500 transition-colors">
            {game.title}
          </h3>
        </Link>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{game.category}</p>

        <div className="flex mt-2 mb-4">
          {renderRatingStars(game.rating)}
          <span className="ml-2 text-sm text-gray-500">{game.rating}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Rs. {game.price}</span>
          <button
            onClick={handleAddToCart}
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
}