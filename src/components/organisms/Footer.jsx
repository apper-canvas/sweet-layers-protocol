import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="Cake" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Sweet Layers
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Crafting delicious memories one layer at a time. Your trusted neighborhood bakery since 2008.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors">Menu</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
                <span className="text-gray-400">123 Sweet Street, Bakery City, BC 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Phone" className="w-5 h-5 text-primary" />
                <span className="text-gray-400">(555) 123-CAKE</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" className="w-5 h-5 text-primary" />
                <span className="text-gray-400">hello@sweetlayers.com</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Clock" className="w-5 h-5 text-primary" />
                <div className="text-gray-400">
                  <div>Mon-Sat: 8am-8pm</div>
                  <div>Sunday: 9am-6pm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Sweet Layers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;