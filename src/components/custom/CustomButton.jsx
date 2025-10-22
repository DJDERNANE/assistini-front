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
    disabled = false,
}) => {
    if (inverse)
        return (
            <button
                onClick={onClick}
                className={`blueButton  space-x-4 ${css} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                type={type}

                disabled={disabled}
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
            className={`blueButton space-x-4 ${css} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            type={type}
            disabled={disabled}
        >
            {name && <p>{name}</p>}
            {icon && <img src={icon} alt={`icon ${name}`} className={cssImg} />}
        </button>
    );
};

export default CustomButton;
