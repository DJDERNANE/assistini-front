/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import WelcomeCard from "../cards/WelcomeCard";
import AuthCard from "../cards/AuthCard";
import SignInForm from "../form/SignInForm";
import SignUpForm from "../form/SignUpForm";
import { Icons, Images } from "../../constants";

const SubAdminLoginSection = ({}) => {
    const { t } = useTranslation("welcome");

    const type = useSelector((state) => state.auth.type);
    const step = useSelector((state) => state.auth.step);

    return (
        <div
            className={`bg-[#FCF8F3] relative h-screen flex items-center justify-end`}
            // style={imgRef.current && styleHeight}
        >
            <div className="absolute left-0 top-0 bottom-0 right-0 z-20">
                <div className="responsive h-full z-30 w-full flex items-center justify-center">
                    <div className="bg-white bg-opacity-60 bg-blur backdrop-filter backdrop-blur-lg p-10 md:p-14 rounded h-fit w-[500px]">
                        <SignInForm isSubAdmin isMedecin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubAdminLoginSection;
