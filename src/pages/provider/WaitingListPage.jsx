import React, { useEffect, useState } from "react";
import WaitingCard from "../../components/cards/WaitingCard";
import CustomButton from "../../components/custom/CustomButton";
import { useTranslation } from "react-i18next";
import PaginationBox from "../../components/ui/PaginationBox";
import useConfirmModal from "../../components/modals/ConfrimModal";
import { useDisclosure } from "@chakra-ui/react";
import ConfirmModal from "../../components/modals/ConfrimModal";
import RejectedModal from "../../components/modals/RejectedModal";
import InfoWaitingListBox from "../../components/box/InfoWaitingListBox";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetAllRDVWaitingList } from "../../hooks/useRDVsService";

const WaitingListPage = () => {
  return (
    <div className="responsive grid md:grid-cols-12 mt-4 mb-10 gap-6 h-full">
      <div className="col-span-5 hidden md:flex flex-col justify-between">
        <div className="space-y-4 relative">
          <InfoWaitingListBox />
        </div>
      </div>

      <div className="col-span-7">
        <Outlet />
      </div>
    </div>
  );
};

export default WaitingListPage;
