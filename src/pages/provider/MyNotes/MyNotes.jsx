import React, { useState } from "react";
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
import NoteCard from "./components/NoteCard";
import EditPopUp from "./components/EditPopUp";
import { useNavigate } from "react-router";
import { useGetAllNoteReceived } from "../../../hooks/useNoteService";

const MyNotes = () => {
    const { t } = useTranslation("note");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selected, setSelected] = useState({});

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/prestateur/my-team");
    };

    const { isLoading, data, isError, error, refetch } =
        useGetAllNoteReceived();

    return (
        <div className="responsive mt-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <TitleCard />
                </div>
                <Card borderRadius={"xl"} shadow={"sm"}>
                    <CardBody>
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <CircularProgress
                                    isIndeterminate
                                    color="blue.400"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {data?.data?.data?.map((note, idx) => (
                                    <NoteCard
                                        key={idx}
                                        onClick={() => {
                                            setSelected(note);
                                            onOpen();
                                        }}
                                        note={note}
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
            <EditPopUp
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setSelected({});
                }}
                selected={selected}
            />
        </div>
    );
};

export default MyNotes;
