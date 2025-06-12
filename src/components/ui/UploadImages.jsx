/** @format */

import React, { useEffect, useRef, useState } from "react";
// import { Icons, Images } from "../../constants";
// import CircleButton from "../ui/CircleButton";
// import uploadService from "../../services/uploadService";
import { useQuery } from "react-query";
import CustomButton from "../custom/CustomButton";
// import BoxUploadImage from "./BoxUploadImage";

const UploadImages = ({ setFiles, multiple = true }) => {
    const handleFileUpload = (event) => {
        const files = event.target.files;

        console.log("#######=", files);
        setFiles(files);
    };

    return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer text-center w-full">
            <input
                type="file"
                id="fileInput"
                multiple={multiple}
                className="hidden"
                onChange={handleFileUpload}
            />
            <label
                htmlFor="fileInput"
                className="bg-primary-100 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs md:text-base"
            >
                choisir des fichiers
            </label>
            {/* <p className="mt-2 text-gray-500 text-xs md:text-base">
                or drag and drop files
            </p> */}
        </div>
    );
};

export default UploadImages;
