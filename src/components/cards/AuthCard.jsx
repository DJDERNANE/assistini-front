import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/ui/auth-slice";

const AuthCard = () => {
  const { t } = useTranslation("welcome");
  const dispatch = useDispatch();

  const handleSignUp = () => dispatch(authActions.replaceData("sign-up"));

  const handleSignIn = () => dispatch(authActions.replaceData("sign-in"));

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="mb-24">
        <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10 mb-4">
          {t("hero_section.title_step2")}
        </h1>
        <p className="text-zinc-500 font-normal">
          {t("hero_section.subtitle_step2")}
        </p>
      </div>
      <div className="space-y-6">
        <CustomButton
          name={t("general.signin")}
          onClick={handleSignIn}
          css="!bg-[#40B745] !shadow-[0px_4px_14px_#40B74540]"
        />
        <CustomButton name={t("general.signup")} onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default AuthCard;
