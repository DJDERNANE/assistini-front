import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { Icons } from "../../constants";
import { useDisclosure } from "@chakra-ui/react";

const FilterMedecinModal = () => {
  const { t } = useTranslation("global");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full">
      <CustomButton
        icon={Icons.Filter}
        name={t("filter.filter")}
        onClick={onOpen}
      />
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="overflow-hidden">
          <ModalHeader className="capitalize bg-blue-600 text-white font-medium text-center text-sm md:text-base">
            {t("filter.filter")}
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <h1 className="titleFilter border-b pb-2 mb-4 mt-4 !text-sm md:!text-base">
              {t("filter.consultation")}
            </h1>
            <RadioGroup value={null} className="grid md:grid-cols-4 gap-4 ">
              <li className="bg-teal-500 rounded-md shadow justify-start text-white capitalize py-3 px-4 cursor-pointer text-sm md:text-base">
                {t("filter.video")}
              </li>
              <li className="bg-teal-500 rounded-md shadow justify-start text-white capitalize py-3 px-4 cursor-pointer text-sm md:text-base">
                {t("filter.office")}
              </li>
              <li className="bg-teal-500 rounded-md shadow justify-start text-white capitalize py-3 px-4 cursor-pointer text-sm md:text-base">
                {t("filter.home")}
              </li>
            </RadioGroup>
            <h1 className="titleFilter border-b pb-2 mb-4 mt-8 !text-sm md:!text-base">
              {t("filter.available")}
            </h1>
            <RadioGroup value={null} className="grid md:grid-cols-4 gap-4 ">
              <li className="bg-teal-500 rounded-md shadow justify-start text-white capitalize py-3 px-4 cursor-pointer text-sm md:text-base">
                {t("filter.today")}
              </li>
              <li className="bg-teal-500 rounded-md shadow justify-start text-white capitalize py-3 px-4 cursor-pointer text-sm md:text-base">
                {t("filter.tomorrow")}
              </li>
              <li className="bg-teal-500 rounded-md shadow justify-start text-white capitalize py-3 px-4 cursor-pointer text-sm md:text-base">
                {t("filter.before")}
              </li>
            </RadioGroup>
            <h1 className="titleFilter border-b pb-2 mb-4 mt-8 !text-sm md:!text-base">
              {t("filter.available")}
            </h1>
            <div className="flex items-center space-x-4">
              <Switch id="" />
              <p className="text-sm md:text-base">{t("filter.isOpen")}</p>
            </div>
            <h1 className="titleFilter border-b pb-2 mb-4 mt-8 !text-sm md:!text-base">
              {t("filter.timetables")}
            </h1>
            <ul className="grid md:grid-cols-2 capitalize text-stone-500 text-xl font-normal gap-x-4 gap-y-5">
              <li className="">
                <Checkbox>{t("filter.timetable_1")}</Checkbox>
              </li>
              <li>
                <Checkbox>{t("filter.timetable_2")}</Checkbox>
              </li>
              <li>
                <Checkbox>{t("filter.timetable_3")}</Checkbox>
              </li>
              <li>
                <Checkbox>{t("filter.timetable_4")}</Checkbox>
              </li>
            </ul>

            <div className="space-x-4 pt-10 flex items-center justify-end">
              <CustomButton
                name={t("filter.reset")}
                css="!bg-white !text-black !w-32 md:!w-40 text-xs md:text-base"
              />
              <CustomButton
                name={`${t("filter.showPractitioners")} (23)`}
                css={"!w-60 text-xs px-4 md:text-base"}
              />
            </div>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FilterMedecinModal;
