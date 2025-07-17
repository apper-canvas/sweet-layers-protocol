import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found",
  description = "Check back later for new additions",
  icon = "Package",
  action
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] px-4 py-8"
    >
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-display font-semibold text-gray-800 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        {action && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <ApperIcon name={action.icon} className="w-4 h-4" />
            {action.text}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;