/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import NotificationBox from "../layout/NotificationBox";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import { Icons, Images } from "../constants";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import { useGetAllFavorites } from "../hooks/useProviderService";
import { Icon, Spinner } from "@chakra-ui/react";
// import CardInput from "../components/custom/CardInput";
import CustomInput from "../components/custom/CustomInput";
import { useMe } from "../hooks/useAuthService";
import {
    useCreatePatient,
    useDeletePatient,
    useGetDetailPatient,
} from "../hooks/usePatientService";

const MyPatientPage = ({ show = false }) => {
    const { t } = useTranslation("home");
    const [select, setSelect] = useState(0);
    const { id } = useParams();
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
    } = useCreatePatient();

    const navigate = useNavigate();
    const { isLoading, data, fetchData } = useGetDetailPatient();

    const { loading: loadingDelete, onSubmit: onSubmitDelete } =
        useDeletePatient(() => {
            navigate("/home/my-patient");
        });

    useEffect(() => {
        if (id) fetchData(id);
    }, [id]);

    useEffect(() => {
        setValue("name", data?.name);
        setValue("prenom", data?.prenom);
        setValue("company", data?.company);
        setValue("sex", data?.sex);
        setValue("residance", data?.residance);
        setValue("motif", data?.motif);
        setValue("assurance", data?.assurance);
        setValue("email", data?.email);
        setValue("phone", data?.phone);
        setValue("birthday", data?.birthday?.substring(0, 10));
    }, [data]);

    const watchPhone = watch("phone");
    useEffect(() => {
        if (watchPhone?.length > 10) {
            setValue("phone", watchPhone.substring(0, 10));
        }
    }, [watchPhone]);

    return (
        <div className="pb-6 px-6 bg-white rounded-xl overflow-hidden">
            <div className="bg-white rounded py-4">
                <h1 className="mb-2 font-semibold text-lg md:text-xl first-letter:capitalize">
                    {!show
                        ? t("profile.add-new-patient")
                        : t("profile.show-patient")}
                </h1>
            </div>
            <div className="bg-[#f5f9fe] rounded-xl px-2 md:px-4 py-2 md:py-6 h-[500px] overflow-y-auto space-y-4">
                {show && isLoading ? (
                    <div className="w-full flex items-center justify-center h-[300px]">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </div>
                ) : (
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-3 text-xs md:text-base"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.nom")}
                            </p>
                            <CustomInput
                                register={register("name")}
                                disabled={show}
                            />
                        </div>
                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.prenom")}
                            </p>
                            <CustomInput
                                register={register("prenom")}
                                disabled={show}
                            />
                        </div>

                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.birthday")}
                            </p>
                            <CustomInput
                                register={register("birthday")}
                                type={show ? "text" : "date"}
                                disabled={show}
                            />
                        </div>

                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.sex")}
                            </p>
                            <CustomInput
                                register={register("sex")}
                                disabled={show}
                            />
                        </div>
                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.residence")}
                            </p>
                            <CustomInput
                                register={register("residance")}
                                disabled={show}
                            />
                        </div>
                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.email")}
                            </p>
                            <CustomInput
                                type="email"
                                register={register("email")}
                                disabled={show}
                            />
                        </div>
                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.phone")}
                            </p>
                            <CustomInput
                                type="phone"
                                register={register("phone")}
                                disabled={show}
                            />
                        </div>

                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.assurance")}
                            </p>
                            <CustomInput
                                register={register("assurance")}
                                disabled={show}
                            />
                        </div>
                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.motif")}
                            </p>
                            <CustomInput
                                register={register("motif")}
                                disabled={show}
                            />
                        </div>
                        <div>
                            <p className="font-semibold first-letter:capitalize mb-1">
                                {t("profile.company")}
                            </p>
                            <CustomInput
                                register={register("company")}
                                disabled={show}
                            />
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center col-start-2 mt-4">
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="md"
                                />
                            </div>
                        ) : show ? (
                            <button
                                className="text-white bg-red-600 rounded-lg font-semibold px-4 py-2 mt-4 md:col-start-2 first-letter:capitalize"
                                type="button"
                                onClick={() => onSubmitDelete(data?.id)}
                            >
                                {t("profile.delete")}
                            </button>
                        ) : (
                            <button
                                className="text-white bg-blue-600 rounded-lg font-semibold px-4 py-2 mt-4 col-start-2 first-letter:capitalize"
                                type="submit"
                            >
                                {t("profile.creer-patient")}
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default MyPatientPage;
