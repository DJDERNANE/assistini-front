/** @format */

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Icons, Images } from "../constants";
import { useMe } from "../hooks/useAuthService";
import { Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const Userbar = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const { t } = useTranslation("home");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <Card borderRadius={"xl"}>
            <CardBody>
                {false ? (
                    <div className="w-full flex justify-center items-center">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </div>
                ) : (
                    <div>
                        <div
                            className="flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setIsOpen((o) => !o);
                            }}
                        >
                            <div className="flex items-center space-x-4">
                                {data?.logo ? (
                                    <img
                                        src={
                                            data &&
                                            `${process.env.REACT_APP_URL_API}/${data?.logo}`
                                        }
                                        alt=""
                                        className="w-12 h-12 rounded-full"
                                    />
                                ) : (
                                    <div className="bg-primary-100/20 rounded-full w-12 h-12 flex items-center justify-center">
                                        <p className="uppercase font-bold text-primary-100 text-2xl">
                                            {data?.fullname?.substring(0, 1)}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="capitalize text-neutral-800 font-medium">
                                        {data && data?.fullname}
                                    </h3>
                                    <p className="text-neutral-800 text-xs font-light !truncate w-[120px]">
                                        {data && data.email}
                                    </p>
                                </div>
                            </div>
                            <img
                                src={Icons.ArrowDown}
                                alt="icon arrow down"
                                className={`${isOpen && "rotate-180"}`}
                            />
                        </div>

                        {isOpen && (
                            <div className="bg-gray-100 rounded-xl p-4 mt-2">
                                <p
                                    className="hover:bg-gray-200 py-2 font-semibold first-letter:capitalize text-center cursor-pointer"
                                    onClick={() => {
                                        navigate("/home/profile");
                                    }}
                                >
                                    {t("bar.profile")}
                                </p>
                                <div className="w-full h-px bg-gray-300 my-2"></div>
                                <p
                                    className="hover:bg-gray-200 py-2 font-semibold first-letter:capitalize text-center cursor-pointer text-red-600"
                                    onClick={logout}
                                >
                                    {t("bar.logout")}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default Userbar;
