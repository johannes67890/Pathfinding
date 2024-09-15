import React from "react";
import Dropdown from "./NavDropdown";


const Logo = () => (
  <div className="flex items-center justify-center w-48 h-fit">
    <p>--------- LOGO --------</p>
  </div>
);

function NavHeader() {
  return (
    <div className="min-h-12 self-center sticky">
      <div className="max-w-7xl mx-auto h-fit border-b border-grey">
        <div className="flex justify-between items-center">
          <Logo />
        </div>
        <Dropdown />
      </div>
    </div>
  );
}

export default NavHeader;
