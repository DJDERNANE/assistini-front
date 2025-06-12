import React from "react";
import Navbar from "../../layout/Navbar";
import SideBar from "../../layout/SideBar";
import Userbar from "../../layout/Userbar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import CustomButton from "../../components/custom/CustomButton";
import Footer from "../../layout/Footer";
import CircleButton from "../../components/ui/CircleButton";
import { Icons } from "../../constants";
import SearchForm from "../../components/form/SearchForm";
import ChatBox from "../../layout/ChatBox";
import FilterMedecinForm from "../../components/form/FilterMedecinForm";
import NotificationBox from "../../layout/NotificationBox";
import FilterMedecinModal from "../../components/filters/FilterMedecinModal";
import NavbarMobile from "../../layout/NavbarMobile";
import InfoWaitingListBox from "../../components/box/InfoWaitingListBox";
import NavbarPrestateur from "../../layout/NavbarPrestateur";
import NavbarMobilePrestateur from "../../layout/NavbarMobilePrestateur";

const DashboardProviderPage = () => {
    return (
        <div className="">
            <NavbarPrestateur />
            <NavbarMobilePrestateur />

            <Outlet />

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default DashboardProviderPage;
