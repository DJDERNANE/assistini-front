/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import images from "../../constants/images";
import icons from "../../constants/icons";

const OfferSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);
    const navigate = useNavigate();
    return (
        <div className="bg-[#FCF8F3] py-20 md:py-32">
            <div className="responsive">
                <div className="bg-[#E7E0D8] rounded-xl w-full p-2 relative">
                    <img
                        src={images.Offer}
                        className="!w-full h-[800px] rounded-xl object-cover"
                    />
                    <div className="absolute top-12 left-12">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-primary-200"></div>
                            <p className="text-white text-xs">
                                {t("offer.sub-title")}
                            </p>
                        </div>
                        <h3 className="text-4xl font-semibold mb-4 w-2/3 mt-4 text-white">
                            {t("offer.title")}
                        </h3>
                        <div className="flex items-center space-x-2">
                            <p className="font-light text-xs bg-white bg-opacity-40 rounded-full px-2 p-1 text-white">
                                20% {t("offer.badge-1")}
                            </p>
                            <p className="font-light text-xs bg-white bg-opacity-40 rounded-full px-2 p-1 text-white">
                                {t("offer.badge-2")}
                            </p>
                        </div>
                    </div>

                    <div className="w-1/4 border-t border-gray-400 mt-10 mx-auto"></div>
                    <p className="text-gray-700 italic mt-2 text-xs text-center w-2/3 mx-auto">
                        {t("offer.desp")}
                    </p>
                    <button
                        className="flex items-center space-x-2 bg-primary-100 rounded-full text-white text-sm p-1 mx-auto mt-6 mb-4"
                        onClick={() => {
                            navigate("/request");
                        }}
                    >
                        <p className="text-sm pl-4">{t("offer.join")}</p>
                        <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white">
                            <img src={icons.RightArrow} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferSection;
