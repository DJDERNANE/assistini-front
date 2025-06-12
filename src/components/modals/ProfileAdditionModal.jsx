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

const ProfileADditionModal = ({ isOpen, onOpen, onClose, onClick }) => {
  const { t } = useTranslation("waiting");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">
            <div className="flex items-center justify-center">
              <p className="font-bold first-letter:capitalize text-lg">
                {t("modal.title")}
              </p>
            </div>
          </ModalHeader>

          <ModalCloseButton />
          <ModalFooter className="flex flex-col space-y-4">
            <CustomButton name={t("modal.add")} onClick={onClick} />
            <CustomButton name={t("modal.schedule")} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileADditionModal;
