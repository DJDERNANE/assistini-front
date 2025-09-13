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
    const [initialized, setInitialized] = useState(false);

    const providers = useSelector((state) => state.providers.item);
    const filters = useSelector((state) => state.filterProviders.item);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectLocation, setSelectLocation] = useState([
        36.753836, 3.04760565,
    ]);

    const { loading, error, fetchData } = useGetAllManuel(() =>
        providerService?.getAllByFilter(filters)
    );

    // Initialize from URL once
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const initialFilters = {};
        
        // Get all URL parameters
        params.forEach((value, key) => {
            if (value.trim()) {
                initialFilters[key] = value;
            }
        });

        // Set search value
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchValue(searchParam);
        }

        // Set filters
        if (Object.keys(initialFilters).length > 0) {
            dispatch(providerFilterActions.replaceData(initialFilters));
        }

        setInitialized(true);
    }, []);

    // Fetch data when filters change (only after initialization)
    useEffect(() => {
        if (initialized) {
            fetchData();
        }
    }, [initialized]);

    // Handle search change
    const handleSearchChange = (search) => {
        setSearchValue(search);
        
        // Update filters
        const updatedFilters = { ...filters };
        if (search && search.trim()) {
            updatedFilters.search = search;
        } else {
            delete updatedFilters.search;
        }
        
        dispatch(providerFilterActions.replaceData(updatedFilters));
        
        // Update URL
        const params = new URLSearchParams();
        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (value && value.toString().trim()) {
                params.set(key, value);
            }
        });
        
        const newUrl = params.toString() 
            ? `${location.pathname}?${params.toString()}`
            : location.pathname;
            
        navigate(newUrl, { replace: true });
    };

    // Show loading
    if (loading) {
        return (
            <div>
                <Navbar>
                    <FilterMedecinForm />
                </Navbar>
                <NavbarMobile />
                <div className="responsive mt-4 mb-10">
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Chargement...</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Show error
    if (error) {
        return (
            <div>
                <Navbar>
                    <FilterMedecinForm />
                </Navbar>
                <NavbarMobile />
                <div className="responsive mt-4 mb-10">
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="mb-4 text-red-500 text-6xl">⚠️</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de connexion</h3>
                            <p className="text-gray-600 mb-4">Impossible de charger les médecins</p>
                            <button
                                onClick={() => fetchData()}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Réessayer
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar>
                <FilterMedecinForm />
            </Navbar>
            <NavbarMobile />

            <div className="responsive mt-4 mb-10 grid md:grid-cols-4 gap-x-4">
                <div className="space-y-4 col-span-3">
                    {/* Search Form */}
                    <Card borderRadius={"lg"} className="w-full">
                        <CardBody className="text-zinc-600 text-sm md:text-base text-center flex items-center justify-center" padding={"3"}>
                            <SearchForm 
                                search={searchValue}
                                setSearch={setSearchValue}
                                onSearchChange={handleSearchChange}
                                navigateToDoctors={false}
                            />
                        </CardBody>
                    </Card>

                    {/* No Results */}
                    {providers && providers.length === 0 && (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <div className="mb-4 text-gray-400 text-6xl">🔍</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun médecin trouvé</h3>
                                <p className="text-gray-600 mb-4">
                                    Aucun résultat pour vos critères de recherche
                                </p>
                                {searchValue && (
                                    <button
                                        onClick={() => handleSearchChange("")}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                                    >
                                        Effacer la recherche
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setSearchValue("");
                                        dispatch(providerFilterActions.replaceData({}));
                                        navigate(location.pathname, { replace: true });
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Tout réinitialiser
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Providers List */}
                    {providers && providers.length > 0 && providers.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                setSelect(item);
                                setSelectLocation(item?.location?.split(","));
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
                </div>

                {/* Map */}
                <div className="h-[700px] sticky top-0 hidden md:block overflow-hidden">
                    <CardMap
                        centerLocation={selectLocation}
                        data={[
                            {
                                lat: 36.753836,
                                lng: 3.04760565,
                                label: "hello",
                            },
                        ]}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchMedecinPage;