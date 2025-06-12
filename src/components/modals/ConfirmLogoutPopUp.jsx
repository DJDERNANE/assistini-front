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

const ConfirmLogoutPopUp = ({ isOpen, onClose, onClick }) => {
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
          <div className="bg-blue-600/40 flex items-center justify-center p-2 rounded-full mb-4">
            <img src={Icons.checkBlue} alt="" />
          </div>
          <h3 className="text-lg font-semibold first-letter:capitalize">
            {t("confirm-logout.title")}
          </h3>
          <p className="text-sm">{t("confirm-logout.description")}</p>

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

export default ConfirmLogoutPopUp;
