import React from "react";
import { NavLink } from "react-router-dom";
const navLinkStyles = ({ isActive }) => {
  return {
    backgroundColor: isActive ? "rgba(217, 217, 217, 0.5)" : null,
    borderRadius: isActive ? "15px" : null,
  };
};

const TabsCustom = ({ className,children,to}) => {
  return (
    <div>
      <NavLink
        className={className}
        to={to}
        style={navLinkStyles}
      >
        {children}
      </NavLink>
    </div>
  );
};

export default TabsCustom;
