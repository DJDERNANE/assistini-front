/** @format */

import providerService from "../services/providerService";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/authService";

export const useGetAllProviders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchData = () => {
        setIsLoading(true);
        providerService
            .getAll()
            .then((res) => {
                dispatch(providerActions.replaceData(res));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData };
};

export const useGetAllSpecialites = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = (id) => {
        setIsLoading(true);
        providerService
            .getAllSpecialites(id)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useGetAllSpecialitesWithoutId = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = (id) => {
        setIsLoading(true);
        providerService
            .getAllSpecialitesWithoutId()
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useGetServiceById = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = (id) => {
        setIsLoading(true);
        providerService
            .getServicesById(id)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useGetAllFavorites = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = () => {
        setIsLoading(true);
        providerService
            .getAllFavorite()
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useGetAllSubAdmin = () => {
    const { isLoading, data, isError, error, refetch } = useQuery(
        "provider-sub-admin",
        () => providerService.getAllSubAdmin()
    );

    return { isLoading, data, isError, error, refetch };
};

export const useGetAllService = () => {
    const { isLoading, data, isError, error, refetch } = useQuery(
        "all-services",
        () => providerService.getAllServices()
    );

    return { isLoading, data, isError, error, refetch };
};

export const useGetAllPartners = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = (id) => {
        setIsLoading(true);
        providerService
            .getAllPartners(id)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useGetAllDispo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = (id) => {
        setIsLoading(true);
        providerService
            .getAllDispo()
            .then((res) => {
                setData(res.data?.disponibilities);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useGetProviderDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = (id) => {
        setIsLoading(true);
        providerService
            .showProviderDetail(id)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useGetStats = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const fetchData = (id) => {
        setIsLoading(true);
        providerService
            .getStats()
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return { isLoading, fetchData, data };
};

export const useEditDispo = (refetch = () => {}) => {
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        providerService
            .updateDispo(data)
            .then((res) => {
                setMessage(res.message);
                setLoading(false);
                refetch();
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

export const useEditProvider = () => {
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        providerService
            .update(data)
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

export const useEditProviderEmail = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .updateEmail(data)
            .then((res) => {
                setMessage(res.data);
                setLoading(false);
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
    };
};

export const useCreateSubAdmin = (refetch = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .createSubAdmin(data)
            .then((res) => {
                setMessage("creation sub admin successful");
                refetch();
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

export const useCreateService = (defaultValue = {}, refetch = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .createService(data)
            .then((res) => {
                setMessage("creation service successful");
                setLoading(false);
                reset();
                refetch();
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

export const useSendNote = (defaultValue = {}, callback = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .sendNote(data)
            .then((res) => {
                setMessage("sended notes successful");
                setLoading(false);
                callback();
                reset();
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
    };
};

export const useToggleFavorite = (refetch = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .toggleFavorite(data)
            .then((res) => {
                setMessage("toggle favorite successful");
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
    };
};

export const useDeleteLogo = (refetch = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .deleteLogo()
            .then((res) => {
                setMessage("delete logo successful");
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
    };
};

export const useDeleteSubAdmin = (refetch = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = ({ id }) => {
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .deleteSubAdmin(id)
            .then((res) => {
                setMessage("delete logo successful");
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
    };
};

export const useDeleteService = (refetch = () => {}) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = ({ id }) => {
        console.log("@@@@", id);
        setMessage("");
        setError("");
        setLoading(true);
        providerService
            .deleteService(id)
            .then((res) => {
                setMessage("delete service successful");
                setLoading(false);
                reset();
                refetch();
            })
            .catch((err) => {
                setError(err?.response?.data?.message);
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

export const useGetDataProvider = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        authService
            .providerMe()
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
