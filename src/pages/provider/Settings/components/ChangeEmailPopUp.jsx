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
import { useConfrimEmail } from "../../../../hooks/useAuthService";
import CustomButton from "../../../../components/custom/CustomButton";

const ChangeEmailPopUp = ({ isOpen, onClose }) => {
  const { t } = useTranslation("popup");

  const [step, setStep] = useState(1);

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

  const newEmail = watch("newEmail");

  const {
    register: registerVerify,
    handleSubmit: handleSubmitVerify,
    onSubmit: onSubmitVerify,
    loading: loadingVerify,
    message: messageVerify,
    error: errorVerify,
  } = useConfrimEmail(newEmail, () => {
    setStep(3);
  });

  const handleSend = () => {
    onClose();
  };
  const handleDone = () => {
    onClose();
  };

  useEffect(() => {
    if (!loading && message?.status === 200) setStep(2);
  }, [loading, message]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setStep(1);
        onClose();
      }}
      size={"md"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius={"2xl"}>
        <ModalHeader className="flex items-center justify-between">
          <h3 className="text-lg font-medium first-letter:capitalize">
            {t("profil.title-email")}
          </h3>
        </ModalHeader>
        <ModalBody className="mb-2">
          {step === 1 && (
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none w-full bg-gray-50"
                  placeholder={t("profil.exist-email")}
                  required
                  {...register("existingEmail")}
                />
                <img
                  src={icons.boxChevronDown}
                  alt=""
                  className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none w-full bg-gray-50"
                  placeholder={t("profil.new-email")}
                  required
                  {...register("newEmail")}
                />
                <img
                  src={icons.boxChevronDown}
                  alt=""
                  className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2"
                />
              </div>
              {errorChangeInfo && (
                <p className="text-xs text-red-600">{errorChangeInfo}</p>
              )}
              {loading ? (
                <div className="flex items-center w-full justify-center">
                  <CircularProgress isIndeterminate color="blue.400" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="border rounded-lg border-primary-100 text-white mx-auto bg-primary-100 w-[150px] py-2 font-medium text-sm flex items-center justify-center space-x-2"
                >
                  <p>{t("profil.email-done")}</p>
                </button>
              )}
            </form>
          )}
          {step === 2 && (
            <form
              onSubmit={handleSubmitVerify(onSubmitVerify)}
              className="w-full py-4"
            >
              <p className="text-center mx-auto mb-4 w-2/3 text-sm first-letter:capitalize">
                {t("change-email.msg-check-email")}{" "}
                <span className="text-primary-100 font-medium">{newEmail}</span>
              </p>
              <div className="flex items-center justify-center mb-4">
                <PinInput>
                  <PinInputField
                    marginX={1}
                    fontSize={24}
                    width={"64px"}
                    height={"64px"}
                    {...registerVerify("pin_1", { required: true })}
                    className={`${error && "!border !border-red-600"}`}
                  />
                  <PinInputField
                    marginX={1}
                    fontSize={24}
                    width={"64px"}
                    height={"64px"}
                    {...registerVerify("pin_2", { required: true })}
                    className={`${error && "!border !border-red-600"}`}
                  />
                  <PinInputField
                    marginX={1}
                    fontSize={24}
                    width={"64px"}
                    height={"64px"}
                    {...registerVerify("pin_3", { required: true })}
                    className={`${error && "!border !border-red-600"}`}
                  />
                  <PinInputField
                    marginX={1}
                    fontSize={24}
                    width={"64px"}
                    height={"64px"}
                    {...registerVerify("pin_4", { required: true })}
                    className={`${error && "!border !border-red-600"}`}
                  />
                </PinInput>
              </div>
              {errorVerify && (
                <p className="mb-4 text-xs text-red-600 bg-red-100 rounded w-full px-2 py-px border border-red-600">
                  Error: {errorChangeInfo}
                </p>
              )}
              <CustomButton name={t("general.verifyEmail")} type="submit" />
            </form>
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

export default ChangeEmailPopUp;
