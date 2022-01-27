import React, { FC } from "react";
import Button from "./Button";
import { NodeType, Size } from "./Node";
const Header: FC<{
  setNodeSize: (size: Size) => void;
}> = ({ setNodeSize }) => {
  return (
    <div className="bg-gray-400 rounded-t-md flex">
      <div className="flex flex-col p-3">
        <h1 className="text-4xl">Pathfinder</h1>
        <span className="text-center italic border-b mb-1 pb-2">
          visualized
        </span>
        <div className="flex mx-auto gap-1 py-1">
          <div className="flex flex-col">
            <h2 className="text-center">Made by</h2>
            <span className="text-xs">Johannes67890</span>
          </div>
          <a href="https://github.com/johannes67890" className="w-10 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path
                fillRule="evenodd"
                d="M16 4C9.371094 4 4 9.371094 4 16C4 21.300781 7.4375 25.800781 12.207031 27.386719C12.808594 27.496094 13.027344 27.128906 13.027344 26.808594C13.027344 26.523438 13.015625 25.769531 13.011719 24.769531C9.671875 25.492188 8.96875 23.160156 8.96875 23.160156C8.421875 21.773438 7.636719 21.402344 7.636719 21.402344C6.546875 20.660156 7.71875 20.675781 7.71875 20.675781C8.921875 20.761719 9.554688 21.910156 9.554688 21.910156C10.625 23.746094 12.363281 23.214844 13.046875 22.910156C13.15625 22.132813 13.46875 21.605469 13.808594 21.304688C11.144531 21.003906 8.34375 19.972656 8.34375 15.375C8.34375 14.0625 8.8125 12.992188 9.578125 12.152344C9.457031 11.851563 9.042969 10.628906 9.695313 8.976563C9.695313 8.976563 10.703125 8.65625 12.996094 10.207031C13.953125 9.941406 14.980469 9.808594 16 9.804688C17.019531 9.808594 18.046875 9.941406 19.003906 10.207031C21.296875 8.65625 22.300781 8.976563 22.300781 8.976563C22.957031 10.628906 22.546875 11.851563 22.421875 12.152344C23.191406 12.992188 23.652344 14.0625 23.652344 15.375C23.652344 19.984375 20.847656 20.996094 18.175781 21.296875C18.605469 21.664063 18.988281 22.398438 18.988281 23.515625C18.988281 25.121094 18.976563 26.414063 18.976563 26.808594C18.976563 27.128906 19.191406 27.503906 19.800781 27.386719C24.566406 25.796875 28 21.300781 28 16C28 9.371094 22.628906 4 16 4Z"
                fill="#FFFFFF"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="flex flex-col p-2 gap-1">
        <h2 className="font-bold">Grid Size</h2>
        <Button onClick={() => setNodeSize(Size.big)}>Big</Button>{" "}
        {/*Big: [10, 18, 31] */}
        <Button onClick={() => setNodeSize(Size.default)}>Default</Button>{" "}
        {/*Default: [8, 23, 39] */}
        <Button onClick={() => setNodeSize(Size.small)}>Small</Button>{" "}
        {/*Small: [5, 37, 63] */}
      </div>
    </div>
  );
};

export default Header;
