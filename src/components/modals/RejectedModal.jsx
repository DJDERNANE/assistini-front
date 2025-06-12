import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";

const RejectedModal = ({ isOpen, onOpen, onClose }) => {
  const { t } = useTranslation("waiting");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">
            <div className="flex items-center justify-between">
              <p className="text-lg first-letter:capitalize font-bold">
                {t("rejectedModal.title")}
              </p>
              <img src="" alt="" />
            </div>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <p className="font-light">{t("rejectedModal.description")}</p>
            <div className="h-[100px] bg-blue-50 rounded-lg px-4 py-2 mt-4">
              <p>{t("rejectedModal.dateListed")}</p>
            </div>
          </ModalBody>

          <ModalFooter className="flex items-center space-x-2">
            <CustomButton
              name={t("rejectedModal.cancel")}
              css="text-sm !px-4 !w-fit !bg-gray-100 !text-black"
            />
            <CustomButton
              name={t("rejectedModal.confrim")}
              css="text-sm !px-4 !w-fit !bg-red-200"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RejectedModal;
