import { motion } from "framer-motion";
import ContactForm from "@/components/organisms/ContactForm";
import ApperIcon from "@/components/ApperIcon";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to make your celebration sweeter? Get in touch with us today!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-br from-surface to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="MapPin" className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">
                (555) 123-CAKE<br />
                For orders & inquiries
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Mail" className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">
                hello@sweetlayers.com<br />
                We'll respond quickly
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Clock" className="w-8 h-8 text-accent" />
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

      {/* Contact Form */}
      <ContactForm />

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
              Find Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Located in the heart of downtown, we're easy to find and always ready to serve you
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-surface to-white rounded-lg shadow-xl p-8 text-center">
            <div className="w-full h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="MapPin" className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</h3>
                <p className="text-gray-600">
                  Map integration would be implemented here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;