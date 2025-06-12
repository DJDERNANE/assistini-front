/** @format */

import React, { useEffect, useState } from "react";
import CardInput from "./components/CardInput";
import { useTranslation } from "react-i18next";
import CardSelect from "./components/CardSelect";
import CardLogo from "./components/CardLogo";
import CardEdit from "./components/CardEdit";
import icons from "../../../constants/icons";
import ChangeEmailPopUp from "./components/ChangeEmailPopUp";
import { Alert, AlertIcon, useDisclosure } from "@chakra-ui/react";
import { useChangeInfo, useMe } from "../../../hooks/useAuthService";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import authProviderService from "../../../services/authProviderService";
import {
    useCreateService,
    useEditProvider,
    useGetAllService,
    useGetAllSpecialites,
    useGetAllSpecialitesWithoutId,
    useGetDataProvider,
} from "../../../hooks/useProviderService";
import ChangePwdPopUp from "./components/ChangePwdPopUp";
import { useQuery } from "react-query";
import providerService from "../../../services/providerService";
import DataTableCard from "./components/DataTableCard";
import { useSelector } from "react-redux";

const ServicePage = () => {
    const { t } = useTranslation("settings");

    const [sp, setSP] = useState(null);

    // const { isLoading, data, isError, error, refetch } = useQuery(
    //     "providers-me",
    //     () => authProviderService.me()
    // );

    const {
        isLoading: isLoadingList,
        data: dataList,
        isError: isErrorList,
        error: errorList,
        refetch: refetchList,
    } = useGetAllService();

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        setValue,
        watch,
        error: errorChangeInfo,
    } = useCreateService(
        {
            nom: "",
            description: "",
            price: 0,
            specialtyId: null,
        },
        refetchList
    );

    const [openGps, setOpenGps] = useState(false);

    const {
        isLoading: isLoadingSp,
        fetchData: fetchDataSp,
        data: dataSp,
    } = useGetDataProvider();

    useEffect(() => {
        fetchDataSp();
    }, []);

    useEffect(() => {
        setValue("specialtyId", sp);
    }, [sp]);

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <CardInput title={t("clinic.nom")} register={register("nom")} />
                <CardEdit>
                    <h3 className="font-medium first-letter:capitalize mb-3 text-sm">
                        {t("clinic.specialite")}
                    </h3>
                    <div className={`border bg-gray-50 rounded-xl relative`}>
                        <div
                            onClick={() => {
                                setOpenGps((g) => !g);
                            }}
                            className="w-full bg-transparent outline-none py-3 pl-4 pr-14 text-sm cursor-pointer !h-[45px]"
                        >
                            <p>
                                {sp &&
                                    dataSp?.data?.specialties?.find(
                                        (item) => item.id === sp
                                    )?.name}
                            </p>

                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <img src={icons.ArrowDown} alt="" />
                            </div>
                        </div>
                        {openGps && (
                            <ul className="absolute top-12 left-0 right-0 h-fit border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 !z-40">
                                {dataSp?.data?.specialties?.map((item) => (
                                    <li
                                        key={item.id}
                                        className="space-x-2 mb-2 cursor-pointer w-full"
                                        onClick={() => {
                                            setSP(item.id);
                                            setOpenGps(false);
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name=""
                                            id="auto"
                                            checked={item.id === sp}
                                        />

                                        <label
                                            htmlFor="auto"
                                            className="cursor-pointer"
                                        >
                                            {item?.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </CardEdit>
                <CardInput
                    title={t("clinic.price")}
                    type="number"
                    register={register("price")}
                />

                <div className="md:col-span-3">
                    <CardInput
                        title={t("clinic.description")}
                        type="text"
                        register={register("description")}
                    />
                </div>

                <div className="flex items-center justify-end w-full md:col-span-3">
                    {loading ? (
                        <CircularProgress isIndeterminate color="blue.400" />
                    ) : (
                        <button
                            type="submit"
                            className="bg-primary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
                        >
                            {t("general.save")}
                        </button>
                    )}
                </div>
            </form>

            {message && (
                <Alert status="success" className="rounded-md mt-2">
                    <AlertIcon />
                    {message}
                </Alert>
            )}

            <DataTableCard
                data={dataList?.data?.data ?? []}
                refetch={refetchList}
            />
        </div>
    );
};

export default ServicePage;
