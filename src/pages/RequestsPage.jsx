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

import { CircularProgress, Spinner } from "@chakra-ui/react";
import CardDocumentPatient from "../components/ui/CardDocumentPatient";
import {
    useAcceptAccessFile,
    useGetRequestsFile,
    useRefuseAccessFile,
} from "../hooks/useRDVsService";
const RequestPage = () => {
    const { t } = useTranslation("home");
    const [select, setSelect] = useState(0);

    const { isLoading, fetchData, data } = useGetRequestsFile();

    useEffect(() => {
        fetchData();
    }, []);

    const { loading, onSubmit } = useAcceptAccessFile(() => {
        fetchData();
    });
    const { loading: loadingRefuse, onSubmit: onSubmitRefuse } =
        useRefuseAccessFile(() => {
            fetchData();
        });

    return (
        <div className="pb-6 px-2 md:px-6 bg-white rounded-xl overflow-hidden">
            <div className="bg-white rounded py-4 flex items-center justify-between">
                <h1 className="mb-2 font-semibold text-lg md:text-xl capitalize">
                    {t("request.title")}
                </h1>
                <button
                    className="bg-primary-100 p-2 rounded-lg"
                    onClick={fetchData}
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
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
                        <path d="M20 4v5h-5" />
                    </svg>
                </button>
            </div>
            <div className="bg-[#f5f9fe] rounded-xl px-2 md:px-14 py-2 md:py-6 h-[500px] overflow-y-auto gap grid gap-2">
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
                    Object.keys(data)?.length > 0 &&
                    data?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl px-4 py-2 h-fit border flex flex-col md:flex-row md:items-end justify-between"
                        >
                            <div className="text-xs md:text-base mb-2 md:mb-0">
                                <p className="space-x-2">
                                    <span className="font-semibold">
                                        Médecin:
                                    </span>
                                    <span>{item?.cabinName}</span>
                                </p>
                                <p className="space-x-2">
                                    <span className="font-semibold">
                                        date planifiée:
                                    </span>
                                    <span>{item?.date?.substring(0, 10)}</span>
                                </p>
                                <p className="space-x-2">
                                    <span className="font-semibold">
                                        Heure prévue:
                                    </span>
                                    <span>{item?.date?.substring(14, 22)}</span>
                                </p>
                                <p className="space-x-2">
                                    <span className="font-semibold">
                                        Patient(e) concerné(e):
                                    </span>
                                    <span>{item?.patientName}</span>
                                </p>
                            </div>

                            {item?.files_access === 1 && (
                                <p className="border border-green-400 bg-green-400/10 rounded-full text-green-400 font-bold text-xs py-1 px-4 first-letter:capitalize text-center">
                                    Données partagées
                                </p>
                            )}
                            {item?.files_access === 3 && (
                                <p className="border border-red-400 bg-red-400/10 rounded-full text-red-400 font-bold text-xs py-1 px-4 first-letter:capitalize text-center">
                                    Données partagées
                                </p>
                            )}
                            {item?.files_access === 2 && (
                                <div>
                                    {loadingRefuse || loading ? (
                                        <div className="flex items-center justify-center h-fit">
                                            <CircularProgress
                                                isIndeterminate
                                                color="blue.400"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="bg-red-500 rounded-lg text-white px-4 py-2 mt-2 text-xs md:text-base"
                                                onClick={() => {
                                                    onSubmitRefuse(item?.id);
                                                }}
                                            >
                                                Refuser
                                            </button>
                                            <button
                                                className="bg-primary-100 rounded-lg text-white px-4 py-2 mt-2 text-xs md:text-base"
                                                onClick={() => {
                                                    onSubmit(item?.id);
                                                }}
                                            >
                                                Accepter
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RequestPage;
