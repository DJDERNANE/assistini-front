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

const SponsorSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);

    return (
        <div className="bg-[#FCF8F3] pb-20 md:pb-32">
            <div className="responsive flex flex-col items-center">
                <div className="col-span-1 flex items-start h-full space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                    <h3 className="text-stone-700 text-xs font-normal text-center">
                        {t("sponsor.sub-title")}
                    </h3>
                </div>

                <div className="w-1/3 border-t border-gray-400 mt-4"></div>
                <Swiper
                    className="mySwiper mt-10 w-full"
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={10.3} // Show 3 slides at once (adjust as needed)
                    loop={true} // Enable looping
                    speed={6000}
                    autoplay={{
                        delay: 0, // Time between slides (in ms)
                        disableOnInteraction: false,
                    }}
                >
                    {Array.from({ length: 30 }).map((slide) => (
                        <SwiperSlide key={slide} className="w-fit">
                            <img src={icons.Calendar} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SponsorSection;
