/** @format */

import React, { useState } from "react";
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

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Show preview immediately
        const localPreview = URL.createObjectURL(file);
        setImageSrc(localPreview);
        setImageFile(file);

        const formData = new FormData();
        formData.append("logo", file);

        try {
            const response = await fetch(`${process.env.REACT_APP_URL_API}/users`, {
                method: "PUT",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ User updated:", data);

                // If backend returns updated logo path, update the image
                if (data?.updatedLogo || data?.logo) {
                    const newLogoPath = data.updatedLogo || data.logo;
                    setImageSrc(`${process.env.REACT_APP_URL_API}/${newLogoPath}`);
                    setValue("logo", newLogoPath);
                }
            } else {
                console.error("❌ Error updating user:", data);
            }
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <CardEdit>
            <h3 className="font-medium first-letter:capitalize mb-3 text-xs md:text-sm">
                {title}
            </h3>
            <div className="flex items-center space-x-4 w-full">
                <div className="min-w-[80px] min-h-[80px] rounded-full border border-primary-100 bg-primary-100 bg-opacity-10 flex items-center justify-center overflow-hidden">
                    {imageSrc ? (
                        <img
                            src={imageSrc.startsWith("blob:") ? imageSrc : `${process.env.REACT_APP_URL_API}/${imageSrc}`}
                            alt="Profile"
                            className="w-[80px] h-[80px] object-cover"
                        />
                    ) : (
                        <p className="uppercase font-medium">
                            {name.substring(0, 3)}
                        </p>
                    )}
                </div>

                <div className="w-full space-y-3">
                    {/* Upload button */}
                    <button
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-center space-x-2 font-medium cursor-pointer text-xs md:text-base"
                        type="button"
                    >
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleUpload}
                            style={{ display: "none" }}
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

                    {/* Delete button */}
                    {imageSrc && (
                        <button
                            type="button"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-center space-x-2 text-red-600 font-medium text-xs md:text-base"
                            onClick={() => {
                                setImageSrc(null);
                                setImageFile(null);
                                setValue("logo", null);
                                if (handleDelete) handleDelete();
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
