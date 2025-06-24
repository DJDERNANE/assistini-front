/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../custom/CustomInput";
import { Icons } from "../../constants";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useCheckEmail, useConfirmEmailCode, useUpdateResetPwd } from "../../hooks/useAuthService";
import VerifyCodeForm from "./VerifyCodeForm";
import NewPasswordForm from "./NewPasswordForm";

const ResetPwdForm = ({ onClick, goNext }) => {
    const { t } = useTranslation("welcome");
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1); // 1: email, 2: code, 3: new password
    const [email, setEmail] = useState("");

    const { 
        register: registerEmail, 
        handleSubmit: handleSubmitEmail, 
        onSubmit: onSubmitEmail, 
        loading: loadingEmail, 
        message: messageEmail, 
        error: errorEmail 
    } = useCheckEmail((email) => {
        setEmail(email);
        setCurrentStep(2);
    });

    const { 
        register: registerCode, 
        handleSubmit: handleSubmitCode, 
        onSubmit: onSubmitCode, 
        loading: loadingCode, 
        message: messageCode, 
        error: errorCode 
    } = useConfirmEmailCode(email, () => {
        setCurrentStep(3);
    });

    const { 
        register: registerPassword, 
        handleSubmit: handleSubmitPassword, 
        onSubmit: onSubmitPassword, 
        loading: loadingPassword, 
        message: messagePassword, 
        error: errorPassword 
    } = useUpdateResetPwd(email, () => {
        // Password updated successfully, force a full page reload to show login form
        window.location.href = "/sign";
    });

    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        } else if (currentStep === 3) {
            setCurrentStep(2);
        }
    };

    // Step 1: Email input
    if (currentStep === 1) {
        return (
            <form
                onSubmit={handleSubmitEmail(onSubmitEmail)}
                className="flex flex-col justify-between h-full space-y-4"
            >
                <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10">
                    {t("general.forgetPassword2")}
                </h1>
                <p className="text-zinc-500 font-normal mb-6">
                    {t("general.forgetPassword2_description")}
                </p>
                
                {messageEmail && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {messageEmail}
                    </div>
                )}
                
                {errorEmail && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {errorEmail}
                    </div>
                )}
                
                <div>
                    <div className="text-sm mb-1">
                        <label className="text-[#3A3A3A] first-letter:capitalize">
                            {t("general.email")}
                        </label>
                    </div>
                    <CustomInput
                        register={registerEmail("email", { required: true })}
                        placeholder={t("general.email_placeholder")}
                        icon={Icons.Mail}
                    />
                </div>
                <CustomButton 
                    name={loadingEmail ? t("general.sending") : t("general.send")} 
                    type="submit" 
                    disabled={loadingEmail}
                />
                <button
                    type="button"
                    className="text-blue-600 font-medium text-sm flex items-center space-x-2"
                    onClick={onClick}
                >
                    <img src={Icons.LeftArrowLineBlue} alt="back arrow" />
                    <p>{t("general.backLogin")}</p>
                </button>
            </form>
        );
    }

    // Step 2: Code verification
    if (currentStep === 2) {
        return (
            <VerifyCodeForm
                email={email}
                onSubmit={handleSubmitCode(onSubmitCode)}
                loading={loadingCode}
                error={errorCode}
                message={messageCode}
                onBack={handleBack}
                register={registerCode}
            />
        );
    }

    // Step 3: New password
    if (currentStep === 3) {
        return (
            <NewPasswordForm
                email={email}
                onSubmit={handleSubmitPassword(onSubmitPassword)}
                loading={loadingPassword}
                error={errorPassword}
                message={messagePassword}
                onBack={handleBack}
                register={registerPassword}
            />
        );
    }

    return null;
};

export default ResetPwdForm;
