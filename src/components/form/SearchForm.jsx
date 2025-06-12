/** @format */

import React, { useState } from "react";
import { Icons } from "../../constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
// import InputCustom from "../ui/InputCustom";

const SearchForm = ({
    search = "",
    setSearch = () => {},
    handleSearch = () => {},
}) => {
    const { t } = useTranslation("global");

    return (
        <div className="flex space-x-2 bg-gray-100 rounded-lg px-4 py-2 w-full">
            <button onClick={handleSearch}>
                <img
                    src={Icons.Search}
                    alt="icon search"
                    className="w-4 md:w-fit cursor-pointer"
                />
            </button>
            <input
                type="text"
                placeholder={t("navbar.quick_search")}
                className="bg-transparent outline-none w-full text-sm"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
        </div>
    );
};

export default SearchForm;
