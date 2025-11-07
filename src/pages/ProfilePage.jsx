/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteLogo, useGetAllFavorites } from "../hooks/useProviderService";
import { CircularProgress, useDisclosure } from "@chakra-ui/react";

import ChangeEmailPopUp from "./provider/Settings/components/ChangeEmailPopUp";
import ChangePwdPopUp from "./provider/Settings/components/ChangePwdPopUp";
import CardLogo from "./provider/Settings/components/CardLogo";
import icons from "../constants/icons";
import CardEdit from "./provider/Settings/components/CardEdit";
import authProviderService from "../services/authProviderService";
import { useQuery } from "react-query";
import CardInput from "./provider/Settings/components/CardInput";
import CardSelect from "./provider/Settings/components/CardSelect";
import axios from "axios";
import authService from "../services/authService";

const ProfilePage = ({ show = false }) => {
    const { t } = useTranslation("home");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: isOpenPwd,
        onOpen: onOpenPwd,
        onClose: onClosePwd,
    } = useDisclosure();

    const { isLoading, data, isError, error, refetch } = useQuery(
        "personal-info",
        () => authService.me()
    );

    const [loading, setLoading] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [sexe, setSexe] = useState("");
    const [ssnum, setSsnum] = useState("");
    const [birth, setBirth] = useState("2024-12-12");
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        // Create a FormData object
        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("prenom", prenom);
        formData.append("address", address);
        formData.append("sexe", sexe);
        formData.append("phone", phone);
        formData.append("SSNum", ssnum);
        formData.append("birthday", "2024-12-12");
        formData.append("codePostal", "16150");

        console.log("Form Data:", Array.from(formData.entries()));

        try {
            // Send data to the API
            const response = await axios.put(
                process.env.REACT_APP_URL_API + "/users",
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

    const {
        register: registerDelete,
        handleSubmit: handleSubmitDelete,
        loading: loadingDelete,
        onSubmit: onSubmitDelete,
        reset: resetDelete,
        message: messageDelete,
        error: errorDelete,
        setMessage: setMessageDelete,
        setValue: setValueDelete,
        watch: watchDelete,
    } = useDeleteLogo();

    useEffect(() => {
        if (data?.user) {
            setNom(data?.user?.nom);
            setPrenom(data?.user?.prenom);
            setAddress(data?.user?.address);
            setPhone(data?.user?.phone);
            setSexe(data?.user?.sexe);
            setBirth(data?.user?.birthday);
            setSsnum(data?.user?.SSNum);
            setImageSrc(data?.user?.logo);
        }
    }, [data]);

    return (
        <div className="bg-white rounded-lg p-4">
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <CardInput
                    setValue={setNom}
                    value={nom}
                    title={t("admin.nom")}
                />
                <CardInput
                    setValue={setPrenom}
                    value={prenom}
                    title={t("admin.prenom")}
                />
                <CardSelect
                    title={"Sexe"}
                    type={sexe}
                    setType={setSexe}
                    options={[
                        { value: "male", label: t("admin.sexe.male") },
                        { value: "female", label: t("admin.sexe.femelle") },
                    ]}
                />
                <CardInput
                    setValue={setSsnum}
                    value={ssnum}
                    title={t("admin.nas")}
                />
                <CardInput
                    setValue={setAddress}
                    value={address}
                    title={t("admin.addresse")}
                />
                {/* <CardInput
                    setValue={setBirth}
                    value={birth}
                    title={t("admin.date-naissance")}
                /> */}
                <CardInput
                    setValue={setPhone}
                    value={phone}
                    title={t("admin.phone")}
                />

                <CardEdit>
                    <h3 className="font-medium first-letter:capitalize mb-3 text-xs md:text-sm">
                        {t("admin.login")}
                    </h3>
                    <div className={`space-y-2`}>
                        <div
                            onClick={() => onOpen()}
                            className="border bg-gray-50 rounded-xl w-full outline-none py-3 pl-4 pr-14 text-sm cursor-pointer relative"
                        >
                            <p className="text-xs md:text-base">
                                {t("admin.change-email")}
                            </p>
                            <img
                                src={icons.RightArrowLine}
                                alt=""
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            />
                        </div>
                        <div
                            onClick={() => onOpenPwd()}
                            className="border bg-gray-50 rounded-xl w-full outline-none py-3 pl-4 pr-14 text-sm cursor-pointer relative"
                        >
                            <p className="text-xs md:text-base">
                                {t("admin.change-password")}
                            </p>
                            <img
                                src={icons.RightArrowLine}
                                alt=""
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                </CardEdit>

                <CardLogo
                    title={t("admin.logo")}
                    // register={register}
                    // setValue={setValue}
                    image={data?.user?.logo}
                    name={nom ?? ""}
                    setImageSrc={setImageSrc}
                    imageSrc={imageSrc}
                    setImageFile={setImageFile}
                    imageFile={imageFile}
                    // handleDelete={handleSubmit(onSubmit)}
                />

                <div className="flex items-center justify-end w-full md:col-span-2">
                    {loading ? (
                        <CircularProgress isIndeterminate color="blue.400" />
                    ) : (
                        <button
                            onClick={(e) => handleSubmit(e)}
                            // type="submit"
                            className="text-xs md:text-base bg-primary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
                        >
                            {t("admin.save")}
                        </button>
                    )}
                </div>
            </form>

            <ChangeEmailPopUp isOpen={isOpen} onClose={onClose} />
            <ChangePwdPopUp isOpen={isOpenPwd} onClose={onClosePwd} />
        </div>
    );
};

export default ProfilePage;
