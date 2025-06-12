import React, { useState } from "react";
import FilterPatientProfile from "../../components/filters/FilterPatientProfile";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CustomButton from "../../components/custom/CustomButton";
import { useTranslation } from "react-i18next";
import ProfileADditionModal from "../../components/modals/ProfileAdditionModal";
import ClinicDoctorsModal from "../../components/modals/ClinicDoctorsModal";

const PatientProfile = () => {
  const { t } = useTranslation("new");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenClinicList,
    onOpen: onOpenClinicList,
    onClose: onCloseClinicList,
  } = useDisclosure();

  return (
    <div className="responsive mt-6">
      <Card borderRadius={"xl"} shadow={"sm"}>
        <CardHeader className="flex items-center justify-between">
          <FilterPatientProfile />
          <div>
            {true && (
              <div className="flex items-center space-x-2">
                <CustomButton
                  name={t("new.cancel")}
                  css="!bg-white !text-[#1E5EFF] !text-sm border !py-2"
                />
                <CustomButton
                  name={t("new.save")}
                  css="!text-sm !py-2"
                  onClick={onOpen}
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <Outlet />
        </CardBody>
      </Card>

      <ProfileADditionModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onClick={onOpenClinicList}
      />
      <ClinicDoctorsModal
        isOpen={isOpenClinicList}
        onClose={onCloseClinicList}
        onOpen={onOpenClinicList}
      />
    </div>
  );
};

export default PatientProfile;
