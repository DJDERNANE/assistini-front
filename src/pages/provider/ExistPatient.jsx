import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/custom/CustomButton";
import AddPatientForm from "../../components/form/AddPatientForm";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ExistPatient = () => {
  const { t } = useTranslation("profile-patient");

  return (
    <Card borderRadius={"xl"} shadow={"sm"} className="">
      <CardBody>
        <div className="grid grid-cols-5 text-sm text-[#5A607F] border-b pb-3">
          <h5>{t("exist.patient-name")}</h5>
          <h5>{t("exist.birth")}</h5>
          <h5>{t("exist.location")}</h5>
          <h5>{t("exist.abonement")}</h5>
        </div>
        <div className="">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div className="grid grid-cols-5 text-sm bg-[#F5F9FF] rounded my-2 py-1 px-3">
              <p>mohamed</p>
              <p>12/12/2024</p>
              <p>alger</p>
              <p>assistini</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ExistPatient;
