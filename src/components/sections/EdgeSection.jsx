/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Icons, Images } from "../../constants";

const EdgeSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);

    return (
        <div className="bg-[#FCF8F3] pt-20 md:pt-32">
            <div className="responsive grid md:grid-cols-2">
                <div className="flex flex-col justify-center md:items-start items-center">
                    <div className="flex items-start space-x-2 md:justify-start justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                        <h3 className="text-stone-700 text-xs font-normal text-center">
                            {t("edge.sub-title")}
                        </h3>
                    </div>
                    <h1 className="text-blue-950 text-3xl font-bold mt-2 md:w-2/3 text-center md:text-start">
                        {t("edge.title")}
                    </h1>
                    <p className="text-gray-400 italic mt-6 md:w-2/3">
                        {t("edge.sub-sub-title")}
                    </p>
                    <div className="w-1/3 border-t border-gray-400 mt-10"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-10 mt-10">
                    <div className="flex items-center justify-center">
                        <div className="row-span-1 bg-[#0D0D39] rounded-xl p-4 flex flex-col shadow-2xl justify-between w-[200px] h-[200px] border-r-8 border-primary-200">
                            <p className="text-white font-bold text-3xl">
                                250+
                            </p>
                            <p className="text-xs text-white uppercase font-light">
                                {t("edge.diff-desp-1")}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6 mx-auto">
                        <div className="row-span-1 bg-[#0D0D39] rounded-xl p-4 flex flex-col shadow-2xl justify-between w-[200px] h-[200px] border-r-8 border-primary-200">
                            <p className="text-white font-bold text-3xl">60+</p>
                            <p className="text-xs text-white uppercase font-light">
                                {t("edge.diff-desp-2")}
                            </p>
                        </div>
                        <div className="row-span-1 bg-[#0D0D39] rounded-xl p-4 flex flex-col shadow-2xl justify-between w-[200px] h-[200px] border-r-8 border-primary-200">
                            <p className="text-white font-bold text-3xl">25+</p>
                            <p className="text-xs text-white uppercase font-light">
                                {t("edge.diff-desp-3")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EdgeSection;
