import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CakeCard from "@/components/molecules/CakeCard";
import cakesService from "@/services/api/cakesService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const FeaturedCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCakes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await cakesService.getFeatured();
      setCakes(data);
    } catch (err) {
      setError("Failed to load featured cakes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCakes();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-background to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
              Featured Cakes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and delicious creations
            </p>
          </div>
          <Loading type="grid" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-background to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
              Featured Cakes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and delicious creations
            </p>
          </div>
          <Error message={error} onRetry={loadCakes} />
        </div>
      </section>
    );
  }

  if (cakes.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-background to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
              Featured Cakes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and delicious creations
            </p>
          </div>
          <Empty 
            title="No Featured Cakes Available"
            description="We're preparing something special for you. Check back soon!"
            icon="Cake"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            Featured Cakes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and delicious creations, handcrafted with premium ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake.Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CakeCard cake={cake} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;