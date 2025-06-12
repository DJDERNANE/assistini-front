/** @format */

import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CircularProgress,
    useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import useModal from "../modals/ConfrimModal";
import { useConfirmRDV, useDeleteRDV } from "../../hooks/useRDVsService";
import ReprogramPopUp from "../modals/ReprogramPopUp";

const WaitingCard = ({ item, handleSelected, fetchData }) => {
    const { t } = useTranslation("rdvs");

    const { onOpen, onClose, isOpen } = useDisclosure();

    const { loading: loadingDelete, onSubmit: onSubmitDelete } = useDeleteRDV(
        () => {
            fetchData();
        }
    );
    const { loading: loadingConfirm, onSubmit: onSubmitConfirm } =
        useConfirmRDV(() => {
            fetchData();
        });

    return (
        <Card borderRadius={"xl"} shadow={"sm"}>
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <div className="bg-red-50 rounded-full p-5 w-fit">
                        <p className="bg-red-200 rounded-full text-white w-6 h-6 flex items-center justify-center">
                            A
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl capitalize">
                            {item?.patientName === "x"
                                ? item?.nom
                                : item?.patientName}
                        </h3>
                        <p className="text-gray-400 font-light">
                            {item?.createdAt?.substring(0, 10)}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <h3 className="text-xl font-bold first-letter:capitalize">
                    {t("card.motif")}
                </h3>
                <p className="text-xl">{item?.motif}</p>
                <ul className="mt-2 font-light">
                    <li className="flex items-center space-x-2">
                        <p>{t("card.type")}:</p>
                        <p>{item?.mode}</p>
                    </li>
                    <li className="flex items-center space-x-2">
                        <p>
                            {item?.documents?.length > 1
                                ? t("card.documents")
                                : t("card.document")}
                            :
                        </p>
                        <p>
                            {item?.documents?.length} {t("card.file")}
                        </p>
                    </li>
                    <li className="flex items-center space-x-2">
                        <p>{t("card.date")}:</p>
                        <p>
                            {item?.appointmentDetails?.date?.substring(0, 10)}
                        </p>
                    </li>
                    <li className="flex items-center space-x-2">
                        <p>{t("card.hour")}:</p>
                        <p>
                            {item?.appointmentDetails?.from}
                            {" - "}
                            {item?.appointmentDetails?.to}
                        </p>
                    </li>
                </ul>
            </CardBody>
            <CardFooter className="">
                {/* {loadingConfirm && loadingDelete ? ( */}
                {loadingConfirm || loadingDelete ? (
                    <div className="flex items-center justify-center ">
                        <CircularProgress
                            isIndeterminate
                            selectedDeleted="blue.400"
                        />
                    </div>
                ) : (
                    <div className="space-x-4 flex items-center">
                        <CustomButton
                            name={t("card.accept")}
                            css="!bg-green-500 !w-[150px] text-sm !py-3 font-medium !px-4"
                            onClick={() => onSubmitConfirm(item.id)}
                        />
                        <CustomButton
                            name={t("card.refuse")}
                            css="!bg-gray-100 !w-[150px] text-sm !px-4 !py-3 font-medium !text-gray-700"
                            onClick={() => onSubmitDelete(item.id)}
                        />
                        {/* <CustomButton
                            name={t("card.reprogrammer")}
                            css="!bg-primary-100 !w-[150px] text-sm !px-4 !py-3 font-medium !text-white"
                            onClick={() => {
                                onOpen();
                            }}
                        /> */}
                    </div>
                )}
            </CardFooter>
            <ReprogramPopUp
                isOpen={isOpen}
                onClose={onClose}
                onClick={() => {}}
                item={item}
            />
        </Card>
    );
};

export default WaitingCard;
