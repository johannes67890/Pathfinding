import React, { useState } from "react";
import { Link } from "react-router-dom";
import navDropdownRoutes, { NavRoute } from "src/routes/nav/navDropdownRoutes";

const NavDropdown = () => {
  const [content, setContent] = useState<NavRoute | undefined>(undefined);

  return (
    <div className="relative z-50 block hover:cursor-pointer group">
      {navDropdownRoutes.map((route, index) => (
        // eslint-disable-next-line react/jsx-key
        <span onMouseEnter={() => setContent(route)}>{route.label}</span>
      ))}
      {content !== undefined && (
        <div
          onMouseLeave={() => setContent(undefined)}
          className="absolute bg-white w-full min-h-80 shadow-md p-6 z-40 group-hover:grid grid-flow-col grid-cols-4"
        >
          {content.routes.map((route) =>
            route.redirect ? (
              <Link reloadDocument to={route.link}>
                {route.label}
              </Link>
            ) : (
              <Link to={route.link}>{route.label}</Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
