/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import { Icons, Images } from "../constants";
import CardMap from "../components/cards/CardMap";
import Footer from "../layout/Footer";
import FilterMedecinForm from "../components/form/FilterMedecinForm";
import CircleButton from "../components/ui/CircleButton";
import NotificationBox from "../layout/NotificationBox";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import FilterMedecinModal from "../components/filters/FilterMedecinModal";
import NavbarMobile from "../layout/NavbarMobile";
import SearchForm from "../components/form/SearchForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllProviders } from "../hooks/useProviderService";
import { useDispatch, useSelector } from "react-redux";
import { providerFilterActions } from "../store/filter/filter-provider-slice";
import providerService from "../services/providerService";
import { useGetAllManuel } from "../hooks/useSamples";
import WaitingBar from "../layout/WaitingBar";

const SearchMedecinPage = () => {
    const [select, setSelect] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    const providers = useSelector((state) => state.providers.item);
    const filters = useSelector((state) => state.filterProviders.item);

    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const urlSearchValue = query.get("search");

    const dispatch = useDispatch();
    
    const handleGoMsg = () => {
        navigate("/messages");
    };

    const [selectLocation, setSelectLocation] = useState([
        36.753836, 3.04760565,
    ]);

    const { loading, error, fetchData } = useGetAllManuel(() =>
        providerService?.getAllByFilter(filters)
    );

    // Handle search change
    const handleSearchChange = (search) => {
        setSearchValue(search);
        
        // Update URL with search parameter
        const params = new URLSearchParams(location.search);
        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }
        
        const newUrl = `${location.pathname}?${params.toString()}`;
        navigate(newUrl, { replace: true });
        
        // Update filters with search parameter (or remove it if empty)
        const updatedFilters = { ...filters };
        if (search) {
            updatedFilters.search = search;
        } else {
            delete updatedFilters.search;
        }
        dispatch(providerFilterActions.replaceData(updatedFilters));
    };

    // Update URL when filters change
    useEffect(() => {
        if (filters) {
            const params = new URLSearchParams();
            
            // Add all filter parameters to URL
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                }
            });
            
            // Preserve search parameter if it exists
            if (searchValue) {
                params.set('search', searchValue);
            }
            
            // Update URL without triggering a page reload
            const newUrl = `${location.pathname}?${params.toString()}`;
            if (newUrl !== location.pathname + location.search) {
                navigate(newUrl, { replace: true });
            }
        }
    }, [filters, navigate, location.pathname, searchValue]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        let filter = {};
        for (const [key, value] of queryParams.entries()) {
            filter = { ...filter, [key]: value };
        }

        // Set search value from URL
        if (urlSearchValue) {
            setSearchValue(urlSearchValue);
        }

        dispatch(providerFilterActions.replaceData(filter));
    }, []);

    useEffect(() => {
        if (filters) fetchData();
    }, [filters]);

    return (
        <div>
            <Navbar>
                <FilterMedecinForm />
            </Navbar>
            <NavbarMobile />

            <div className="responsive mt-4 mb-10 grid md:grid-cols-4 gap-x-4">
                <div className="space-y-4 col-span-3">
                    <div className="grid grid-cols-4 gap-4 w-full">
                        <Card
                            borderRadius={"lg"}
                            className="col-span-full h-full"
                        >
                            <CardBody
                                className="text-zinc-600 text-sm md:text-base text-center flex items-center justify-center"
                                padding={"3"}
                            >
                                <SearchForm 
                                    search={searchValue}
                                    setSearch={setSearchValue}
                                    onSearchChange={handleSearchChange}
                                    navigateToDoctors={false}
                                />
                            </CardBody>
                        </Card>
                        {/* <div className="col-start-3 md:col-start-1 md:col-span-1 col-span-2"> */}
                        {/* <div className="col-start-3 md:col-start-4 md:col-span-1 col-span-2">
                            <FilterMedecinModal />
                        </div> */}
                    </div>
                    {providers &&
                        providers?.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setSelect(item);
                                    setSelectLocation(
                                        item?.location?.split(",")
                                    );
                                }}
                            >
                                <CardMedecin
                                    medecin={item}
                                    select={select === item}
                                    favorite={item?.isFavorite}
                                    refetch={() => {
                                        fetchData();
                                    }}
                                />
                            </div>
                        ))}
                </div>
                <div className="h-[700px] sticky top-0 hidden md:block overflow-hidden">
                    <CardMap
                        centerLocation={selectLocation}
                        // selectedLocation={[46.753836, 10.04760565]}
                        data={[
                            {
                                lat: 36.753836,
                                lng: 3.04760565,
                                label: "hello",
                            },
                        ]}
                        // data={
                        //   providers?.map((item) => ({
                        //     lat: item.location.split(",")[0],
                        //     lng: item.location.split(",")[1],
                        //     label: item.cabinName,
                        //   })) ?? []
                        // }
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchMedecinPage;
