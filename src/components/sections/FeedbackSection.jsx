/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Icons, Images } from "../../constants";
import icons from "../../constants/icons";

const FeedbackSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);

    return (
        <div className="bg-[#FCF8F3] pt-20 md:pt-32">
            <div className="responsive flex flex-col items-center">
                <div className="col-span-1 flex items-start h-full space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                    <h3 className="text-stone-700 text-xs font-normal text-center">
                        {t("feedback.sub-title")}
                    </h3>
                </div>
                <h1 className="text-blue-950 text-3xl text-center font-bold mt-2 w-1/3">
                    {t("feedback.title")}
                </h1>
                {/* <p className="text-gray-400 italic mt-6">
                    {t("feedback.sub-sub-title")}
                </p> */}
                <div className="w-1/3 border-t border-gray-400 mt-10"></div>
            </div>
            <Swiper
                className="mySwiper mt-20 w-full"
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={4.3} // Show 3 slides at once (adjust as needed)
                loop={true} // Enable looping
                speed={6000}
                autoplay={{
                    delay: 0, // Time between slides (in ms)
                    disableOnInteraction: false,
                }}
            >
                {Array.from({ length: 10 }).map((slide) => (
                    <SwiperSlide key={slide} className="">
                        <div className="flex flex-col justify-between p-6 bg-[#E7E0D8] h-[400px] rounded-xl">
                            <p className="text-xs text-blue-950 italic">
                                {t("feedback.card-desp-1")}
                            </p>
                            <div>
                                <h3 className="text-blue-950 font-semibold">
                                    {t("feedback.card-desp-1")}
                                </h3>
                                <p className="text-xs">
                                    {t("feedback.card-desp-1")}
                                </p>
                                <div className="mt-6 flex items-center space-x-6">
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: 5 }).map(
                                            (item) => (
                                                <img
                                                    key={item}
                                                    src={icons.StarFill}
                                                    className="w-4"
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-xs">5/5</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeedbackSection;
