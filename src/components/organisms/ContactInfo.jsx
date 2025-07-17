import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ContactInfo = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            Visit Our Bakery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Come taste the difference that fresh, handcrafted cakes make. We're always ready to help you celebrate life's sweet moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="MapPin" className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Location</h3>
            <p className="text-gray-600">
              123 Sweet Street<br />
              Bakery City, BC 12345
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Phone" className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">
              (555) 123-CAKE<br />
              Call for custom orders
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Clock" className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Hours</h3>
            <div className="text-gray-600">
              <div>Mon-Sat: 8am-8pm</div>
              <div>Sunday: 9am-6pm</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;