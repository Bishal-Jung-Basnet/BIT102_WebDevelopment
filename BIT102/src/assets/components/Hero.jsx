import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "../context/ThemeContext"; // Update this path if needed
import games from "../data/featuredGame"; // Importing game data

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={`w-full h-[500px] ${isDark ? "bg-gray-900" : "bg-gray-100"} flex justify-center items-center pt-20 transition-colors duration-300`}>
      <div className="w-[90%] md:w-[80%] lg:w-[70%]">
        <Slider {...settings}>
          {games.map((game) => (
            <div key={game.id} className="relative">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold">{game.title}</h2>
                <p className="text-sm">{game.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
