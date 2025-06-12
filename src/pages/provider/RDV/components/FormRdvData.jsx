/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../../components/custom/CustomInput";
import { useNavigate } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import UploadImages from "../../../../components/ui/UploadImages";
import CallendarRdv from "../../../../components/ui/CallendarRdv";
import { useMe } from "../../../../hooks/useAuthService";
import { useGetDataProvider } from "../../../../hooks/useProviderService";

const FormRdvData = ({ value, setValue, setData }) => {
    const { t } = useTranslation("rdvs");
    const navigate = useNavigate();

    const { data, isLoading, fetchData } = useGetDataProvider();

    const [type, setType] = useState("consultation");
    const [specialityId, setSpecialityId] = useState("");

    useEffect(() => {
        setData({
            specialtyId: specialityId,
            type,
        });
    }, [type, specialityId]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            <div className="mt-2">
                <p>{t("doctor.speciality")}</p>
                <Select
                    onChange={(e) => setSpecialityId(e.target.value)}
                    placeholder="Select option"
                    className="mt-2 text-sm placeholder:text-sm"
                >
                    {data?.data?.specialties?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                            {item?.name}
                        </option>
                    ))}
                </Select>
            </div>
            <div className="mt-2">
                <p>{t("doctor.reasonConsultation")}</p>
                <Select
                    onClick={(e) => setType(e.target.value)}
                    placeholder="Select option"
                    value={type}
                    className="mt-2 text-sm placeholder:text-sm"
                >
                    <option value="consultation">
                        {t("filter.consultation")}
                    </option>
                </Select>
            </div>

            <div className="w-full col-span-full">
                <p>{t("doctor.patient")}</p>
                <div className="mt-2"></div>
                {/* <UploadImages
                setFiles={setValue}
                /> */}
                <div>
                    {/* {Object.values(value)?.map((file) => (
                        <p className="border w-full rounded-lg px-2 mt-1">
                            {file?.name}
                        </p>
                    ))} */}
                </div>
            </div>

            <div className="mt-2 col-span-full">
                <p>{t("doctor.date-rdv")}</p>
                <CallendarRdv
                    cssTimeBox={"py-8"}
                    res={"asdf"}
                    data={data?.data?.disponibilities?.reverse() ?? []}
                    setValue={setValue}
                    value={value}
                />
            </div>
        </div>
    );
};

export default FormRdvData;
