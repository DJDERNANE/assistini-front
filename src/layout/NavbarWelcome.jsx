/** @format */

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logos, Icons } from "../constants/index";
import CircleButton from "../components/ui/CircleButton";
import SearchForm from "../components/form/SearchForm";
import { useTranslation } from "react-i18next";
import NotificationBox from "./NotificationBox";
import CustomButton from "../components/custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/ui/auth-slice";

const NavbarWelcome = ({ hide = false }) => {
    const { t } = useTranslation("welcome");

    const navigate = useNavigate();

    const path = window.location.pathname;
    const paths = path.split("/");

    return (
        <>
            <div className={`bg-transparent !h-[82px]`}>
                <div className="grid-cols-12 responsive py-4 h-full !w-full md:grid flex justify-between">
                    <Link
                        to={"/"}
                        className="col-span-3 flex items-center -mt-4"
                    >
                        <img
                            src={"/logo-white.svg"}
                            alt=""
                            className="md:w-[180px] w-[120px] object-cover"
                        />
                    </Link>
                    <div className="md:col-span-9 md:grid grid-cols-12">
                        <div className="md:col-start-8 col-span-5 md:flex items-center justify-end h-full">
                            {/* <p className="text-sm text-white font-semibold w-[200px] text-end">
                                {path === "/request-prestateur"
                                    ? "Vous etes un prestateur ?"
                                    : "Vous etes un patient ?"}
                            </p> */}
                            <CustomButton
                                name={t("navbar.sign")}
                                css="!text-sm !rounded-full !bg-transparent border border-primary-100 !text-center !w-[160px]"
                                onClick={() =>
                                    // dispatch(authActions.replaceData("sign-in"))
                                    {
                                        if (
                                            [
                                                "/request-prestateur",
                                                "/sign-prestateur",
                                            ].includes(path)
                                        )
                                            navigate("/sign-prestateur");
                                        else navigate("/sign");
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarWelcome;
