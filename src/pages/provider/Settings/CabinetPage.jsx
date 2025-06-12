/** @format */

import React, { useEffect, useState } from "react";
import CardInput from "./components/CardInput";
import { useTranslation } from "react-i18next";
import CardSelect from "./components/CardSelect";
import CardLogo from "./components/CardLogo";
import CardEdit from "./components/CardEdit";
import icons from "../../../constants/icons";
import ChangeEmailPopUp from "./components/ChangeEmailPopUp";
import { useDisclosure } from "@chakra-ui/react";
import { useChangeInfo, useMe } from "../../../hooks/useAuthService";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import authProviderService from "../../../services/authProviderService";
import {
    useDeleteLogo,
    useEditProvider,
} from "../../../hooks/useProviderService";
import ChangePwdPopUp from "./components/ChangePwdPopUp";
import { useQuery } from "react-query";
import axios from "axios";

const CabinetPage = () => {
    const { t } = useTranslation("settings");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: isOpenPwd,
        onOpen: onOpenPwd,
        onClose: onClosePwd,
    } = useDisclosure();

    const { isLoading, data, isError, error, refetch } = useQuery(
        "personal-info",
        () => authProviderService.me()
    );

    const [loading, setLoading] = useState(false);
    const [expertises, setExpertises] = useState("");
    const [horaires, setHoraires] = useState("");

    const [info, setInfo] = useState("");
    const [informations, setInformations] = useState("");
    const [langue, setLangue] = useState("");

    const [services, setServices] = useState("");
    const [transport, setTransport] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        // Create a FormData object
        const formData = new FormData();
        formData.append("expertises", expertises);
        formData.append("horaires", horaires);
        formData.append("info_utils", info);
        formData.append("informations", informations);
        formData.append("langue", langue);
        formData.append("services", services);
        formData.append("transport", transport);

        try {
            // Send data to the API
            const response = await axios.put(
                process.env.REACT_APP_URL_API + "/providers/provider",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            console.log("User updated successfully", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data?.data) {
            setExpertises(data?.data?.expertises);
            setHoraires(data?.data?.horaires);
            setInfo(data?.data?.info_utils);
            setInformations(data?.data?.informations);
            setLangue(data?.data?.langue);
            setServices(data?.data?.services);
            setTransport(data?.data?.transport);
        }
    }, [data]);

    return (
        <div>
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <CardInput
                    setValue={setServices}
                    value={services}
                    title={t("cabinet.services")}
                    // register={register("fullName")}
                />
                <CardInput
                    setValue={setExpertises}
                    value={expertises}
                    title={t("cabinet.expertise")}
                    // register={register("fullName")}
                />

                <CardInput
                    setValue={setInfo}
                    value={info}
                    title={t("cabinet.info-utiles")}
                    // register={register("address")}
                />
                <CardInput
                    setValue={setTransport}
                    value={transport}
                    title={t("cabinet.transport")}
                    // register={register("id_fascial")}
                />
                <CardInput
                    setValue={setInformations}
                    value={informations}
                    title={t("cabinet.informations")}
                    // register={register("id_fascial")}
                />
                <CardInput
                    setValue={setLangue}
                    value={langue}
                    title={t("cabinet.langues")}
                    // register={register("id_fascial")}
                />
                <CardInput
                    setValue={setHoraires}
                    value={horaires}
                    title={t("cabinet.horaires")}
                    // register={register("id_fascial")}
                />

                <div className="flex items-center justify-end w-full md:col-span-3">
                    {loading ? (
                        <CircularProgress isIndeterminate color="blue.400" />
                    ) : (
                        <button
                            onClick={(e) => handleSubmit(e)}
                            // type="submit"
                            className="bg-primary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
                        >
                            {t("general.save")}
                        </button>
                    )}
                </div>
            </form>

            <ChangeEmailPopUp isOpen={isOpen} onClose={onClose} />
            <ChangePwdPopUp isOpen={isOpenPwd} onClose={onClosePwd} />
        </div>
    );
};

export default CabinetPage;
