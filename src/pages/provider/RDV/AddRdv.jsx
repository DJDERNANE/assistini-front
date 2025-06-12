/** @format */

import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
    CircularProgress,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CardRdv from "./components/CardRdv";
import AddPatientForm from "../../../components/form/AddPatientForm";
import PatientData from "./components/PatientData";
import CardDocument from "./components/CardDocument";
import Pagination from "../../../layout/Pagination";
import { useGetAllWaitingList } from "../../../hooks/useWaitingListService";
import ConfirmDeletePopUp from "./components/ConfirmDeletePopUp";
import { useDeleteRDV } from "../../../hooks/useRDVsService";
import { Icons, Images } from "../../../constants";
import icons from "../../../constants/icons";
import images from "../../../constants/images";
import FormPatientData from "./components/FormPatientData";
import FormRdvData from "./components/FormRdvData";
import axios from "axios";

const AddRdv = () => {
    const { t } = useTranslation("rdvs");

    const [selected, setSelected] = useState(0);
    const [dataPatient, setDataPatient] = useState({});
    const [dateRdv, setDateRdv] = useState("");
    const [dataType, setDataType] = useState({});

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        // Create a FormData object
        const formData = new FormData();
        let arr = Object.keys(dataPatient);
        for (let i = 0; i < arr.length; i++) {
            formData.append(arr[i], dataPatient[arr[i]]);
        }
        arr = Object.keys(dataType);
        for (let i = 0; i < arr.length; i++) {
            formData.append(arr[i], dataType[arr[i]]);
        }
        if (dateRdv) {
            const splitDateRdv = dateRdv.split("|");
            formData.append("from", splitDateRdv[0]);
            formData.append("to", splitDateRdv[1]);
            formData.append("date", splitDateRdv[2]);
        }

        try {
            // Send data to the API
            const response = await axios.post(
                process.env.REACT_APP_URL_API + "/rdv/createandbook",
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
            console.log("User updated successfully", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="">
            <div>
                <div className="flex items-center justify-end w-full">
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <CircularProgress
                                isIndeterminate
                                selectedDeleted="blue.400"
                            />
                        </div>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="bg-secondary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white text-sm md:text-base"
                        >
                            {t("general.add-new-rdv")}
                        </button>
                    )}
                </div>

                <div className="border-b w-full mt-6 mb-4">
                    <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
                        {t("list.patient-info")}
                    </h3>
                </div>
                <FormPatientData setData={setDataPatient} />

                <div className="border-b w-full mt-6 mb-4">
                    <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
                        {t("list.book-rdv")}
                    </h3>
                </div>

                <FormRdvData
                    value={dateRdv}
                    setValue={setDateRdv}
                    setData={setDataType}
                />
            </div>
        </div>
    );
};

export default AddRdv;
