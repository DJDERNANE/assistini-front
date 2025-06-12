import React from "react";

const CircleButton = ({
  icon,
  name,
  onClick,
  bg = "",
  cssIcon = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[30px] md:w-[40px] h-[30px] md:h-[40px] rounded-full ${bg} ${
        disabled && "opacity-40"
      } flex items-center justify-center`}
      disabled={disabled}
    >
      <img
        src={icon}
        alt={`icon ${name}`}
        className={`w-[30px] h-[30px] ${cssIcon}`}
      />
    </button>
  );
};

export default CircleButton;
