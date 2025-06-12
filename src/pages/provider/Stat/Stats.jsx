import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CardBoxStat from "./components/CardBoxStat";
import CardBarChart from "./components/CardBarChart";
import CardTraficWilaya from "./components/CardTraficWilaya";
import CardCircleChart from "./components/CardCircleChart";
import { useGetStats } from "../../../hooks/useProviderService";

const Stats = () => {
    const { t } = useTranslation("stat");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const path = window.location.pathname;

    const { isLoading, fetchData, data } = useGetStats();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="responsive mt-4">
            <Card borderRadius={"xl"} shadow={"sm"}>
                <CardHeader className="">
                    <h1 className="font-semibold first-letter:capitalize text-2xl mb-4">
                        {t("general.title")}
                    </h1>
                    <div className="space-x-2"></div>
                </CardHeader>
                <CardBody>
                    <CardBoxStat data={data ?? []} />
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
                        <div className="md:col-span-3 bg-gray-100 rounded-xl px-4 py-10">
                            <p className="font-semibold text-7xl">
                                {data?.totalRdvs}
                            </p>
                            <p className="font-medium text-lg first-letter:capitalize mt-4">
                                {t("general.total-rdv")}
                            </p>
                        </div>
                        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 md:space-x-4">
                            <CardCircleChart
                                data={data?.statusStats ?? []}
                                labels={[
                                    t("general.pending"),
                                    t("general.closed"),
                                    t("general.confirmed"),
                                ]}
                            />
                            <CardCircleChart
                                data={data?.typeStats ?? []}
                                labels={[
                                    t("general.consultation"),
                                    t("general.test"),
                                ]}
                            />
                        </div>
                        <div className="md:col-span-full">
                            <CardBarChart
                                data={data?.monthStats ?? []}
                                title={t("general.nbr-rdv")}
                            />
                        </div>
                    </div>
                </CardBody>
                {/* <CardFooter className="!pt-0">
          <div className="flex items-center justify-end w-full">
            <button
              onClick={nextPage}
              className="bg-secondary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
            >
              {t("general.payment")}
            </button>
          </div>
        </CardFooter> */}
            </Card>
        </div>
    );
};

export default Stats;
