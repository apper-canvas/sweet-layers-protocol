import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const CustomerReviews = () => {
  const reviews = [
    {
      Id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely divine! The chocolate layer cake was perfect for my daughter's birthday. The layers were moist and the frosting was heavenly.",
      date: "2 weeks ago"
    },
    {
      Id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "I've ordered from Sweet Layers multiple times and they never disappoint. The red velvet cake is my absolute favorite - so rich and flavorful!",
      date: "1 month ago"
    },
    {
      Id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      comment: "The custom wedding cake exceeded all our expectations. Beautiful presentation and tasted even better than it looked. Highly recommended!",
      date: "3 weeks ago"
    },
    {
      Id: 4,
      name: "David Thompson",
      rating: 4,
      comment: "Great variety of flavors and excellent customer service. The lemon drizzle cake was particularly delicious. Will definitely order again!",
      date: "1 week ago"
    },
    {
      Id: 5,
      name: "Lisa Parker",
      rating: 5,
      comment: "Sweet Layers has become our go-to bakery for special occasions. The quality is consistently outstanding and the staff is so friendly.",
      date: "2 months ago"
    },
    {
      Id: 6,
      name: "James Wilson",
      rating: 5,
      comment: "The strawberry shortcake was incredible! Fresh berries, fluffy cake, and perfect whipped cream. Couldn't ask for better!",
      date: "3 days ago"
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <ApperIcon
            key={star}
            name="Star"
            size={16}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } transition-colors duration-200`}
          />
        ))}
      </div>
    );
  };

  const ReviewCard = ({ review, index }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-foreground mb-1">{review.name}</h4>
              <StarRating rating={review.rating} />
            </div>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-primary">
              <ApperIcon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Verified Customer</span>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
            about their Sweet Layers experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.Id} review={review} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-lg font-semibold text-foreground">4.9/5</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="text-muted-foreground">
              Based on 200+ reviews
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            Join hundreds of satisfied customers who trust Sweet Layers
            for their special occasions
          </p>
<motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto">
              <ApperIcon name="MessageCircle" size={20} />
              Leave a Review
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;