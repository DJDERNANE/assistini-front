/** @format */

import axios from "axios";
import Converter from "../helpers/Converter";

const url = process.env.REACT_APP_URL_API;

const getAll = (status = "pending") => {
    return axios.get(`${url}/rdv/waitinglist?status=${status}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

export default {
    getAll,
};
