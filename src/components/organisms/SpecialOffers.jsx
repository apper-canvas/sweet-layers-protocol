import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import offersService from "@/services/api/offersService";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Button from "@/components/atoms/Button";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingOffer, setApplyingOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await offersService.getAll();
        setOffers(data);
      } catch (error) {
        console.error('Failed to fetch offers:', error);
      } finally {
        setLoading(false);
      }
    };

fetchOffers();
  }, []);

  const handleApplyOffer = async (offer) => {
    // Prevent multiple applications
    if (applyingOffer === offer.Id) return;
    
    setApplyingOffer(offer.Id);
    
    try {
      await offersService.applyOffer(offer.Id);
      
      toast.success(
        `🎉 ${offer.title} applied successfully! You saved ${offer.discount}`,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      
    } catch (error) {
      toast.error(
        error.message || "Failed to apply offer. Please try again.",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setApplyingOffer(null);
    }
  };
if (loading) {
    return (
      <div className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="animate-pulse">Loading special offers...</div>
          </div>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return null;
  }

return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Special Offers
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Don't miss out on our exclusive deals and seasonal promotions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.Id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 hover:bg-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl">
{/* Offer Badge */}
                {offer.discount && (
                  <div className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-full text-sm font-bold mb-4">
                    <ApperIcon name="Tag" size={16} className="mr-2" />
                    {offer.discount}
                  </div>
                )}

                {/* Offer Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Offer Features */}
                {offer.features && (
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {offer.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <ApperIcon name="Check" size={16} className="text-success mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Validity Period */}
                {offer.validUntil && (
                  <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center text-sm text-yellow-800">
                      <ApperIcon name="Clock" size={16} className="mr-2" />
                      Valid until {new Date(offer.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
<div className="flex items-center justify-between">
                  <Button
                    onClick={() => handleApplyOffer(offer)}
                    disabled={applyingOffer === offer.Id}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {applyingOffer === offer.Id ? (
                      <>
                        <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      <>
                        {offer.ctaText || 'Claim Offer'}
                        <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                  
                  {offer.originalPrice && offer.salePrice && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500 line-through">
                        ${offer.originalPrice}
                      </div>
                      <div className="text-lg font-bold text-primary">
                        ${offer.salePrice}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/90 text-lg mb-4">
            Join our newsletter for exclusive deals and updates
          </p>
          <Button
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
          >
            Subscribe Now
            <ApperIcon name="Mail" size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;