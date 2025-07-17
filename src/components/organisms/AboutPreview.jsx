import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const AboutPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">
              Our Sweet Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              For over 15 years, Sweet Layers has been creating memorable moments through our artisan cakes. 
              Every layer tells a story of passion, quality, and dedication to the craft of baking.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From birthdays to weddings, our skilled bakers use only the finest ingredients to create 
              cakes that not only taste amazing but also look absolutely stunning.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full">
                <ApperIcon name="Award" className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Award Winning</span>
              </div>
              <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full">
                <ApperIcon name="Heart" className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Made with Love</span>
              </div>
              <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full">
                <ApperIcon name="Users" className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Family Owned</span>
              </div>
            </div>
            <Button>
              <ApperIcon name="ArrowRight" className="w-4 h-4" />
              Learn More About Us
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Baker decorating a cake"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-accent/30 to-pink-500/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;