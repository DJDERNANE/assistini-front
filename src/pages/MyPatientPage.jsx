/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import NotificationBox from "../layout/NotificationBox";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import { Icons, Images } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import { useGetAllFavorites } from "../hooks/useProviderService";
import { Icon, Spinner } from "@chakra-ui/react";
// import CardInput from "../components/custom/CardInput";
import CustomInput from "../components/custom/CustomInput";
import { useMe } from "../hooks/useAuthService";
import images from "../constants/images";
import icons from "../constants/icons";
import { useGetAllPatient } from "../hooks/usePatientService";

const MyPatientPage = () => {
    const { t } = useTranslation("home");
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();
    const { data, isLoading, fetchData } = useGetAllPatient();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="pb-6 px-2 md:px-6 bg-white rounded-xl overflow-hidden">
            <div className="bg-white rounded py-4 flex items-center justify-between">
                <h1 className="mb-2 font-semibold text-lg md:text-xl capitalize">
                    {t("profile.title")}
                </h1>
                <button
                    className="text-white bg-blue-600 rounded-lg font-semibold px-4 py-2 first-letter:capitalize text-xs md:text-base"
                    onClick={() => {
                        navigate("/home/add-patient");
                    }}
                >
                    {t("profile.create")}
                </button>
            </div>
            <div className="bg-[#f5f9fe] rounded-xl px-2 md:px-4 py-2 md:py-6 h-[500px] overflow-y-auto space-y-4">
                {isLoading ? (
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
                    <div className="space-y-2 h-[400px] overflow-y-auto">
                        {data.map((item) => (
                            <div
                                className="flex items-center justify-between bg-white rounded-full px-4 py-1 cursor-pointer hover:bg-blue-600/5"
                                key={item?.id}
                                onClick={() => {
                                    navigate(`./${item.id}`);
                                }}
                            >
                                <div className="flex items-center space-x-5">
                                    <img
                                        src={
                                            item?.logo ??
                                            item?.sex.toLowerCase() === "home"
                                                ? Images.AvatarMan
                                                : Images.AvatarWoman
                                        }
                                        alt=""
                                        className="w-[30px] md:w-[55px] h-[30px] md:h-[55px] rounded-full"
                                    />
                                    <p className="font-medium first-letter:capitalize text-xs md:text-lg">
                                        {item?.name} {item?.prenom}
                                    </p>
                                </div>
                                <button className="bg-[#DFEBFF] w-[20px] md:w-[40px] h-[20px] md:h-[40px] rounded-full flex items-center justify-center">
                                    <img src={icons.ThreeDots} alt="" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPatientPage;
