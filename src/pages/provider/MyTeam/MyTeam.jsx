import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
} from "@chakra-ui/react";
import OptionCard from "./components/OptionCard";
import { useTranslation } from "react-i18next";
import icons from "../../../constants/icons";
import TitleCard from "./components/TitleCard";
import DataTableCard from "./components/DataTableCard";
import { useNavigate } from "react-router";
import { useGetAllNoteSend } from "../../../hooks/useNoteService";

const MyTeam = () => {
    const { t } = useTranslation("note");
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const { isLoading, data, isError, error, refetch } =
        useGetAllNoteSend(search);

    useEffect(() => {
        refetch();
    }, [search]);

    return (
        <div className="responsive mt-4">
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
                <div className="md:col-span-11">{/* <TitleCard /> */}</div>
                <div className="md:col-span-2">
                    <OptionCard
                        icon={"pages"}
                        title={t("general.notes")}
                        description={t("general.notes-description")}
                        onClick={() => navigate("./my-notes")}
                    />
                </div>
                <div className="md:col-span-9 h-full md:row-span-2 order-2 md:order-1">
                    <DataTableCard
                        data={data?.data?.data ?? []}
                        search={search}
                        setSearch={setSearch}
                        total={data?.data?.total ?? 0}
                    />
                </div>
                <div className="md:col-span-2 order-1 md:order-2">
                    <OptionCard
                        icon={"users"}
                        title={t("general.users")}
                        description={t("general.users-description")}
                        onClick={() => navigate("./list")}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
