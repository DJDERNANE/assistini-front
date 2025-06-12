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

const Chat = () => {
  const { t } = useTranslation("rdvs");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const path = window.location.pathname;

  return (
    <div className="responsive mt-4">
      <Card borderRadius={"xl"} shadow={"sm"}>
        <CardBody>
          <Outlet />
        </CardBody>
      </Card>
    </div>
  );
};

export default Chat;
