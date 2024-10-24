import React from "react";
import { Button } from "flowbite-react";
import Logo from "@assets/return.svg";
import { Link } from "react-router-dom";
/**
 *
 * @returns
 */
function Return() {
  return (
    <Button className="flex max-w-9 auto-cols-min text-black font-semibold border-none align-middle my-auto">
      <Link to="/">
        <Logo />
      </Link>
    </Button>
  );
}

export default Return;
