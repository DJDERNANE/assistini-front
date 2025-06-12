/** @format */

import React, { Children, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { Icons, Images } from "../constants";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

import CustomButton from "../components/custom/CustomButton";
import icons from "../constants/icons";
import Footer from "../layout/Footer";
import MakeRDVForm from "../components/form/MakeRDVForm";
import CircleButton from "../components/ui/CircleButton";
import NotificationBox from "../layout/NotificationBox";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import SearchForm from "../components/form/SearchForm";
import NavbarMobile from "../layout/NavbarMobile";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useGetProviderDetail } from "../hooks/useProviderService";
import axios from "axios";
import MakeRdvPage from "./MakeRdvPage";

const customIcon = L.icon({
    iconUrl: icons.locationBlue,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const DetailsMedecinPage = () => {
    const { t } = useTranslation("search");

    const navigate = useNavigate();
    const { id } = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isLoading, fetchData, data } = useGetProviderDetail();

    useEffect(() => {
        fetchData(id);
    }, []);

    return (
        <div>
            <Navbar>
                <SearchForm />
            </Navbar>
            <NavbarMobile />

            <div className="responsive">
                <div
                    className={`mt-4 mb-10 grid ${
                        localStorage.getItem("accessToken")
                            ? "md:grid-cols-6"
                            : "grid-cols-4"
                    } gap-x-8 2xl:gap-x-16`}
                >
                    <div className="col-span-4 w-full">
                        <div className="space-y-4">
                            <div className="">
                                <InfoSection
                                    icon={Icons.FileDuplicateBlue}
                                    title={t("doctor.services")}
                                >
                                    <p className="text-zinc-600 text-sm ">
                                        {data?.services}
                                    </p>
                                    <div className="mt-4 flex items-center space-x-1 md:space-x-4">
                                        <div className="md:w-[300px]">
                                            <CustomButton
                                                name={t(
                                                    "general_search.bookRDV"
                                                )}
                                                css="text-xs md:text-base !px-2 md:!px-4"
                                                onClick={() => {
                                                    if (
                                                        !localStorage.getItem(
                                                            "accessToken"
                                                        )
                                                    ) {
                                                        onOpen();
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="w-14 md:w-16">
                                            <a href={`tel:+213${data?.phone}`}>
                                                <CustomButton
                                                    icon={Icons.PhoneWhite}
                                                    css="!bg-[#40B745] !h-full !px-4"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </InfoSection>
                            </div>
                            <InfoSection
                                icon={Icons.TelescopeBlue}
                                title={t("doctor.expertise")}
                            >
                                <div className="">
                                    {data?.expertises &&
                                        data?.expertises?.length > 0 &&
                                        data?.expertises
                                            ?.split(",")
                                            .map((item) => (
                                                <p className="mr-2 mb-2 inline-block text-zinc-600 text-sm font-normal leading-tight bg-gray-200 w-fit rounded px-2 py-1">
                                                    {item}
                                                </p>
                                            ))}
                                </div>
                            </InfoSection>
                            <InfoSection
                                icon={Icons.locationBlue}
                                title={t("doctor.access")}
                            >
                                <div className="text-zinc-600 text-xs md:text-sm order-1 md:order-2">
                                    <p>Pharmacie des 2 Rues</p>
                                    <p>100 Avenue Jean Jaurès 75019 Paris</p>
                                    <h5 className="text-sm md:text-base font-semibold mt-2">
                                        {t("doctor.usefulInfo")}
                                    </h5>
                                    <p>
                                        Accès pour personnes à mobilité réduite:
                                        oui
                                    </p>
                                    <h5 className="text-xs md:text-base font-semibold mt-2">
                                        {t("doctor.transport")}
                                    </h5>
                                    <p>Mértro Laumière : Ligne 5</p>
                                    <p className="mt-4 text-teal-400 cursor-pointer underline">
                                        {t("doctor.seeMap")}
                                    </p>
                                </div>
                                <div className="md:absolute right-0 top-0 h-full md:w-1/2 mt-4 md:mt-0 -ml-4 -mr-4 md:ml-0 md:mr-0 md:rounded-xl overflow-hidden">
                                    <MapContainer
                                        center={[36.753836, 3.04760565]}
                                        zoom={13}
                                        style={{
                                            height: "100vh",
                                            width: "100%",
                                            zIndex: 10,
                                        }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        {/* <Marker
                      position={[position.lat, position.lng]}
                      icon={customIcon}
                    >
                      <Popup>{position.label}</Popup>
                    </Marker> */}
                                    </MapContainer>
                                </div>
                            </InfoSection>
                            <InfoSection
                                icon={Icons.InfoBlue}
                                title={t("doctor.info")}
                            >
                                <div className="text-zinc-600 text-sm space-y-2">
                                    <p>{data?.informations}</p>
                                    <h5 className="text-sm md:text-base font-semibold mt-2">
                                        {t("doctor.spokenLang")}
                                    </h5>
                                    <p>{data?.langue}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <h5 className="text-sm md:text-base font-semibold">
                                            {t("doctor.refunds")}
                                        </h5>
                                        <img src={Icons.Info} alt="icon info" />
                                    </div>
                                    <Card className="overflow-hidden !rounded-none md:!rounded-xl !hidden md:!block">
                                        <CardBody className="flex items-center bg-blue-700 text-white space-x-4">
                                            <img
                                                src={Images.Indique}
                                                alt="image indique"
                                            />
                                            <div className="w-full">
                                                <h4 className="text-sm md:text-lg font-bold">
                                                    {t("note.titleIndicate")}
                                                </h4>
                                                <div className="flex items-center justify-between mt-2 text-xs md:text-base">
                                                    <p>
                                                        {t(
                                                            "note.descriptionIndicate"
                                                        )}
                                                    </p>
                                                    <img
                                                        src={Icons.RightArrow}
                                                        alt="icon right arrow"
                                                        className="hidden md:block"
                                                    />
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </InfoSection>
                            <Card className="overflow-hidden md:!hidden !rounded-none">
                                <CardBody className="flex items-center bg-blue-700 text-white space-x-4">
                                    <img
                                        src={Images.Indique}
                                        alt="image indique"
                                    />
                                    <div className="w-full">
                                        <h4 className="text-sm md:text-lg font-bold">
                                            {t("note.titleIndicate")}
                                        </h4>
                                        <div className="flex items-center justify-between mt-2 text-xs md:text-base">
                                            <p>
                                                {t("note.descriptionIndicate")}
                                            </p>
                                            <img
                                                src={Icons.RightArrow}
                                                alt="icon right arrow"
                                                className="hidden md:block"
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <InfoSection
                                icon={Icons.TimeTableBlue}
                                title={t("doctor.hoursContact")}
                            >
                                <ul className="w-full md:w-1/3">
                                    <li className="grid grid-cols-2 gap-x-6 text-sm">
                                        <p className="capitalize">lundi</p>
                                        <p>08:30 - 20:30</p>
                                    </li>
                                    <li className="grid grid-cols-2 gap-x-6 text-sm">
                                        <p className="capitalize">lundi</p>
                                        <p>08:30 - 20:30</p>
                                    </li>
                                    <li className="grid grid-cols-2 gap-x-6 text-sm">
                                        <p className="capitalize">lundi</p>
                                        <p>08:30 - 20:30</p>
                                    </li>
                                    <li className="grid grid-cols-2 gap-x-6 text-sm">
                                        <p className="capitalize">lundi</p>
                                        <p>08:30 - 20:30</p>
                                    </li>
                                </ul>
                                <div className="flex items-center space-x-2 text-sm md:mt-4">
                                    <img src={icons.Phone} alt="icon phone" />
                                    <p>01 43 03 23 23</p>
                                </div>
                                <h5 className="text-base font-semibold mt-2">
                                    {t("doctor.prices")}
                                </h5>
                                <p>
                                    Le centre n’a malheureusement pas renseigné
                                    ses tarifs.
                                </p>
                            </InfoSection>
                        </div>
                    </div>
                    {localStorage.getItem("accessToken") && (
                        <div className="col-span-2 hidden md:block">
                            <Card borderRadius={"xl"}>
                                <CardHeader className="bg-blue-600 text-white text-center rounded-t-lg">
                                    <h3 className="font-bold text-sm">
                                        {t("doctor.makeRDV")}
                                    </h3>
                                    <p className="font-medium text-xs">
                                        {t("doctor.fillInfo")}
                                    </p>
                                </CardHeader>
                                <CardBody paddingLeft={0}>
                                    <MakeRDVForm data={data ?? {}} />
                                </CardBody>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                }}
                size={"md"}
                isCentered
            >
                <ModalOverlay />
                <ModalContent borderRadius={"2xl"}>
                    <ModalHeader className="flex items-center justify-between"></ModalHeader>
                    <ModalBody className="mb-2 flex flex-col items-center justify-center">
                        <div className="bg-blue-600/40 flex items-center justify-center p-2 rounded-full mb-4">
                            <img src={Icons.checkBlue} alt="" />
                        </div>
                        <h3 className="text-lg font-semibold first-letter:capitalize">
                            {t("confirm.title")}
                        </h3>
                        <p className="text-sm">{t("confirm.description")}</p>

                        <div className="mt-4 flex items-center space-x-2">
                            <button
                                className="border rounded-lg border-gray-500 text-white mx-auto bg-gray-500 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                onClick={onClose}
                            >
                                <p>{t("confirm.cancel")}</p>
                            </button>
                            <button
                                className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                                onClick={() => {
                                    navigate("/sign");
                                }}
                            >
                                <p>{t("confirm.continue")}</p>
                            </button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default DetailsMedecinPage;

const InfoSection = ({ icon, title, children }) => {
    return (
        <Card borderRadius={"md"} className="">
            <CardBody className="!p-2 md:!p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <img src={icon} alt={`icon ${title}`} className="w-5 h-5" />
                    <h3 className="text-blue-500 text-base font-bold capitalize">
                        {title}
                    </h3>
                </div>
                <div className="text-xs md:text-base overflow-x-hidden">
                    {children}
                </div>
            </CardBody>
        </Card>
    );
};
