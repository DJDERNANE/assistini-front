/** @format */

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logos, Icons } from "../constants/index";
import CircleButton from "../components/ui/CircleButton";
import SearchForm from "../components/form/SearchForm";
import { useTranslation } from "react-i18next";
import NotificationBox from "./NotificationBox";
import icons from "../constants/icons";
import { Search, LogOut } from 'lucide-react';


const Navbar = ({ children = null }) => {
    const { t } = useTranslation("global");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const handleGoMsg = () => {
        navigate("/home/messages");
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);


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
                <div className="flex justify-between items-center py-4 h-full !w-full md:hidden">
                    <Link
                        to={"/home"}
                        className="flex items-center"
                    >
                        <img
                            src={"/logo.svg"}
                            alt=""
                            className="w-[100px] object-cover"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Search Icon */}
                        <button onClick={toggleSearch} className="p-2">
                            <Search />
                        </button>

                        {/* Hamburger Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 focus:outline-none"
                            >
                                {/* Hamburger Icon */}
                                <div className="space-y-1">
                                    <div className="w-6 h-0.5 bg-gray-600"></div>
                                    <div className="w-6 h-0.5 bg-gray-600"></div>
                                    <div className="w-6 h-0.5 bg-gray-600"></div>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                     <button
                                        onClick={() => {
                                            navigate("/home/messages");
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <img
                                            src={Icons.Chat}
                                            alt={`icon `}
                                            className={`w-4 h-4 mr-2`}
                                        />
                                        Messages
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/home/profile");
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <img
                                            src={Icons.Profile}
                                            alt={`icon `}
                                            className={`w-4 h-4 mr-2`}
                                        />
                                        Mon Compte
                                    </button>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Déconnecter
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search bar that appears below navbar on mobile */}
            {showSearch && (
                <div className="col-span-8 flex items-center  justify-between  w-full bg-white p-4 border-b">
                    {children}
                </div>
            )}
        </>
    );
};

export default Navbar;