import providerService from "../services/providerService";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";
import waitingListService from "../services/waitingListService";
import noteService from "../services/noteService";

export const useGetAllNoteSend = (search) => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "note-send-list",
    () => noteService.getAllNoteSend(search)
  );

  return { isLoading, data, isError, error, refetch };
};

export const useGetAllNoteReceived = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "note-received-list",
    () => noteService.getAllNoteReceived()
  );

  return { isLoading, data, isError, error, refetch };
};
