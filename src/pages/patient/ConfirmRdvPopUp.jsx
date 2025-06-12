/** @format */

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
import { Icons } from "../../constants";

const ConfirmRdvPopUp = ({
    isOpen,
    onClose,
    onClick,
    error = "",
    loading = false,
}) => {
    const { t } = useTranslation("popup");

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
            }}
            size={"3xl"}
            isCentered
        >
            <ModalOverlay />
            <ModalContent borderRadius={"2xl"}>
                <ModalHeader className="flex items-center justify-between"></ModalHeader>
                <ModalBody className="mb-2 flex flex-col items-center justify-center">
                    <div className="bg-blue-600/40 flex items-center justify-center p-2 rounded-full mb-4">
                        <img src={Icons.checkBlue} alt="" />
                    </div>
                    <h3 className="text-lg font-semibold first-letter:capitalize text-primary-100">
                        {t("confirm-rdv-patient.title")}
                    </h3>
                    <p className="text-sm">
                        {t("confirm-rdv-patient.description")}
                    </p>
                    <p className="text-sm bg-primary-100/20 p-6 mt-4 w-full">
                        {t("confirm-rdv-patient.note")}
                    </p>

                    {error && (
                        <p className="bg-red-100 border rounded-lg text-red-500 mt-4 px-2 py-px">
                            Error: {error}
                        </p>
                    )}
                    <div className="mt-4 flex items-center space-x-2">
                        <button
                            className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                            onClick={onClose}
                        >
                            <p>{t("confirm-rdv-patient.cancel")}</p>
                        </button>
                        {loading ? (
                            <div className="flex items-center justify-center w-[200px]">
                                <CircularProgress
                                    isIndeterminate
                                    color="blue.400"
                                />
                            </div>
                        ) : (
                            <button
                                className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                onClick={onClick}
                            >
                                <p>{t("confirm-rdv-patient.continue")}</p>
                            </button>
                        )}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmRdvPopUp;
