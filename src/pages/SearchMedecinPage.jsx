/** @format */

import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../layout/Navbar";
import CardMedecin from "../components/cards/CardMedecin";
import CardMap from "../components/cards/CardMap";
import Footer from "../layout/Footer";
import FilterMedecinForm from "../components/form/FilterMedecinForm";
import { Card, CardBody, Box, Text, Image, VStack, Button } from "@chakra-ui/react";
import NavbarMobile from "../layout/NavbarMobile";
import SearchForm from "../components/form/SearchForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { providerFilterActions } from "../store/filter/filter-provider-slice";
import providerService from "../services/providerService";
import { useGetAllManuel } from "../hooks/useSamples";
import { Images, Icons } from "../constants";
import WaitingBar from "../layout/WaitingBar";

const SearchMedecinPage = () => {
    const [select, setSelect] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [lastAppliedFilters, setLastAppliedFilters] = useState(null);

    const providers = useSelector((state) => state.providers.item);
    const filters = useSelector((state) => state.filterProviders.item);

    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const urlSearchValue = query.get("search");

    const dispatch = useDispatch();
    
    const [selectLocation, setSelectLocation] = useState([36.753836, 3.04760565]);

    const { loading, error, fetchData } = useGetAllManuel(() =>
        providerService?.getAllByFilter(filters)
    );

    // Handle search change
    const handleSearchChange = useCallback((search) => {
        setSearchValue(search);
        
        // Update filters with search parameter
        const updatedFilters = { ...filters };
        if (search) {
            updatedFilters.search = search;
        } else {
            delete updatedFilters.search;
        }
        dispatch(providerFilterActions.replaceData(updatedFilters));
    }, [filters, dispatch]);

    // Update URL when filters change (but not on initial load)
    useEffect(() => {
        if (isInitialLoad) {
            return;
        }

        const params = new URLSearchParams();
        
        // Add all filter parameters to URL
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });
        
        // Update URL without triggering a page reload
        const newUrl = `${location.pathname}?${params.toString()}`;
        if (newUrl !== location.pathname + location.search) {
            navigate(newUrl, { replace: true });
        }
    }, [filters, navigate, location.pathname, location.search, isInitialLoad]);

    // Initial setup from URL params - RUN ONLY ONCE
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        let filter = {};

        for (const [key, value] of queryParams.entries()) {
            filter = { ...filter, [key]: value };
        }

        // Set search value from URL
        if (urlSearchValue) {
            setSearchValue(urlSearchValue);
        }

        dispatch(providerFilterActions.replaceData(filter));
        setLastAppliedFilters(filter); // Store initial filters
        setIsInitialLoad(false);
        
        // Fetch data with initial filters
        fetchData();
    }, []); // Empty dependency array to run only once on mount

    // Fetch data when filters change - but only if they're different from last applied
    useEffect(() => {
        if (isInitialLoad) return;
        
        // Check if filters have actually changed
        const filtersChanged = JSON.stringify(filters) !== JSON.stringify(lastAppliedFilters);
        
        if (filtersChanged) {
            setLastAppliedFilters(filters);
            
            // Add a small timeout to prevent rapid successive calls
            const timer = setTimeout(() => {
                fetchData();
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [filters, isInitialLoad, fetchData, lastAppliedFilters]);

    // Function to clear filters and try again
    const handleClearFilters = () => {
        dispatch(providerFilterActions.replaceData({}));
        setSearchValue("");
    };

    // Render empty state
    const renderEmptyState = () => (
        <Box className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Image 
                src={Images.EMPTY} 
                alt="No doctors found" 
                className="w-64 h-64 mb-6"
            />
            <Text className="text-xl font-semibold text-gray-700 mb-2">
                Aucun médecin trouvé
            </Text>
            <Text className="text-gray-500 mb-6 max-w-md">
                {searchValue 
                    ? `Aucun résultat pour "${searchValue}". Essayez avec d'autres termes de recherche.`
                    : "Aucun médecin ne correspond à vos critères de filtrage. Essayez de modifier vos filtres."
                }
            </Text>
            <Button 
                colorScheme="blue" 
                onClick={handleClearFilters}
                className="flex items-center gap-2"
            >
                <Image src={Icons.REFRESH} className="w-5 h-5" />
                Réinitialiser les filtres
            </Button>
        </Box>
    );

    // Render error state
    const renderErrorState = () => (
        <Box className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Image 
                src={Images.ERROR} 
                alt="Error" 
                className="w-64 h-64 mb-6"
            />
            <Text className="text-xl font-semibold text-gray-700 mb-2">
                Une erreur s'est produite
            </Text>
            <Text className="text-gray-500 mb-6 max-w-md">
                Désolé, nous n'avons pas pu charger la liste des médecins. 
                Veuillez vérifier votre connexion internet et réessayer.
            </Text>
            <Button 
                colorScheme="blue" 
                onClick={fetchData}
                className="flex items-center gap-2"
            >
                <Image src={Icons.REFRESH} className="w-5 h-5" />
                Réessayer
            </Button>
        </Box>
    );

    return (
        <div>
            <Navbar>
                <FilterMedecinForm />
            </Navbar>
            <NavbarMobile />
            <div className="responsive mt-4 mb-10 grid md:grid-cols-4 gap-x-4">
                <div className="space-y-4 col-span-3">
                    <div className="grid grid-cols-4 gap-4 w-full">
                        <Card borderRadius={"lg"} className="col-span-full h-full">
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
                    </div>

                    {loading && <WaitingBar />}

                    {error && renderErrorState()}

                    {!loading && !error && providers && providers.length === 0 && renderEmptyState()}

                    {!loading && !error && providers && providers.length > 0 && (
                        <>
                            {providers.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        setSelect(item);
                                        if (item?.location) {
                                            setSelectLocation(item.location.split(","));
                                        }
                                    }}
                                >
                                    <CardMedecin
                                        medecin={item}
                                        select={select === item}
                                        favorite={item?.isFavorite}
                                        refetch={fetchData}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className="h-[700px] sticky top-0 hidden md:block overflow-hidden">
                    <CardMap
                        centerLocation={selectLocation}
                        data={[{
                            lat: 36.753836,
                            lng: 3.04760565,
                            label: "hello",
                        }]}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchMedecinPage;