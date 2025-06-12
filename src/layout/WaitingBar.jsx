/** @format */

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Icons, Images } from "../constants";
import { useMe } from "../hooks/useAuthService";
import { Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import icons from "../constants/icons";
import { useGetTodayRDV } from "../hooks/useRDVsService";

const WaitingBar = () => {
    const { t } = useTranslation("home");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { isLoading, fetchData, data } = useGetTodayRDV();

    useEffect(() => {
        fetchData();
    }, []);

    if (
        !data ||
        !data?.data ||
        !data?.data?.data ||
        data?.data?.data?.length === 0
    )
        return null;

    return (
        <Card borderRadius={"xl"} padding={0}>
            <CardBody padding={0}>
                <div className="rounded-xl overflow-hidden">
                    <div className="text-white bg-[#167FFA] p-6">
                        <div className="flex !items-center space-x-4 mb-4">
                            <p className="text-base md:text-xl font-bold text-white roboto self-center w-[230px] first-letter:capitalize">
                                {t("bar.waiting-title")}
                            </p>
                            <div>
                                <img
                                    src={icons.Clock}
                                    alt=""
                                    className="min-w-12 min-h-12 rounded-full"
                                />
                            </div>
                        </div>
                        <h3 className="capitalize text-4xl md:text-6xl font-bold text-white roboto">
                            {data?.data?.data[0]?.patientsBefore + 1}
                            {data?.data?.data[0]?.patientsBefore === 0
                                ? t("bar.er")
                                : t("bar.eme")}
                        </h3>
                        <p className="text-sm md:text-lg font-bold text-white roboto mt-4">
                            {data?.data?.data[0]?.patientsBefore}{" "}
                            {t("bar.patient-before")}
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default WaitingBar;
