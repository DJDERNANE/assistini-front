/** @format */

import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
    CircularProgress,
} from "@chakra-ui/react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import CardRdv from "./components/CardRdv";
import AddPatientForm from "../../../components/form/AddPatientForm";
import PatientData from "./components/PatientData";
import CardDocument from "./components/CardDocument";
import Pagination from "../../../layout/Pagination";
import { useGetAllWaitingList } from "../../../hooks/useWaitingListService";
import FilterPatientProfile from "../../../components/filters/FilterPatientProfile";
import FilterInvoice from "../../../components/filters/FilterInvoice";
import { useGetAllInvoice } from "../../../hooks/useInvoiceService";

const List = () => {
    const { t } = useTranslation("invoice");

    const [selected, setSelected] = useState(0);
    // const [type, setType] = useState("");
    const { type } = useParams();

    const totalPages = 24;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log("Page changed to:", page);
        // Handle your data fetch or page change logic here
    };

    const { isLoading, data, isError, error, refetch } = useGetAllInvoice(type);

    useEffect(() => {
        refetch();
    }, [type]);

    const navigate = useNavigate();

    return (
        <div className="">
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <CircularProgress isIndeterminate color="blue.400" />
                </div>
            ) : (
                <div>
                    <FilterInvoice type={type} />
                    <div className="grid grid-cols-5 text-sm text-[#5A607F] border-b pb-3">
                        <h5>{t("exist.patient-name")}</h5>
                        <h5>{t("exist.date_create")}</h5>
                        <h5>{t("exist.provider")}</h5>
                        <h5>{t("exist.price")}</h5>
                        <h5>{t("exist.status")}</h5>
                    </div>
                    <div className="overflow-x-auto">
                        {data &&
                            data?.data &&
                            data?.data?.data?.map((item) => (
                                <div
                                    className="grid grid-cols-5 text-sm bg-[#F5F9FF] rounded my-2 py-1 px-3 cursor-pointer hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        navigate(`./${item.id}`);
                                    }}
                                >
                                    <p className="">{item.patient}</p>
                                    <p className="">
                                        {item.created_at.substring(0, 10)}
                                    </p>
                                    <p className="">{item.provider}</p>
                                    <p className="">{item.total_price}</p>
                                    <p className="">{item.payment_status}</p>
                                </div>
                            ))}
                    </div>
                    {/* <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          /> */}
                </div>
            )}
        </div>
    );
};

export default List;
