import React from "react";
import { Icons } from "../../constants";
import { useTranslation } from "react-i18next";

const SendMsgForm = () => {
  const { t } = useTranslation("global");
  return (
    <form className="rounded-full px-4 py-2 flex items-center justify-between bg-violet-50 w-full space-x-2">
      <img src={Icons.MediaFile} alt="icon media file upload" className="w-5" />
      <input
        type="text"
        name=""
        id=""
        placeholder={t("sidebar.typeHere")}
        className="bg-transparent outline-none w-full"
      />
      <img src={Icons.SendBlue} alt="icon send msg" className="w-5" />
    </form>
  );
};

export default SendMsgForm;
