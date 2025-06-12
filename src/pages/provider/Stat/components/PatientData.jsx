import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../../components/custom/CustomInput";
import { useNavigate } from "react-router-dom";

const PatientData = () => {
  const { t } = useTranslation("profile-patient");
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-x-10 gap-y-3">
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.firstname")}
          </label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.lastname")}
          </label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.address")}
          </label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.email")}</label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.phone")}</label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.motif")}</label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.company")}
          </label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.sexe")}</label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.motif")}</label>
        </div>
        <CustomInput
          css={`
            ${true && "!bg-red-600"}
          `}
          placeholder={t("general.fullname_placeholder")}
        />
      </div>
    </div>
  );
};

export default PatientData;
