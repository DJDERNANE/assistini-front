/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import SideBar from "../layout/SideBar";
import Userbar from "../layout/Userbar";
import { NavLink, useNavigate } from "react-router-dom";
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
import { useGetAllProviders } from "../hooks/useProviderService";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { providerActions } from "../store/provider/provider-slice";
import { useGetAllManuel } from "../hooks/useSamples";
import providerService from "../services/providerService";
import Converter from "../helpers/Converter";
import WaitingBar from "../layout/WaitingBar";

const HomePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("home");

    const filters = useSelector((state) => state.filterProviders.item) ?? {};

    const { loading, error, fetchData } = useGetAllManuel(
        () => providerService.getAllByFilter(filters),
        () => navigate(`/doctors?${Converter.filterParams(filters)}`)
    );

    const dispatch = useDispatch();
    const providers = useSelector((state) => state.providers.item);

    useEffect(() => {
        dispatch(providerActions.clearData());
    }, []);

    const handleSearch = () => {
        fetchData();
    };

    const handleGoMsg = () => {
        navigate("/messages");
    };

    return (
        <div className="space-y-4 px-0 bg-transparent rounded">
            <div className="md:hidden">
                <WaitingBar />
            </div>

            <h1 className="first-letter:capitalize text-gray-700 text-lg md:text-2xl h-[88px] flex items-center text-center md:text-left !font-bold">
                {t("general_home.title")}
            </h1>
            <div className="block z-30 relative">
                <Card borderRadius={"xl"}>
                    <CardBody>
                        <div className="border-b pb-6 grid gap-4">
                            <div className="col-span-full">
                                <FilterMedecinForm showTitle />
                            </div>
                            {/* <div className="items-end hidden md:flex">
                                <FilterMedecinModal />
                            </div> */}
                        </div>
                        <div className="md:min-h-[300px] flex items-center justify-center">
                            {loading && (
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                />
                            )}
                        </div>
                        <CustomButton
                            name={`${t("filter.search")}`}
                            css="w-full"
                            onClick={handleSearch}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HomePage;
