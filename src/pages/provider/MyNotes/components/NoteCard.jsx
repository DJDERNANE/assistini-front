import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import icons from "../../../../constants/icons";

const NoteCard = ({ onClick, note }) => {
  const { t } = useTranslation("note");

  return (
    <div
      className="border p-4 border-gray-300 rounded-lg hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium first-letter:capitalize">
          {t("note.quick-note")}
        </h3>
        <div className="flex items-center space-x-2 rounded-full px-2 py-1 bg-[#FEEDDA] text-sm">
          <div className="w-1 h-1 rounded-full bg-[#FAA745]"></div>
          <p className="first-letter:capitalize text-[#FAA745] text-xs">
            {t("note.pending")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-2 mb-4 mt-2">
          <p className="first-letter:capitalize font-light text-sm">
            {t("note.sub-admin")} /
          </p>
          <p className="first-letter:capitalize text-sm font-medium">
            {note?.recieved}
          </p>
        </div>
        <div className="rounded-xl p-4 text-sm bg-[#F5F9FF]">
          <p className="text-[#627188]">
            <span className="block text-xs">
              {note?.content.substring(0, 100)}
            </span>
            <span className="text-xs first-letter:capitalize text-primary-100 font-medium">
              {t("note.learn-more")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
