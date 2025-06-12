/** @format */

import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import icons from "../../constants/icons";

const CardDocumentPatient = ({ item }) => {
    const { t } = useTranslation("home");

    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        const fileUrl = `${process.env.REACT_APP_URL_API}/${item.path}`;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = item.path.split("/")[1];
        link.click();
    };

    return (
        <div
            className={`px-4 py-3 flex items-center justify-between rounded-lg border border-gray-300`}
        >
            <div className="flex items-center space-x-3">
                <div className="min-h-[30px] min-w-[30px] bg-primary-100 bg-opacity-5 p-2 rounded-full">
                    <div className="rounded-full bg-secondary-100 relative w-[26px] h-[26px]">
                        <img
                            src={icons.document}
                            alt=""
                            className="absolute -bottom-1 -left-1"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-xs md:text-sm first-letter:capitalize truncate w-[150px]">
                        {item?.doc_name}
                    </p>
                    <p className="text-xs md:text-sm text-primary-100">
                        {item?.created_at?.substring(0, 10)}
                    </p>
                </div>
            </div>
            <a
                className={`border rounded-full border-gray-400 bg-white md:px-2 flex items-center justify-between md:px-4 py-2 flex items-center !w-[30px] md:!w-[160px] ${
                    loading ? "bg-gray-100 opacity-50" : ""
                }`}
                href={`${process.env.REACT_APP_URL_API}/${item?.doc_path}`}
                target="_blank"
            >
                <img src={icons.documentUpload} alt="" className="w-4 md:w-6" />
                <span className="hidden md:block text-xs first-letter:capitalize font-medium text-primary-100 cursor-pointer">
                    {t("doc.download")}
                </span>
            </a>
        </div>
    );
};

export default CardDocumentPatient;
