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

const ConfirmDeletePopUp = ({
  isOpen,
  onClose,
  loading = false,
  onDelete = () => {},
}) => {
  const { t } = useTranslation("popup");

  const [step, setStep] = useState(1);

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
        <ModalBody className="mb-2 flex flex-col items-center justify-center">
          <div className="bg-blue-600/40 flex items-center justify-center p-2 rounded-full mb-4">
            <img src={Icons.checkBlue} alt="" />
          </div>
          <h3 className="text-lg font-semibold first-letter:capitalize">
            {t("delete-rdv.title")}
          </h3>
          <p className="text-sm">{t("delete-rdv.description")}</p>

          {loading ? (
            <div className="flex items-center justify-center min-h-[100px]">
              <CircularProgress isIndeterminate color="blue.400" />
            </div>
          ) : (
            <div className="mt-4 flex items-center space-x-2 mb-8">
              <button
                className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                onClick={onClose}
              >
                <p>{t("delete-rdv.cancel")}</p>
              </button>
              <button
                className="border rounded-lg border-red-500 text-white mx-auto bg-red-500 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                onClick={onDelete}
              >
                <p>{t("delete-rdv.continue")}</p>
              </button>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeletePopUp;
