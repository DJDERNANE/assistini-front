/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../custom/CustomInput";
import { Icons } from "../../constants";
import { Checkbox, CheckboxGroup, FormLabel, Switch } from "@chakra-ui/react";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useResetPwd } from "../../hooks/useAuthService";

const ResetPwdForm = ({ onClick, goNext }) => {
    const { t } = useTranslation("welcome");
    const navigate = useNavigate();

    const [isPatient, setIsPatient] = useState(true);

    const { register, handleSubmit, onSubmit, loading, message, error } =
        useResetPwd(() => {});

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // navigate("/home");
    //     goNext();
    // };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between h-full space-y-4"
        >
            <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10">
                {t("general.forgetPassword2")}
            </h1>
            <p className="text-zinc-500 font-normal mb-6">
                {t("general.forgetPassword2_description")}
            </p>
            <div>
                <div className="text-sm mb-1">
                    <label className="text-[#3A3A3A] first-letter:capitalize">
                        {t("general.email")}
                    </label>
                </div>
                <CustomInput
                    register={register("email", { required: true })}
                    placeholder={t("general.email_placeholder")}
                    icon={Icons.Mail}
                />
            </div>
            <CustomButton name={t("general.send")} type="submit" />
            <button
                className="text-blue-600 font-medium text-sm flex items-center space-x-2"
                onClick={onClick}
            >
                <img src={Icons.LeftArrowLineBlue} alt="back arrow" />
                <p>{t("general.backLogin")}</p>
            </button>
        </form>
    );
};

export default ResetPwdForm;
