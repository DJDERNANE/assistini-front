import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../custom/CustomInput";
import { Icons } from "../../constants";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ChangePwdForm = ({ goNext }) => {
  const { t } = useTranslation("welcome");
  const navigate = useNavigate();

  const [lowerCaseErr, setLowerCaseErr] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [oneNumber, setOneNumber] = useState(true);
  const [oneSpecialChar, setOneSpecialChar] = useState(true);
  const [lengthMin, setLengthMin] = useState(true);
  const [match, setMatch] = useState(true);
  const [first, setFirst] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm({});
  const watchValues = watch(["password", "confirmPassword"]);

  const onSubmit = (e) => {
    e.preventDefault();
    // navigate("/home");
    goNext();
  };

  useEffect(() => {
    if (!watchValues[1]) return;
    setFirst(true);

    if (watchValues[0] !== watchValues[1]) setMatch(false);
    else setMatch(true);

    if (/[A-Z]/.test(watchValues[1])) setUpperCase(true);
    else setUpperCase(false);
    if (/[a-z]/.test(watchValues[1])) setLowerCaseErr(true);
    else setLowerCaseErr(false);
    if (watchValues[1].length >= 8) setLengthMin(true);
    else setLengthMin(false);
    if (/[0-9]/.test(watchValues[1])) setOneNumber(true);
    else setOneNumber(false);
    if (/[!@#$%^&*(),.?":{}|<>]/.test(watchValues[1])) setOneSpecialChar(true);
    else setOneSpecialChar(false);
  }, [watchValues]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between h-full space-y-4"
    >
      <h1 className="text-neutral-700 text-4xl font-bold xl:leading-10">
        {t("general.pwd_title")}
      </h1>
      <p>{t("general.pwd_description")}</p>
      <div>
        <div className="mb-1 text-sm">
          <label className="text-zinc-500 text-sm font-normal mb-1">
            {t("general.newPwd")}
          </label>
        </div>
        <CustomInput
          placeholder={t("general.password_placeholder")}
          icon={Icons.Lock}
          type="password"
          field={register("password", { required: true })}
        />
      </div>
      <div>
        <div className="mb-1 text-sm flex items-center justify-between">
          <label className="text-zinc-500 text-sm font-normal mb-1">
            {t("general.confirmPwd")}
          </label>
          {first && (
            <p className={`${!match ? "text-red-600" : "text-green-500"}`}>
              {!match ? "password not match" : "password match"}
            </p>
          )}
        </div>
        <CustomInput
          placeholder={t("general.password_placeholder")}
          icon={Icons.Lock}
          type="password"
          field={register("confirmPassword", { required: true })}
        />
        {first && (
          <ul className="text-xs mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            <li
              className={`${
                lowerCaseErr ? "text-green-500" : "text-red-600"
              } flex items-center space-x-2`}
            >
              <div
                className={`${
                  lowerCaseErr ? "bg-green-500" : "bg-red-600"
                } rounded-full w-3 h-3 mt-px`}
              ></div>
              <p>one lowercase character</p>
            </li>
            <li
              className={`${
                oneSpecialChar ? "text-green-500" : "text-red-600"
              } flex items-center space-x-2`}
            >
              <div
                className={`${
                  oneSpecialChar ? "bg-green-500" : "bg-red-600"
                } rounded-full w-3 h-3 mt-px`}
              ></div>
              <p>one special character</p>
            </li>
            <li
              className={`${
                upperCase ? "text-green-500" : "text-red-600"
              } flex items-center space-x-2`}
            >
              <div
                className={`${
                  upperCase ? "bg-green-500" : "bg-red-600"
                } rounded-full w-3 h-3 mt-px`}
              ></div>
              <p>one uppercase character</p>
            </li>
            <li
              className={`${
                lengthMin ? "text-green-500" : "text-red-600"
              } flex items-center space-x-2`}
            >
              <div
                className={`${
                  lengthMin ? "bg-green-500" : "bg-red-600"
                } rounded-full w-3 h-3 mt-px`}
              ></div>
              <p>8 charachter minimum</p>
            </li>
            <li
              className={`${
                oneNumber ? "text-green-500" : "text-red-600"
              } flex items-center space-x-2`}
            >
              <div
                className={`${
                  oneNumber ? "bg-green-500" : "bg-red-600"
                } rounded-full w-3 h-3 mt-px`}
              ></div>
              <p>one number</p>
            </li>
          </ul>
        )}
      </div>
      <CustomButton name={t("general.confirm")} />
    </form>
  );
};

export default ChangePwdForm;
