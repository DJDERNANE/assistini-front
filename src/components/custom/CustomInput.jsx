/** @format */

import React, { useRef } from "react";
import { Input } from "@chakra-ui/react";

const CustomInput = ({
    icon,
    placeholder,
    type = "text",
    register = null,
    css = "",
    field = {},
    value = "",
    disabled = false,
}) => {
    return (
        <div className="relative ">
            {icon && (
                <img
                    src={icon}
                    alt="icon input"
                    className="w-6 absolute left-4 top-1/2 -translate-y-1/2 z-10"
                />
            )}
            <Input
                {...field}
                type={type}
                {...register}
                placeholder={placeholder}
                readOnly={disabled}
                className={`!text-neutral-700 ${
                    icon ? "!px-12" : "!px-4"
                } !text-xs !py-3 !w-full !bg-white !placeholder:text-[#CED2FA] !border-[#D3E1FF] !rounded-lg ${css}`}
            />
        </div>
    );
};

export default CustomInput;
