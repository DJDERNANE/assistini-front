/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "../../../../constants";
import { Switch } from "@chakra-ui/react";
import { usePayInvoice } from "../../../../hooks/useInvoiceService";

const PayMethod = ({ data, onOpen, isPatient, setIsPatient }) => {
    const { t } = useTranslation("invoice");

    return (
        <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-3xl first-letter:capitalize">
                {t("payment.title")}
            </h3>
            <div className="flex items-center space-x-3">
                {data?.payment?.user?.status === "pending" && (
                    <ul>
                        <li>
                            <button
                                className="bg-green-400 rounded-xl w-[220px] relative py-2 flex items-center justify-between px-6"
                                onClick={onOpen}
                            >
                                <div className="">
                                    <div className="flex items-center justify-center p-1">
                                        <img src={Icons.CreditPay} alt="" />
                                    </div>
                                </div>
                                <p className="uppercase text-sm text-white text-center">
                                    {t("payment.choose")}
                                </p>
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PayMethod;
