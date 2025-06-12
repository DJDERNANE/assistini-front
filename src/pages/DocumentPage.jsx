/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import NotificationBox from "../layout/NotificationBox";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import { Icons, Images } from "../constants";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import { useGetAllFavorites } from "../hooks/useProviderService";
import { Spinner } from "@chakra-ui/react";
import CardDocumentPatient from "../components/ui/CardDocumentPatient";
import { useGetAllPatientDoc } from "../hooks/usePatientService";
const DocumentPage = () => {
    const { t } = useTranslation("home");
    const [select, setSelect] = useState(0);

    const { isLoading, fetchData, data } = useGetAllPatientDoc();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="pb-6 px-2 md:px-6 bg-white rounded-xl overflow-hidden">
            <div className="bg-white rounded py-4 flex items-center justify-between">
                <h1 className="mb-2 font-semibold md:text-xl capitalize">
                    {t("doc.title")}
                </h1>
                <Link
                    to="./add"
                    className="bg-primary-100 text-white rounded-lg px-4 py-1 font-semibold"
                >
                    {t("doc.add")}
                </Link>
            </div>
            <div className="bg-[#f5f9fe] rounded-xl px-2 md:px-4 py-2 md:py-6 overflow-y-auto gap-4 grid grid-cols-1 min-h-[400px]">
                {isLoading ? (
                    <div className="w-full flex items-center justify-center h-[300px]">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </div>
                ) : (
                    data?.length > 0 &&
                    data?.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelect(item)}
                            className="h-fit"
                        >
                            <CardDocumentPatient item={item} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DocumentPage;
