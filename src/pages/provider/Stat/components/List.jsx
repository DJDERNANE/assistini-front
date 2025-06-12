import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import CardRdv from "./components/CardRdv";
import AddPatientForm from "../../../components/form/AddPatientForm";
import PatientData from "./components/PatientData";
import CardDocument from "./CardDocument";

const List = () => {
  const { t } = useTranslation("rdvs");

  const [selected, setSelected] = useState(0);

  const data = [
    {
      name: "benrabah mohamed",
      motif: "consultation",
    },
    {
      name: "benrabah mohamed",
      motif: "consultation",
    },
    {
      name: "benrabah mohamed",
      motif: "consultation",
    },
    {
      name: "benrabah mohamed",
      motif: "consultation",
    },
    {
      name: "benrabah mohamed",
      motif: "consultation",
    },
  ];

  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 gap-4">
        {data.map((item, idx) => (
          <CardRdv
            item={{ ...item, number: idx }}
            selected={selected === idx}
            setSelected={setSelected}
          />
        ))}
      </div>

      <div className="border-b w-full mt-6 mb-4">
        <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
          {t("list.profile")}
        </h3>
      </div>
      <PatientData />

      <div className="border-b w-full mt-6 mb-4">
        <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
          {t("list.profile")}
        </h3>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {data && data.docs.map((item, idx) => <CardDocument item={item} />)}
      </div>
    </div>
  );
};

export default List;
