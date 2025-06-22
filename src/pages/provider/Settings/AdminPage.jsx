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

const clinicTypeFrToEn = {
    "centre medical": "medical center",
    "cabinet medical": "medical office",
    "clinique specialisee": "specialist clinic",
    "medical center": "medical center",
    "medical office": "medical office",
    "specialist clinic": "specialist clinic"
};

const AdminPage = () => {
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
    const [fullName, setFullName] = useState("");
    const [cabinName, setCabinName] = useState("");
    const [address, setAddress] = useState("");
    const [localisation, setLocalisation] = useState("");
    const [speIds, setSpeIds] = useState("");
    const [id_fascial, setId_fascial] = useState("");
    const [argument_num, setArgument_num] = useState("");
    const [type, setType] = useState("medical center");
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        // Create a FormData object
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("cabinName", cabinName);
        formData.append("address", address);
        formData.append("location", localisation);
        // formData.append("speIds", speIds);
        // formData.append("id_fascial", id_fascial);
        formData.append("num_arg", argument_num);
        formData.append("clinicType", type);
        formData.append("logo", imageFile);

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

    const [gps, setGps] = useState(1);
    const [pos, setPos] = useState("");
    const [openGps, setOpenGps] = useState(false);

    useEffect(() => {
        if (data?.data) {
            setFullName(data?.data?.fullName);
            setCabinName(data?.data?.cabinName);
            setAddress(data?.data?.address);
            setLocalisation(data?.data?.location);
            setId_fascial(data?.data?.id_fascial);
            setArgument_num(data?.data?.num_arg);
            setType(clinicTypeFrToEn[data?.data?.clinicType] || "medical center");

            if (data?.data?.location) setGps(1);
        }
    }, [data]);

    const handleGetLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    // Success: Set location state
                    setLocalisation(
                        `${position.coords.latitude},${position.coords.longitude}`
                    );
                    // setError(null); // Clear any previous error
                },
                (error) => {
                    // Error: Set error state
                    // setError(error.message);
                    setLocalisation(null); // Clear any previous location
                }
            );
        } else {
            console.log("Geolocation is not supported by your browser.");
        }
    };
    return (
        <div>
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <CardInput
                    title={t("admin.denomination")}
                    setValue={setCabinName}
                    value={cabinName}
                    // value={}
                    // register={register("cabinName")}
                />
                <CardInput
                    setValue={setFullName}
                    value={fullName}
                    title={t("admin.nom")}
                    // register={register("fullName")}
                />
                <CardInput
                    setValue={setArgument_num}
                    value={argument_num}
                    title={t("admin.agreement")}
                    disabled
                    // register={register("argument_num")}
                />
                <CardInput
                    setValue={setAddress}
                    value={address}
                    title={t("admin.adresse")}
                    // register={register("address")}
                />
                <CardInput
                    setValue={setId_fascial}
                    value={id_fascial}
                    title={t("admin.identifiant")}
                    disabled
                    // register={register("id_fascial")}
                />

                <CardEdit>
                    <h3 className="font-medium first-letter:capitalize mb-3 text-sm">
                        {t("admin.gps")}
                    </h3>
                    <div className={`border bg-gray-50 rounded-xl relative`}>
                        <div
                            onClick={() => {
                                if (gps !== 2) setOpenGps(true);
                            }}
                            className="w-full bg-transparent outline-none py-3 pl-4 pr-14 text-sm cursor-pointer"
                        >
                            {gps === 1 && <p>{localisation}</p>}
                            {gps === 1 && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <img src={icons.currentPos} alt="" />
                                </div>
                            )}
                            {gps === 2 && (
                                <input
                                    type="text"
                                    className="w-full bg-transparent outline-none text-sm"
                                    onChange={(e) =>
                                        setLocalisation(e.target.value)
                                    }
                                    value={localisation}
                                />
                            )}
                            {gps === 2 && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <img
                                        src={icons.ArrowDown}
                                        alt=""
                                        className="w-4"
                                        onClick={() => setOpenGps(true)}
                                    />
                                </div>
                            )}
                        </div>
                        {openGps && (
                            <ul className="absolute top-0 left-0 right-0 h-fit border border-gray-300 rounded-xl px-4 py-2 bg-gray-100">
                                <li
                                    className="space-x-2 mb-2 cursor-pointer w-fit"
                                    onClick={handleGetLocation}
                                >
                                    <input
                                        type="radio"
                                        name=""
                                        id="auto"
                                        checked={gps === 1}
                                        onClick={() => {
                                            setGps(1);
                                            setOpenGps(false);
                                        }}
                                    />
                                    <label
                                        htmlFor="auto"
                                        className="cursor-pointer"
                                    >
                                        {t("admin.auto")}
                                    </label>
                                </li>
                                <li className="space-x-2 cursor-pointer w-fit">
                                    <input
                                        type="radio"
                                        name=""
                                        id="manual"
                                        checked={gps === 2}
                                        onClick={() => {
                                            setGps(2);
                                            setOpenGps(false);
                                        }}
                                    />
                                    <label
                                        htmlFor="manual"
                                        className="cursor-pointer"
                                    >
                                        {t("admin.manual")}
                                    </label>
                                </li>
                            </ul>
                        )}
                    </div>
                </CardEdit>

                <CardSelect
                    title={t("admin.type")}
                    type={type}
                    setType={setType}
                    options={[
                        { value: "medical center", label: "Centre médical" },
                        { value: "medical office", label: "Cabinet médical" },
                        { value: "specialist clinic", label: "Clinique spécialisée" },
                    ]}
                />

                <CardEdit>
                    <h3 className="font-medium first-letter:capitalize mb-3 text-sm">
                        {t("admin.login")}
                    </h3>
                    <div className={`space-y-2`}>
                        <div
                            onClick={() => onOpen()}
                            className="border bg-gray-50 rounded-xl w-full outline-none py-3 pl-4 pr-14 text-sm cursor-pointer relative"
                        >
                            <p>{t("admin.change-email")}</p>
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
                            <p>{t("admin.change-password")}</p>
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
                    image={data?.data?.logo}
                    name={fullName ?? ""}
                    setImageSrc={setImageSrc}
                    imageSrc={imageSrc}
                    setImageFile={setImageFile}
                    imageFile={imageFile}
                    // handleDelete={handleSubmit(onSubmit)}
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

export default AdminPage;
