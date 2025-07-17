import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[300px] px-4"
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;