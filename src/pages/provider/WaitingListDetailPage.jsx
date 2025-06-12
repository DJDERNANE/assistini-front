import React, { useEffect, useState } from "react";
import WaitingCard from "../../components/cards/WaitingCard";
import CustomButton from "../../components/custom/CustomButton";
import { useTranslation } from "react-i18next";
import PaginationBox from "../../components/ui/PaginationBox";
import useConfirmModal from "../../components/modals/ConfrimModal";
import { CircularProgress, useDisclosure } from "@chakra-ui/react";
import ConfirmModal from "../../components/modals/ConfrimModal";
import RejectedModal from "../../components/modals/RejectedModal";
import { useGetAllDispo } from "../../hooks/useProviderService";
import {
    useConfirmRDV,
    useDeleteRDV,
    useGetAllRDVPending,
    useGetAllRDVWaitingList,
    useGetAllWaitingList,
} from "../../hooks/useRDVsService";
import { Images } from "../../constants";

const WaitingListDetailPage = ({}) => {
    const { t } = useTranslation("waiting");

    const [selected, setSelected] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenReject,
        onOpen: onOpenReject,
        onClose: onCloseReject,
    } = useDisclosure();

    const { data, isLoading, fetchData } = useGetAllRDVPending();
    useEffect(() => {
        fetchData();
    }, []);

    const handleSelected = (id, type = "confirm") => {
        setSelected(id);
        if (type === "confirm") onOpen();
        else onOpenReject();
    };

    const handleClose = (type = "confirm") => {
        setSelected(null);
        if (type === "confirm") onClose();
        else onCloseReject();
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <CircularProgress
                            isIndeterminate
                            selectedDeleted="blue.400"
                        />
                    </div>
                ) : data?.length > 0 ? (
                    data?.map((item) => (
                        <WaitingCard
                            item={item}
                            handleSelected={handleSelected}
                            fetchData={fetchData}
                        />
                    ))
                ) : (
                    <div className="w-full bg-white overflow-hidden rounded-lg flex items-center justify-center h-[300px]">
                        <img src={Images.NoData} alt="" />
                    </div>
                )}
            </div>
            <div className="mt-4">{/* <PaginationBox total={6} /> */}</div>

            {/* {selected !== null && (
        <ConfirmModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={() => handleClose("reject")}
        />
      )}
      {selected !== null && (
        <RejectedModal
          isOpen={isOpenReject}
          onOpen={onOpenReject}
          onClose={() => handleClose("reject")}
        />
      )} */}
        </div>
    );
};

export default WaitingListDetailPage;
