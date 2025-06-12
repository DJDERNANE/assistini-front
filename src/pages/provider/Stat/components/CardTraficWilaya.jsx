import { Progress } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const CardTraficWilaya = () => {
  const { t } = useTranslation("stat");

  return (
    <div className="p-3 bg-gray-100 rounded-xl">
      <h3 className="font-semibold first-letter:capitalize mb-4 text-sm">
        {t("box.wilaya")}
      </h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm first-letter:capitalize font-medium w-[90px] text-xs text-gray-500">
            alger
          </p>

          <div className="w-full bg-[#e1e3e5] rounded-sm h-1 mt-1">
            <div className={`w-[40%] bg-black h-full`}></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm first-letter:capitalize font-medium w-[90px] text-xs text-gray-500">
            alger
          </p>

          <div className="w-full bg-[#e1e3e5] rounded-sm h-1 mt-1">
            <div className={`w-[40%] bg-black h-full`}></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm first-letter:capitalize font-medium w-[90px] text-xs text-gray-500">
            alger
          </p>

          <div className="w-full bg-[#e1e3e5] rounded-sm h-1 mt-1">
            <div className={`w-[40%] bg-black h-full`}></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm first-letter:capitalize font-medium w-[90px] text-xs text-gray-500">
            alger
          </p>

          <div className="w-full bg-[#e1e3e5] rounded-sm h-1 mt-1">
            <div className={`w-[40%] bg-black h-full`}></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm first-letter:capitalize font-medium w-[90px] text-xs text-gray-500">
            alger
          </p>

          <div className="w-full bg-[#e1e3e5] rounded-sm h-1 mt-1">
            <div className={`w-[40%] bg-black h-full`}></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm first-letter:capitalize font-medium w-[90px] text-xs text-gray-500">
            alger
          </p>

          <div className="w-full bg-[#e1e3e5] rounded-sm h-1 mt-1">
            <div className={`w-[40%] bg-black h-full`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTraficWilaya;
