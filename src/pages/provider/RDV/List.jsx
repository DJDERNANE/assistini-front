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
import {
    useGetAllConfirmedList,
    useGetAllWaitingList,
} from "../../../hooks/useWaitingListService";
import ConfirmDeletePopUp from "./components/ConfirmDeletePopUp";
import {
    useDeleteRDV,
    useRequestFileAccess,
} from "../../../hooks/useRDVsService";
import { Icons, Images } from "../../../constants";
import icons from "../../../constants/icons";
import images from "../../../constants/images";

const List = () => {
    const { t } = useTranslation("rdvs");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selected, setSelected] = useState(0);
    const [selectedDeleted, setColor] = useState(null);

    const totalPages = 1;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log("Page changed to:", page);
        // Handle your data fetch or page change logic here
    };

    const { isLoading, data, isError, error, refetch } =
        useGetAllConfirmedList();

    const { loading, onSubmit } = useDeleteRDV(() => {
        refetch();
        setSelected(0);
        onClose();
    });

    useEffect(() => {
        if (data && data.data && data.data.data && !selected)
            setSelected({ ...data.data.data[0], number: 0 });
    }, [data]);

    const handleRightClick = (event, item) => {
        event.preventDefault(); // Prevents the default right-click menu
        setColor(item); // Change selectedDeleted to red on right-click
        onOpen();
    };

    const navigate = useNavigate();

    return (
        <div className="">
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <CircularProgress
                        isIndeterminate
                        selectedDeleted="blue.400"
                    />
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        <p className="text-sm text-gray-400">
                            {data?.data?.meta?.totalRecords}{" "}
                            {data?.data?.meta?.totalRecords?.length > 0
                                ? t("general.resultss")
                                : t("general.results")}
                        </p>
                        <Pagination
                            totalPages={data?.data?.meta?.totalPages}
                            currentPage={data?.data?.meta?.currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {data &&
                            data?.data &&
                            data?.data?.data?.length > 0 &&
                            data?.data?.data?.map((item, idx) => (
                                <CardRdv
                                    key={idx}
                                    item={{ ...item, number: idx }}
                                    selected={selected.number === idx}
                                    setSelected={setSelected}
                                    selectedDelete={selectedDeleted}
                                    handleDelete={(e) =>
                                        handleRightClick(e, item)
                                    }
                                    refetch={refetch}
                                />
                            ))}
                        <div
                            onClick={() => navigate("./add")}
                            className={`px-4 py-4 flex items-center space-x-3 rounded-lg border border-primary-100 cursor-pointer `}
                        >
                            <div
                                className={`w-full rounded-full flex items-center justify-center ${
                                    selected
                                        ? "bg-white bg-opacity-70"
                                        : `bg-primary-100 bg-opacity-20`
                                } `}
                            >
                                <img
                                    src={Icons.PlusCircle}
                                    className="w-[40px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end w-full border-t pt-6 mt-6 gap-x-4">
                        <button
                            className="bg-primary-100 p-2 rounded-lg"
                            onClick={() => refetch()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-reload"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
                                <path d="M20 4v5h-5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                navigate("service/" + selected?.id);
                            }}
                            className="bg-secondary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white text-sm md:text-base"
                        >
                            {t("general.payment")}
                        </button>
                    </div>

                    <div className="border-b w-full mt-6 mb-4">
                        <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
                            {t("list.profile")}
                        </h3>
                    </div>
                    <PatientData data={selected} />

                    <div className="border-b w-full mt-6 mb-4">
                        <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
                            {t("list.documents")}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selected &&
                            selected?.documents?.map((item, idx) => (
                                <CardDocument item={item} />
                            ))}
                    </div>
                    <div className="border-b w-full mt-6 mb-4">
                        <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
                            {t("list.documents-shared")}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selected &&
                            selected?.patientFiles?.map((item, idx) => (
                                <CardDocument item={item} />
                            ))}
                    </div>
                </div>
            )}

            <ConfirmDeletePopUp
                isOpen={isOpen}
                onClose={() => {
                    setColor({});
                    onClose();
                }}
                onDelete={() => {
                    if (selectedDeleted?.id) onSubmit(selectedDeleted?.id);
                }}
                loading={loading}
            />
        </div>
    );
};

export default List;
