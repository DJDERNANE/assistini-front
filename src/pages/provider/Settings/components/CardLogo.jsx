/** @format */

import React, { useEffect, useState } from "react";
import CardEdit from "./CardEdit";
import icons from "../../../../constants/icons";
import { useTranslation } from "react-i18next";

const CardLogo = ({
    imageSrc,
    setImageSrc,
    imageFile,
    setImageFile,
    title,
    image,
    name = "",
    setValue,
    handleDelete,
}) => {
    const { t } = useTranslation("settings");

    const handleUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(event.target.files[0]);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleDelete = () => {
    // setImageSrc(null);
    // };

    // console.log("####", image, "@@@", imageSrc);

    // useEffect(() => {
    //     if (image) setImageSrc(`${process.env.REACT_APP_URL_API}/${image}`);
    // }, [image]);

    return (
        <CardEdit>
            <h3 className="font-medium first-letter:capitalize mb-3 text-xs md:text-sm">
                {title}
            </h3>
            <div className="flex items-center space-x-4 w-full">
                <div className="min-w-[80px] min-h-[80px] rounded-full border border-primary-100 bg-primary-100 bg-opacity-10 flex items-center justify-center overflow-hidden">
                    {imageSrc ? (
                        <img
                            // src={imageSrc}
                            src={`${process.env.REACT_APP_URL_API}/${imageSrc}`}
                            alt="Uploaded"
                            className="w-[80px] h-[80px] object-cover"
                        />
                    ) : (
                        <p className="uppercase font-medium">
                            {name.substring(0, 3)}
                        </p>
                    )}
                </div>

                <div className="w-full space-y-3">
                    <button
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-center space-x-2 font-medium cursor-pointer text-xs md:text-base"
                        type="button"
                    >
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleUpload}
                            style={{ display: "none" }}
                            className="text-xs md:text-base"
                        />
                        <label
                            htmlFor="file-upload"
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <img src={icons.camera} alt="" className="w-4" />
                            <p className="first-letter:capitalize">
                                {t("admin.upload")}
                            </p>
                        </label>
                    </button>
                    {imageSrc && (
                        <button
                            type="button"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-center space-x-2 text-red-600 font-medium  text-xs md:text-base"
                            onClick={(e) => {
                                // e.preventDefault();
                                setImageSrc(null);
                                // handleDelete();
                                setValue("logo", null);
                            }}
                        >
                            <img src={icons.trash} alt="" className="w-4" />
                            <p className="first-letter:capitalize">
                                {t("admin.delete")}
                            </p>
                        </button>
                    )}
                </div>
            </div>
        </CardEdit>
    );
};

export default CardLogo;
