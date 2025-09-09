/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { Images } from "../../constants";

const BannerSection = () => {
    const { t } = useTranslation("welcome");

    return (
        <div className="w-full relative ">
            <img
                src={Images.How}
                alt="image banner welcome"
                className="w-full h-[900px] object-cover"
            />
            <div className="absolute right-0 top-0 bottom-0 left-0 text-stone-700 text-xs md:text-sm ">
                <div className="flex items-center justify-center h-full">
                    <div className="responsive h-[576px] grid md:grid-cols-2 ">
                        <img src={Images.Border} className="md:block hidden w-full h-full " />

                        <div className="h-full bg-white rounded-r-2xl flex justify-center flex-col px-10 w-full">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-4 h-4 mt-1 rounded-full bg-primary-200"></div>
                                <h2 className="text-2xl font-bold text-blue-950">
                                    {t("how.title")}
                                </h2>
                            </div>

                            <div className="hover:bg-[#E7E0D8] rounded-full p-2 flex items-center space-x-3 group">
                                <div className="rounded-full flex items-center justify-center text-primary-200 bg-[#E7E0D8] group-hover:bg-white w-12 h-12 font-extrabold text-xl">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-950">
                                        {t("how.opt-1")}
                                    </h3>
                                    <p className="text-xs hidden group-hover:block">
                                        {t("how.opt-desp-1")}
                                    </p>
                                </div>
                            </div>
                            <div className="hover:bg-[#E7E0D8] rounded-full p-2 flex items-center space-x-3 group mt-4">
                                <div className="rounded-full flex items-center justify-center text-primary-200 bg-[#E7E0D8] group-hover:bg-white w-12 h-12 font-extrabold text-xl">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-950">
                                        {t("how.opt-2")}
                                    </h3>
                                    <p className="text-xs hidden group-hover:block">
                                        {t("how.opt-desp-2")}
                                    </p>
                                </div>
                            </div>
                            <div className="hover:bg-[#E7E0D8] rounded-full p-2 flex items-center space-x-3 group mt-4">
                                <div className="rounded-full flex items-center justify-center text-primary-200 bg-[#E7E0D8] group-hover:bg-white w-12 h-12 font-extrabold text-xl">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-950">
                                        {t("how.opt-3")}
                                    </h3>
                                    <p className="text-xs hidden group-hover:block">
                                        {t("how.opt-desp-3")}
                                    </p>
                                </div>
                            </div>
                            <div className="hover:bg-[#E7E0D8] rounded-full p-2 flex items-center space-x-3 group mt-4">
                                <div className="rounded-full flex items-center justify-center text-primary-200 bg-[#E7E0D8] group-hover:bg-white w-12 h-12 font-extrabold text-xl">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-950">
                                        {t("how.opt-4")}
                                    </h3>
                                    <p className="text-xs hidden group-hover:block">
                                        {t("how.opt-desp-4")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="h-full flex items-center justify-center">
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
