/** @format */

import providerService from "../services/providerService";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";
import patientService from "../services/patientService";
import { useNavigate } from "react-router";

export const useGetAllPatient = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchData = () => {
        setIsLoading(true);
        patientService
            .getAll()
            .then((res) => {
                setData(res?.data?.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { data, isLoading, fetchData };
};

export const useGetAllPatientDoc = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchData = () => {
        setIsLoading(true);
        patientService
            .getDoc()
            .then((res) => {
                setData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { data, isLoading, fetchData };
};

export const useGetDetailPatient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const fetchData = (id) => {
        setIsLoading(true);
        patientService
            .get(id)
            .then((res) => {
                setData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useCreatePatient = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        patientService
            .create(data)
            .then((res) => {
                setMessage("creation sub admin successful");
                setLoading(false);
                reset();
                navigate("/home/my-patient");
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
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
    };
};

export const useUploadDocPatient = (refetch = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        patientService
            .uploadDocs(data)
            .then((res) => {
                setMessage("add new files successful");
                setLoading(false);
                reset();
                refetch();
                // navigate("/home/documents");
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
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
    };
};

export const useDeletePatient = (callback = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (id) => {
        setMessage("");
        setError("");
        setLoading(true);
        patientService
            .deletePatient(id)
            .then((res) => {
                setMessage("creation service successful");
                callback();
                setLoading(false);
                reset();
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
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
    };
};
