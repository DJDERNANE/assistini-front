/** @format */

import React, { useState, useEffect } from "react";
import { Icons } from "../../constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
// import InputCustom from "../ui/InputCustom";

const SearchForm = ({
    search = "",
    setSearch = () => {},
    handleSearch = () => {},
    onSearchChange = () => {},
    navigateToDoctors = true,
}) => {
    const { t } = useTranslation("global");
    const navigate = useNavigate();

    // Debounce search input to avoid too many API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Always call onSearchChange, even with empty search
            onSearchChange(search);
        }, 500); // 500ms delay

        return () => clearTimeout(timeoutId);
    }, [search, onSearchChange]);

    // Handle search button click or enter key press
    const handleSearchSubmit = () => {
        if (search && navigateToDoctors) {
            navigate(`/doctors?search=${encodeURIComponent(search)}`);
        } else if (!search && navigateToDoctors) {
            navigate('/doctors');
        } else {
            // If not navigating to doctors, just call the handleSearch function
            handleSearch();
        }
    };

    // Handle enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <div className="flex space-x-2 bg-gray-100 rounded-lg px-4 py-2 w-full">
            <button onClick={handleSearchSubmit}>
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
                onKeyPress={handleKeyPress}
                value={search}
            />
        </div>
    );
};

export default SearchForm;
