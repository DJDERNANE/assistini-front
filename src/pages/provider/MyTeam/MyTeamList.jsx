import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
    CircularProgress,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TitleCard from "./components/TitleCard";
import { useNavigate } from "react-router";
import ProfileCard from "./components/ProfileCard";
import { useGetAllSubAdmin } from "../../../hooks/useProviderService";

const MyTeamList = () => {
    const { t } = useTranslation("note");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/prestateur/my-team");
    };

    const {
        isLoading,
        data,
        isError,
        error: errorGetAllSubAdmin,
        refetch,
    } = useGetAllSubAdmin();

    return (
        <div className="responsive mt-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <TitleCard paths={["my team", "existing profiles"]} />
                </div>
                <Card borderRadius={"xl"} shadow={"sm"}>
                    <CardBody>
                        <h4 className="font-medium first-letter:capitalize mb-4">
                            {t("general.existing-profiles")}
                        </h4>
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <CircularProgress
                                    isIndeterminate
                                    color="blue.400"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-2">
                                {data.data.data.map((note, idx) => (
                                    <ProfileCard
                                        key={note.id}
                                        name={note.username}
                                        status={
                                            idx % 2 === 0
                                                ? t("user.active")
                                                : t("user.offline")
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </CardBody>
                    <CardFooter className="flex items-center justify-end">
                        <button
                            className="text-sm font-medium bg-primary-100 text-white first-letter:capitalize px-10 py-2 rounded-full"
                            onClick={handleGoBack}
                        >
                            {t("general.go-back")}
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default MyTeamList;
