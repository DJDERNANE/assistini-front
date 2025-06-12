/** @format */

import axios from "axios";
import Converter from "../helpers/Converter";

const url = process.env.REACT_APP_URL_API;

const get = (id) => {
    return axios.get(`${url}/messages/con/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAll = (isPatient, filter) => {
    if (isPatient)
        return axios.get(`${url}/messages/user?search=${filter}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
    return axios.get(`${url}/messages/provider?search=${filter}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

// const deletePatient = (id) => {
//   return axios.delete(`${url}/mypatient/${id}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//   });
// };

const create = (payload, isPatient) => {
    if (isPatient)
        return axios.post(
            `${url}/messages/user?role=user`,
            { ...payload },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );
    return axios.post(
        `${url}/messages/user?role=provider`,
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
    getAll,
    create,
};
