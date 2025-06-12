/** @format */

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import icons from "../../../../constants/icons";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Icons } from "../../../../constants";
import ConfirmDeleteServicePopUp from "./ConfirmDeleteServicePopUp";
import {
    useDeleteService,
    useDeleteSubAdmin,
} from "../../../../hooks/useProviderService";
// import EditPopUp from "./EditPopUp";

const DataTableCard = ({ data, refetch = () => {} }) => {
    const { t } = useTranslation("settings");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selected, setSelected] = useState(null);

    const {
        register: registerDelete,
        handleSubmit: handleSubmitDelete,
        loading: loadingDelete,
        onSubmit: onSubmitDelete,
        reset: resetDelete,
        message: messageDelete,
        error: errorDelete,
        setMessage: setMessageDelete,
        setValue: setValueDelete,
        watch: watchDelete,
    } = useDeleteService(() => {
        refetch();
        onClose();
    });

    const [search, setSearch] = useState("");

    return (
        <Card borderRadius={"xl"} shadow={"sm"} className="h-full">
            <CardBody className="!h-full">
                <div className="border-b w-full">
                    <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
                        {t("general.all-services")}
                    </h3>
                </div>
                <div className="my-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 md:w-3/5">
                        <div className="w-full md:w-2/3 relative">
                            <Input
                                placeholder={t("general.search")}
                                className="w-full !pl-10"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <img
                                src={icons.Search}
                                alt=""
                                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
            <button
              className="border rounded p-2 flex items-center justify-center"
              onClick={() => onOpen()}
            >
              <img src={icons.editBleu} alt="" className="w-4 h-4" />
            </button>
            <button className="border rounded p-2 flex items-center justify-center">
              <img src={icons.trashBleu} alt="" className="w-4 h-4" />
            </button>
          </div> */}
                </div>
                <TableContainer className="w-full">
                    <Table className="w-full">
                        <Thead>
                            <Tr className="">
                                <Th className="w-3/6">
                                    <div className="space-x-2 lowercase first-letter:capitalize flex items-center text-gray-400">
                                        {/* <Checkbox /> */}
                                        <p>#</p>
                                    </div>
                                </Th>
                                <Th>
                                    <div className="text-gray-400 first-letter:capitalize lowercase">
                                        {t("table.nom-analyse")}
                                    </div>
                                </Th>
                                <Th>
                                    <div className="text-gray-400 first-letter:capitalize lowercase">
                                        {t("table.price")}
                                    </div>
                                </Th>
                                <Th>
                                    <div className="text-gray-400 first-letter:capitalize lowercase">
                                        {t("table.speciality")}
                                    </div>
                                </Th>
                                <Th>
                                    <div className="text-gray-400 first-letter:capitalize lowercase">
                                        {t("table.action")}
                                    </div>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data
                                .filter((item) =>
                                    item?.nom
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .map((item, idx) => (
                                    <Tr key={idx} className="">
                                        <Td>
                                            <div className="flex items-center space-x-2 text-sm">
                                                {/* <Checkbox /> */}
                                                <div className="flex items-center justify-center bg-[#A1A7C4] rounded-full w-[38px] h-[38px]">
                                                    <p className="text-white font-medium uppercase">
                                                        {item?.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </Td>
                                        <Td>
                                            <p className="!text-sm">
                                                {item?.nom}
                                            </p>
                                        </Td>
                                        <Td>
                                            <p className="!text-xs">
                                                {item?.price} {t("table.dzd")}
                                            </p>
                                        </Td>
                                        <Td>
                                            <p className="!text-xs">
                                                {item?.specialtyName}
                                            </p>
                                        </Td>
                                        <Td className="">
                                            <div className="mx-auto w-fit">
                                                <button
                                                    onClick={() => {
                                                        setSelected(item?.id);
                                                        onOpen();
                                                    }}
                                                    className="!h-full"
                                                >
                                                    <img src={Icons.trash} />
                                                </button>
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                {/* <EditPopUp isOpen={isOpen} onClose={onClose} /> */}
            </CardBody>
            <CardFooter className="flex items-center justify-between">
                <div></div>
                <p className="text-sm first-letter:capitalize text-gray-400">
                    {data?.length} {t("table.results")}
                </p>
            </CardFooter>
            <ConfirmDeleteServicePopUp
                isOpen={isOpen}
                onClose={() => {
                    setSelected(null);
                    onClose();
                }}
                onClick={() => {
                    handleSubmitDelete(onSubmitDelete({ id: selected }));
                    setSelected(null);
                }}
            />
        </Card>
    );
};

export default DataTableCard;
