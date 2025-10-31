/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../custom/CustomInput";
import { Icons } from "../../constants";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuthService";
import { Spinner } from "@chakra-ui/react";
import VerifyEmailForm from "../form/VerifyEmailForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/ui/auth-slice";
import { Male, Female } from "lucide-react";

const SignUpForm = () => {
    const { t } = useTranslation("welcome");
    const [step, setStep] = useState(0);

    const [email, setEmail] = useState("");

    const [first, setFirst] = useState(false);
    const [emailErr, setEmailErr] = useState("");

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        error,
        watch,
    } = useRegister(() => setStep(5));

    const watchValues = watch(["nom", "password"]);
    const watchEmail = watch("email");

    const dispatch = useDispatch();

    const goNext = (e) => {
        e.preventDefault();
        setFirst(true);
        check();
        if (step < 2) setStep((s) => s + 1);
    };

    const check = () => {
        if (!first) return;

        if (!watchValues[0]) setEmailErr("* obligatoire");
        else setEmailErr("");

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchValues[1]))
            setEmailErr("your email address is incorrect");
        else setEmailErr("");
    };
    useEffect(() => {
        check();
    }, [watchValues]);

    if (step === 5) {
        return <VerifyEmailForm email={watchEmail} />;
    }
    if (step === 6) {
        return (
            <>
                <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10">
                    {t("general.verifyEmail")}
                </h1>
                <div className="mt-4 text-sm">
                    <p>Email verified successful</p>
                    <button
                        className="text-blue-600 font-medium text-sm flex items-center space-x-2 mt-6"
                        onClick={() =>
                            dispatch(authActions.replaceData("sign-in"))
                        }
                    >
                        <img src={Icons.LeftArrowLineBlue} alt="back arrow" />
                        <p>{t("general.backLogin")}</p>
                    </button>
                </div>
            </>
        );
    }

    const handleGo = () => {
        dispatch(authActions.replaceData("sign-in"));
    };

    return (
        <form
            className="h-[480px] flex flex-col justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-4">
                <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10 mb-4 first-letter:capitalize">
                    {t("general.signup")}
                </h1>

                {step === 0 && (
                    <Step1
                        first={first}
                        emailErr={emailErr}
                        register={register}
                    />
                )}
                {step === 1 && (
                    <Step2 register={register} watchValues={watchValues} />
                )}
                {step === 2 && (
                    <Step3
                        register={register}
                        watchValues={watchValues}
                        error={error}
                    />
                )}
                {/* {step === 3 && <Step4 />} */}
                {/* {step === 3 && <Step4 />} */}
            </div>
            <div className="!mt-8">
                {step === 2 ? (
                    loading ? (
                        <div className="mx-auto pt-2 w-full flex items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <CustomButton
                                css="!mt-4"
                                icon={Icons.RightArrowLineWhite}
                                name={t("general.continue")}
                                type="submit"
                            />
                            <button
                                type="button"
                                className="text-blue-600 font-medium text-sm flex items-center space-x-2 mt-2"
                                onClick={(e) => {
                                    if (step > 0) setStep((s) => s - 1);
                                }}
                            >
                                <img
                                    src={Icons.LeftArrowLineBlue}
                                    alt="back arrow"
                                />
                                <p>{t("general.back")}</p>
                            </button>
                        </>
                    )
                ) : (
                    <>
                        <CustomButton
                            type="button"
                            css="!mt-0"
                            icon={Icons.RightArrowLineWhite}
                            name={t("general.continue")}
                            onClick={goNext}
                        />
                        {step > 0 && (
                            <button
                                type="button"
                                className="text-blue-600 font-medium text-sm flex items-center space-x-2 mt-2"
                                onClick={() => {
                                    if (step > 0) setStep((s) => s - 1);
                                }}
                            >
                                <img
                                    src={Icons.LeftArrowLineBlue}
                                    alt="back arrow"
                                />
                                <p>{t("general.back")}</p>
                            </button>
                        )}
                    </>
                )}
                {/* {step === 2 && (
          <CustomButton
            css="!mt-4 !bg-white !text-black"
            name={t("general.passer")}
            onClick={goNext}
          />
        )} */}
            </div>
            <div className="mt-2 flex items-center space-x-2 text-sm mx-auto w-fit">
                <p>{t("general.you-have-account")}</p>
                <button
                    type="button"
                    className="hover:underline text-blue-600 font-medium text-sm flex items-center space-x-2 capitalize"
                    onClick={handleGo}
                >
                    <p>{t("general.connect")}</p>
                </button>
            </div>
        </form>
    );
};

export default SignUpForm;

