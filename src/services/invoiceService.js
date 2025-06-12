import axios from "axios";
import Converter from "../helpers/Converter";

const url = process.env.REACT_APP_URL_API;

const getAllInvoice = (type = "") => {
  return axios.get(`${url}/invoice${type && "?payment_status=" + type}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

const getAllInvoiceFav = () => {
  return axios.get(`${url}/invoice/favs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

const getInvoice = (id) => {
  return axios.get(`${url}/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

const getReports = (id) => {
  return axios.get(`${url}/rapport/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

const toggleFavorite = (id) => {
  return axios.post(
    `${url}/invoice/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

const createInvoice = (payload) => {
  return axios.post(`${url}/invoice`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

const payInvoice = (id, payload) => {
  return axios.post(`${url}/invoice/pay/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export default {
  getInvoice,
  getAllInvoice,
  getReports,
  getAllInvoiceFav,
  toggleFavorite,
  createInvoice,
  payInvoice,
};
