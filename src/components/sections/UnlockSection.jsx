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

const UnlockSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);

    return (
        <div className="bg-[#FCF8F3] py-20 md:py-32">
            <div className="responsive flex flex-col items-center">
                <div className="col-span-1 flex items-start h-full space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                    <h3 className="text-stone-700 text-xs font-normal text-center">
                        {t("unlock.sub-title")}
                    </h3>
                </div>
                <h1 className="text-blue-950 text-3xl text-center font-bold mt-2">
                    {t("unlock.title")}
                </h1>
                <p className="text-gray-400 italic mt-6 md:w-1/3 text-center">
                    {t("unlock.sub-sub-title")}
                </p>
                <div className="w-1/3 border-t border-gray-400 mt-10"></div>
                <div className="flex flex-col md:grid grid-cols-3 grid-rows-3 gap-4 mt-10 md:h-[500px]">
                    <div className="row-span-3 rounded-xl overflow-hidden bg-[#0D0D39] relative">
                        <img
                            src={Images.Unlock1}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute left-4 top-4">
                            <h3 className="text-white font-bold text-xl">
                                {t("unlock.box-title-1")}
                            </h3>
                            <p className="text-sm text-gray-300 mt-4">
                                {t("unlock.box-desp-1")}
                            </p>
                        </div>
                    </div>
                    <div className="row-span-2 rounded-xl overflow-hidden relative">
                        <img src={Images.Unlock2} />
                        <div className="absolute left-4 bottom-4">
                            <p className="text-sm text-gray-300">
                                {t("unlock.box-desp-2")}
                            </p>
                        </div>
                    </div>
                    <div className="row-span-1 bg-[#E7E0D8] rounded-xl overflow-hidden relative">
                        <img src={Images.Unlock4} />
                        <div className="absolute left-4 top-4">
                            <h3 className="text-white font-bold text-xl">
                                {t("unlock.box-title-4")}
                            </h3>
                        </div>
                    </div>
                    <div className="row-span-1 bg-[#0D0D39] col-start-2 rounded-xl overflow-hidden relative">
                        <img src={Images.Unlock3} />
                        <div className="absolute left-4 bottom-4 z-20">
                            <p className="text-gray-200 text-sm">
                                {t("unlock.box-desp-3")}
                            </p>
                        </div>
                    </div>
                    <div className="row-span-2 rounded-xl overflow-hidden col-start-3 row-start-2">
                        <img
                            src={Images.Unlock5}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnlockSection;
