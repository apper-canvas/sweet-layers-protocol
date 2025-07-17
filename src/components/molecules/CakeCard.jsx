import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CakeCard = ({ cake }) => {
  return (
    <Card className="group">
      <div className="relative overflow-hidden">
        <img 
          src={cake.image} 
          alt={cake.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-accent to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium transform rotate-[-2deg] shadow-lg">
            ${cake.price}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white/90 backdrop-blur-sm text-primary py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
            >
              <ApperIcon name="Eye" className="w-4 h-4" />
              View Details
            </motion.button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{cake.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{cake.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${cake.price}</span>
          <div className="flex items-center gap-1 text-accent">
            {[...Array(5)].map((_, i) => (
              <ApperIcon key={i} name="Star" className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CakeCard;