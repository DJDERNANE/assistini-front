/** @format */

import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
    CircularProgress,
} from "@chakra-ui/react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Icons, Images, Logos } from "../../../constants";
import {
    useGetDetailInvoice,
    useGetReport,
    usePayInvoice,
    useToggleFavoriteInvoice,
} from "../../../hooks/useInvoiceService";
import PayMethod from "./components/PayMethod";
import ConfirmPayPopUp from "./components/ConfirmPayPopUp";

const Detail = () => {
    const { t } = useTranslation("invoice");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { id } = useParams();

    const path = window.location.pathname;

    const { isLoading, data, isError, error, refetch } =
        useGetDetailInvoice(id);

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        reset,
        message,
        error: errorToggle,
        setMessage,
        setValue,
        watch,
        data: dataToggle,
    } = useToggleFavoriteInvoice(id);

    const [isPatient, setIsPatient] = useState(true);

    const {
        register: registerPay,
        handleSubmit: handleSubmitPay,
        loading: loadingPay,
        onSubmit: onSubmitPay,
        reset: resetPay,
        message: messagePay,
        error: errorPay,
        setMessage: setMessagePay,
        setValue: setValuePay,
        watch: watchPay,
        data: dataPay,
    } = usePayInvoice(id, () => {
        refetch();
        // onClose();
    });

    // useEffect(() => {
    //   if (data?.data?.data) {
    //     setValuePay("method", "cash");
    //     setValuePay("amount", data?.data?.data?.total_price);
    //     setValuePay("payerType", isPatient ? "patient" : "partner");
    //   }
    // }, [data]);

    const handleDownload = async () => {
        try {
            if (data?.data?.data?.payment?.user?.path) {
                const response = await fetch(
                    `${process.env.REACT_APP_URL_API}${data?.data?.data?.payment?.user?.path}`
                ); // Replace with your PDF URL
                if (!response.ok) throw new Error("Failed to download invoice");

                // Convert response to blob
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                // Create an invisible anchor element and trigger a download
                const link = document.createElement("a");
                link.href = url;
                link.download = `${data?.data?.data?.payment?.user?.label}`; // Specify the filename for download
                document.body.appendChild(link);
                link.click();

                // Clean up by removing the anchor element and revoking the object URL
                link.remove();
                window.URL.revokeObjectURL(url);
            }
            if (data?.data?.data?.payment?.partner?.path) {
                const response = await fetch(
                    `${process.env.REACT_APP_URL_API}${data?.data?.data?.payment?.partner?.path}`
                ); // Replace with your PDF URL
                if (!response.ok) throw new Error("Failed to download invoice");

                // Convert response to blob
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                // Create an invisible anchor element and trigger a download
                const link = document.createElement("a");
                link.href = url;
                link.download = `${data?.data?.data?.payment?.partner?.label}`; // Specify the filename for download
                document.body.appendChild(link);
                link.click();

                // Clean up by removing the anchor element and revoking the object URL
                link.remove();
                window.URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <CircularProgress isIndeterminate color="blue.400" />
                </div>
            ) : (
                <div>
                    <div>
                        <PayMethod
                            onOpen={onOpen}
                            data={data?.data?.data ?? {}}
                            isPatient={isPatient}
                            setIsPatient={setIsPatient}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* general invoice  */}
                        <div className="rounded-xl bg-[#F2F5F9] p-4">
                            <div className="bg-white p-4 rounded-xl">
                                <div className="bg-[#F2F5F9] rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        {data?.data?.data?.provider?.logo ? (
                                            // {false ? (
                                            <img
                                                src={`${process.env.REACT_APP_URL_API}/${data?.data?.data?.provider?.logo}`}
                                                alt=""
                                                className="w-[70px] object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={`/icon.png`}
                                                alt=""
                                                className="w-[70px] object-cover"
                                            />
                                        )}
                                        <div>
                                            <p className="text-right text-sm text-[#60737D]">
                                                {t("general.invoice-no")}
                                            </p>
                                            <p className="text-right font-semibold text-[#121722] text-3xl">
                                                #{data?.data?.data?.invoice_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="mt-4">
                                            <p className="text-3xl text-[#121722] font-semibold">
                                                {t("general.invoice")}
                                            </p>
                                            <p className="text-sm text-[#60737D]">
                                                {t("general.billed-to")}
                                            </p>
                                            <p className="font-semibold text-[#121722] mt-4">
                                                {data?.data?.data?.patient}
                                            </p>
                                            <p className="text-sm text-[#60737D]">
                                                addresse / contact info
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="text-right text-sm text-[#60737D]">
                                                {t("general.issued-on")}
                                            </p>
                                            <p className="text-sm text-right">
                                                {" "}
                                                {new Date(
                                                    data?.data?.data?.invoice_created_at
                                                ).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <p className="text-right text-sm text-[#60737D] mt-4">
                                                {t("general.payment-due")}
                                            </p>
                                            <p className="text-sm text-right">
                                                -
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <div className="grid grid-cols-11">
                                        <p className="col-span-3 text-lg font-semibold">
                                            {t("general.services")}
                                        </p>
                                        <p className="text-right text-[#60737D] col-span-2">
                                            {t("general.qnt")}
                                        </p>
                                        <p className="text-right text-[#60737D] col-span-2">
                                            {t("general.price")}
                                        </p>
                                        <p className="text-right text-[#60737D] col-span-2">
                                            {t("general.partner")}
                                        </p>
                                        <p className="text-right text-[#60737D] col-span-2">
                                            {t("general.total")}
                                        </p>
                                    </div>
                                    {data?.data?.data?.services?.map(
                                        (item, idx) => (
                                            <div
                                                className="grid grid-cols-11"
                                                key={idx}
                                            >
                                                <p className="col-span-3 text-[#60737D]">
                                                    {item?.service_name}
                                                </p>
                                                <p className="text-right col-span-2">
                                                    1
                                                </p>
                                                <p className="text-right text-[#60737D] col-span-2">
                                                    {item?.service_price}{" "}
                                                    {t("general.dzd")}
                                                </p>
                                                <p className="text-right text-[#60737D] col-span-2">
                                                    {parseInt(
                                                        data?.data?.data
                                                            ?.payment?.partner
                                                            ?.amount
                                                    ) > 0
                                                        ? "-" +
                                                          data?.data?.data
                                                              ?.payment?.partner
                                                              ?.amount
                                                        : 0}{" "}
                                                    {t("general.dzd")}
                                                </p>
                                                <p className="text-right text-[#60737D] col-span-2">
                                                    {item?.service_price -
                                                        data?.data?.data
                                                            ?.payment?.partner
                                                            ?.amount}{" "}
                                                    {t("general.dzd")}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <div className="flex items-center justify-between bg-[#FBF7ED] p-3 rounded-lg w-[350px]">
                                        <p className="text-[#60737D] text-sm first-letter:capitalize space-x-3">
                                            <span>{t("invoice.total")}</span>
                                            <span>({t("invoice.dzd")})</span>
                                        </p>
                                        <p className="text-right font-semibold text-2xl">
                                            {data?.data?.data?.total_price -
                                                data?.data?.data?.payment
                                                    ?.partner?.amount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* report invoice  */}
                        <div className="rounded-xl bg-[#F2F5F9] p-4 h-full">
                            <div className="bg-white p-4 rounded-xl">
                                <div className="bg-[#F2F5F9] rounded-xl p-4 h-full">
                                    <div className="flex items-center justify-between">
                                        <img
                                            src={`${process.env.REACT_APP_URL_API}/${data?.data?.data?.provider?.logo}`}
                                            alt=""
                                            className="w-[70px] object-cover"
                                        />
                                        <div>
                                            <p className="text-right text-sm text-[#60737D]">
                                                {t("general.invoice-no")}
                                            </p>
                                            <p className="text-right font-semibold text-[#121722] text-3xl">
                                                #{data?.data?.data?.invoice_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="mt-4">
                                            <p className="text-3xl w-[200px] text-[#121722] font-semibold">
                                                {t("general.compte-rendu")}
                                            </p>
                                            <p className="text-lg font-medium">
                                                {t("general.scanner")}
                                            </p>
                                            <p className="font-medium">
                                                {t("general.indication")}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="text-right text-sm text-[#60737D]">
                                                {t("general.issued-on")}
                                            </p>
                                            <p className="text-sm text-right">
                                                {new Date(
                                                    data?.data?.data?.invoice_created_at
                                                ).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <p className="text-right text-sm text-[#60737D] mt-4">
                                                {t("general.payment-due")}
                                            </p>
                                            <p className="text-sm text-right">
                                                -
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="text-lg font-semibold first-letter:capitalize">
                                        {t("general.result")}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {data?.data?.data?.rapports[0]?.result}
                                    </p>
                                    <h3 className="text-lg font-semibold first-letter:capitalize">
                                        {t("general.conclusion")}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {
                                            data?.data?.data?.rapports[0]
                                                ?.conclusion
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full flex justify-center mt-6 mb-4">
                            <form
                                className="w-[430px] space-y-3"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <h1 className="text-center font-bold text-3xl first-letter:capitalize mb-4 flex items-center space-x-4">
                                    <button type="submit">
                                        {dataToggle?.is_fav ? (
                                            <img
                                                src={Icons.StarFill}
                                                alt=""
                                                className="mt-2 w-[50px]"
                                            />
                                        ) : (
                                            <img
                                                src={Icons.Star}
                                                alt=""
                                                className="mt-2 w-[50px]"
                                            />
                                        )}
                                    </button>
                                    <span>{t("general.control-your-doc")}</span>
                                </h1>
                                <a
                                    className="text-white bg-blue-600 font-semibold uppercase p-5 rounded-xl w-full block text-center"
                                    // onClick={handleDownload}
                                    href={`${process.env.REACT_APP_URL_API}${data?.data?.data?.payment?.user?.path}`}
                                    target="_blank"
                                >
                                    {t("general.download")}
                                </a>
                                <button className="text-white bg-blue-600 font-semibold uppercase p-5 rounded-xl w-full">
                                    {t("general.share")}
                                </button>
                                <button
                                    className="text-white bg-green-600 font-semibold uppercase p-5 rounded-xl w-full"
                                    onClick={() =>
                                        navigate("/prestateur/invoices/current")
                                    }
                                >
                                    {t("general.finish")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmPayPopUp
                isOpen={isOpen}
                onClose={onClose}
                isPatient={isPatient}
                loading={loadingPay}
                data={dataPay}
                url={`${process.env.REACT_APP_URL_API}/${data?.data?.data?.payment?.user?.path}`}
                amount={
                    data?.data?.data?.total_price -
                    data?.data?.data?.payment?.partner?.amount
                }
                onClick={onSubmitPay}
            />
        </div>
    );
};

export default Detail;
