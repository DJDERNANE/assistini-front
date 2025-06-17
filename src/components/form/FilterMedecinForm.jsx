/** @format */

import React, { useEffect, useState } from "react";
import DropDown from "../ui/DropDown";
import { Icons } from "../../constants";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
import { useDisclosure } from "@chakra-ui/react";
import FilterMedecinModal from "../filters/FilterMedecinModal";
import { useGetAllCategories } from "../../hooks/useCategoryService";
import DataWilayas from "../../data/wilayas.json";
import { useGetAll } from "../../hooks/useSamples";
import categoryService from "../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { providerFilterActions } from "../../store/filter/filter-provider-slice";

const FilterMedecinForm = ({ showTitle = false }) => {
    const { t } = useTranslation("global");

    const dispatch = useDispatch();

    const filters = useSelector((state) => state.filterProviders.item);

    // states to save category
    const [category, setCategory] = useState(null);
    const [categoryId, setCategoryId] = useState(null); // Store ID separately for API calls
    const [specialty, setSpecialty] = useState(null);
    const [location, setLocation] = useState(null);

    // fetch data categories
    const { isLoading, data, isError, error, refetch } = useGetAll(
        categoryService.getAll,
        "categories"
    );

    // fetch data specialties using category ID
    const {
        isLoading: isLoadingSpecialite,
        data: dataSpecialite,
        isError: isErrorSpecialite,
        error: errorSpecialite,
        refetch: refetchSpecialite,
    } = useGetAll(
        () => categoryService.getSpecialites(categoryId),
        "specialteecialites"
    );

    useEffect(() => {
        if (filters) {
            console.log(filters);
            setCategory(filters.category);
            setLocation(filters.location);
            setSpecialty(filters.specialty);
        }
    }, [filters]);

    useEffect(() => {
        refetchSpecialite();
    }, [categoryId]);

    // Custom location setter that stores the name instead of ID
    const setLocationByName = (locationId) => {
        if (locationId === "all") {
            setLocation(null);
        } else if (locationId) {
            const locationData = DataWilayas.find(item => item.id == locationId);
            setLocation(locationData ? locationData.name : locationId);
        } else {
            setLocation(null);
        }
    };

    // Custom category setter that stores the name for filters but ID for API calls
    const setCategoryByName = (categoryId) => {
        if (categoryId === "all") {
            setCategory(null);
            setCategoryId(null);
            setSpecialty(null); // Also reset specialty when category is reset
        } else if (categoryId) {
            const categoryData = data?.find(item => item.id == categoryId);
            setCategory(categoryData ? categoryData.name : categoryId);
            setCategoryId(categoryId); // Store ID for API calls
        } else {
            setCategory(null);
            setCategoryId(null);
        }
    };

    // Custom specialty setter that stores the name instead of ID
    const setSpecialtyByName = (specialtyId) => {
        if (specialtyId === "all") {
            setSpecialty(null);
        } else if (specialtyId) {
            const specialtyData = dataSpecialite?.find(item => item.id == specialtyId);
            setSpecialty(specialtyData ? specialtyData.name : specialtyId);
        } else {
            setSpecialty(null);
        }
    };

    // Add "All" option to data arrays
    const locationDataWithAll = [
        { id: "all", name: t("filter.all") || "All" },
        ...DataWilayas
    ];

    const categoryDataWithAll = data ? [
        { id: "all", name: t("filter.all") || "All" },
        ...data
    ] : [];

    const specialtyDataWithAll = dataSpecialite ? [
        { id: "all", name: t("filter.all") || "All" },
        ...dataSpecialite
    ] : [];

    useEffect(() => {
        dispatch(
            providerFilterActions.replaceData({
                category: category,
                specialty: specialty,
                location: location,
            })
        );
    }, [category, location, specialty]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 z-50 relative">
            <DropDown
                title={showTitle ? t("filter.area") : ""}
                icon={Icons.Location}
                name={"choisir une wilaya"}
                data={locationDataWithAll}
                value={location ? DataWilayas.find(item => item.name === location)?.id : "all"}
                setValue={setLocationByName}
            >
                <CustomButton
                    name={t("filter.nearMe")}
                    icon={Icons.PositionWhite}
                    css="!text-sm md:!text-base"
                />
            </DropDown>
            
            <DropDown
                title={showTitle ? t("filter.category") : ""}
                icon={Icons.Category}
                name={"choisir une categorie"}
                data={categoryDataWithAll}
                isLoading={isLoading}
                value={category ? data?.find(item => item.name === category)?.id : "all"}
                setValue={setCategoryByName}
            />
            
            <DropDown
                title={showTitle ? t("filter.specialty") : ""}
                icon={Icons.Category}
                name={"choisir une specialitie"}
                data={specialtyDataWithAll}
                isLoading={isLoadingSpecialite}
                value={specialty ? dataSpecialite?.find(item => item.name === specialty)?.id : "all"}
                setValue={setSpecialtyByName}
            />
        </div>
    );
};

export default FilterMedecinForm;
