import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import cakesService from "@/services/api/cakesService";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const CakeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        setLoading(true);
        const cakeData = await cakesService.getById(id);
        if (cakeData) {
          setCake(cakeData);
          setSelectedSize(cakeData.sizes?.[0] || "");
          setSelectedFlavor(cakeData.flavors?.[0] || "");
          setError(null);
        } else {
          setError("Cake not found");
        }
      } catch (err) {
        setError("Failed to load cake details");
      } finally {
        setLoading(false);
      }
    };

    fetchCake();
  }, [id]);

  const handleAddToBag = () => {
    if (!selectedSize || !selectedFlavor) {
      toast.error("Please select both size and flavor");
      return;
    }

    const bagItem = {
      id: cake.Id,
      name: cake.name,
      price: cake.price,
      size: selectedSize,
      flavor: selectedFlavor,
      quantity: quantity,
      image: cake.image
    };

    // Here you would typically add to cart/bag state management
    toast.success(`${cake.name} added to bag!`);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!cake) return <Error message="Cake not found" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-secondary mb-6 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5" />
          Back to Menu
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-accent to-pink-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                  ${cake.price}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-2">
                {cake.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4">{cake.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon key={i} name="Star" className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(4.8/5 rating)</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <ApperIcon name="List" className="w-5 h-5" />
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {cake.ingredients?.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Available Sizes</h3>
              <div className="grid grid-cols-2 gap-3">
                {cake.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Available Flavors</h3>
              <div className="grid grid-cols-2 gap-3">
                {cake.flavors?.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedFlavor === flavor
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Options */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <ApperIcon name="Shield" className="w-5 h-5" />
                Dietary Options
              </h3>
              <div className="flex flex-wrap gap-2">
                {cake.dietaryOptions?.map((option, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <ApperIcon name="Minus" className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total Price:</span>
                <span className="text-2xl font-bold text-primary">
                  ${(cake.price * quantity).toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleAddToBag}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
                Add to Bag
              </Button>
            </div>

            {/* Nutritional Info */}
            {cake.nutritionalInfo && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <ApperIcon name="Info" className="w-5 h-5" />
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Calories:</span>
                    <span className="ml-2 font-medium">{cake.nutritionalInfo.calories}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fat:</span>
                    <span className="ml-2 font-medium">{cake.nutritionalInfo.fat}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Carbs:</span>
                    <span className="ml-2 font-medium">{cake.nutritionalInfo.carbs}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Protein:</span>
                    <span className="ml-2 font-medium">{cake.nutritionalInfo.protein}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetail;