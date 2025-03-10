import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./assets/context/ThemeContext";
import { CartProvider } from "./assets/context/CartContext";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/Home";
import Games from "./assets/pages/Games";
import GameDetail from "./assets/pages/GameDetail";
import Login from "./assets/pages/Login";
import Signup from "./assets/pages/Signup";
import Categories from "./assets/pages/Category";
import Cart from "./assets/pages/Cart"; 
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import Footer from "./assets/components/Footer";
import { Toaster } from "react-hot-toast";
import Profile from "./assets/pages/profile";
import Checkout from "./assets/pages/Checkout";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>  {/* Wrap with CartProvider */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/categories" element={<Categories />} />
           <Route path="/categories/:category" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />  {/* Add Cart route */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Checkout" element={<Checkout />} />
          </Routes>
          <Toaster position="top-right" />  {/* Optional for notifications */}
          <Footer />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;