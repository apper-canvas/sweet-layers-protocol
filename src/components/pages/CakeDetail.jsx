import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import cakesService from "@/services/api/cakesService";
import orderService from "@/services/api/orderService";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

const CakeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [quantity, setQuantity] = useState(1);
const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });

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
    setShowOrderForm(true);
  };

const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === 'online') {
      // For online payment, show payment form first
      setShowPaymentForm(true);
      return;
    }

    // For cash on delivery, place order directly
    await processOrder();
  };

  const processOrder = async () => {
    setOrderLoading(true);
    
    try {
      const orderData = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        cakeId: cake.Id,
        cakeName: cake.name,
        cakeSize: selectedSize,
        cakeFlavor: selectedFlavor,
        quantity: quantity,
        totalAmount: cake.price * quantity,
        specialInstructions: customerInfo.specialInstructions,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid'
      };

      await orderService.create(orderData);
      toast.success(paymentMethod === 'cash' 
        ? "Order placed successfully! We'll contact you soon." 
        : "Payment successful! Your order has been placed.");
      
      setShowOrderForm(false);
      setShowPaymentForm(false);
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        specialInstructions: ''
      });
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
      });
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentForm()) {
      return;
    }

    setPaymentLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate random payment success/failure (90% success rate)
      if (Math.random() > 0.1) {
        toast.success("Payment processed successfully!");
        setShowPaymentForm(false);
        await processOrder();
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentInputChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePaymentForm = () => {
    if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
      toast.error("Please enter a valid card number");
      return false;
    }
    if (!paymentData.expiryDate || paymentData.expiryDate.length < 5) {
      toast.error("Please enter a valid expiry date");
      return false;
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      toast.error("Please enter a valid CVV");
      return false;
    }
    if (!paymentData.cardholderName) {
      toast.error("Please enter the cardholder name");
      return false;
    }
    return true;
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
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
                Place Order
              </Button>
            </div>

            {/* Order Form Modal */}
            {showOrderForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowOrderForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-display font-bold text-gray-800">
                        Order Details
                      </h2>
                      <button
                        onClick={() => setShowOrderForm(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <ApperIcon name="X" className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <img
                          src={cake.image}
                          alt={cake.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{cake.name}</h4>
                          <p className="text-sm text-gray-600">
                            {selectedSize} • {selectedFlavor} • Qty: {quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            ${(cake.price * quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Information Form */}
                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Delivery Address</Label>
                          <Input
                            id="address"
                            type="text"
                            value={customerInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="mt-1"
                            placeholder="Optional: for delivery orders"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="instructions">Special Instructions</Label>
                        <textarea
                          id="instructions"
                          value={customerInfo.specialInstructions}
                          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          rows="3"
                          placeholder="Any special requirements or notes..."
                        />
</div>

                      {/* Payment Method Selection */}
                      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <ApperIcon name="CreditCard" className="w-5 h-5" />
                          Payment Method
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              id="cash"
                              name="paymentMethod"
                              value="cash"
                              checked={paymentMethod === 'cash'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4 text-primary focus:ring-primary"
                            />
                            <label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                              <ApperIcon name="Banknote" className="w-5 h-5 text-green-600" />
                              <span className="font-medium text-gray-800">Cash on Delivery</span>
                            </label>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              id="online"
                              name="paymentMethod"
                              value="online"
                              checked={paymentMethod === 'online'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4 text-primary focus:ring-primary"
                            />
                            <label htmlFor="online" className="flex items-center gap-2 cursor-pointer">
                              <ApperIcon name="CreditCard" className="w-5 h-5 text-blue-600" />
                              <span className="font-medium text-gray-800">Pay Now (Online)</span>
                            </label>
                          </div>
                        </div>
                        {paymentMethod === 'cash' && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                            <p className="text-yellow-800 text-sm">
                              <ApperIcon name="Info" className="w-4 h-4 inline mr-1" />
                              Pay when your order is delivered to your doorstep
                            </p>
                          </div>
                        )}
                        {paymentMethod === 'online' && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-blue-800 text-sm">
                              <ApperIcon name="Shield" className="w-4 h-4 inline mr-1" />
                              Secure online payment with instant confirmation
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <ApperIcon name="Phone" className="w-5 h-5 text-blue-600" />
                          <h4 className="font-medium text-blue-800">Alternative: Call to Order</h4>
                        </div>
                        <p className="text-blue-700 text-sm mb-2">
                          You can also place your order by calling us directly:
                        </p>
                        <p className="text-blue-800 font-semibold text-lg">
                          📞 (555) 123-CAKE
                        </p>
                        <p className="text-blue-600 text-sm mt-1">
                          Open: Mon-Sat 8AM-8PM, Sun 9AM-6PM
                        </p>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          onClick={() => setShowOrderForm(false)}
                          className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={orderLoading}
                          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300"
                        >
                          {orderLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing...
                            </div>
                          ) : (
<>
                              <ApperIcon name={paymentMethod === 'online' ? "CreditCard" : "Check"} className="w-5 h-5 mr-2" />
                              {paymentMethod === 'online' ? 'Proceed to Payment' : 'Place Order'}
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
)}

            {/* Payment Form Modal */}
            {showPaymentForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowPaymentForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-display font-bold text-gray-800">
                        Payment Details
                      </h2>
                      <button
                        onClick={() => setShowPaymentForm(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <ApperIcon name="X" className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="text-2xl font-bold text-primary">
                          ${(cake.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          type="text"
                          value={paymentData.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                            handlePaymentInputChange('cardNumber', value);
                          }}
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            type="text"
                            value={paymentData.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2, 4);
                              }
                              handlePaymentInputChange('expiryDate', value);
                            }}
                            placeholder="MM/YY"
                            className="mt-1"
                            maxLength="5"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            type="text"
                            value={paymentData.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').substring(0, 3);
                              handlePaymentInputChange('cvv', value);
                            }}
                            placeholder="123"
                            className="mt-1"
                            maxLength="3"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardholderName">Cardholder Name *</Label>
                        <Input
                          id="cardholderName"
                          type="text"
                          value={paymentData.cardholderName}
                          onChange={(e) => handlePaymentInputChange('cardholderName', e.target.value)}
                          placeholder="John Doe"
                          className="mt-1"
                          required
                        />
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ApperIcon name="Shield" className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Secure Payment</span>
                        </div>
                        <p className="text-green-700 text-sm">
                          Your payment information is encrypted and secure
                        </p>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          onClick={() => setShowPaymentForm(false)}
                          className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                          disabled={paymentLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={paymentLoading}
                          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300"
                        >
                          {paymentLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing...
                            </div>
                          ) : (
                            <>
                              <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                              Pay ${(cake.price * quantity).toFixed(2)}
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}

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