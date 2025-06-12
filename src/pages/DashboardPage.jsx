/** @format */

import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import SideBar from "../layout/SideBar";
import Userbar from "../layout/Userbar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import CustomButton from "../components/custom/CustomButton";
import Footer from "../layout/Footer";
import CircleButton from "../components/ui/CircleButton";
import { Icons } from "../constants";
import SearchForm from "../components/form/SearchForm";
import ChatBox from "../layout/ChatBox";
import FilterMedecinForm from "../components/form/FilterMedecinForm";
import NotificationBox from "../layout/NotificationBox";
import FilterMedecinModal from "../components/filters/FilterMedecinModal";
import NavbarMobile from "../layout/NavbarMobile";
import WaitingBar from "../layout/WaitingBar";

const DashboardPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["home", "global"]);

    const [search, setSearch] = useState("");
    const handleSearch = () => {
        navigate("/doctors?search=" + search);
    };

    const handleGoMsg = () => {
        navigate("/messages");
    };

    return (
        <div className="">
            <Navbar>
                <SearchForm
                    setSearch={setSearch}
                    search={search}
                    handleSearch={handleSearch}
                />
            </Navbar>
            <NavbarMobile />

            <div className="responsive grid md:grid-cols-12 mt-4 mb-10 gap-6 h-full">
                <div className="col-span-3 hidden md:flex flex-col justify-between">
                    <div className="space-y-4 relative">
                        <Userbar />
                        <SideBar />
                    </div>
                </div>
                <div className=" col-span-3 fixed bottom-4 left-0 right-0 hidden md:block">
                    <div className="responsive grid grid-cols-12 gap-x-6">
                        <div className="col-span-3">
                            <WaitingBar />
                        </div>
                    </div>
                </div>

                <div className="col-span-9 z-40">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
