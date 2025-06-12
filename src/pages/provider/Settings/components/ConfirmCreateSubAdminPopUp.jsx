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

const ConfirmCreateSubAdminPopUp = ({ isOpen, onClose, onClick }) => {
  const { t } = useTranslation("popup");

  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    loading,
    onSubmit,
    message,
    error,
    setMessage,
    setValue,
    watch,
    error: errorChangeInfo,
  } = useEditProviderEmail();

  const handleSend = () => {
    onClose();
  };
  const handleDone = () => {
    onClose();
  };

  useEffect(() => {
    if (loading && message) setStep(2);
  }, [loading, message]);

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
        <ModalBody className="mb-6 flex flex-col items-center justify-center">
          <div className="bg-blue-600/20 flex items-center justify-center p-2 rounded-full mb-4">
            <img src={Icons.checkBlue} alt="" />
          </div>
          <h3 className="text-lg font-semibold first-letter:capitalize">
            {t("confirm-create-sub-admin.title")}
          </h3>
          <p className="text-sm">{t("confirm-create-sub-admin.description")}</p>

          <div className="mt-4 flex items-center space-x-2">
            <button
              className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
              onClick={onClose}
            >
              <p>{t("confirm-create-sub-admin.cancel")}</p>
            </button>
            <button
              className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
              onClick={onClick}
            >
              <p>{t("confirm-create-sub-admin.continue")}</p>
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmCreateSubAdminPopUp;
