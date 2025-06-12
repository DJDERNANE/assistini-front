import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Facture = () => {
  const { t } = useTranslation("invoice");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const path = window.location.pathname;

  return (
    <div className="responsive mt-4">
      <Card borderRadius={"xl"} shadow={"sm"}>
        {/* <CardHeader className="">
          <h1 className="font-semibold first-letter:capitalize text-2xl mb-4"></h1>
          <div className="space-x-2"></div>
        </CardHeader> */}
        <CardBody>
          <Outlet />
        </CardBody>
        {/* <CardFooter className="!pt-0">
          <div className="flex items-center justify-end w-full">
            <button
              onClick={nextPage}
              className="bg-secondary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
            >
              {t("general.payment")}
            </button>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default Facture;
