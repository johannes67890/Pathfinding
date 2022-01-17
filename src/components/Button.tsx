import React from "react";

const Button: React.FC<{
  onClick?: () => unknown;
  style?: React.CSSProperties;
}> = ({ children, onClick, style }) => {
  return (
    <button
      style={style}
      className={`bg-blue-600 text-white hover:bg-opacity-60 py-1 px-2 rounded-md`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};
export default Button;
