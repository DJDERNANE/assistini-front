import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  CircularProgress,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import icons from "../../../../constants/icons";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEditProviderEmail } from "../../../../hooks/useProviderService";
import CustomInput from "../../../../components/custom/CustomInput";
import { Icons } from "../../../../constants";

const ChangePwdPopUp = ({ isOpen, onClose }) => {
  const { t } = useTranslation("popup");

  const [step, setStep] = useState(1);
  const [lowerCaseErr, setLowerCaseErr] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [oneNumber, setOneNumber] = useState(true);
  const [oneSpecialChar, setOneSpecialChar] = useState(true);
  const [lengthMin, setLengthMin] = useState(true);
  const [first, setFirst] = useState(false);

  const {
    register,
    handleSubmit,
    loading,
    onSubmit,
    message,
    error,
    setMessage,
    setValue,
    watch,
    error: errorChangeInfo,
  } = useEditProviderEmail();

  const watchValues = watch("password");

  const handleSend = () => {
    onClose();
  };
  const handleDone = () => {
    onClose();
  };

  useEffect(() => {
    if (loading && message) setStep(2);
  }, [loading, message]);

  useEffect(() => {
    if (!watchValues) return;
    setFirst(true);

    if (/[A-Z]/.test(watchValues)) setUpperCase(true);
    else setUpperCase(false);
    if (/[a-z]/.test(watchValues)) setLowerCaseErr(true);
    else setLowerCaseErr(false);
    if (watchValues.length >= 8) setLengthMin(true);
    else setLengthMin(false);
    if (/[0-9]/.test(watchValues)) setOneNumber(true);
    else setOneNumber(false);
    if (/[!@#$%^&*(),.?":{}|<>]/.test(watchValues)) setOneSpecialChar(true);
    else setOneSpecialChar(false);
  }, [watchValues]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setStep(1);
        onClose();
      }}
      size={"md"}
    >
      <ModalOverlay />
      <ModalContent borderRadius={"2xl"}>
        <ModalHeader className="flex items-center justify-between">
          <h3 className="text-lg font-medium first-letter:capitalize">
            {t("profil.title-pwd")}
          </h3>
        </ModalHeader>
        <ModalBody className="mb-2">
          {step === 1 && (
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mb-1 text-sm flex items-center justify-between">
                  <label className="text-zinc-500 text-sm font-normal mb-1">
                    {t("profil.old-pwd")}
                  </label>
                </div>
                <CustomInput
                  placeholder={t("profil.old-pwd-placeholder")}
                  icon={Icons.Calendar}
                  type="password"
                  register={register("old_password", { require: true })}
                />
              </div>
              <div>
                <div className="mb-1 text-sm flex items-center justify-between">
                  <label className="text-zinc-500 text-sm font-normal mb-1">
                    {t("profil.new-pwd")}
                  </label>
                </div>
                <CustomInput
                  placeholder={t("profil.new-pwd-placeholder")}
                  icon={Icons.Calendar}
                  type="password"
                  register={register("password", { require: true })}
                />
              </div>
              <div>
                <div className="mb-1 text-sm flex items-center justify-between">
                  <label className="text-zinc-500 text-sm font-normal mb-1">
                    {t("profil.confirm-password")}
                  </label>
                </div>
                <CustomInput
                  placeholder={t("profil.confirm-pwd-placeholder")}
                  icon={Icons.Calendar}
                  type="password"
                  register={register("password", { require: true })}
                />
              </div>
              {first && (
                <ul className="text-xs pt-4 grid grid-cols-2 gap-x-4 gap-y-2">
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
              {loading ? (
                <div className="flex items-center w-full justify-center">
                  <CircularProgress isIndeterminate color="blue.400" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="!mt-6 border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                >
                  <p>{t("profil.pwd-done")}</p>
                </button>
              )}
            </form>
          )}
          {step === 2 && (
            <div className="w-full">
              <p className="text-center mx-auto mb-4 w-2/3 text-sm first-letter:capitalize">
                {t("change-email.msg-check-email")}{" "}
                <span className="text-primary-100 font-medium">
                  ben@mail.com
                </span>
              </p>
              <div className="flex items-center justify-center">
                <PinInput>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="w-full">
              <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full mx-auto bg-primary-100 bg-opacity-20">
                <img src={icons.checkBlue} alt="" className="w-7" />
              </div>
              <h1 className="text-center mx-auto mt-4 mb-2 w-2/3 text-lg font-semibold first-letter:capitalize">
                {t("change-email.congrats")}
              </h1>
              <p className="text-center mx-auto mb-4 w-2/3 text-sm first-letter:capitalize">
                {t("change-email.msg-congrats")}{" "}
              </p>
            </div>
          )}
        </ModalBody>

        {/* <ModalFooter className="flex items-center justify-center w-full">
          <button
            className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
            onClick={() => {
              if (step === 1) setStep(2);
              if (step === 2) setStep(3);
              else {
                setStep(1);
                handleSend();
              }
            }}
          >
            <p>{t("change-email.done")}</p>
          </button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default ChangePwdPopUp;
