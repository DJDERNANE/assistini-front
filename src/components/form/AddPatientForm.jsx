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
import VerifyEmailForm from "./VerifyEmailForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/ui/auth-slice";
import UploadImages from "../ui/UploadImages";

const AddPatientForm = () => {
  const { t } = useTranslation("profile-patient");
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
    setValue,
    getValues,
  } = useRegister(() => setStep(5));

  const watchValues = watch(["nom", "password"]);
  const watchEmail = watch("email");

  const dispatch = useDispatch();

  return (
    <form
      className="grid grid-cols-3 gap-x-10 gap-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-3">
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.image")} {first && "sd"} {emailErr}
          </label>
        </div>
        <UploadImages
          setValue={setValue}
          getValues={getValues}
          selectedImages={null}
          setSelectedImages={null}
          uploadProgress={null}
          setUploadProgress={null}
          oneFile
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.firstname")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.lastname")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.address")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.email")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.phone")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.motif")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.company")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.sexe")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.motif")} {first && "sd"} {emailErr}
          </label>
        </div>
        <CustomInput
          css={`
            /* ${first && emailErr && "!bg-red-600"} */
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
          register={register("f", { require: true })}
        />
      </div>
    </form>
  );
};

export default AddPatientForm;
