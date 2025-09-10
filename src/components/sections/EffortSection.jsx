/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { Images } from "../../constants";
import images from "../../constants/images";
import icons from "../../constants/icons";
import { useNavigate } from "react-router";

const EffortSection = () => {
    const { t } = useTranslation("welcome");
    const navigate = useNavigate();
    return (
        <div className="w-full relative mt-20 md:mt-32">
            <img
                src={Images.Effort}
                alt="image banner welcome"
                className="w-full h-[2150px] md:h-[850px] object-cover"
            />
            <div className="absolute right-0 top-0 bottom-0 left-0">
                <div className="responsive py-20">
                    <div className="col-span-1 flex items-start h-full space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                        <h3 className="text-white text-xs font-normal text-center">
                            {t("effort.sub-title")}
                        </h3>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end">
                        <h3 className="mt-6 text-white font-bold text-3xl md:w-[350px]">
                            {t("effort.sub-sub-title")}
                        </h3>
                        <div className="w-2/3 border-t border-gray-400 mt-10"></div>
                    </div>
                </div>

                <div className="responsive grid md:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((item, idx) => (
                        <div className="flex flex-col justify-between p-6 bg-primary-100 bg-opacity-10 h-[400px] rounded-xl">
                            <div>
                                <p className="text-2xl text-white font-bold">
                                    .{idx + 1}
                                </p>
                                <p className="text-2xl text-white font-bold mt-4">
                                    {t(`effort.card-title-${idx + 1}`)}
                                </p>
                            </div>
                            <p className="text-xs text-gray-300">
                                {t(`effort.card-desp-${idx + 1}`)}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="responsive mt-6 rounded-xl">
                    <div className="bg-primary-100 bg-opacity-10 p-6 rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                {Array.from({ length: 4 }).map((item, idx) => (
                                    <div
                                        className={`${
                                            idx > 0 && "-ml-3"
                                        } rounded-full bg-white w-[40px] h-[40px] p-0.5`}
                                    >
                                        <img
                                            src={images.About}
                                            className="rounded-full w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-300">
                                {t("effort.footer-desp")}
                            </p>
                        </div>
                        <button
                            className="flex items-center space-x-2 bg-primary-100 rounded-full text-white text-sm p-1"
                            onClick={() => {
                                navigate("/request");
                            }}
                        >
                            <p className="text-sm pl-4">{t("effort.join")}</p>
                            <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white">
                                <img src={icons.RightArrow} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EffortSection;
