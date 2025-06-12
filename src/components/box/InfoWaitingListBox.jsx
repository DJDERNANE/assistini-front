/** @format */

import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { Images } from "../../constants";
import { useGetAllRDVWaitingList } from "../../hooks/useRDVsService";

const InfoWaitingListBox = ({ total }) => {
    const { t } = useTranslation("rdvs");

    const { data, isLoading, fetchData } = useGetAllRDVWaitingList();
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card borderRadius={"xl"} shadow={"sm"}>
            <CardHeader>
                <div className="">
                    <h1 className="font-semibold text-4xl uppercase">
                        {t("info.title")}
                    </h1>
                    <p className="text-lg">{t("info.description")}</p>
                </div>
            </CardHeader>
            <CardBody>
                <CustomButton
                    name={t("info.read")}
                    css="!bg-gray-900 !w-[100px] text-sm !py-2 font-medium"
                />
                <div className="mt-20 grid grid-cols-3 grid-rows-2 gap-5 h-[300px]">
                    <img
                        src={Images.RDV1}
                        alt=""
                        className="rounded-full h-full w-full object-cover"
                    />
                    <img
                        src={Images.RDV1}
                        alt=""
                        className="row-span-2 col-span-2 object-cover rounded-xl h-full w-full"
                    />
                    <div className="bg-green-300 rounded-xl flex flex-col justify-between h-full w-full p-4">
                        <p className="text-lg font-bold uppercase">
                            {t("info.rdv")}
                        </p>
                        <p className="font-bold text-2xl">
                            {data?.data?.length ?? 0}+
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default InfoWaitingListBox;
