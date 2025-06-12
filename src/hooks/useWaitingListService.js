/** @format */

import providerService from "../services/providerService";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";
import waitingListService from "../services/waitingListService";

export const useGetAllWaitingList = () => {
    const { isLoading, data, isError, error, refetch } = useQuery(
        "waiting-list",
        () => waitingListService.getAll()
    );

    return { isLoading, data, isError, error, refetch };
};

export const useGetAllConfirmedList = () => {
    const { isLoading, data, isError, error, refetch } = useQuery(
        "confirmed-list",
        () => waitingListService.getAll("confirmed")
    );

    return { isLoading, data, isError, error, refetch };
};
