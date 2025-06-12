import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    CircularProgress,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Icons } from "../../constants";

const ReprogramPopUp = ({ isOpen, onClose, onClick, item = {} }) => {
    const { t } = useTranslation("popup");

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
            }}
            size={"md"}
            isCentered
        >
            <ModalOverlay />
            <ModalContent borderRadius={"2xl"}>
                <ModalHeader className="flex items-center justify-between"></ModalHeader>
                <ModalBody className="mb-2 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold first-letter:capitalize">
                        {t("reprogram.title")}
                    </h3>
                    <p className="text-sm mb-8">{t("reprogram.description")}</p>

                    <p className="text-sm w-full text-left">
                        <span className="font-semibold first-letter:capitalize pr-4">
                            {t("reprogram.patient")}:
                        </span>{" "}
                        {item?.patientName}
                    </p>
                    <p className="text-sm w-full text-left">
                        <span className="font-semibold first-letter:capitalize pr-4">
                            {t("reprogram.phone")}:
                        </span>{" "}
                        {item?.phone}
                    </p>
                    <p className="text-sm w-full text-left">
                        <span className="font-semibold first-letter:capitalize pr-4">
                            {t("reprogram.date")}:
                        </span>{" "}
                        {item?.appointmentDate}
                    </p>
                    <p className="text-sm w-full text-left">
                        <span className="font-semibold first-letter:capitalize pr-4">
                            {t("reprogram.hour")}:
                        </span>{" "}
                        {item?.appointmentFrom}
                        {" - "}
                        {item?.appointmentTo}
                    </p>

                    <div className="mt-4 flex items-center space-x-2">
                        <button
                            className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                            onClick={onClose}
                        >
                            <p>{t("confirm-logout.cancel")}</p>
                        </button>
                        <button
                            className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                            onClick={onClick}
                        >
                            <p>{t("confirm-logout.continue")}</p>
                        </button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ReprogramPopUp;
