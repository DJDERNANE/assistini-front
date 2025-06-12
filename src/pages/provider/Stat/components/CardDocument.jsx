import React from "react";
import icons from "../../../../constants/icons";
import { useTranslation } from "react-i18next";

const CardDocument = ({ item }) => {
  const { t } = useTranslation("rdvs");
  return (
    <div
      className={`px-4 py-3 flex items-center justify-between rounded-lg border border-gray-300`}
    >
      <div className="flex items-center space-x-3">
        <div className="min-h-[30px] min-w-[30px] bg-primary-100 bg-opacity-5 p-2 rounded-full">
          <div className="rounded-full bg-secondary-100 relative w-[26px] h-[26px]">
            <img
              src={icons.document}
              alt=""
              className="absolute -bottom-1 -left-1"
            />
          </div>
        </div>
        <div>
          <p className="text-sm first-letter:capitalize">{item.name}</p>
          <p className="text-sm text-primary-100">{item.date}</p>
        </div>
      </div>
      <button className="border rounded-full border-gray-400 px-4 py-2 flex items-center space-x-2">
        <img src={icons.documentUpload} alt="" />
        <p className="text-sm first-letter:capitalize font-medium text-primary-100">
          {t("list.download")}
        </p>
      </button>
    </div>
  );
};

export default CardDocument;
