import { useQuery } from "react-query";
import { useState } from "react";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";

export const useGetAll = (callback, name) => {
  const { isLoading, data, isError, error, refetch } = useQuery(name, () =>
    callback()
      .then((res) => res.data.data)
      .catch((err) => err.message)
  );

  return { isLoading, data, isError, error, refetch };
};

export const useGetAllManuel = (callback, navigate = () => {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const fetchData = () => {
    setError("");
    setLoading(true);
    callback()
      .then((res) => {
        dispatch(providerActions.replaceData(res.data.data));
        setLoading(false);
        navigate();
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return { loading, error, fetchData };
};
