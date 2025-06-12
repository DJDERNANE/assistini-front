import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../../components/custom/CustomInput";
import { useNavigate } from "react-router-dom";

const PatientData = ({ data }) => {
  const { t } = useTranslation("rdvs");
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-x-10 gap-y-3">
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.firstname")}
          </label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.patientName}</span>
        </div>
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.lastname")}
          </label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.patientName}</span>
        </div>
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.address")}
          </label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.address}</span>
        </div>
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.email")}</label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.userEmail}</span>
        </div>
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.phone")}</label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.phone}</span>
        </div>
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.motif")}</label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.motif}</span>
        </div>
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">
            {t("new.company")}
          </label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.company}</span>
        </div>
      </div>
      <div>
        <div className="text-xs mb-1">
          <label className="capitalize text-[#5A607F]">{t("new.sexe")}</label>
        </div>
        <div
          className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
        >
          <span>{data?.sexe}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientData;
