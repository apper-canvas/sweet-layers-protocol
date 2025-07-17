import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const Card = React.forwardRef(({ 
  className, 
  children,
  hover = true,
  ...props 
}, ref) => {
  const CardComponent = hover ? motion.div : "div";
  
  return (
    <CardComponent
      ref={ref}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      className={cn(
        "bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300",
        hover && "hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = "Card";

export default Card;