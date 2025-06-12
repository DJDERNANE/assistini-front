import React, { useEffect, useRef, useState } from "react";
import icons from "../../../../constants/icons";
import CardEdit from "./CardEdit";

const CardSelect = ({ title, selected = "centre medical", type, setType }) => {
    const [selectFocused, setSelectFocused] = useState(false);

    const selectRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                // Click occurred outside of the div and its children
                setSelectFocused(false);
            }
        };

        // Add event listener to detect clicks on the document
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const selectData = [
        "centre medical",
        "cabinet medical",
        "clinique specialisee",
    ];

    return (
        <CardEdit>
            {selectFocused && (
                <div className="fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-30 z-40"></div>
            )}
            <div className="relative">
                <h3 className="font-medium first-letter:capitalize mb-3 text-sm">
                    {title}
                </h3>
                <div
                    ref={selectRef}
                    className={`border bg-gray-50 rounded-xl relative ${
                        selectFocused
                            ? "border-primary-100 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                            : "border-gray-300"
                    }`}
                    onClick={() => {
                        if (!selectFocused) setSelectFocused(true);
                    }}
                >
                    <p className="px-4 py-3 text-sm">{type}</p>
                    <img
                        src={icons.ArrowDown}
                        alt=""
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                    />
                    {selectFocused && (
                        <div className="absolute left-0 right-0 top-0 z-50 space-y-2">
                            {selectData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="w-full px-4 py-3 bg-white rounded-xl text-sm relative cursor-pointer"
                                    onClick={(e) => {
                                        setType(item);
                                        setSelectFocused(false);
                                    }}
                                >
                                    <p>{item}</p>
                                    {type === item && (
                                        <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white bg-secondary-100 rounded-full w-5 h-5 flex items-center justify-center">
                                            {/* {idx + 1} */}O
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CardEdit>
    );
};

export default CardSelect;
