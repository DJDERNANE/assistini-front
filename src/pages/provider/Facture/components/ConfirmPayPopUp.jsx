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
import icons from "../../../../constants/icons";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEditProviderEmail } from "../../../../hooks/useProviderService";
import { Icons } from "../../../../constants";

const ConfirmPopUp = ({
    loading = false,
    data = {},
    isOpen,
    onClose,
    onClick,
    amount = 0,
    url = "",
}) => {
    const { t } = useTranslation("popup");

    const [step, setStep] = useState(1);

    const handlePay = (method) => {
        onClick({
            method,
            amount,
            payerType: "user",
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setStep(1);
                onClose();
            }}
            size={"md"}
            isCentered
        >
            <ModalOverlay />
            <ModalContent borderRadius={"2xl"}>
                <ModalHeader className="flex items-center justify-between"></ModalHeader>
                <ModalBody>
                    {data && data?.success ? (
                        <div className="mt-4 space-y-2 flex flex-col items-center justify-center pb-6">
                            <div className="bg-blue-600/20 flex items-center justify-center p-2 rounded-full mb-4 w-[40px]">
                                <img src={Icons.checkBlue} alt="" />
                            </div>
                            <h3 className="text-lg font-semibold first-letter:capitalize">
                                {t("confirm-pay.method-title")}
                            </h3>
                            <p className="text-sm pb-6">
                                {t("confirm-pay.methode-description")}
                            </p>
                            <a
                                className="border rounded-lg border-gray-800 mx-auto w-[200px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                // onClick={onClose}
                                target="_blank"
                                href={url}
                            >
                                <p className="flex items-center space-x-2">
                                    <img src={Icons.Download} />{" "}
                                    <span>{t("confirm-pay.download")}</span>
                                </p>
                            </a>
                            <button
                                className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[200px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                onClick={onClose}
                            >
                                <p>{t("confirm-pay.finish")}</p>
                            </button>
                        </div>
                    ) : (
                        <div>
                            {loading ? (
                                <div className="w-full flex items-center justify-center h-[200px]">
                                    <CircularProgress
                                        isIndeterminate
                                        color="blue.400"
                                    />
                                </div>
                            ) : (
                                <>
                                    {" "}
                                    {step === 2 ? (
                                        <div className="mb-6 flex flex-col items-center justify-center">
                                            <div className="bg-blue-600/20 flex items-center justify-center p-2 rounded-full mb-4">
                                                <img
                                                    src={Icons.checkBlue}
                                                    alt=""
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold first-letter:capitalize">
                                                {t("confirm-pay.method-title")}
                                            </h3>
                                            <p className="text-sm">
                                                {t(
                                                    "confirm-pay.methode-description"
                                                )}
                                            </p>
                                            <div className="mt-4 space-y-2">
                                                <button
                                                    className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={() =>
                                                        handlePay("cash")
                                                    }
                                                >
                                                    <p>
                                                        {t("confirm-pay.cash")}
                                                    </p>
                                                </button>
                                                <button
                                                    className="border rounded-lg border-orange-400 text-white mx-auto bg-orange-400 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={() =>
                                                        handlePay("cib")
                                                    }
                                                >
                                                    <p>
                                                        {t("confirm-pay.cib")}
                                                    </p>
                                                </button>
                                                <button
                                                    className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={() => setStep(1)}
                                                >
                                                    <p>
                                                        {t(
                                                            "confirm-pay.cancel"
                                                        )}
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    ) : step === 3 ? (
                                        <div className="mb-6 flex flex-col items-center justify-center">
                                            <div className="bg-blue-600/20 flex items-center justify-center p-2 rounded-full mb-4">
                                                <img
                                                    src={Icons.checkBlue}
                                                    alt=""
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold first-letter:capitalize">
                                                {t("confirm-pay.req-title")}
                                            </h3>
                                            <p className="text-sm">
                                                {t(
                                                    "confirm-pay.req-description"
                                                )}
                                            </p>
                                            <div className="mt-4 space-y-2">
                                                <button
                                                    className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={onClick}
                                                >
                                                    <p>
                                                        {t(
                                                            "confirm-pay.pay-req"
                                                        )}
                                                    </p>
                                                </button>
                                                <button
                                                    className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={() => setStep(1)}
                                                >
                                                    <p>
                                                        {t(
                                                            "confirm-pay.cancel"
                                                        )}
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-6 flex flex-col items-center justify-center">
                                            <div className="bg-blue-600/20 flex items-center justify-center p-2 rounded-full mb-4">
                                                <img
                                                    src={Icons.checkBlue}
                                                    alt=""
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold first-letter:capitalize">
                                                {data && data?.success
                                                    ? t(
                                                          "confirm-pay.title-congrats"
                                                      )
                                                    : t(
                                                          "confirm-pay.title-patient"
                                                      )}
                                            </h3>
                                            <p className="text-sm">
                                                {data && data?.success
                                                    ? t(
                                                          "confirm-pay.description-congrats"
                                                      )
                                                    : t(
                                                          "confirm-pay.description"
                                                      )}
                                            </p>
                                            <div className="mt-4 space-y-2">
                                                <button
                                                    className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={() => setStep(2)}
                                                >
                                                    <p>
                                                        {t(
                                                            "confirm-pay.pay-at-clinic"
                                                        )}
                                                    </p>
                                                </button>
                                                <button
                                                    className="border rounded-lg border-orange-400 text-white mx-auto bg-orange-400 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={() => setStep(3)}
                                                >
                                                    <p>
                                                        {t(
                                                            "confirm-pay.req-distance"
                                                        )}
                                                    </p>
                                                </button>
                                                <button
                                                    className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[250px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                                    onClick={onClose}
                                                >
                                                    <p>
                                                        {t(
                                                            "confirm-pay.cancel"
                                                        )}
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmPopUp;
