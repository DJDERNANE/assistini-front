/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { Images } from "../../constants";
import images from "../../constants/images";

const AppSection = () => {
    const { t } = useTranslation("welcome");

    return (
        <div className="h-[500px] relative">
            <img
                src={Images.BgApp}
                alt="image App welcome"
                className="!w-full h-full object-cover"
            />
            <div className="absolute right-0 top-0 bottom-0 left-0 text-stone-700 text-xs md:text-sm ">
                <div className="responsive flex flex-col justify-center h-full w-[300px]">
                    <div className="flex items-start space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                        <h3 className="text-gray-300 text-xs font-normal text-center">
                            {t("app.sub-title")}
                        </h3>
                    </div>
                    <h1 className="text-white text-3xl font-bold w-1/3 mt-8">
                        {t("app.title")}
                    </h1>
                    <p className="text-gray-400 italic mt-16 text-base w-[400px]">
                        {t("app.sub-sub-title")}
                    </p>
                    <div className="flex items-center space-x-4 mt-10">
                        <img
                            src={images.GoogleStore}
                            className="h-[40px] object-cover"
                        />
                        <img
                            src={images.AppStore}
                            className="h-[40px] object-cover"
                        />
                    </div>
                </div>
            </div>
            <img
                src={Images.Phone}
                className="w-[1000px] object-cover absolute bottom-0 right-0"
            />
        </div>
    );
};

export default AppSection;
