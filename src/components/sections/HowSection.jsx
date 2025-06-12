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

const HowSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);

    return (
        <div className="bg-[#FCF8F3] pt-20 md:pt-32">
            <div className="responsive flex flex-col items-center">
                <div className="col-span-1 flex items-start h-full space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                    <h3 className="text-stone-700 text-xs font-normal text-center">
                        {t("advantage.sub-title")}
                    </h3>
                </div>
                <h1 className="text-blue-950 text-3xl text-center font-bold mt-2 w-1/3">
                    {t("advantage.title")}
                </h1>
                <p className="text-gray-400 italic mt-6 w-2/3 text-center">
                    {t("advantage.sub-sub-title")}
                </p>
                <div className="w-1/3 border-t border-gray-400 mt-10"></div>
                <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-10">
                    <div className="row-span-2 rounded-xl overflow-hidden">
                        <img
                            src={Images.Diff1}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="row-span-3 rounded-xl overflow-hidden relative">
                        <img src={Images.Diff2} />
                        <div className="absolute left-8 top-8">
                            <h3 className="text-white font-bold text-xl">
                                99.8% <br />
                                {t("advantage.diff-title-3")}
                            </h3>
                        </div>
                    </div>
                    <div className="row-span-1 bg-[#E7E0D8] rounded-xl overflow-hidden p-4 flex flex-col justify-between">
                        <p className="text-sm">{t("advantage.diff-desp-1")}</p>
                        <h3 className="text-blue-950 font-bold text-xl">
                            99.8% <br />
                            {t("advantage.diff-title-1")}
                        </h3>
                    </div>
                    <div className="row-span-1 bg-[#D7DDE9] col-start-1 rounded-xl overflow-hidden p-4 flex flex-col justify-between">
                        <h3 className="text-blue-950 font-bold text-xl">
                            3000+ <br />
                            {t("advantage.diff-desp-2")}
                        </h3>
                        <p className="text-sm">{t("advantage.diff-title-2")}</p>
                    </div>
                    <div className="row-span-2 rounded-xl overflow-hidden col-start-3 row-start-2">
                        <img
                            src={Images.Diff3}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowSection;