const Step1 = ({ first, emailErr, register }) => {
    const { t } = useTranslation("welcome");
    return (
        <div className="space-y-2">
            <div>
                <div className="text-sm mb-1">
                    <label className="first-letter:!capitalize">
                        {t("general.nom")} {first && ""} {emailErr}
                    </label>
                </div>
                <CustomInput
                    css={`
                        /* ${first && emailErr && "!bg-red-600"} */
                        ${true && "!bg-red-600"}
                    `}
                    placeholder={t("general.nom_placeholder")}
                    icon={Icons.User}
                    register={register("nom", { require: true })}
                />
            </div>
            <div>
                <div className="text-sm mb-1 first-letter:capitalize">
                    <label className="">
                        {t("general.prenom")} {first && ""} {emailErr}
                    </label>
                </div>
                <CustomInput
                    css={`
                        /* ${first && emailErr && "!bg-red-600"} */
                        ${true && "!bg-red-600"}
                    `}
                    placeholder={t("general.prenom_placeholder")}
                    icon={Icons.User}
                    register={register("prenom", { require: true })}
                />
            </div>
            <div>
                <div className="text-sm mb-1 first-letter:capitalize">
                    <label className="">{t("general.birthday")}</label>
                </div>
                <CustomInput
                    placeholder={t("general.email_placeholder")}
                    icon={Icons.Calendar}
                    type="date"
                    register={register("birthday", { require: true })}
                />
            </div>
            <div>
                <div className="text-sm mb-1">
                    <label className="first-letter:!capitalize">
                        {t("general.sexe")}
                    </label>
                </div>
                <div className="relative">
                    <img
                        src={Icons.User}
                        alt="icon input"
                        className="w-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <select
                        className="!text-neutral-700 pl-10 !text-xs !py-3 !w-full !bg-white !placeholder:text-[#CED2FA] !border-[#D3E1FF] !rounded-lg appearance-none"
                        name="sexe"
                    >
                        <option value="">{t("general.sexe_placeholder")}</option>
                        <option value="male">{t("general.male")}</option>
                        <option value="femelle">{t("general.femelle")}</option>
                    </select>
                </div>

            </div>
            <div>
                <div className="text-sm mb-1">
                    <label className="first-letter:capitalize">
                        {t("general.location")}
                    </label>
                </div>
                <CustomInput
                    placeholder={t("general.location_placeholder")}
                    icon={Icons.User}
                    register={register("location", { require: true })}
                />
            </div>
        </div>
    );
};

const Step2 = ({ register, watchValues }) => {
    const { t } = useTranslation("welcome");
    return (
        <div className="space-y-2 !mt-10">
            <div>
                <div className="text-sm mb-1">
                    <label className="">{t("general.zip")}</label>
                </div>
                <CustomInput
                    placeholder={t("general.zip_placeholder")}
                    icon={Icons.User}
                    register={register("codePostal", { require: true })}
                />
            </div>
            <div>
                <div className="text-sm mb-1">
                    <label className="">{t("general.cnas")}</label>
                </div>
                <CustomInput
                    placeholder={t("general.ssnum_placeholder")}
                    icon={Icons.Calendar}
                    register={register("SSNum", { require: true })}
                />
            </div>
            <div>
                <div className="text-sm mb-1">
                    <label className="">{t("general.adresse")}</label>
                </div>
                <CustomInput
                    placeholder={t("general.email_placeholder")}
                    icon={Icons.Mail}
                    type="email"
                    register={register("email", { require: true })}
                />
            </div>
            <div>
                <div className="text-sm mb-1">
                    <label className="">{t("general.phone")}</label>
                </div>
                <CustomInput
                    placeholder={t("general.phone_placeholder")}
                    icon={Icons.PhoneBlack}
                    type="tel"
                    register={register("phone", { require: true })}
                />
            </div>
        </div>
    );
};

