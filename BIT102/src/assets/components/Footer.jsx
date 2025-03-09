import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Update this path if needed

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} border-t ${isDark ? "border-gray-800" : "border-gray-300"} transition-colors duration-300`}>
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={`text-xl font-semibold ${isDark ? "text-purple-400" : "text-purple-600"} mb-4`}>gameBazar</h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
              Your one-stop shop for the latest PC and console games at competitive prices.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook />, link: "#" },
                { icon: <Twitter />, link: "#" },
                { icon: <Instagram />, link: "#" },
                { icon: <Youtube />, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`${isDark ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition`}
                >
                  <span className="sr-only">Social</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Shop", links: ["All Games", "Categories", "Deals & Promotions", "New Releases", "Pre-orders"], urls: ["/games", "/categories", "/deals", "/new-releases", "/pre-orders"] },
            { title: "Customer Service", links: ["Contact Us", "FAQs", "Shipping & Delivery", "Returns & Refunds", "Terms & Conditions"], urls: ["/contact", "/faq", "/shipping", "/returns", "/terms"] },
            { title: "Account", links: ["My Account", "Order History", "Wishlist", "Newsletter"], urls: ["/account", "/orders", "/wishlist", "/newsletter"] },
          ].map((section, index) => (
            <div key={index}>
              <h3 className={`text-lg font-semibold ${isDark ? "text-purple-400" : "text-purple-600"} mb-4`}>{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={section.urls[i]} 
                      className={`${isDark ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`border-t ${isDark ? "border-gray-800" : "border-gray-300"} mt-8 pt-8`}>
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"} text-center`}>
            © {new Date().getFullYear()} gameBazar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;