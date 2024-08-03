import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  <div className="flex justify-center align-middle flex-col w-full text-center">
    <h1 className="text-8xl">404</h1>
    <h2>Not Found</h2>
    <Link to="/" className="mx-auto underline">
      <Button color="gray" className="px-2 border-none">
        Return Home
      </Button>
    </Link>
  </div>;
};

export default NotFound;
