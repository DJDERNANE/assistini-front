/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import WelcomeCard from "../cards/WelcomeCard";
import AuthCard from "../cards/AuthCard";
import SignInForm from "../form/SignInForm";
import SignUpForm from "../form/SignUpForm";
import { Icons, Images } from "../../constants";
import NavbarWelcome from "../../layout/NavbarWelcome";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { useNavigate } from "react-router";

const HeroSection = ({ isMedecin = false, sign = false }) => {
    const { t } = useTranslation("welcome");

    const type = useSelector((state) => state.auth.type);
    const step = useSelector((state) => state.auth.step);
    const navigate = useNavigate();
    return (
        <div
            className={`bg-[#FCF8F3] relative h-screen flex items-center justify-end w-full`}
            // style={imgRef.current && styleHeight}
        >
            <div className="absolute z-50 top-0 left-0 right-0">
                <NavbarWelcome />
            </div>
            <img
                src={Images.Hero}
                alt="image hero section"
                className="h-full w-full object-cover"
            />
            <div className="absolute right-48 top-64 z-20">
                <div className="w-28 h-28 backdrop-blur-lg bg-white bg-opacity-5 rounded-full p-4">
                    <img
                        src="/logo-icon.svg"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="absolute right-[550px] bottom-60 z-20">
                <div className="w-28 h-28 backdrop-blur-lg bg-white bg-opacity-5 rounded-full p-4">
                    <img
                        src="/logo-icon.svg"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 right-0 z-20">
                <div className="responsive w-full h-full z-30 grid grid-cols-12 gap-6 2xl:gap-0">
                    {sign ? (
                        <div className="col-span-12 md:col-span-5 2xl:col-span-4 flex items-center ">
                            <div className="bg-white bg-opacity-80 bg-blur backdrop-filter backdrop-blur-lg p-10 md:p-14 rounded h-fit w-full">
                                {isMedecin ? (
                                    <SignInForm isMedecin />
                                ) : (
                                    <>
                                        {type === "" && (
                                            <>
                                                {step === 1 && <WelcomeCard />}
                                                {step === 2 && <AuthCard />}
                                            </>
                                        )}
                                        {type === "sign-in" && <SignInForm />}
                                        {type === "sign-up" && <SignUpForm />}
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="col-span-6 flex flex-col justify-center">
                            <h1 className="text-white text-4xl mb-6 font-bold w-2/3">
                                {t("hero.title")}
                            </h1>
                            <p className="text-gray-200 text-lg italic">
                                {t("hero.desp")}
                            </p>
                            <div className="flex items-center space-x-4">
                                <button
                                    className="flex items-center space-x-2 bg-primary-100 rounded-full text-white text-sm p-1 mt-6 mb-4"
                                    onClick={() => {
                                        navigate("/doctors");
                                    }}
                                >
                                    <p className="text-sm pl-4">
                                        {t("hero.find")}
                                    </p>
                                    <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white">
                                        <img src={icons.RightArrow} />
                                    </div>
                                </button>
                                <button
                                    className="flex items-center space-x-2 bg-transparent border border-primary-100 rounded-full text-white text-sm p-1 mt-6 mb-4"
                                    onClick={() => {
                                        navigate("/request-prestateur");
                                    }}
                                >
                                    <p className="text-sm pl-4">
                                        {t("hero.become")}
                                    </p>
                                    <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white">
                                        <img src={icons.RightArrow} />
                                    </div>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4 mt-4">
                                <div className="flex items-center">
                                    {Array.from({ length: 4 }).map(
                                        (item, idx) => (
                                            <div
                                                className={`${
                                                    idx > 0 && "-ml-3"
                                                } rounded-full bg-white w-[30px] h-[30px] p-0.5`}
                                            >
                                                <img
                                                    src={images.About}
                                                    className="rounded-full w-full h-full"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                                <p className="text-sm text-gray-300">
                                    {t("hero.stat")}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
