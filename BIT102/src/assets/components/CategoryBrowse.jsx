import { useTheme } from "../context/ThemeContext"; 
import { useNavigate } from "react-router-dom";

export default function CategoryBrowse() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const categories = [
    { name: "Action", icon: "⚔️" },
    { name: "Action Adventure", icon: "🚀" },
    { name: "Fighting", icon: "🗡️" },
    { name: "Sports", icon: "🏆" },
    { name: "Strategy", icon: "⚡" },
    { name: "Open World", icon: "👥" },
  ];

  // Function to handle category selection and navigation
  const handleCategoryClick = (categoryName) => {
    navigate(`/games?category=${categoryName}`);
  };

  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} p-8 transition-colors duration-300`}>
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition cursor-pointer ${
              isDark 
                ? "border border-gray-700 hover:bg-gray-800" 
                : "border border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryClick(category.name)}
            role="button"
            aria-label={`Browse ${category.name} games`}
          >
            <span className="text-xl text-purple-500">{category.icon}</span>
            <span className="mt-2">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}