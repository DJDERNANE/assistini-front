/** @format */

import React, { useEffect, useState } from "react";
import CardService from "./components/CardService";
import { useTranslation } from "react-i18next";
import { Icons } from "../../../constants";
import ConfirmPopUp from "./components/ConfirmPopUp";
import { useDisclosure } from "@chakra-ui/react";
import {
    useGetAllPartners,
    useGetAllSpecialites,
    useGetDataProvider,
    useGetServiceById,
} from "../../../hooks/useProviderService";
import { useNavigate, useParams } from "react-router";
import { useCreateInvoice } from "../../../hooks/useInvoiceService";

const Service = () => {
    const { t } = useTranslation("rdvs");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { id } = useParams();

    const [selectSp, setSelectSp] = useState([]);
    const [selectServ, setSelectServ] = useState([]);

    const [selectPartner, setSelectPartner] = useState(null);

    const navigate = useNavigate();

    const { isLoading, fetchData, data } = useGetDataProvider();
    const {
        isLoading: isLoadingService,
        fetchData: fetchDataService,
        data: dataService,
    } = useGetServiceById();
    const {
        isLoading: isLoadingPartner,
        fetchData: fetchDataPartner,
        data: dataPartner,
    } = useGetAllPartners();

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        reset,
        message,
        error,
        setMessage,
        setValue,
        watch,
        data: dataCreate,
    } = useCreateInvoice(() => {
        onClose();
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (id) {
            fetchDataPartner(id);

            setValue("rdvId", id);
        }
    }, [id]);

    useEffect(() => {
        if (selectSp && selectSp.length > 0) {
            fetchDataService(selectSp.map(sp => sp.id));
        }
    }, [selectSp]);

    useEffect(() => {
        if (selectSp) fetchDataService(selectSp?.id);
    }, [selectPartner]);

    useEffect(() => {
        setValue(
            "serviceIds",
            selectServ?.map((i) => i?.id)
        );

        // calc total
        const total = selectServ
            ? selectServ?.reduce((total, item) => total + item?.price, 0) *
              (1 -
                  (dataPartner &&
                  dataPartner.find((item) => item.partnerId === selectPartner)
                      ?.partnerPercentage
                      ? dataPartner.find(
                            (item) => item.partnerId === selectPartner
                        )?.partnerPercentage / 100
                      : 0))
            : 0;
        setValue("total", total);
    }, [selectServ, selectPartner]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CardService
                        title={t("general.specialite")}
                        subTitle={t("general.select-service")}
                        items={
                            data?.data?.specialties?.map((item, idx) => ({
                                // description: item?.description ?? "(vide)",
                                title: item?.name,
                                id: item.id,
                            })) ?? []
                        }
                        selected={selectSp}
                        setSelected={setSelectSp}
                        multiple
                    />
                    <CardService
                        title={t("general.service")}
                        subTitle={t("general.select-service")}
                        items={dataService?.map((item) => ({
                            id: item?.id,
                            title: item?.nom,
                            price: item?.price,
                            description: item?.description ?? "(vide)",
                        }))}
                        selected={selectServ}
                        setSelected={setSelectServ}
                        multiple
                    />
                    <CardService
                        title={t("general.partner")}
                        subTitle={t("general.select-service")}
                        items={dataPartner?.map((item) => ({
                            id: item?.partnerId,
                            title: item?.partnerName,

                            description: item?.partnerPercentage + "%",
                        }))}
                        selected={selectPartner}
                        setSelected={setSelectPartner}
                    />
                </div>
                <div className="col-span-2 flex items-end justify-center relative">
                    <div className="border rounded-xl p-4 flex items-center w-[260px] mt-20 relative">
                        <div className="absolute bottom-[120px] z-20 left-1/2 -translate-x-1/2">
                            <div className="border-t w-fit h-[120px] bg-white rounded-xl shadow-md p-4 space-y-3 font-medium text-gray-600">
                                <p className="text-center">
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <div className="bg-gray-100 rounded-xl p-2 flex items-center space-x-3">
                                    <div className="flex items-center justify-center bg-[#3981F7] rounded-full w-[35px] h-[35px]">
                                        <p className="text-white font-medium">
                                            {t("price.dz")}
                                        </p>
                                    </div>
                                    <p className="text-gray-500 font-medium text-sm">
                                        {t("price.discount")}
                                    </p>
                                    <p className="bg-green-500/20 rounded-full text-green-500 font-medium px-1">
                                        {dataPartner &&
                                        dataPartner.find(
                                            (item) =>
                                                item.partnerId === selectPartner
                                        )?.partnerPercentage
                                            ? "-" +
                                              dataPartner.find(
                                                  (item) =>
                                                      item.partnerId ===
                                                      selectPartner
                                              )?.partnerPercentage
                                            : 0}
                                        %
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="absolute -bottom-2 rotate-45 left-1/2 -translate-x-1/2 w-4 h-4 bg-white shadow-md z-10"></div> */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full w-4 h-4 bg-white border-t shadow-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#3981F7] rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between w-full mt-20 md:mt-0">
                            <div className="space-y-2 relative">
                                <p className="text-gray-400 text-xs font-medium">
                                    {t("price.title")}
                                </p>
                                <p className="font-semibold text-2xl">
                                    {t("price.currancy")}{" "}
                                    {selectServ
                                        ? selectServ?.reduce(
                                              (total, item) =>
                                                  total + item?.price,
                                              0
                                          ) *
                                          (1 -
                                              (dataPartner &&
                                              dataPartner.find(
                                                  (item) =>
                                                      item.partnerId ===
                                                      selectPartner
                                              )?.partnerPercentage
                                                  ? dataPartner.find(
                                                        (item) =>
                                                            item.partnerId ===
                                                            selectPartner
                                                    )?.partnerPercentage / 100
                                                  : 0))
                                        : 0}
                                </p>
                            </div>
                            <div className="bg-[#CCE1FF]/40 min-w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                <img src={Icons.BarPrice} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 ">
                <h1 className="text-gray-500 first-letter:capitalize mb-4">
                    {t("general.result")}
                </h1>

                <div className="">
                    <textarea
                        className="text-[#627188] rounded-xl p-4 text-sm bg-[#F5F9FF] w-full min-h-[200px]"
                        {...register("result")}
                    ></textarea>
                </div>
            </div>
            <div className="mt-4">
                <h1 className="text-gray-500 first-letter:capitalize mb-4">
                    {t("general.conclusion")}
                </h1>

                <div className="">
                    <textarea
                        className="text-[#627188] rounded-xl p-4 text-sm bg-[#F5F9FF] w-full min-h-[200px]"
                        {...register("conclusion")}
                    ></textarea>
                </div>
            </div>

            <div className="flex items-center justify-end w-full mt-4">
                <button
                    onClick={() => {
                        onOpen();
                    }}
                    className="bg-secondary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
                >
                    {t("general.payment")}
                </button>
            </div>

            <ConfirmPopUp
                isOpen={isOpen}
                onClose={onClose}
                onClick={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default Service;
