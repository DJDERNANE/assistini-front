/** @format */

import React from "react";
import { Images, Icons, Logos } from "../constants";
import SocialMedia from "../components/ui/SocialMedia";
import { useTranslation } from "react-i18next";
import images from "../constants/images";

const Footer = () => {
    const { t } = useTranslation("global");
    return (
        <footer className="text-sm relative h-[350px]">
            <img src={images.Effort} className="w-full h-full" />

            <div className="!text-white absolute left-0 top-0 right-0 bottom-0 grid grid-cols-2 md:flex items-center md:items-start md:justify-between py-2 md:py-20 responsive">
                <div className="mt-8 md:mt-0 md:hidden col-span-2 mb-10">
                    <h3 className="first-letter:capitalize font-medium text-lg md:text-xl mb-6 text-center md:text-left">
                        {t("footer.stayUpdated")}
                    </h3>
                    <ul className="flex justify-center">
                        <div className="flex items-center h-10">
                            <input
                                type="text"
                                placeholder={t("footer.enterEmail")}
                                className="px-4 outline-none bg-gray-100 h-full"
                            />
                            <div className="bg-blue-600 h-full flex items-center justify-center px-2">
                                <img
                                    src={Icons.SendWhite}
                                    alt="icon send white"
                                    className="w-6"
                                />
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="col-span-full flex flex-col items-center justify-center">
                    <img
                        src={"/logo-white.svg"}
                        alt=""
                        className="w-[100px] md:w-[180px] object-cover"
                    />

                    <p className="text-xs md:text-lg text-center my-4 w-full md:w-2/3">
                        {t("footer.description")}
                    </p>

                    <div className="flex items-center space-x-2">
                        <div className="border rounded-full p-2 flex items-center justify-center border-white">
                            <img src={Icons.Twitter} alt="icon twitter" />
                        </div>
                        <div className="border rounded-full p-2 flex items-center justify-center border-white">
                            <img src={Icons.Instagram} alt="icon instagram" />
                        </div>
                        <div className="border rounded-full p-2 flex items-center justify-center border-white">
                            <img src={Icons.Facebook} alt="icon facebook" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
