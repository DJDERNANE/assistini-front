/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import NotificationBox from "../layout/NotificationBox";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import { Icons, Images } from "../constants";
import { NavLink } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import { useGetAllFavorites } from "../hooks/useProviderService";
import { Spinner } from "@chakra-ui/react";

const FavoritePage = () => {
    const { t } = useTranslation("home");
    const [select, setSelect] = useState(0);

    const { isLoading, fetchData, data } = useGetAllFavorites();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="pb-6 px-2 md:px-6 bg-white rounded-xl overflow-hidden">
            <div className="bg-white rounded py-4 ">
                <h1 className="mb-2 font-semibold text-lg md:text-xl capitalize">
                    {t("favorite.title")}
                </h1>
            </div>
            <div className="bg-[#f5f9fe] rounded-xl px-2 md:px-14 py-2 md:py-6 h-[500px] overflow-y-auto space-y-4">
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
                    data.map((item) => (
                        <div key={item.id} onClick={() => setSelect(item)}>
                            <CardMedecin
                                medecin={item}
                                select={select === item}
                                favorite={true}
                                refetch={fetchData}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoritePage;
