/** @format */

import providerService from "../services/providerService";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { providerActions } from "../store/provider/provider-slice";
import { useDispatch, useSelector } from "react-redux";
import patientService from "../services/patientService";
import { useNavigate } from "react-router";
import msgService from "../services/msgService";

export const useGetAllMsg = (isPatient = false) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchData = (filter) => {
        setIsLoading(true);
        msgService
            .getAll(isPatient, filter)
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

export const useGetDetailMsg = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const fetchData = (id) => {
        setIsLoading(true);
        msgService
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

export const useCreateMsg = (callback = () => {}, isPatient = false) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue } = useForm();

    const onSubmit = (data) => {
        setMessage("");
        setError("");
        setLoading(true);
        msgService
            .create(data, isPatient)
            .then((res) => {
                setMessage("message sended successful");
                setLoading(false);
                reset();
                setValue("message", "");
                callback();
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

// export const useDeleteMsg = () => {
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const [loading, setLoading] = useState(false);
//   const { register, handleSubmit, reset, watch, setValue } = useForm();

//   const onSubmit = (id) => {
//     setMessage("");
//     setError("");
//     setLoading(true);
//     patientService
//       .deleteMsg(id)
//       .then((res) => {
//         setMessage("creation service successful");
//         setLoading(false);
//         reset();
//       })
//       .catch((err) => {
//         console.log(err);
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   return {
//     register,
//     handleSubmit,
//     loading,
//     onSubmit,
//     reset,
//     message,
//     error,
//     setMessage,
//     setValue,
//     watch,
//   };
// };
