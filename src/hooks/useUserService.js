import userService from "../services/userService";

import { useQuery } from "react-query";
import { useAppDispatch } from "../stores/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mdiPhone } from "@mdi/js";

export const useGetAllUsers = () => {
  const { isLoading, data, isError, error, refetch } = useQuery("users", () =>
    userService.getAll(
      sessionStorage.getItem('localStorage.getItem("accessToken")')
    )
  );

  return { isLoading, data, isError, error, refetch };
};

export const useGetUser = (id) => {
  const { isLoading, data, isError, error, refetch } = useQuery("user", () => {
    if (id)
      userService.get(
        sessionStorage.getItem('localStorage.getItem("accessToken")'),
        id
      );
  });

  return { isLoading, data, isError, error, refetch };
};

export const useAddUser = () => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: { username: "", phone: "", password: "" },
  });

  const onSubmit = (data) => {
    setLoading(true);
    userService
      .store(
        sessionStorage.getItem('localStorage.getItem("accessToken")'),
        data
      )
      .then((res) => {
        setMessage(res.message);
        reset();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
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
    setMessage,
  };
};

export const useEditUser = (id) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    userService
      .update(
        sessionStorage.getItem('localStorage.getItem("accessToken")'),
        id,
        data
      )
      .then((res) => {
        setMessage(res.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
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
    setMessage,
    setValue,
    watch,
  };
};

export const useToggleUser = () => {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const onSubmit = (id) => {
    setLoading(true);
    userService
      .toggle(sessionStorage.getItem('localStorage.getItem("accessToken")'), id)
      .then((res) => {
        setMessage(res.message);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
        setLoading(false);
      });
  };

  return { data, loading, onSubmit, message, setMessage };
};

export const useDeleteUser = () => {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmit = (id) => {
    setLoading(true);
    userService
      .remove(sessionStorage.getItem('localStorage.getItem("accessToken")'), id)
      .then((res) => {
        setMessage(res.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
        setLoading(false);
      });
  };

  return { loading, onSubmit, message, setMessage };
};
