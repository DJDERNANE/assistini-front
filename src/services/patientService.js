/** @format */

import axios from "axios";
import Converter from "../helpers/Converter";

const url = process.env.REACT_APP_URL_API;

const get = (id) => {
    return axios
        .get(`${url}/mypatient/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then((response) => response.data.data)
        .catch((error) => error);
};

const getDoc = () => {
    return axios
        .get(`${url}/users/files`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then((response) => response.data.data)
        .catch((error) => error);
};

const getAll = () => {
    return axios.get(`${url}/mypatient`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const deletePatient = (id) => {
    return axios.delete(`${url}/mypatient/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const create = (payload) => {
    return axios.post(
        `${url}/mypatient`,
        { ...payload },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const uploadDocs = (payload) => {
    return axios.post(
        `${url}/users/uploadDocs`,
        { ...payload },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

export default {
    get,
    getDoc,
    getAll,
    create,
    deletePatient,
    uploadDocs,
};
