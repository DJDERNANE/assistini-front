/** @format */

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logos, Icons } from "../constants/index";
import CircleButton from "../components/ui/CircleButton";
import SearchForm from "../components/form/SearchForm";
import { useTranslation } from "react-i18next";

const NavbarMobile = ({ children = null }) => {
    const { t } = useTranslation("global");
    return (
        <>
            <div
                className={`fixed !h-[60px] bottom-0 z-50 left-0 right-0 bg-white border-t shadow-lg md:hidden`}
            >
                {/* <TopHeader /> */}
                <ul className="h-full flex w-full items-center justify-center space-x-10">
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/home/favorites">
                            <img
                                src={Icons.Star}
                                alt="icon home"
                                className="w-7"
                            />
                        </NavLink>
                    </li>

                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/home/documents">
                            <img src={Icons.Folder} alt="icon home" />
                        </NavLink>
                    </li>
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/home/my-rdvs">
                            <img src={Icons.CalendarCheck} alt="icon home" />
                        </NavLink>
                    </li>
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/home/my-patient">
                            <img src={Icons.UserRectangle} alt="icon home" />
                        </NavLink>
                    </li>
                    <li className="capitalize cursor-pointer navLinkStyle">
                        <NavLink to="/home/requests">
                            <img src={Icons.EditRectangle} alt="icon home" />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NavbarMobile;
