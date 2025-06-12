import React from "react";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useChangeInfo } from "../../../hooks/useAuthService";

const SettingsPage = () => {
    const { t } = useTranslation("settings");
    const location = useLocation();

    const navigate = useNavigate();
    const active = true;

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        setValue,
        watch,
        error: errorChangeInfo,
    } = useChangeInfo({
        address: "",
        cabinName: "",
        email: "",
        fullName: "",
        localisation: "",
        phone: "",
        id_fascial: "",
        argument_num: "",
        logo: "",
    });

    return (
        <div className="responsive mt-4">
            <Card borderRadius={"xl"} shadow={"sm"}>
                <CardHeader className="">
                    <h1 className="font-semibold first-letter:capitalize text-md md:text-2xl mb-4">
                        {t("general.title")}
                    </h1>
                    <div className="md:space-x-2">
                        <button
                            onClick={() => navigate("./admin")}
                            className={`first-letter:capitalize ${
                                location.pathname.endsWith("/admin") &&
                                "border border-gray-300 bg-gray-50 font-medium"
                            } rounded-full py-2 text-sm px-4 font-medium`}
                        >
                            {t("general.admin")}
                        </button>
                        <button
                            onClick={() => navigate("./accounts")}
                            className={`first-letter:capitalize ${
                                location.pathname.endsWith("/accounts") &&
                                "border border-gray-300 bg-gray-50 font-medium"
                            } rounded-full py-2 text-sm px-4`}
                        >
                            {t("general.accounts")}
                        </button>
                        <button
                            onClick={() => navigate("./my-clinic")}
                            className={`first-letter:capitalize ${
                                location.pathname.endsWith("/my-clinic") &&
                                "border border-gray-300 bg-gray-50 font-medium"
                            } rounded-full py-2 text-sm px-4`}
                        >
                            {t("general.my-clinic")}
                        </button>
                        <button
                            onClick={() => navigate("./my-cabinet")}
                            className={`first-letter:capitalize ${
                                location.pathname.endsWith("/my-cabinet") &&
                                "border border-gray-300 bg-gray-50 font-medium"
                            } rounded-full py-2 text-sm px-4`}
                        >
                            {t("general.my-cabinet")}
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Outlet />
                </CardBody>
            </Card>
        </div>
    );
};

export default SettingsPage;
