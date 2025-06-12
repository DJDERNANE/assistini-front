import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/custom/CustomButton";
import AddPatientForm from "../../components/form/AddPatientForm";

const NewPatient = () => {
  const { t } = useTranslation("profile-patient");

  return (
    <Card borderRadius={"xl"} shadow={"sm"} className="!bg-[#F5F9FF]">
      <CardHeader>
        <div className="">
          <h1 className="font-bold first-letter:capitalize">
            {t("new.title")}
          </h1>
          <p className="text-sm first-letter:capitalize text-[#5A607F]">
            {t("new.description")}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <AddPatientForm />
      </CardBody>
    </Card>
  );
};

export default NewPatient;
