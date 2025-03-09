import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import games from '../data/gameData';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { addToCart } = useCart();
  
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('popular');
  
  // Filter games based on category
  useEffect(() => {
    let filtered = games;
    
    // Filter by category if specified
    if (category && category !== 'all') {
      // Convert both to lowercase for case-insensitive comparison
      filtered = games.filter(game => 
        game.category.toLowerCase().includes(category.toLowerCase()) ||
        (category.toLowerCase() === 'rpg' && game.category.toLowerCase().includes('action rpg'))
      );
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(game => 
      game.price >= priceRange[0] && game.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortOption === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'aToZ') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'zToA') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredGames(filtered);
  }, [category, searchQuery, priceRange, sortOption]);
  
  const handleAddToCart = (game) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      image: game.image
    });
  };
  
  // Calculate price after discount
  const getDiscountedPrice = (originalPrice, discount) => {
    if (!discount) return originalPrice;
    return originalPrice - (originalPrice * (discount / 100));
  };
  
  return (
    <div className={`min-h-screen pt-24 pb-12 ${isDark ? 'bg-[#050A18] text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Categories'}
            </h1>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredGames.length} games found
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
            <div className={`relative ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <input
                type="text"
                placeholder="Search games..."
                className={`pl-10 pr-4 py-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                    : 'bg-white text-gray-800 placeholder-gray-500 border-gray-300'
                } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-800 border-gray-300'
              } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="aToZ">Name: A to Z</option>
              <option value="zToA">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {showFilters && (
          <div className={`mb-8 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className="text-lg font-medium mb-4">Filter Games</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Price Range</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <span>Rs. {priceRange[0]}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <span>Rs. {priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Categories</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Action', 'RPG', 'Adventure', 'Strategy', 'Fighting', 'Open World', 'Racing', 'Survival Horror'].map((cat) => (
                    <Link 
                      key={cat} 
                      to={`/categories/${cat.toLowerCase().replace(' ', '-')}`}
                      className={`px-3 py-1 rounded-md text-sm ${
                        category === cat.toLowerCase().replace(' ', '-')
                          ? 'bg-purple-600 text-white'
                          : isDark
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div 
                key={game.id} 
                className={`rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <Link to={`/games/${game.id}`}>
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-full h-48 object-cover"
                  />
                </Link>
                
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {game.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                      <span className="text-sm">{game.rating}</span>
                    </div>
                  </div>
                  
                  <Link to={`/games/${game.id}`}>
                    <h3 className="mt-2 text-lg font-bold leading-tight hover:text-purple-500 transition-colors line-clamp-1">
                      {game.title}
                    </h3>
                  </Link>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      {game.discount ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">
                            Rs. {getDiscountedPrice(game.price, game.discount).toFixed(0)}
                          </span>
                          <span className={`line-through text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            Rs. {game.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">Rs. {game.price}</span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(game)}
                      className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h2 className="text-xl font-medium mb-4">No games found</h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your filters or search criteria
            </p>
            <Link
              to="/games"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
            >
              View All Games
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}