import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CakeCard from "@/components/molecules/CakeCard";
import cakesService from "@/services/api/cakesService";
import categoriesService from "@/services/api/categoriesService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const CakeGrid = () => {
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [cakesData, categoriesData] = await Promise.all([
        cakesService.getAll(),
        categoriesService.getAll()
      ]);
      setCakes(cakesData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load cakes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCakes = selectedCategory === "all" 
    ? cakes 
    : cakes.filter(cake => cake.category === selectedCategory);

  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Cakes
          </button>
          {categories.map((category) => (
            <button
              key={category.Id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Cakes Grid */}
      {filteredCakes.length === 0 ? (
        <Empty 
          title="No Cakes Found"
          description="Try selecting a different category or check back later for new additions."
          icon="Cake"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCakes.map((cake, index) => (
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
      )}
    </div>
  );
};

export default CakeGrid;