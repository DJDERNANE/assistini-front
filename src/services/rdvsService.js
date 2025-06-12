/** @format */

import axios from "axios";
import Converter from "../helpers/Converter";

const url = process.env.REACT_APP_URL_API;

const get = (id) => {
    return axios
        .get(`${url}/rdv/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then((response) => response.data.data)
        .catch((error) => error);
};

const getAll = () => {
    return axios.get(`${url}/rdv/patient`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllPending = () => {
    return axios.get(`${url}/rdv/waitinglist?status=pending`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllWaitingList = () => {
    return axios.get(`${url}/rdv/waitinglist?page=&status=pending`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getTodayRdv = () => {
    return axios.get(`${url}/rdv/today`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const confirmRdv = (id) => {
    return axios.put(
        `${url}/rdv/confirm/${id}`,
        {
            note: "confirmed",
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const deletePatient = (id) => {
    return axios.delete(`${url}/rdv/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const deleteRdv = (id) => {
    return axios.delete(`${url}/rdv/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllRequests = () => {
    return axios.get(`${url}/rdv/accessfiles`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const requestAccessFile = (id) => {
    return axios.post(
        `${url}/rdv/accessfiles`,
        { rdvId: id },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const acceptAccessFile = (id) => {
    return axios.put(
        `${url}/rdv/accessfiles/accept/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const refuseAccessFile = (id) => {
    return axios.put(
        `${url}/rdv/accessfiles/refuse/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

export default {
    get,
    getAll,
    getAllPending,
    getTodayRdv,
    getAllWaitingList,
    getAllRequests,
    confirmRdv,
    acceptAccessFile,
    refuseAccessFile,
    requestAccessFile,
    deletePatient,
    deleteRdv,
};
