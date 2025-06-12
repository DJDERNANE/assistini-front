import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { Icons } from "../../constants";
import { useDisclosure } from "@chakra-ui/react";

const FilterInvoice = ({ type }) => {
    const { t } = useTranslation("invoice");

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    return (
        <ul className="flex items-center md:space-x-3 mb-4 bg-[#F5F9FF] p-2 rounded-lg md:rounded-full w-fit flex-wrap">
            <li>
                <CustomButton
                    name={t("filter.current")}
                    css={`text-sm !px-4 !py-3 !rounded-full ${
                        type === "current"
                            ? "!bg-white !text-black"
                            : "!bg-transparent !text-[#9096A2]"
                    }`}
                    onClick={() => navigate("/prestateur/invoices/current")}
                />
            </li>
            <li>
                <CustomButton
                    name={t("filter.pending")}
                    css={`text-sm !px-4 !py-3 !rounded-full ${
                        type === "pending"
                            ? "!bg-white !text-black"
                            : "!bg-transparent !text-[#9096A2]"
                    }`}
                    onClick={() => navigate("/prestateur/invoices/pending")}
                />
            </li>
            <li>
                <CustomButton
                    name={t("filter.paid")}
                    css={`text-sm !px-4 !py-3 !rounded-full ${
                        type === "paid"
                            ? "!bg-white !text-black"
                            : "!bg-transparent !text-[#9096A2]"
                    }`}
                    onClick={() => navigate("/prestateur/invoices/paid")}
                />
            </li>
            <li>
                <CustomButton
                    name={t("filter.favorite")}
                    css={`text-sm !px-4 !py-3 !rounded-full ${
                        type === "favs"
                            ? "!bg-white !text-black"
                            : "!bg-transparent !text-[#9096A2]"
                    }`}
                    onClick={() => navigate("/prestateur/invoices/favs")}
                />
            </li>
            <li>
                <CustomButton
                    name={t("filter.deleted")}
                    css={`text-sm !px-4 !py-3 !rounded-full ${
                        type === "delete"
                            ? "!bg-white !text-black"
                            : "!bg-transparent !text-[#9096A2]"
                    }`}
                    onClick={() => navigate("/prestateur/invoices/delete")}
                />
            </li>
        </ul>
    );
};

export default FilterInvoice;
