import React from "react";
import { classNames } from "..";

const Button: React.FC<{
  onClick?: () => unknown;
  style?: React.CSSProperties;
  classes?: string;
  children: React.ReactNode;
}> = ({children, onClick, style, classes }) => {
  return (
    <button
      style={style}
      className={classNames(
        classes,
        "bg-blue-600 text-white hover:bg-opacity-60 py-1 px-2 rounded-md select-none"
      )}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};
export default Button;
