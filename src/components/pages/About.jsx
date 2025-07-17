import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const About = () => {
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
              About Sweet Layers
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the passion and craftsmanship behind every cake we create
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-br from-surface to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">
                Our Sweet Journey
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Sweet Layers began in 2008 as a small family bakery with a simple dream: to create beautiful, 
                delicious cakes that bring joy to life's most precious moments. What started as a home-based 
                business has grown into the community's favorite destination for custom cakes and sweet treats.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our founder, Maria Rodriguez, learned the art of cake making from her grandmother in Mexico. 
                She brought those traditional techniques to our local community, blending them with modern 
                flavors and artistic designs to create something truly special.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, our team of skilled bakers continues this tradition of excellence, using only the 
                finest ingredients and time-honored techniques to craft each cake with love and precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Bakery interior"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything we do is guided by these core principles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Heart" className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Made with Love</h3>
              <p className="text-gray-600">
                Every cake is crafted with genuine care and attention to detail, because we believe 
                love is the most important ingredient.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Award" className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We source only the finest ingredients and maintain the highest standards in every 
                aspect of our baking process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Users" className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community First</h3>
              <p className="text-gray-600">
                We're proud to be part of this community and committed to creating memorable 
                experiences for our neighbors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-surface to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The talented individuals who make Sweet Layers special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                alt="Maria Rodriguez"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Maria Rodriguez</h3>
                <p className="text-primary font-medium mb-2">Founder & Head Baker</p>
                <p className="text-gray-600 text-sm">
                  Master baker with 25+ years of experience, specializing in traditional techniques 
                  and modern artistic designs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1607631568010-0239dcc4b8f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                alt="James Chen"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">James Chen</h3>
                <p className="text-primary font-medium mb-2">Pastry Chef</p>
                <p className="text-gray-600 text-sm">
                  Creative pastry chef bringing innovative flavors and stunning visual presentations 
                  to our cake designs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1621799807972-4c0c2b5b7c8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                alt="Sarah Johnson"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h3>
                <p className="text-primary font-medium mb-2">Cake Decorator</p>
                <p className="text-gray-600 text-sm">
                  Artist specializing in custom cake decorations, fondant work, and intricate 
                  sugar flower designs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;