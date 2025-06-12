import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/ui/auth-slice";

const WelcomeCard = () => {
  const { t } = useTranslation("welcome");
  const dispatch = useDispatch();

  const handleClick = () => dispatch(authActions.nextStep(2));

  return (
    <div>
      <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10 mb-4 w-full md:w-2/3">
        {t("hero_section.title")}
      </h1>
      <p className="text-zinc-500 font-normal mb-6">
        {t("hero_section.description")}
      </p>
      <CustomButton name={t("general.continue")} onClick={handleClick} />
    </div>
  );
};

export default WelcomeCard;
