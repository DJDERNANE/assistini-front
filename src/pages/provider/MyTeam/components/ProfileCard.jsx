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

const ProfileCard = ({ name, status }) => {
    const { t } = useTranslation("note");

    return (
        <div className="border px-4 py-3 border-gray-300 rounded-lg hover:shadow-md flex items-center justify-between bg-[#FAFAFA]">
            <p className="text-sm font-medium first-letter:capitalize">
                {name}
            </p>
            <div className="flex items-center space-x-1">
                <div
                    className={`flex items-center justify-center w-3 h-3 rounded-full bg-opacity-30 ${
                        status === t("user.active")
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                >
                    <div
                        className={`w-[5px] h-[5px] rounded-full ${
                            status === t("user.active")
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                    ></div>
                </div>
                <p
                    className={`first-letter:capitalize font-medium first-letter:capitalize ${
                        status === t("user.active")
                            ? "text-green-500"
                            : "text-red-500"
                    } text-xs`}
                >
                    {status}
                </p>
            </div>
        </div>
    );
};

export default ProfileCard;
