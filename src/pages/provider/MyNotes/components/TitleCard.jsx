import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import icons from "../../../../constants/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

const TitleCard = ({ icon, title, description }) => {
  const { t } = useTranslation("note");

  return (
    <Card borderRadius={"xl"} shadow={"sm"}>
      <CardBody className="">
        <h3 className="font-medium first-letter:capitalize text-xl">
          {t("general.title")}
        </h3>
        <Breadcrumb className="text-sm first-letter:capitalize mt-2">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              className="font-medium first-letter:capitalize"
            >
              {t("general.my-team")}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              className="first-letter:capitalize font-light"
            >
              {t("general.your-notes")}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </CardBody>
    </Card>
  );
};

export default TitleCard;
