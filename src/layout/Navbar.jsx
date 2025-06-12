/** @format */

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logos, Icons } from "../constants/index";
import CircleButton from "../components/ui/CircleButton";
import SearchForm from "../components/form/SearchForm";
import { useTranslation } from "react-i18next";
import NotificationBox from "./NotificationBox";
import icons from "../constants/icons";

const Navbar = ({ children = null }) => {
    const { t } = useTranslation("global");

    const navigate = useNavigate();
    const handleGoMsg = () => {
        navigate("/home/messages");
    };

    return (
        <>
            <div className={`border-b !h-[82px] bg-white`}>
                <div className="grid-cols-12 responsive py-4 h-full !w-full hidden md:grid bg-white">
                    <Link
                        to={"/home"}
                        className="col-span-3 flex items-center -mt-4"
                    >
                        <img
                            src={"/logo.svg"}
                            alt=""
                            className="w-[180px] object-cover"
                        />
                    </Link>
                    <div className="col-span-9 md:grid grid-cols-12 ">
                        <div className="col-span-8 flex items-center  justify-between  w-full ">
                            {localStorage.getItem("accessToken") && (
                                <div
                                    onClick={() => navigate("/home")}
                                    className="cursor-pointer ml-2 mr-6"
                                >
                                    <img src={icons.Home} alt="" />
                                </div>
                            )}
                            {children}
                        </div>
                        {localStorage.getItem("accessToken") && (
                            <div className="col-span-4 flex items-center justify-end space-x-10 h-full">
                                <div className="flex items-center justify-end space-x-4 w-fit">
                                    <CircleButton
                                        icon={Icons.Chat}
                                        name={"icon chat"}
                                        onClick={handleGoMsg}
                                    />
                                    <CircleButton
                                        icon={Icons.Work}
                                        name={"icon work"}
                                        bg="hidden md:flex"
                                        onClick={() => {
                                            navigate("/doctors");
                                        }}
                                    />
                                    <CircleButton
                                        icon={Icons.Profile}
                                        name={"icon profile"}
                                        bg="hidden md:flex"
                                        onClick={() => {
                                            navigate("/home/profile");
                                        }}
                                    />
                                    {/* <div className="hidden md:block z-50">
                  <NotificationBox />
                </div> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* this navbar for mobile devices */}
                <div className="grid grid-cols-7 gap-x-3 responsive py-4 h-full !w-full md:hidden">
                    <Link to={"/"} className="col-span-2 flex items-center">
                        <h1 className="text-stone-900 font-medium text-lg md:text-2xl capitalize">
                            {t("general.name")}
                        </h1>
                    </Link>
                    <div className="col-span-4 w-full flex items-center">
                        <SearchForm />
                    </div>
                    <div className="flex items-center justify-end">
                        <CircleButton
                            icon={Icons.Chat}
                            name={"icon chat"}
                            onClick={handleGoMsg}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
