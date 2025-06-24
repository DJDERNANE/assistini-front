/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../custom/CustomInput";
import { Icons } from "../../constants";
import CustomButton from "../custom/CustomButton";

const NewPasswordForm = ({ email, onSubmit, loading, error, message, onBack, register }) => {
    const { t } = useTranslation("welcome");

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col justify-between h-full space-y-4"
        >
            <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10">
                {t("general.newPassword")}
            </h1>
            <p className="text-zinc-500 font-normal mb-6">
                {t("general.newPassword_description")}
            </p>
            
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {message}
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            <div>
                <div className="text-sm mb-1">
                    <label className="text-[#3A3A3A] first-letter:capitalize">
                        {t("general.newPassword")}
                    </label>
                </div>
                <CustomInput
                    register={register("password", { required: true })}
                    placeholder={t("general.newPassword_placeholder")}
                    icon={Icons.Lock}
                    type="password"
                />
            </div>
            
            <div>
                <div className="text-sm mb-1">
                    <label className="text-[#3A3A3A] first-letter:capitalize">
                        {t("general.confirmPassword")}
                    </label>
                </div>
                <CustomInput
                    register={register("confirmPassword", { required: true })}
                    placeholder={t("general.confirmPassword_placeholder")}
                    icon={Icons.Lock}
                    type="password"
                />
            </div>
            
            <CustomButton 
                name={loading ? t("general.updating") : t("general.updatePassword")} 
                type="submit" 
                disabled={loading}
            />
            
            <button
                type="button"
                className="text-blue-600 font-medium text-sm flex items-center space-x-2"
                onClick={onBack}
            >
                <img src={Icons.LeftArrowLineBlue} alt="back arrow" />
                <p>{t("general.back")}</p>
            </button>
        </form>
    );
};

export default NewPasswordForm; 