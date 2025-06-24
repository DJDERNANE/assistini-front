/** @format */

import { changeLanguage } from "i18next";
import authService from "../services/authService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { loginSlice, logoutSlice } from "../store/authSlice";
import authProviderService from "../services/authProviderService";

export const useMe = (callback = () => {}) => {
    const dispatch = useDispatch();
    const mePrestateur = async () => {
        try {
            const data = await authProviderService.me();

            const { role = "prestateur", ...user } = data;
            dispatch(
                loginSlice({
                    isAuthenticated: true,
                    userRole: role, // e.g., 'admin', 'user', 'guest'
                    userData: user,
                })
            );

            return data;
            // setTokens(access_token, refresh_token); // Store tokens in local storage or cookies
            // setIsAuthenticated(true);
        } catch (error) {
            dispatch(logoutSlice({}));
            callback();
            // localStorage.clear("userData");
            // localStorage.clear("accessToken");
            // navigate("/login");
            // window.location.pathname = "/";
            // throw new Error(error.response?.data?.message || "Fetch data failed");
        }
    };
    const mePatient = async () => {
        try {
            const data = await authService.me();

            const { role = "patient", ...user } = data;
            dispatch(
                loginSlice({
                    isAuthenticated: true,
                    userRole: role, // e.g., 'admin', 'user', 'guest'
                    userData: user,
                })
            );

            // setTokens(access_token, refresh_token); // Store tokens in local storage or cookies
            // setIsAuthenticated(true);
        } catch (error) {
            console.log("@@@@--------");
            dispatch(logoutSlice({}));
            // localStorage.clear("userData");
            // localStorage.clear("accessToken");
            // navigate("/login");
            // window.location.pathname = "/";
            // throw new Error(error.response?.data?.message || "Fetch data failed");
        }
    };

    return { mePrestateur, mePatient };
};

export const useChangeInfo = (defaultValues) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: defaultValues,
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        setError("");
        setLoading(true);
        authService
            .login(data)
            .then((res) => {
                setMessage(res.data.message);
                navigate("/home");
                setLoading(false);
            })
            .catch((err) => {
                setMessage(err.response.data.message);
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        setValue,
        watch,
        error,
    };
};

export const useResetPwd = (callback = () => {}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm();

    const onSubmit = (data) => {
        setError("");
        setMessage("");
        setLoading(true);
        authService
            .resetPwd(data)
            .then((res) => {
                console.log("###", res.data.message);
                setMessage(res.data.message);
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log("###", err);
                setError(err.response.data.message);
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        loading,
        message,
        error,
    };
};

// New password reset flow hooks
export const useCheckEmail = (callback = () => {}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm();

    const onSubmit = (data) => {
        setError("");
        setMessage("");
        setLoading(true);
        authService
            .checkEmail(data)
            .then((res) => {
                console.log("###", res.data.message);
                setMessage(res.data.message);
                setLoading(false);
                callback(data.email);
            })
            .catch((err) => {
                console.log("###", err);
                setError(err.response?.data?.message || "An error occurred");
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        loading,
        message,
        error,
    };
};

export const useConfirmEmailCode = (email, callback = () => {}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm({
            defaultValues: {
                code: "",
            },
        });

    const onSubmit = (data) => {
        setError("");
        setMessage("");
        setLoading(true);
        authService
            .confirmEmailCode({ ...data, email })
            .then((res) => {
                console.log("###", res.data.message);
                setMessage(res.data.message);
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log("###", err);
                setError(err.response?.data?.message || "An error occurred");
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        loading,
        message,
        error,
    };
};

export const useUpdateResetPwd = (email, callback = () => {}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm({
            defaultValues: {
                password: "",
                confirmPassword: "",
            },
        });

    const onSubmit = (data) => {
        setError("");
        setMessage("");
        setLoading(true);
        
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        authService
            .updateResetPwd({ email, password: data.password })
            .then((res) => {
                console.log("###", res.data.message);
                setMessage(res.data.message);
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log("###", err);
                setError(err.response?.data?.message || "An error occurred");
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        loading,
        message,
        error,
    };
};

export const useConfrimEmail = (email, callback = () => {}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm({
            defaultValues: {
                pin_1: "",
                pin_2: "",
                pin_3: "",
                pin_4: "",
            },
        });

    const onSubmit = (data) => {
        setError("");
        setMessage("");
        setLoading(true);
        authService
            .confirmEmail({ ...data, email })
            .then((res) => {
                console.log("###", res.data.message);
                setMessage(res.data.message);
                setLoading(false);
                callback();
            })
            .catch((err) => {
                console.log("###", err);
                setError(err.response.data.message);
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        loading,
        message,
        error,
    };
};

export const useAuth = (
    callback,
    isMedecin = false,
    callbackLogin = () => {}
) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm({ email: "derndjilali38@gmail.com", password: "dern3822" });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        setError("");
        setLoading(true);
        // callback(data)
        callback(
            data
            // isMedecin
            // ? {
            //   username: "mohamed2024",
            //   password: "123456789",
            //   email: "derndjilali38@gmail.com",
            //   password: "dern3822",
            //   }
            // : // : {
            //       email: "djder19@gmail.com",
            //       password: "dern3822",
            //   }
            //   data
        )
            .then((res) => {
                localStorage.setItem("accessToken", res.data.token);
                localStorage.setItem("userData", JSON.stringify(res.data.info));
                setMessage(res.data.message);

                if (isMedecin) {
                    navigate("/prestateur/rdvs");
                } else navigate("/home");
                setLoading(false);
            })
            .catch((err) => {
                if (err?.response?.data?.message === "not active") {
                    callbackLogin();
                }
                setError(err?.response?.data?.message);
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        error,
        watch,
    };
};

export const useRegister = (callback = () => {}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm({
            defaultValues: {
                // fullName: "mohamed ben",
                // birthday: "11-11-2023",
                // sexe: "male",
                // phone: "123456789",
                // password: "123456",
                // birthday: "11/11/1999",
                // codePostal: 16012,
                // SSNum: "HDH$&JVRW9",
                // email: "ben@mail.com",
            },
        });

    const onSubmit = (data) => {
        setError("");
        setLoading(true);
        authService
            .register(data)
            .then((res) => {
                if (res.status === 400) {
                    console.log("#####", res);
                    setError(res.message);
                } else {
                    // sessionStorage.setItem("localStorage.getItem("accessToken")", res.access_token);
                    // sessionStorage.setItem("userData", JSON.stringify(res.data));
                    // setMessage(res.message);
                    // navigate("/home");
                    // reset();
                    callback();
                }
                setLoading(false);
            })
            .catch((err) => {
                // console.log("#####", err);
                setError(err?.response?.data?.message);
                // setMessage(err.message);
                setLoading(false);
            });
    };

    return {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        error,
        watch,
    };
};
