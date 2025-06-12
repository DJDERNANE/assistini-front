/** @format */

import axios from "axios";
import Converter from "../helpers/Converter";

const url = process.env.REACT_APP_URL_API;

const get = (id) => {
    return axios
        .get(`${url}/providers/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then((response) => response.data.data)
        .catch((error) => error);
};

const getAll = () => {
    return axios.get(`${url}/providers`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllFavorite = () => {
    return axios.get(`${url}/users/fav`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllByFilter = (payload) => {
    const filters = Converter.filterParams(payload);
    return axios.get(`${url}/providers?${filters}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllSubAdmin = () => {
    return axios.get(`${url}/subadmin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllSpecialites = (id) => {
    return axios.get(`${url}/providers/specialties/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllSpecialitesWithoutId = () => {
    return axios.get(`${url}/providers/specialties`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getServicesById = (id) => {
    return axios.get(`${url}/services/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllServices = () => {
    return axios.get(`${url}/services`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllPartners = (id) => {
    return axios.get(`${url}/users/partners/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getAllDispo = () => {
    return axios.get(`${url}/dispo`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getProviderDetail = () => {
    return axios.get(`${url}/providers/info`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const showProviderDetail = (id) => {
    return axios.get(`${url}/providers/provider/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const deleteService = (id) => {
    return axios.delete(`${url}/services/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const createService = (payload) => {
    return axios.post(
        `${url}/services`,
        { ...payload },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const createSubAdmin = (payload) => {
    return axios.post(
        `${url}/subadmin`,
        { ...payload },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const deleteSubAdmin = (id) => {
    return axios.delete(`${url}/subadmin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const sendNote = (payload) => {
    return axios.post(
        `${url}/note`,
        { ...payload },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const toggleFavorite = (payload) => {
    return axios.post(
        `${url}/users/togglefav`,
        { ...payload },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const deleteLogo = () => {
    return axios.put(
        `${url}/providers/deleteLogo`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
};

const update = (payload) => {
    return axios.put(`${url}/providers/provider`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const updateEmail = (payload) => {
    return axios.post(`${url}/providers/changeemail`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const updateDispo = (payload) => {
    // return axios.post(`${url}/dispo/update`, payload, {
    return axios.post(`${url}/dispo`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

const getStats = () => {
    return axios.get(`${url}/dashboard`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

export default {
    getStats,
    get,
    getAll,
    getAllDispo,
    getAllFavorite,
    getAllSpecialites,
    getAllPartners,
    getServicesById,
    getAllByFilter,
    getAllSubAdmin,
    createSubAdmin,
    sendNote,
    toggleFavorite,
    update,
    updateEmail,
    updateDispo,
    getAllServices,
    deleteService,
    createService,
    deleteLogo,
    deleteSubAdmin,
    getProviderDetail,
    getAllSpecialitesWithoutId,
    showProviderDetail,
};
