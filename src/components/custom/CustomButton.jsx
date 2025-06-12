/** @format */

import React from "react";

const CustomButton = ({
    icon,
    name,
    onClick,
    inverse = false,
    css = "",
    cssImg = "",
    type = "button",
}) => {
    if (inverse)
        return (
            <button
                onClick={onClick}
                className={`blueButton space-x-4 ${css}`}
                type={type}
            >
                {icon && (
                    <img src={icon} alt={`icon ${name}`} className={cssImg} />
                )}
                {name && <p>{name}</p>}
            </button>
        );
    return (
        <button
            onClick={onClick}
            className={`blueButton space-x-4 ${css}`}
            type={type}
        >
            {name && <p>{name}</p>}
            {icon && <img src={icon} alt={`icon ${name}`} className={cssImg} />}
        </button>
    );
};

export default CustomButton;
