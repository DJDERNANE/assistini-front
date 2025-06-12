/** @format */

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import CustomSwiper from "../custom/CustomSwiper";
import { Images } from "../../constants";
import CustomButton from "../custom/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";

const PartnerSection = () => {
    const { t } = useTranslation("welcome");
    const swiperRef = useRef(null);

    return (
        <div className="pb-20 block pt-20">
            <div className="responsive">
                <h1 className="text-stone-900 font-bold w-28 md:w-fit text-2xl md:text-4xl">
                    {t("partner_section.title")}
                </h1>
                <p className="text-stone-600 text-lg md:text-2xl mt-4">
                    {t("partner_section.description")}
                </p>
                <div className="mt-10 w-full">
                    <CustomSwiper smSlides={1} slides={3} ref={swiperRef}>
                        {[1, 2, 3].map((item) => (
                            <SwiperSlide key={item}>
                                <div className="group relative">
                                    <img
                                        src={Images.BannerWelcome}
                                        alt=""
                                        className="h-[600px] object-cover"
                                    />
                                    <div className="md:hidden absolute left-6 right-6 top-6 bottom-6 flex md:group-hover:flex flex-col justify-between">
                                        <div>
                                            <p className=" text-stone-600 text-sm">
                                                ALGIERS CITY
                                            </p>
                                            <p className="text-stone-700 text-2xl ">
                                                CHERAGA CITY
                                            </p>
                                        </div>
                                        <div className="w-1/2 2xl:w-1/3">
                                            <CustomButton
                                                name={t(
                                                    "partner_section.seeMore"
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </CustomSwiper>
                </div>
                <p className="first-letter:capitalize cursor-pointer mx-auto text-center mt-10 text-lg">
                    {t("partner_section.seeAll")}
                </p>
            </div>
        </div>
    );
};

export default PartnerSection;
