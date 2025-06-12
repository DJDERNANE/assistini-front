import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";
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

const ClinicDoctorsModal = ({ isOpen, onOpen, onClose }) => {
  const { t } = useTranslation("waiting");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b">
            <div className="flex items-center justify-between">
              <p className="font-bold first-letter:capitalize text-lg">
                {t("modal.title")}
              </p>
              <img src="" alt="" />
            </div>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>{t("modal.doctor")}</Th>
                    <Th>{t("modal.list")}</Th>
                    <Th>{t("modal.status")}</Th>
                    <Th>{t("modal.speciality")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[1, 2, 3, 4, 5, 6, 6, 7].map(() => (
                    <Tr>
                      <Td>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" name="" id="" />
                          <div className="bg-blue-500 text-white font-semibold text-2xl px-4 py-2 w-fit rounded">
                            <p>F</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Dr.Fouzi</h4>
                            <p>chardiologue</p>
                          </div>
                        </div>
                      </Td>
                      <Td>15 patient</Td>
                      <Td>
                        <p className="capitalize text-sm text-[#06A561] bg-[#C4F8E2] w-fit px-2 py-px rounded">
                          active
                        </p>
                      </Td>
                      <Td>chardiologue</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter className="flex items-center space-x-2"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClinicDoctorsModal;
