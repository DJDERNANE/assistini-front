/** @format */

import axios from "axios";

const url = process.env.REACT_APP_URL_API;

const login = (payload) => {
    return axios.post(`${url}/providers/login`, payload);
};

const loginSubAdmin = (payload) => {
    return axios.post(`${url}/subadmin/login`, payload);
};

const confirmEmail = (payload) => {
    const { email, ...data } = payload;
    const code = `${data.pin_1}${data.pin_2}${data.pin_3}${data.pin_4}`;
    return axios.post(`${url}/users/confirmOtpCode`, { email, code });
};

const me = async () => {
    const response = await axios.get(`${url}/providers/me`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    });

    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("failed");
    }
};

const register = (payload) => {
    return axios.post(`${url}/providers/register`, payload);
};

export default {
    login,
    loginSubAdmin,
    register,
    me,
    confirmEmail,
};
