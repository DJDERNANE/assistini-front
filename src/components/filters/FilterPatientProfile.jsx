import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { Icons } from "../../constants";
import { useDisclosure } from "@chakra-ui/react";

const FilterPatientProfile = ({}) => {
  const { t } = useTranslation("patient-profile");

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <ul className="flex items-center space-x-3 mb-4 bg-[#F5F9FF] p-2 rounded-full w-fit">
      <li>
        <CustomButton
          name={t("filter.new")}
          css={`text-sm !px-4 !py-3 !rounded-full ${
            path.includes("add")
              ? "!bg-white !text-black"
              : "!bg-transparent !text-[#9096A2]"
          }`}
          onClick={() => navigate("./add")}
        />
      </li>
      <li>
        <CustomButton
          name={t("filter.exists")}
          css={`text-sm !px-4 !py-3 !rounded-full ${
            path.includes("exist")
              ? "!bg-white !text-black"
              : "!bg-transparent !text-[#9096A2]"
          }`}
          onClick={() => navigate("./exist")}
        />
      </li>
      <li>
        <CustomButton
          name={t("filter.favorite")}
          css={`text-sm !px-4 !py-3 !rounded-full ${
            path === "e"
              ? "!bg-white !text-black"
              : "!bg-transparent !text-[#9096A2]"
          }`}
        />
      </li>
      <li>
        <CustomButton
          name={t("filter.deleted")}
          css={`text-sm !px-4 !py-3 !rounded-full ${
            path === "e"
              ? "!bg-white !text-black"
              : "!bg-transparent !text-[#9096A2]"
          }`}
        />
      </li>
    </ul>
  );
};

export default FilterPatientProfile;
