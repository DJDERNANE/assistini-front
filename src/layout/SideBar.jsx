/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Icons } from "../constants";
import { useTranslation } from "react-i18next";

const SideBar = () => {
    const { t } = useTranslation("global");

    const pathname = window.location.pathname.split("/");
    const page = pathname[pathname.length - 1];
    const navigate = useNavigate();

    return (
        <div>
            <Card borderRadius={"xl"}>
                <CardBody>
                    <ul className="space-y-7">
                        <li
                            className="flex items-center justify-between"
                            onClick={() => {
                                navigate("/home/my-rdvs");
                            }}
                        >
                            <ItemSideBar
                                icon={Icons.CalendarCheck}
                                name={t("sidebar.my_RDV")}
                                // nbrNoti={300}
                                selected={page === "my-rdvs"}
                            />
                        </li>
                        <li
                            onClick={() => {
                                navigate("/home/favorites");
                            }}
                        >
                            <ItemSideBar
                                icon={Icons.Star}
                                name={t("sidebar.my_fav")}
                                selected={page === "favorites"}
                            />
                        </li>
                        <li
                            onClick={() => {
                                navigate("/home/documents");
                            }}
                        >
                            <ItemSideBar
                                icon={Icons.Folder}
                                name={t("sidebar.my_documents")}
                                // nbrNoti={10}
                                selected={page === "documents"}
                            />
                        </li>
                        <li
                            onClick={() => {
                                navigate("/home/requests");
                            }}
                        >
                            <ItemSideBar
                                icon={Icons.EditRectangle}
                                name={t("sidebar.requests")}
                                selected={page === "requests"}
                            />
                        </li>
                        <li
                            onClick={() => {
                                navigate("/home/my-patient");
                            }}
                        >
                            <ItemSideBar
                                icon={Icons.UserRectangle}
                                name={t("sidebar.my_patient")}
                                selected={page === "my-patient"}
                            />
                        </li>
                    </ul>
                </CardBody>
            </Card>
        </div>
    );
};

const ItemSideBar = ({ icon, name, nbrNoti, selected = false }) => {
    return (
        <div className="w-full flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-2">
                <img src={icon} alt={name} />
                <p
                    className={`capitalize ${
                        selected
                            ? "text-blue-600 font-semibold"
                            : "text-stone-500"
                    } `}
                >
                    {name}
                </p>
            </div>

            {nbrNoti > 0 && (
                <p className="bg-rose-600 w-8 h-4 rounded-lg text-white text-xs text-center font-medium">
                    {nbrNoti < 100 ? nbrNoti : "+99"}
                </p>
            )}
        </div>
    );
};

export default SideBar;
