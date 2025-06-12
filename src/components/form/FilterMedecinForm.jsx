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
    const [specialty, setSpecialty] = useState(null);
    const [location, setLocation] = useState(null);

    // fetch data categories
    const { isLoading, data, isError, error, refetch } = useGetAll(
        categoryService.getAll,
        "categories"
    );

    // fetch data categories
    const {
        isLoading: isLoadingSpecialite,
        data: dataSpecialite,
        isError: isErrorSpecialite,
        error: errorSpecialite,
        refetch: refetchSpecialite,
    } = useGetAll(
        () => categoryService.getSpecialites(category),
        "specialiteecialites"
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
    }, [category]);

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
                data={DataWilayas}
                value={location}
                setValue={setLocation}
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
                data={data}
                isLoading={isLoading}
                value={category}
                setValue={setCategory}
            />
            <DropDown
                title={showTitle ? t("filter.specialty") : ""}
                icon={Icons.Category}
                name={"choisir une specialitie"}
                data={dataSpecialite}
                isLoading={isLoadingSpecialite}
                value={specialty}
                setValue={setSpecialty}
            />
        </div>
    );
};

export default FilterMedecinForm;
