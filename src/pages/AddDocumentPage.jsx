/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import NotificationBox from "../layout/NotificationBox";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import { Icons, Images } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import { useGetAllFavorites } from "../hooks/useProviderService";
import { Spinner } from "@chakra-ui/react";
import CardDocumentPatient from "../components/ui/CardDocumentPatient";
import { useGetAllPatientDoc } from "../hooks/usePatientService";
import UploadImages from "../components/ui/UploadImages";
import axios from "axios";
const AddDocumentPage = () => {
    const { t } = useTranslation("home");
    const [value, setValue] = useState([]);
    const [nameFile, setNameFile] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        // Create a FormData object
        const formData = new FormData();
        formData.append("document", value[0]);
        formData.append("documentName", nameFile);

        try {
            // Send data to the API
            const response = await axios.post(
                process.env.REACT_APP_URL_API + "/users/uploadDocs",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            if (response?.data?.success) {
                console.log("User updated successfully", response.data);
                navigate("/home/documents");
            }
        } catch (error) {
            // setError(error?.response?.data?.message);
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-2 md:px-6 bg-white rounded-xl pb-6 overflow-hidden w-full">
            <div className="bg-white rounded py-4">
                <h1 className="mb-2 font-semibold text-lg md:text-xl capitalize">
                    {t("doc.title")}
                </h1>
            </div>
            <div className="bg-[#f5f9fe] rounded-xl px-2 md:px-6 py-2 md:py-6 h-[500px] w-full overflow-y-auto flex items-center justify-center flex-col">
                <UploadImages setFiles={setValue} multiple={false} />
                {Object.values(value)?.map((file) => (
                    <p className="border w-full rounded-lg px-2 mt-1">
                        {file?.name}
                    </p>
                ))}
                <div className="w-full">
                    <input
                        value={nameFile}
                        onChange={(e) => setNameFile(e.target.value)}
                        placeholder={t("doc.name-file")}
                        className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full text-xs md:text-base"
                    />
                </div>
                {loading ? (
                    <div className="w-full flex items-center justify-center h-[300px]">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </div>
                ) : (
                    <button
                        className="bg-primary-100 px-4 py-2 rounded-lg font-semibold text-white mt-4 text-xs md:text-base"
                        onClick={handleSubmit}
                        disabled={!nameFile || !value}
                    >
                        {t("doc.add")}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddDocumentPage;
