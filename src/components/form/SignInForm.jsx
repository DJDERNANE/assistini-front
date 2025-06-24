/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../custom/CustomInput";
import { Icons } from "../../constants";
import { Checkbox, CheckboxGroup, FormLabel } from "@chakra-ui/react";
import CustomButton from "../custom/CustomButton";
import { useNavigate, useLocation } from "react-router-dom";
import ResetPwdForm from "./ResetPwdForm";
import VerifyEmailForm from "./VerifyEmailForm";
import ChangePwdForm from "./ChangePwdForm";
import { useAuth } from "../../hooks/useAuthService";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/ui/auth-slice";
import authProviderService from "../../services/authProviderService";
import { Switch } from "@chakra-ui/react";
import authService from "../../services/authService";

const SignInForm = ({ isMedecin = false, isSubAdmin = false }) => {
    const { t } = useTranslation("welcome");
    const [step, setStep] = useState(1);
    const [isPatient, setIsPatient] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        error,
        watch,
    } = useAuth(
        isSubAdmin
            ? authProviderService.loginSubAdmin
            : isMedecin
            ? authProviderService.login
            : authService.login,
        isMedecin,
        () => {
            setStep(3);
        }
    );

    const watchEmail = watch("email");

    const dispatch = useDispatch();
    const handleGo = () => {
        dispatch(authActions.replaceData("sign-up"));
    };

    useEffect(() => {
        if (location.state?.step === 1) {
            setStep(1);
        }
    }, [location.state]);

    return (
        <div>
            {/* login  */}
            {step === 1 && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-between h-full space-y-4"
                >
                    <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10">
                        {t("hero_section.title_step2")}
                    </h1>
                    <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <label className="text-[#3A3A3A] first-letter:capitalize">
                                {t("general.email")}
                            </label>
                            {error && error.toLowerCase().includes("email") && (
                                <p className="text-xs text-red-600">{error}</p>
                            )}
                        </div>
                        <CustomInput
                            register={register("email", { required: true })}
                            placeholder={t("general.email_placeholder")}
                            icon={Icons.Mail}
                            css={`
                                ${error &&
                                error.toLowerCase().includes("email") &&
                                "!border-red-600 !bg-red-50 !selection:border-red-600 !selection:shadow-[0px_4px_14px_#FF192B40]"}
                            `}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <label className="text-[#3A3A3A] first-letter:capitalize">
                                {t("general.password")}
                            </label>
                            {error && error.includes("password") && (
                                <p className="text-xs text-red-600">{error}</p>
                            )}
                        </div>
                        <CustomInput
                            register={register("password", { required: true })}
                            placeholder={t("general.password_placeholder")}
                            icon={Icons.Lock}
                            type="password"
                            css={`
                                ${error &&
                                error.includes("password") &&
                                "!border-red-600 !bg-red-50 !selection:border-red-600 !selection:shadow-[0px_4px_14px_#FF192B40]"}
                            `}
                        />
                    </div>

                    {!isSubAdmin && (
                        <div className="flex items-center justify-between text-xs xl:text-sm">
                            <Checkbox defaultChecked size={"md"}>
                                <p className="text-xs xl:text-sm h-full">
                                    {t("general.remember_me")}
                                </p>
                            </Checkbox>
                            <p
                                onClick={() => setStep(2)}
                                className="text-blue-600 cursor-pointer"
                            >
                                {t("general.forgetPassword")}
                            </p>
                        </div>
                    )}
                    {loading ? (
                        <div className="mx-auto pt-2">
                            <Spinner />
                        </div>
                    ) : (
                        <CustomButton
                            name={t("general.connect")}
                            type="submit"
                        />
                    )}
                    {/* <div className="flex items-center space-x-2 text-sm xl:text-base">
            <hr className="w-full" />
            <p>{t("general.or")}</p>
            <hr className="w-full" />
          </div> */}
                    {/* <CustomButton
            name={t("general.signGoogle")}
            icon={Icons.Google}
            css="!bg-white !text-black"
            inverse
          /> */}
                </form>
            )}
            {/* resset password  */}
            {step === 2 && (
                <ResetPwdForm
                    onClick={() => setStep(1)}
                    goNext={() => setStep(3)}
                />
            )}
            {/* verify email  */}
            {step === 3 && (
                <VerifyEmailForm
                    onClick={() => setStep(1)}
                    goNext={() => setStep(4)}
                    email={watchEmail}
                    login
                />
            )}
            {/* chnage password  */}
            {step === 4 && <ChangePwdForm goNext={() => setStep(5)} />}
            {/* reset completed  */}
            {step === 5 && (
                <div>
                    <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10 mb-4">
                        {t("general.resetComplete")}
                    </h1>
                    <p className="mb-6">
                        {t("general.resetComplete_description")}
                    </p>
                    <CustomButton
                        name={t("general.returnLogin")}
                        onClick={() => setStep(1)}
                    />
                </div>
            )}
            {!isMedecin && !isSubAdmin && (
                <div className="mt-6 flex items-center space-x-2 text-sm mx-auto w-fit">
                    <p>Vous n'avez pas de compte ? </p>
                    <button
                        type="button"
                        className="hover:underline text-blue-600 font-medium text-sm flex items-center space-x-2 capitalize"
                        onClick={handleGo}
                    >
                        <p>{t("general.create")}</p>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SignInForm;
