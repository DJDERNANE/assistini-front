import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Icons } from "../constants";
import { useTranslation } from "react-i18next";
import SendMsgForm from "../components/form/SendMsgForm";

const ChatBox = () => {
  const { t } = useTranslation("global");
  const [show, isShow] = useState(false);

  const handleOpenChatBox = () => {
    isShow((state) => !state);
  };
  return (
    <div>
      <Card
        borderRadius={"xl"}
        className={`${show ? "h-[360px] 2xl:h-[430px]" : "h-[50px]"}`}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
      >
        <CardHeader
          className="flex items-center justify-between border-b cursor-pointer"
          paddingY={"10px"}
          onClick={handleOpenChatBox}
        >
          <div className="flex items-center space-x-2">
            <img src={Icons.ChatGreen} alt="icon chat green" />
            <p className="text-sm capitalize">{t("sidebar.message")}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-rose-600 rounded-full text-white w-5 h-5 text-xs flex items-center justify-center font-semibold">
              2
            </div>
            <img src={Icons.ArrowDown} alt="icon arrow down" />
          </div>
        </CardHeader>
        {show && (
          <>
            <CardBody className="flex items-end" paddingBottom={"10px"}>
              <p className="bg-blue-500 text-sm text-white  rounded-tl-xl rounded-tr-xl rounded-br-xl p-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Commodi, nam.
              </p>
            </CardBody>
            <CardFooter paddingY={"10px"}>
              <SendMsgForm />
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChatBox;
