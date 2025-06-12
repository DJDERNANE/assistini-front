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

    const providers = useSelector((state) => state.providers.item);
    const filters = useSelector((state) => state.filterProviders.item);

    const query = new URLSearchParams(useLocation().search);
    const searchValue = query.get("search");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoMsg = () => {
        navigate("/messages");
    };

    const [selectLocation, setSelectLocation] = useState([
        36.753836, 3.04760565,
    ]);

    const { loading, error, fetchData } = useGetAllManuel(() =>
        providerService?.getAllByFilter(filters)
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        let filter = {};
        for (const [key, value] of queryParams.entries()) {
            filter = { ...filter, [key]: value };
        }

        dispatch(providerFilterActions.replaceData(filter));
    }, []);

    useEffect(() => {
        if (!searchValue && filters) fetchData();
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
                                prenez un RDV
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
