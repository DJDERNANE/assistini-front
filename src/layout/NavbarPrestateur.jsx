/** @format */

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logos, Icons } from "../constants/index";
import CircleButton from "../components/ui/CircleButton";
import SearchForm from "../components/form/SearchForm";
import { useTranslation } from "react-i18next";
import NotificationBox from "./NotificationBox";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import icons from "../constants/icons";
import ConfirmLogoutPopUp from "../components/modals/ConfirmLogoutPopUp";

const NavbarPrestateur = ({ children = null }) => {
    const { t } = useTranslation("global");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const handleGoMsg = () => {
        navigate("/home/messages");
    };

    const {
        isOpen: isOpenLogout,
        onOpen: onOpenLogout,
        onClose: onCloseLogout,
    } = useDisclosure();

    const logout = () => {
        onCloseLogout();
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <div className={`border-b bg-transparent !h-[82px] bg-white`}>
                <div className="grid-cols-12 responsive py-4 h-full !w-full grid">
                    <Link
                        to={"/prestateur/rdvs"}
                        className="col-span-6 md:col-span-3 flex items-center -mt-4"
                    >
                        <img
                            src={"/logo.svg"}
                            alt=""
                            className="w-[120px] md:w-[180px] object-cover"
                        />
                    </Link>
                    <div className="col-span-6 md:col-span-9 md:grid grid-cols-12 ">
                        <div className="col-span-full flex items-center  justify-end  w-full space-x-4">
                            <Link
                                to={"rdvs"}
                                className=" items-center justify-between w-[200px] px-6 py-3 rounded-lg bg-white hidden md:flex"
                            >
                                <p className="font-medium uppercase text-sm">
                                    {t("navbar.my-rdvs")}
                                </p>
                            </Link>
                            <Link
                                to={"waiting-list/requests"}
                                className=" items-center justify-between w-[200px] px-6 py-3 rounded-lg bg-white hidden md:flex"
                            >
                                <p className="font-medium uppercase text-sm">
                                    {t("navbar.waiting-list")}
                                </p>
                            </Link>
                            {/* <Link
                to={"my-team"}
                className="flex items-center justify-between w-[200px] px-6 py-3 rounded-lg bg-white"
              >
                <p className="font-medium uppercase text-sm">
                  {t("navbar.my-team")}
                </p>
              </Link> */}
                            <Link
                                to={"chat"}
                                className=" items-center justify-between w-[200px] px-6 py-3 rounded-lg bg-white hidden md:flex"
                            >
                                <p className="font-medium uppercase text-sm">
                                    {t("navbar.chat")}
                                </p>
                            </Link>
                            <Link
                                to={"invoices/current"}
                                className=" items-center justify-between w-[200px] px-6 py-3 rounded-lg bg-white hidden md:flex"
                            >
                                <p className="font-medium uppercase text-sm">
                                    {t("navbar.invoice")}
                                </p>
                            </Link>
                            <div className="flex items-center justify-end space-x-10 h-full">
                                <button
                                    onClick={onOpen}
                                    className="bg-black text-white flex items-center justify-between w-[60px] md:w-[200px] px-6 py-3 rounded-lg"
                                >
                                    <p className="font-medium uppercase text-sm hidden md:block">
                                        {t("navbar.tools")}
                                    </p>
                                    <img
                                        src={Icons.GamMenu}
                                        alt=""
                                        className="w-3"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* this navbar for mobile devices */}
                <div className="hidden grid-cols-7 gap-x-3 responsive py-4 h-full !w-full md:hidden">
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

            <ConfirmLogoutPopUp
                isOpen={isOpenLogout}
                onClose={onCloseLogout}
                onClick={logout}
            />

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                // finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader className="!text-sm first-letter:capitalize text-gray-400">
                        {t("general.my-account")}
                    </DrawerHeader>

                    <DrawerBody className="space-y-3 mt-4">
                        <Link
                            to={"my-calendar"}
                            onClick={() => {
                                onClose();
                            }}
                            className="flex items-center justify-between w-full px-6 py-3 rounded-lg bg-gray-100"
                        >
                            <p className="first-letter:capitalize space-x-3 text-sm flex items-center">
                                <img src={icons.Calendar} alt="" />
                                <span>{t("navbar.my-work-calendar")}</span>
                            </p>
                        </Link>
                        <Link
                            to={"stats"}
                            onClick={() => {
                                onClose();
                            }}
                            className="flex items-center justify-between w-full px-6 py-3 rounded-lg bg-gray-100"
                        >
                            <p className="first-letter:capitalize space-x-3 text-sm flex items-center">
                                <img src={icons.Calendar} alt="" />
                                <span>{t("navbar.stats")}</span>
                            </p>
                        </Link>
                        <Link
                            to={"my-team"}
                            onClick={() => {
                                onClose();
                            }}
                            className="flex items-center justify-between w-full px-6 py-3 rounded-lg bg-gray-100"
                        >
                            <p className="first-letter:capitalize space-x-3 text-sm flex items-center">
                                <img
                                    src={icons.Profile}
                                    alt=""
                                    className="w-6"
                                />
                                <span>{t("navbar.my-team")}</span>
                            </p>
                        </Link>
                        <Link
                            to={"settings/admin"}
                            onClick={() => {
                                onClose();
                            }}
                            className="flex items-center justify-between w-full px-6 py-3 rounded-lg bg-gray-100"
                        >
                            <p className="first-letter:capitalize space-x-3 text-sm flex items-center">
                                <img src={icons.Setting} alt="" />
                                <span>{t("navbar.setting")}</span>
                            </p>
                        </Link>
                        <button
                            onClick={onOpenLogout}
                            className="flex items-center justify-between w-full px-6 py-3 rounded-lg bg-gray-100"
                        >
                            <p className="first-letter:capitalize space-x-3 text-sm flex items-center">
                                <img src={icons.Logout} alt="" />
                                <span>{t("navbar.logout")}</span>
                            </p>
                        </button>
                        {/* <Input placeholder="Type here..." /> */}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default NavbarPrestateur;
