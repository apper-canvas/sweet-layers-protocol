import { motion } from "framer-motion";
import CakeGrid from "@/components/organisms/CakeGrid";

const Menu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface">
      <div className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of handcrafted cakes, made fresh daily with premium ingredients
          </p>
        </motion.div>
        
        <CakeGrid />
      </div>
    </div>
  );
};

export default Menu;