/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRequestFileAccess } from "../../../../hooks/useRDVsService";
import { CircularProgress } from "@chakra-ui/react";

const CardRdv = ({
    item,
    selected,
    setSelected,
    selectedDelete = {},
    handleDelete,
    refetch = () => {},
}) => {
    const { t } = useTranslation("rdvs");

    const { loading, onSubmit } = useRequestFileAccess(() => {
        refetch();
    });

    return (
        <div
            onClick={() => setSelected(item)}
            onContextMenu={handleDelete}
            className={`px-4 py-4 flex flex-col items-center rounded-lg border group ${
                selectedDelete?.id === item.id && "!bg-red-500 !border-red-500"
            } border-primary-100 cursor-pointer ${
                selected && "bg-primary-100"
            }`}
        >
            <div className="flex items-center space-x-3">
                <div
                    className={`min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center ${
                        selected
                            ? "bg-white bg-opacity-70"
                            : `bg-primary-100 bg-opacity-20`
                    } `}
                >
                    <p
                        className={` text-xl font-semibold ${
                            selectedDelete?.id === item.id
                                ? "text-white"
                                : "text-primary-100"
                        } `}
                    >
                        {item.number + 1}
                    </p>
                </div>
                <div>
                    <h4
                        className={`w-[100px] mb-1 truncate text-sm font-medium first-letter:capitalize ${
                            (selected || selectedDelete?.id === item.id) &&
                            "text-white"
                        }`}
                    >
                        {item.patientName === "x"
                            ? item?.nom
                            : item?.patientName}
                    </h4>
                    <p
                        className={`first-letter:capitalize text-xs font-light ${
                            selected || selectedDelete?.id === item.id
                                ? "text-white"
                                : "text-primary-100"
                        }`}
                    >
                        motif: {item.motif}
                    </p>
                </div>
            </div>

            {true && (
                <div className="w-full mt-4 hidden group-hover:block duration-200 transform">
                    {loading ? (
                        <div className="flex items-center justify-center h-fit">
                            <CircularProgress
                                isIndeterminate
                                color="blue.400"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-end">
                            {item?.accessFiles === 1 && (
                                <div className="bg-green-500 h-8 w-8 rounded-lg flex items-center justify-center">
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
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                                        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                                        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                                        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                                        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                                        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                                        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                                        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                </div>
                            )}
                            {item?.accessFiles === 3 && (
                                <div className="bg-red-500 h-8 w-8 rounded-lg flex items-center justify-center">
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
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-minus"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                                        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                                        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                                        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                                        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                                        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                                        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                                        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                                        <path d="M9 12h6" />
                                    </svg>
                                </div>
                            )}
                            {item?.accessFiles === 2 && (
                                <div className="bg-orange-400 h-8 w-8 rounded-lg flex items-center justify-center">
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
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-clock-pause"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M20.942 13.018a9 9 0 1 0 -7.909 7.922" />
                                        <path d="M12 7v5l2 2" />
                                        <path d="M17 17v5" />
                                        <path d="M21 17v5" />
                                    </svg>
                                </div>
                            )}
                            {item?.accessFiles === 0 && (
                                <button
                                    className={`${
                                        selected
                                            ? "bg-white text-primary-100"
                                            : "bg-primary-100 text-white"
                                    } rounded-lg w-full py-2 text-sm`}
                                    onClick={() => {
                                        onSubmit(item?.id);
                                    }}
                                >
                                    {t("general.request")}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CardRdv;
