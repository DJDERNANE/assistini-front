/** @format */

import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Select,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Radio,
    RadioGroup,
    useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import SelectPatientBox from "../ui/SelectPatientBox";
import UploadImages from "../ui/UploadImages";
import CallendarRdv from "../ui/CallendarRdv";
import CustomButton from "../custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "./../../store/popup/alert-slice";
import { useGetAllSpecialites } from "../../hooks/useProviderService";
import DropDown from "../ui/DropDown";
import { Icons } from "../../constants";
import { useNavigate, useParams } from "react-router";
import { useGetAllPatient } from "../../hooks/usePatientService";
import axios from "axios";
import ConfirmRdvPopUp from "../../pages/patient/ConfirmRdvPopUp";

const MakeRDVForm = ({ data = {} }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: 5,
    });

    console.log("data on makee rdv form ::: ")
    console.log(data)

    // states
    const [sp, setSp] = useState(null);
    // const [patient, setPatient] = useState(null);
    const [files, setFiles] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        setActiveStep(0);
        // setActiveStep(10);
    }, []);

    const nextStep = () => {
        if (activeStep === 0 && speId) setActiveStep(1);
        else if (activeStep === 1 && motif) setActiveStep(2);
        else if (activeStep === 2) setActiveStep(3);
        else if (activeStep === 3) setActiveStep(4);
        else if (activeStep >= 4) onOpen();
        // if (activeStep < 5) setActiveStep(() => activeStep + 1);
        // else {s
        //   dispatch(alertActions.replaceData("test"));
        // }
    };

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [patientName, setPatientName] = useState(null);
    const [type, setType] = useState("au cabinet");
    const [motif, setMotif] = useState("consultation");
    const [dateRdv, setDateRdv] = useState("");
    const [speId, setSpeId] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        setError("");
        setLoading(false);
    }, [isOpen]);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        // Create a FormData object
        const formData = new FormData();
        formData.append("patientName", patientName.name + ' ' + patientName.prenom ?? "x");
        formData.append("motif", motif);
        formData.append("specialtyId", speId);
        formData.append("type", type);

        if (dateRdv) {
            const splitDateRdv = dateRdv.split("|");

            formData.append("from", splitDateRdv[0]);
            formData.append("to", splitDateRdv[1]);
            formData.append(
                "date",
                splitDateRdv[2].trim().substring(0, 10)
                // new Date(splitDateRdv[2].trim())
                //     .toLocaleDateString()
                //     .replaceAll("/", "-")
            );
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("documents", files[i]);
        }

        try {
            // Send data to the API
            const response = await axios.post(
                process.env.REACT_APP_URL_API + "/rdv/user/provider/" + id,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            if (response?.data?.success) {
                console.log("User updated successfully", response.data);
                onClose();
                navigate("/home/my-rdvs");
            }
        } catch (error) {
            setError(error?.response?.data?.message);
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log("pattttttient",patientName)

    return (
        <div>
            <Stepper
                size="sm"
                colorScheme="green"
                index={activeStep}
                orientation="vertical"
                gap="0px"
            >
                <Step1
                    value={speId}
                    setValue={setSpeId}
                    data={data?.specialties ?? []}
                />
                {activeStep > 0 && <Step2 value={motif} setValue={setMotif} />}
                {/* {activeStep > 1 && <Step3 />} */}
                {activeStep > 1 && (
                    <Step4 value={patientName} setValue={setPatientName}  />
                )}
                {activeStep > 2 && <Step5 value={files} setValue={setFiles} />}
                {activeStep > 3 && (
                    <Step6
                        value={dateRdv}
                        setValue={setDateRdv}
                        data={data?.disponibilities ?? []}
                    />
                )}
                <div className="w-40 mx-auto">
                    <CustomButton name={"valide"} onClick={nextStep} />
                </div>
            </Stepper>

            <ConfirmRdvPopUp
                loading={loading}
                onClose={onClose}
                isOpen={isOpen}
                onClick={() => {
                    handleSubmit();
                }}
                error={error}
            />
        </div>
    );
};

export default MakeRDVForm;

const Step1 = ({ value, setValue, data = [] }) => {
    const { t } = useTranslation("search");
    const { id } = useParams();

    return (
        <Step className="w-full pb-8">
            {/* <StepIndicator active={true}> */}
            <StepIndicator>
                <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                />
            </StepIndicator>

            <div className="w-full">
                <StepTitle>{t("doctor.speciality")}</StepTitle>
                <StepDescription>
                    <div className="mt-2"></div>
                    <div className="mt-2">
                        <Select
                            // onClick={(e) => setValue(e.target.value)}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Select option"
                            // value={value}
                            className="mt-2 text-sm placeholder:text-sm"
                        >
                            {/* <option value="home">{t("filter.home")}</option> */}
                            {data?.map((item) => (
                                <option
                                    key={item?.id}
                                    value={item?.id}
                                    // onClick={() => setValue(item?.id)}
                                >
                                    {item?.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    {/* <DropDown
                        title={""}
                        icon={Icons.Category}
                        name={t("doctor.speciality_1")}
                        data={data ?? data}
                        value={value}
                        setValue={setValue}
                    ></DropDown> */}
                </StepDescription>
            </div>

            <StepSeparator />
        </Step>
    );
};

const Step2 = ({ value, setValue }) => {
    const { t } = useTranslation("search");

    return (
        <Step className="w-full pb-8">
            <StepIndicator>
                <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                />
            </StepIndicator>

            <div className="w-full">
                <StepTitle>{t("doctor.reasonConsultation")}</StepTitle>
                <div className="mt-2">
                    <Select
                        onClick={(e) => setValue(e.target.value)}
                        placeholder="Select option"
                        value={value}
                        className="mt-2 text-sm placeholder:text-sm"
                    >
                        {/* <option value="home">{t("filter.home")}</option> */}
                        <option value="consultation">
                            {t("doctor.consultation")}
                        </option>
                    </Select>
                    <p className="text-end mt-2 text-sm">
                        * {t("doctor.fillInfo")}
                    </p>

                    <Card className="overflow-hidden mt-4">
                        <CardBody className="bg-orange-100 flex space-x-2">
                            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                <p className="text-white text-sm font-bold font-['Poppins']">
                                    i
                                </p>
                            </div>
                            <p className="text-neutral-800 text-sm font-norma w-[90%]">
                                {t("doctor.alert_1")}
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <StepSeparator />
        </Step>
    );
};

const Step3 = () => {
    const { t } = useTranslation(["search", "global"]);

    return (
        <Step className="w-full pb-8">
            <StepIndicator>
                <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                />
            </StepIndicator>

            <div className="w-full">
                <StepTitle>{t("doctor.choosePattern")}</StepTitle>
                <div className="mt-2">
                    <ul className="bg-gray-100 rounded-md space-y-2 grid grid-cols-1 p-4 mt-3 font-medium">
                        <li
                            value="1"
                            className="bg-green-500 text-white flex items-center justify-center capitalize rounded py-2"
                        >
                            {t("filter:video")}
                        </li>
                        <li
                            value="2"
                            className="bg-white flex items-center justify-center capitalize rounded py-2"
                        >
                            {t("filter.home")}
                        </li>
                        <li
                            value="3"
                            className="bg-white flex items-center justify-center capitalize rounded py-2"
                        >
                            {t("filter.office")}
                        </li>
                    </ul>
                </div>
            </div>

            <StepSeparator />
        </Step>
    );
};

const Step4 = ({ value, setValue }) => {
    const { t } = useTranslation(["search", "global"]);

    const { data, isLoading, fetchData } = useGetAllPatient();
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Step className="w-full pb-8">
            <StepIndicator>
                <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                />
            </StepIndicator>

            <div className="w-full">
                <StepTitle>{t("doctor.patient")}</StepTitle>
                <div className="mt-2"></div>
               
                <SelectPatientBox
                    data={data ?? []}
                    selected={value}
                    setSelected={setValue}
                />
            </div>

            <StepSeparator />
        </Step>
    );
};

const Step5 = ({ value, setValue }) => {
    const { t } = useTranslation(["search", "global"]);

    return (
        <Step className="w-full pb-8">
            <StepIndicator>
                <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                />
            </StepIndicator>

            <div className="w-full">
                <StepTitle>{t("doctor.mes-documents")}</StepTitle>
                <div className="mt-2"></div>
                <UploadImages setFiles={setValue} />

                <div>
                    {Object.values(value)?.map((file) => (
                        <p className="border w-full rounded-lg px-2 mt-1">
                            {file?.name}
                        </p>
                    ))}
                </div>
            </div>

            <StepSeparator />
        </Step>
    );
};

const Step6 = ({ value, setValue, data = [] }) => {
    const { t } = useTranslation(["search", "global"]);

    return (
        <Step className="w-full pb-8">
            <StepIndicator>
                <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                />
            </StepIndicator>

            <div className="w-full">
                <StepTitle>{t("doctor.date-rdv")}</StepTitle>
                <div className="mt-2">
                    <CallendarRdv
                        cssTimeBox={"py-8"}
                        res={"asdf"}
                        data={data}
                        setValue={setValue}
                        value={value}
                    />
                </div>
            </div>

            {/* <StepSeparator /> */}
        </Step>
    );
};
