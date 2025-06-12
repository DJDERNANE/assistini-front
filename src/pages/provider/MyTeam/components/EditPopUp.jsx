import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import icons from "../../../../constants/icons";

const EditPopUp = ({ isOpen, onClose }) => {
  const { t } = useTranslation("myTeam");

  const handleSend = () => {
    onClose();
  };
  const handleDone = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <h3 className="text-sm font-medium first-letter:capitalize">
            {t("edit-modal.title")}
          </h3>
          <div className="flex items-center space-x-2 rounded-full px-2 py-1 bg-[#FEEDDA] text-sm">
            <div className="w-1 h-1 rounded-full bg-[#FAA745]"></div>
            <p className="first-letter:capitalize text-[#FAA745]">
              {t("edit-modal.pending")}
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center space-x-2 mb-4">
            <p className="font-light text-sm">{t("edit-modal.sub-admin")} /</p>
            <div className="w-[150px]">
              <Select
                placeholder={t("edit-modal.all")}
                className=""
                size={"sm"}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>
          </div>
          <div className="rounded-xl p-4 text-sm bg-[#F5F9FF] min-h-[200px]">
            <p className="text-[#627188]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              illo quos quam nesciunt cupiditate expedita pariatur sequi tenetur
              assumenda provident, dicta commodi? Illum soluta voluptatum
              adipisci voluptates deserunt repellendus labore.
            </p>
          </div>
        </ModalBody>

        <ModalFooter className="space-x-2">
          <button
            className="border rounded-full border-gray-300 w-[150px] py-2 font-medium text-sm"
            onClick={handleDone}
          >
            {t("edit-modal.done")}
          </button>
          <button
            className="border rounded-full border-primary-100 text-white bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
            onClick={handleSend}
          >
            <img src={icons.editWhite} alt="" className="w-4 h-4" />
            <p>{t("edit-modal.done")}</p>
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPopUp;
