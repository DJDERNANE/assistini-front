import React from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../custom/CustomInput";
import { Icons } from "../../constants";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useConfrimEmail } from "../../hooks/useAuthService";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/ui/auth-slice";

const VerifyEmailForm = ({ email, login = false }) => {
  const { t } = useTranslation("welcome");
  const navigate = useNavigate();

  const { register, handleSubmit, onSubmit, loading, message, error } =
    useConfrimEmail(email);

  const dispatch = useDispatch();
  const handleGo = () => {
    dispatch(authActions.replaceData("sign-in"));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full space-y-4"
    >
      <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10">
        {t("general.verifyEmail")}
      </h1>

      {message ? (
        <>
          <p>your email verified successful, you can login now</p>
          <p className="text-xs text-green-600 bg-green-100 rounded w-full px-2 py-px border border-green-600">
            Success: {message}
          </p>
        </>
      ) : (
        <>
          <div className="mb-1 text-sm">
            <p>{t("general.verifyEmail_description")}</p>
          </div>
          <div className="mx-auto py-4 mb-4">
            <PinInput otp>
              <PinInputField
                marginX={1}
                fontSize={24}
                width={"64px"}
                height={"64px"}
                {...register("pin_1", { required: true })}
                className={`${error && "!border !border-red-600"}`}
              />
              <PinInputField
                marginX={1}
                fontSize={24}
                width={"64px"}
                height={"64px"}
                {...register("pin_2", { required: true })}
                className={`${error && "!border !border-red-600"}`}
              />
              <PinInputField
                marginX={1}
                fontSize={24}
                width={"64px"}
                height={"64px"}
                {...register("pin_3", { required: true })}
                className={`${error && "!border !border-red-600"}`}
              />
              <PinInputField
                marginX={1}
                fontSize={24}
                width={"64px"}
                height={"64px"}
                {...register("pin_4", { required: true })}
                className={`${error && "!border !border-red-600"}`}
              />
            </PinInput>
          </div>
          {error && (
            <p className="text-xs text-red-600 bg-red-100 rounded w-full px-2 py-px border border-red-600">
              Error: {error}
            </p>
          )}
          <CustomButton name={t("general.verifyEmail")} type="submit" />
        </>
      )}
      {
        <button
          type="button"
          className="text-blue-600 font-medium text-sm flex items-center space-x-2"
          onClick={handleGo}
        >
          <img src={Icons.LeftArrowLineBlue} alt="back arrow" />
          <p>{t("general.backLogin")}</p>
        </button>
      }
    </form>
  );
};

export default VerifyEmailForm;
