import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import the theme context
import team1 from '../assets/images/team-member1.jpg';
import team2 from '../assets/images/team-member2.jpg';
import team3 from '../assets/images/team-member3.jpg';

const About = () => {
  const { theme } = useTheme(); // Get the theme state

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex flex-col items-center justify-center min-h-screen px-6 py-10 transition-all`}>
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} max-w-4xl shadow-lg rounded-lg p-8 transition-all`}>
        <h1 className="text-3xl font-bold text-center">About Us</h1>
        <p className="text-lg text-center mt-4">
          Welcome to <span className="font-semibold text-purple-600 dark:text-purple-400">gameBazar</span>! 
          We are dedicated to providing the best services/products to our customers.
        </p>

        <h2 className="text-2xl font-semibold text-center mt-8">Our Mission</h2>
        <p className="text-lg text-center mt-2">
          Our goal is to deliver high-quality products and services that improve the lives of our customers.
        </p>

        <h2 className="text-2xl font-semibold text-center mt-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center mt-6 gap-6">
          {[{ name: 'Roshani', img: team1 }, { name: 'Manisha', img: team2 }, { name: 'Bishal', img: team3 }].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={member.img} alt={member.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-purple-500 shadow-md" />
              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-2 font-medium`}>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
