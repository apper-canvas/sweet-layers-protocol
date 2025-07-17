import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/utils/cn";

const NavLink = ({ to, children, className, ...props }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary",
          isActive && "bg-primary/20 text-primary",
          className
        )
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;