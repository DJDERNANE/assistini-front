/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import NotificationBox from "../layout/NotificationBox";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import { Icons, Images } from "../constants";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import { useGetAllFavorites } from "../hooks/useProviderService";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useDeleteRDV, useGetAllRDV } from "../hooks/useRDVsService";
import ConfirmDeleteRdvPopUp from "./patient/ConfirmDeleteRdvPopUp";
import patientService from "../services/patientService";
const MyRDVPage = () => {
    const { t } = useTranslation("home");
    const [select, setSelect] = useState(null);

    const { isLoading, fetchData, data } = useGetAllRDV();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchData();
    }, []);

    const { loading, onSubmit } = useDeleteRDV(() => {
        fetchData();
        setSelect(null);
        onClose();
    });

    const calculateDaysLeft = (targetDate) => {
        const today = new Date();
        const timeDiff = targetDate - today;
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    return (
        <div className="pb-6 px-2 md:px-6 bg-white rounded-2xl overflow-hidden">
            <div className="bg-white rounded py-4  flex items-center justify-between">
                <h1 className="mb-2 font-semibold text-lg md:text-xl capitalize">
                    {t("my-rdvs.title")}
                </h1>

                <button
                    className="bg-primary-100 p-2 rounded-lg"
                    onClick={fetchData}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-reload"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
                        <path d="M20 4v5h-5" />
                    </svg>
                </button>
            </div>
            <div className="bg-[#f5f9fe] rounded-xl px-2 md:px-6 py-2 md:py-6 h-[500px] overflow-y-auto space-y-4">
                {isLoading ? (
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
                    data?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl px-6 py-4"
                        >
                            <div className="mb-4 flex items-center space-x-4 text-xl">
                                <div className="min-w-[40px] md:w-[72px] h-[40px] md:h-[72px] rounded-full bg-[#E8667C33] flex items-center justify-center">
                                    <div className="min-w-[20px] md:w-[27px] h-[20px] md:h-[27px] rounded-full bg-[#ED1E24] text-white text-xs md:text-sm flex items-center justify-center">
                                        A
                                    </div>
                                </div>
                                <div>
                                    <Link
                                        to={`/doctors/${item?.providerId}`}
                                        className="text-gray-500 cursor-pointer hover:text-primary-100 hover:underline duration-300 transform text-sm md:text-md"
                                    >
                                        {item?.cabinName}
                                    </Link>
                                    <p className="text-xs md:text-sm text-gray-400">
                                        {item?.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2">
                                <div className="md:space-y-2 grid grid-cols-2 md:block">
                                    <h3 className="text-sm md:text-lg font-bold first-letter:capitalize">
                                        {t("my-rdvs.motif")}:
                                    </h3>
                                    <p className="font-light first-letter:capitalize text-sm md:text-base">
                                        {item?.motif}
                                    </p>
                                    <h3 className="text-sm md:text-lg font-bold first-letter:capitalize">
                                        {t("my-rdvs.patient")}:
                                    </h3>
                                    <p className="first-letter:capitalize text-sm md:text-base">
                                        {item?.patientName === "x"
                                            ? t("my-rdvs.moi-meme")
                                            : item?.patientName}
                                    </p>
                                </div>
                                <div className="text-sm md:text-base pt-4 md:pt-0 space-y-1">
                                    <p className="space-x-3">
                                        <span>{t("my-rdvs.type")}:</span>
                                        <span>{item?.mode}</span>
                                    </p>
                                    <p className="space-x-3">
                                        <span>{t("my-rdvs.document")}:</span>
                                        <span>{item?.documents}</span>
                                    </p>
                                    <p className="space-x-3">
                                        <span>{t("my-rdvs.date")}:</span>
                                        <span>
                                            {item?.date?.substring(0, 10)}
                                        </span>
                                    </p>
                                    <p className="space-x-3">
                                        <span>{t("my-rdvs.heure")}:</span>
                                        <span>
                                            {item?.from?.substring(0, 5)}
                                            {" - "}
                                            {item?.to?.substring(0, 5)}
                                        </span>
                                    </p>
                                    <p className="space-x-3">
                                        <span>{t("my-rdvs.status")}:</span>
                                        <span>{item?.status}</span>
                                    </p>
                                </div>
                            </div>

                            {item?.status !== "closed" && (
                                <div className="flex items-center flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-6">
                                    <div className="bg-green-400 text-white w-full md:w-fit p-2 rounded-lg font-semibold">
                                        <p className="text-center text-sm md:text-base">
                                            {t("my-rdvs.left-1")}{" "}
                                            {calculateDaysLeft(
                                                new Date(item?.date)
                                            )}{" "}
                                            {t("my-rdvs.left-2")}
                                        </p>
                                    </div>
                                    <button
                                        className="bg-red-600 text-white p-2 rounded-lg font-semibold w-full md:w-fit"
                                        onClick={() => {
                                            setSelect(item?.id);
                                            onOpen();
                                        }}
                                    >
                                        <p className=" text-sm md:text-base">
                                            {t("my-rdvs.delete")}
                                        </p>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <ConfirmDeleteRdvPopUp
                isOpen={isOpen}
                onClose={onClose}
                loading={loading}
                onDelete={() => {
                    onSubmit(select);
                }}
            />
        </div>
    );
};

export default MyRDVPage;
