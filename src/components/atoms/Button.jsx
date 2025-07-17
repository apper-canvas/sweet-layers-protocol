import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md",
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-surface to-white text-secondary border border-secondary/20 hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/10",
    accent: "bg-gradient-to-r from-accent to-pink-500 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "font-medium rounded-lg transition-all duration-300 flex items-center gap-2 justify-center",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;