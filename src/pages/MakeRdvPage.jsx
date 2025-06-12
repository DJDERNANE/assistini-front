import React, { useTransition } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import MakeRDVForm from "../components/form/MakeRDVForm";
import { useTranslation } from "react-i18next";
import { useGetAllSpecialites } from "../hooks/useProviderService";

const MakeRdvPage = () => {
  const { t } = useTranslation("");

  return (
    <div>
      <Card borderRadius={"xl"}>
        <CardHeader className="bg-blue-600 text-white text-center rounded-t-lg">
          <h3 className="font-bold text-sm">{t("doctor.makeRDV")}</h3>
          <p className="font-medium text-xs">{t("doctor.fillInfo")}</p>
        </CardHeader>
        <CardBody paddingLeft={0}>
          <MakeRDVForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default MakeRdvPage;
