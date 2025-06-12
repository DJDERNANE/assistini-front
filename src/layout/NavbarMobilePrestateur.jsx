import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logos, Icons } from "../constants/index";
import CircleButton from "../components/ui/CircleButton";
import SearchForm from "../components/form/SearchForm";
import { useTranslation } from "react-i18next";

const NavbarMobilePrestateur = ({ children = null }) => {
    const { t } = useTranslation("global");
    return (
        <>
            <div
                className={`fixed !h-[60px] bottom-0 z-50 left-0 right-0 bg-white border-t shadow-lg md:hidden`}
            >
                {/* <TopHeader /> */}
                <ul className="h-full flex w-full items-center justify-center space-x-10">
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/prestateur/rdvs">
                            <img src={Icons.Star} alt="icon home" />
                        </NavLink>
                    </li>
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/prestateur/waiting-list/requests">
                            <img src={Icons.Profile} alt="icon home" />
                        </NavLink>
                    </li>
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/prestateur/chat">
                            <img src={Icons.Chat} alt="icon home" />
                        </NavLink>
                    </li>
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/prestateur/invoices/current">
                            <img src={Icons.CalendarCheck} alt="icon home" />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NavbarMobilePrestateur;
