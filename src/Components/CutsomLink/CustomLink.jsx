import React from "react";
import { Link, useMatch } from "react-router-dom";

export const CustomLink = ({ to, className, chidren }) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });


  return (
    <Link
      to={to}
      className={className}
      style={{
        color: match ? "red" : "#000",
      }}
    >
      {chidren}
    </Link>
  );
};


export const CustomLinkIcon = ({ to, className, children,Icon }) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });

  return (
    <Link
      to={to}
      className={className}
      style={{
        color: match ? "red" : "#000",
      }}
    >
      {Icon} {children}
    </Link>
  );
};