const Step3 = ({ register, watchValues, error = "" }) => {
    const [lowerCaseErr, setLowerCaseErr] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [oneNumber, setOneNumber] = useState(true);
    const [oneSpecialChar, setOneSpecialChar] = useState(true);
    const [lengthMin, setLengthMin] = useState(true);
    const [first, setFirst] = useState(false);

    useEffect(() => {
        if (!watchValues[1]) return;
        setFirst(true);

        if (/[A-Z]/.test(watchValues[1])) setUpperCase(true);
        else setUpperCase(false);
        if (/[a-z]/.test(watchValues[1])) setLowerCaseErr(true);
        else setLowerCaseErr(false);
        if (watchValues[1].length >= 8) setLengthMin(true);
        else setLengthMin(false);
        if (/[0-9]/.test(watchValues[1])) setOneNumber(true);
        else setOneNumber(false);
        if (/[!@#$%^&*(),.?":{}|<>]/.test(watchValues[1]))
            setOneSpecialChar(true);
        else setOneSpecialChar(false);
    }, [watchValues]);

    const { t } = useTranslation("welcome");
    return (
        <div className="space-y-2 !mt-10">
            <div>
                <div className="mb-1 text-sm flex items-center justify-between">
                    <label className="text-zinc-500 text-sm font-normal mb-1">
                        {t("general.password")}
                    </label>
                </div>
                <CustomInput
                    placeholder={t("general.pwd_placeholder")}
                    icon={Icons.Calendar}
                    type="password"
                    register={register("password", { require: true })}
                />
            </div>

            {first && (
                <ul className="text-xs pt-4 grid grid-cols-1 gap-x-4 gap-y-2">
                    <li
                        className={`${lowerCaseErr ? "text-green-500" : "text-red-600"
                            } flex items-center space-x-2`}
                    >
                        <div
                            className={`${lowerCaseErr ? "bg-green-500" : "bg-red-600"
                                } rounded-full w-3 h-3 mt-px`}
                        ></div>
                        <p>{t("general.err-pwd-3")}</p>
                    </li>
                    <li
                        className={`${oneSpecialChar ? "text-green-500" : "text-red-600"
                            } flex items-center space-x-2`}
                    >
                        <div
                            className={`${oneSpecialChar ? "bg-green-500" : "bg-red-600"
                                } rounded-full w-3 h-3 mt-px`}
                        ></div>
                        <p>{t("general.err-pwd-4")}</p>
                    </li>
                    <li
                        className={`${upperCase ? "text-green-500" : "text-red-600"
                            } flex items-center space-x-2`}
                    >
                        <div
                            className={`${upperCase ? "bg-green-500" : "bg-red-600"
                                } rounded-full w-3 h-3 mt-px`}
                        ></div>
                        <p>{t("general.err-pwd-2")}</p>
                    </li>
                    <li
                        className={`${lengthMin ? "text-green-500" : "text-red-600"
                            } flex items-center space-x-2`}
                    >
                        <div
                            className={`${lengthMin ? "bg-green-500" : "bg-red-600"
                                } rounded-full w-3 h-3 mt-px`}
                        ></div>
                        <p>{t("general.err-pwd-1")}</p>
                    </li>
                    <li
                        className={`${oneNumber ? "text-green-500" : "text-red-600"
                            } flex items-center space-x-2`}
                    >
                        <div
                            className={`${oneNumber ? "bg-green-500" : "bg-red-600"
                                } rounded-full w-3 h-3 mt-px`}
                        ></div>
                        <p>{t("general.err-pwd-5")}</p>
                    </li>
                </ul>
            )}

            {error && (
                <div className="pt-6">
                    <p className="px-4 py-2 rounded-lg text-xs bg-red-50 text-red-500 border border-red-500">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
};

const Step4 = () => {
    const { t } = useTranslation("welcome");
    return (
        <div className="space-y-2 !mt-20">
            <div className="rounded-lg py-6 px-2 bg-blue-500 text-white">
                <h4 className="text-center font-medium mb-1">
                    {t("general.title_convention")}
                </h4>
                <p className="text-sm text-center">
                    {t("general.description_convention")}
                </p>
            </div>
        </div>
    );
};

// const Step4 = () => {
//   const { t } = useTranslation("welcome");
//   return (
//     <div className="space-y-2">
//       step4/.....
//       <div>
//         <div className="text-sm mb-1">
//           <label className="capitalize">{t("general.company_name")}</label>
//         </div>
//         <CustomInput
//           placeholder={t("general.email_placeholder")}
//           icon={Icons.Card}
//         />
//       </div>
//       <div>
//         <div className="text-sm mb-1">
//           <label className="capitalize">{t("general.matricule")}</label>
//         </div>
//         <CustomInput
//           placeholder={t("general.email_placeholder")}
//           icon={Icons.Calendar}
//         />
//       </div>
//       <div>
//         <div className="text-sm mb-1">
//           <label className="capitalize"> {t("general.nameAssurance")}</label>
//         </div>
//         <CustomInput
//           placeholder={t("general.email_placeholder")}
//           icon={Icons.Card}
//         />
//       </div>
//       <div>
//         <div className="text-sm mb-1">
//           <label className="capitalize">{t("general.adresse")}</label>
//         </div>
//         <CustomInput
//           placeholder={t("general.email_placeholder")}
//           icon={Icons.Mail}
//         />
//       </div>
//       <div>
//         <div className="text-sm mb-1">
//           <label className="capitalize"> {t("general.numAssurance")}</label>
//         </div>
//         <CustomInput
//           placeholder={t("general.email_placeholder")}
//           icon={Icons.FileText}
//         />
//       </div>
//     </div>
//   );
// };
