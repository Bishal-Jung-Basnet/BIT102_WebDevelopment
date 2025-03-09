import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
import GameCard from "../components/GameCard";
import games from "../data/gameData";

export default function Games() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceSort, setPriceSort] = useState("default");

  // Parse query parameters whenever the URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  // Get unique categories from the game data
  const categories = ["All", ...new Set(games.map((game) => game.category))];

  // Filter games based on search term and category
  let filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort games by price 
  if (priceSort === "low-to-high") {
    filteredGames = [...filteredGames].sort((a, b) => a.price - b.price);
  } else if (priceSort === "high-to-low") {
    filteredGames = [...filteredGames].sort((a, b) => b.price - a.price);
  }

  return (
    <div
      className={`${
        isDark ? "bg-[#050A18] text-white" : "bg-gray-50 text-gray-800"
      } min-h-screen pt-24 pb-12 px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Games</h1>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search games..."
            className={`w-full px-4 py-3 rounded-lg border ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            className={`w-full md:w-1/4 px-4 py-3 rounded-lg border ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          {/* Price Sort Dropdown */}
          <select
            className={`w-full md:w-1/4 px-4 py-3 rounded-lg border ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="default">Price: Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        {/* Game List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => <GameCard key={game.id} game={game} isDark={isDark} />)
          ) : (
            <p className="text-center text-lg">No games found.</p>
          )}
        </div>
      </div>
    </div>
  );
}