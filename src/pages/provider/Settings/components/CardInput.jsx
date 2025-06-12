/** @format */

import React, { useState } from "react";
import icons from "../../../../constants/icons";
import CardEdit from "./CardEdit";

const CardInput = ({
    title,
    disabled = false,
    type = "text",
    register = null,
    value,
    setValue,
}) => {
    const [inputFocused, setInputFocused] = useState(false);

    const handleInputFocus = () => {
        setInputFocused(true);
    };
    const handleInputBlur = () => {
        setInputFocused(false);
    };

    return (
        <CardEdit>
            <h3 className="font-medium first-letter:capitalize mb-1 md:mb-3 text-xs md:text-sm">
                {title}
            </h3>
            <div
                className={`border bg-gray-50 rounded-xl relative overflow-hidden ${
                    inputFocused && !disabled
                        ? "border-primary-100 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                        : "border-gray-300"
                }`}
            >
                {register === null ? (
                    <input
                        disabled={disabled}
                        type={type}
                        className={`w-full bg-transparent outline-none py-3 pl-4 pr-14 text-xs md:text-sm ${
                            inputFocused && !disabled ? "text-primary-100" : ""
                        }`}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        value={value}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                ) : (
                    <input
                        disabled={disabled}
                        type={type}
                        className={`w-full bg-transparent outline-none py-3 pl-4 pr-14 text-sm ${
                            inputFocused && !disabled ? "text-primary-100" : ""
                        }`}
                        {...register}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                )}

                {!disabled &&
                    (inputFocused ? (
                        <img
                            src={icons.editBleu}
                            alt=""
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                        />
                    ) : (
                        <img
                            src={icons.editGray}
                            alt=""
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                        />
                    ))}
            </div>
        </CardEdit>
    );
};

export default CardInput;
