import providerService from "../services/providerService";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";
import waitingListService from "../services/waitingListService";
import noteService from "../services/noteService";
import invoiceService from "../services/invoiceService";
import { useNavigate } from "react-router";

export const useGetAllInvoice = (type = "") => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "invoice-list",
    () => {
      if (type === "favs") return invoiceService.getAllInvoiceFav("favs");
      if (type === "current") return invoiceService.getAllInvoice("");
      return invoiceService.getAllInvoice(type);
    }
  );

  console.log(data);
  return { isLoading, data, isError, error, refetch };
};

export const useGetDetailInvoice = (id) => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    `invoice-detail-${id}`,
    () => invoiceService.getInvoice(id)
  );

  return { isLoading, data, isError, error, refetch };
};

export const useGetReport = (id) => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    `report-detail-${id}`,
    () => invoiceService.getReports(id)
  );

  return { isLoading, data, isError, error, refetch };
};

export const useToggleFavoriteInvoice = (id, refetch = () => {}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(false);

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = (data) => {
    setMessage("");
    setError("");
    setLoading(true);
    invoiceService
      .toggleFavorite(id)
      .then((res) => {
        setMessage("toggle favorite invoice successful");
        setData(res?.data);
        setLoading(false);
        reset();
        refetch();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return {
    register,
    handleSubmit,
    loading,
    onSubmit,
    reset,
    message,
    error,
    setMessage,
    setValue,
    watch,
    data,
  };
};

export const useCreateInvoice = (refetch = () => {}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = (data) => {
    setMessage("");
    setError("");
    setLoading(true);
    invoiceService
      .createInvoice(data)
      .then((res) => {
        setMessage("create invoice");
        setData(res?.data);
        setLoading(false);
        reset();
        refetch();
        if (res?.data?.success && res?.data?.invoiceId) {
          navigate(`/prestateur/invoices/current/${res.data.invoiceId}`);
        } else {
          setError("Invoice ID is missing. Cannot navigate to invoice detail.");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return {
    register,
    handleSubmit,
    loading,
    onSubmit,
    reset,
    message,
    error,
    setMessage,
    setValue,
    watch,
    data,
  };
};

export const usePayInvoice = (id, refetch = () => {}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(false);

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = (data) => {
    setMessage("");
    setError("");
    setLoading(true);
    invoiceService
      .payInvoice(id, data)
      .then((res) => {
        setMessage("pay invoice");
        setData(res?.data);
        setLoading(false);
        reset();
        refetch();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return {
    register,
    handleSubmit,
    loading,
    onSubmit,
    reset,
    message,
    error,
    setMessage,
    setValue,
    watch,
    data,
  };
};
