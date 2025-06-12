/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

const AboutUsSection = () => {
    const { t } = useTranslation("welcome");

    return (
        <div className="responsive">
            <div className="grid md:grid-cols-2 py-16 md:py-40 gap-y-6">
                <div className="flex items-end justify-center h-full">
                    <h1 className="text-stone-700 text-3xl font-normal text-center">
                        {t("whySection.title")}
                    </h1>
                </div>
                <div className="space-y-4 mx-auto  md:mx-0 w-2/3 text-justify md:text-left">
                    <p className="text-stone-700 text-sm md:text-base">
                        {t("whySection.description_1")}
                    </p>
                    <p className="text-stone-700 text-sm md:text-base">
                        {t("whySection.description_2")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;
