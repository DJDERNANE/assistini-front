/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import images from "../../constants/images";
import icons from "../../constants/icons";

const ExperienceSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);

    const navigate = useNavigate();

    return (
        <div className="bg-[#FCF8F3] py-20 md:py-32 responsive">
            <div className=" relative">
                <img
                    src={images.Experience}
                    className="!w-full h-[800px] rounded-2xl object-cover"
                />
                <div className="absolute bottom-12 left-12">
                    <div className="bg-white bg-opacity-80 p-6 rounded-xl h-[90%] w-[4  00px]">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-primary-200"></div>
                            <p className=" text-xs">
                                {t("experience.sub-title")}
                            </p>
                        </div>
                        <h3 className="text-4xl font-semibold mb-4 w-2/3 mt-4">
                            {t("experience.title")}
                        </h3>
                        <div className=" border-t border-gray-400 pt-4 mt-4 space-y-6 w-[550px]">
                            {Array.from({ length: 3 }).map((item, idx) => (
                                <div className="grid grid-cols-3 gap-x-6">
                                    <div className="flex items-center space-x-2">
                                        <img src={icons.Point} />
                                        <p className="text-lg font-semibold text-blue-950 w-[200px]">
                                            {t(`experience.badge-${idx + 1}`)}
                                        </p>
                                    </div>
                                    <p className="italic text-gray-600 text-sm w-[350px] font-semibold col-span-2">
                                        {t(`experience.badge-desp-${idx + 1}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button
                            className="flex items-center space-x-2 bg-primary-100 rounded-full text-white text-sm p-1 mt-6 mb-4"
                            onClick={() => {
                                navigate("/sign");
                            }}
                        >
                            <p className="text-sm pl-4">
                                {t("experience.try")}
                            </p>
                            <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white">
                                <img src={icons.RightArrow} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceSection;
