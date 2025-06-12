import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/popup/alert-slice";
import styled from "@emotion/styled";

const PopUpAlert = ({
  isOpen,
  onClose,
  size,
  cssHeader = "",
  children,
  cssFooter,
}) => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(alertActions.clearData());
    onClose();
  };

  const { t } = useTranslation("popup");

  const BlurredModalOverlay = styled(ModalOverlay)`
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.3);
  `;

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <div className="md:hidden">
          <BlurredModalOverlay />
        </div>
        <ModalOverlay />
        <ModalContent className="md:top-1/4 !w-[90%] md:!w-fit">
          <ModalHeader
            className={`relative flex items-center justify-center ${cssHeader}`}
          >
            <h3 className="text-blue-600 first-letter:capitalize mt-8 md:mt-0">
              {t("detail-doctor.validation")}
            </h3>
            <div className="absolute right-6 top-6 w-3 h-3 rounded-full bg-blue-600 shadow-[0px_4px_14px_#2760f340]"></div>
          </ModalHeader>
          <ModalBody className="!text-sm md:!text-base">{children}</ModalBody>
          <ModalFooter>
            <div className="w-40 mx-auto">
              <CustomButton
                name={t("detail-doctor.confirm")}
                onClick={handleConfirm}
              />
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PopUpAlert;
