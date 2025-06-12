import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
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
import EditPopUp from "./EditPopUp";

const DataTableCard = ({ data, search, setSearch, total = 0 }) => {
    const { t } = useTranslation("note");
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Card borderRadius={"xl"} shadow={"sm"} className="h-full">
            <CardBody className="!h-full">
                <div className="border-b w-full">
                    <h3 className="border-b-2 text-primary-100 border-b-primary-100 w-fit py-2 first-letter:capitalize font-medium text-sm">
                        {t("general.all-notes")}
                    </h3>
                </div>
                <div className="my-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 md:w-3/5 w-full">
                        {/* <div className="w-1/3">
              <Select placeholder={t("general.filter")} className="">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div> */}
                        <div className="w-full md:w-2/3 relative">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t("general.search")}
                                className="w-full !pl-10"
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
                                        <p>{t("table.sender")}</p>
                                    </div>
                                </Th>
                                <Th>
                                    <div className="text-gray-400 first-letter:capitalize lowercase">
                                        {t("table.destination")}
                                    </div>
                                </Th>
                                <Th>
                                    <div className="text-gray-400 first-letter:capitalize lowercase">
                                        {t("table.number")}
                                    </div>
                                </Th>
                                {/* <Th>
                  <div className="text-gray-400 first-letter:capitalize lowercase">
                    {t("table.date")}
                  </div>
                </Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item, idx) => (
                                <Tr key={idx} className="">
                                    <Td>
                                        <div className="flex items-center space-x-2 text-sm">
                                            {/* <Checkbox /> */}
                                            <div className="flex items-center justify-center bg-[#A1A7C4] rounded-full w-[38px] h-[38px]">
                                                <p className="text-white font-medium uppercase">
                                                    {item.sender.substring(
                                                        0,
                                                        1
                                                    )}
                                                </p>
                                            </div>
                                            <p>{item.sender}</p>
                                        </div>
                                    </Td>
                                    <Td>
                                        <p className="!text-sm">
                                            {item.receiver}
                                        </p>
                                    </Td>
                                    <Td>
                                        <p className="!text-xs">
                                            {item.note_count}
                                        </p>
                                    </Td>
                                    {/* <Td>
                    <p className="!text-xs">
                      {new Date().toString().substring(0, 10)}
                    </p>
                  </Td> */}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <EditPopUp isOpen={isOpen} onClose={onClose} />
            </CardBody>
            <CardFooter className="flex items-center justify-between">
                <div></div>
                <p className="text-sm first-letter:capitalize text-gray-400">
                    {total} {t("table.results")}
                </p>
            </CardFooter>
        </Card>
    );
};

export default DataTableCard;
