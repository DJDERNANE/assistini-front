/** @format */

import providerService from "../services/providerService";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import rdvsService from "../services/rdvsService";

export const useGetAllRDV = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchData = () => {
        setIsLoading(true);
        rdvsService
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

export const useGetAllRDVPending = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchData = () => {
        setIsLoading(true);
        rdvsService
            .getAllPending()
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

export const useGetAllRDVWaitingList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchData = () => {
        setIsLoading(true);
        rdvsService
            .getAllWaitingList()
            .then((res) => {
                setData(res?.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { data, isLoading, fetchData };
};

export const useGetTodayRDV = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const fetchData = (id) => {
        setIsLoading(true);
        rdvsService
            .getTodayRdv()
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

export const useGetDetailRDV = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const fetchData = (id) => {
        setIsLoading(true);
        rdvsService
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

export const useGetRequestsFile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const fetchData = () => {
        setIsLoading(true);
        rdvsService
            .getAllRequests()
            .then((res) => {
                setData(res?.data?.requests);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useDeleteRDV = (callback = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (id) => {
        setMessage("");
        setError("");
        setLoading(true);
        rdvsService
            .deleteRdv(id)
            .then((res) => {
                setMessage("delete rdv successful");
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    };

    return {
        loading,
        onSubmit,
    };
};

export const useRequestFileAccess = (callback = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (id) => {
        setMessage("");
        setError("");
        setLoading(true);
        rdvsService
            .requestAccessFile(id)
            .then((res) => {
                setMessage("request file access successful");
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    };

    return {
        loading,
        onSubmit,
    };
};

export const useConfirmRDV = (callback = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (id) => {
        setMessage("");
        setError("");
        setLoading(true);
        rdvsService
            .confirmRdv(id)
            .then((res) => {
                setMessage("confirm rdv successful");
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    };

    return {
        loading,
        onSubmit,
    };
};

export const useAcceptAccessFile = (callback = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (id) => {
        setMessage("");
        setError("");
        setLoading(true);
        rdvsService
            .acceptAccessFile(id)
            .then((res) => {
                setMessage("accept acess file successful");
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    };

    return {
        loading,
        onSubmit,
    };
};

export const useRefuseAccessFile = (callback = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (id) => {
        setMessage("");
        setError("");
        setLoading(true);
        rdvsService
            .refuseAccessFile(id)
            .then((res) => {
                setMessage("accept acess file successful");
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    };

    return {
        loading,
        onSubmit,
    };
};
