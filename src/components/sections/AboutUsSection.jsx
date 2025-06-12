/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { Icons, Images } from "../../constants";

const AboutUsSection = () => {
    const { t } = useTranslation("welcome");

    return (
        <div className="responsive">
            <div className="py-32">
                <div className="grid md:grid-cols-3 gap-x-10">
                    <div className="col-span-1 flex items-start h-full space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                        <h3 className="text-stone-700 text-xs font-normal text-center">
                            {t("whySection.sub-title")}
                        </h3>
                    </div>
                    <div className="col-span-2 flex items-end h-full border-b-2 border-gray-200 pb-14">
                        <h1 className="text-stone-700 text-xl font-normal italic">
                            {t("whySection.title")}
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-10 pt-10">
                    <img
                        src={Images.About}
                        className="w-[300px] object-cover"
                    />
                    <div className="col-span-2 flex items-center justify-between">
                        <div className="mx-auto  md:mx-0 w-2/3 text-justify md:text-left">
                            <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center">
                                <img src={Icons.Why1} />
                            </div>
                            <p className="text-blue-950 font-semibold text-sm md:text-base mb-3 mt-1">
                                {t("whySection.card-title-1")}
                            </p>
                            <p className="text-stone-700 text-sm">
                                {t("whySection.card-description-1")}
                            </p>
                        </div>

                        <div className="mx-auto  md:mx-0 w-2/3 text-justify md:text-left">
                            <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center">
                                <img src={Icons.Why2} />
                            </div>
                            <p className="text-blue-950 font-semibold text-sm md:text-base mb-3 mt-1">
                                {t("whySection.card-title-2")}
                            </p>
                            <p className="text-stone-700 text-sm">
                                {t("whySection.card-description-2")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;
