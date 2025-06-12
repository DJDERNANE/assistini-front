import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

const get = (id) => {
  return axios
    .get(`${url}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response.data.data)
    .catch((error) => error);
};

const getAll = () => {
  return axios
    .get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response.data.data)
    .catch((error) => error);
};

const store = (payload) => {
  return axios
    .post(`${url}/users`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
};

const toggle = (id) => {
  return axios
    .patch(`${url}/users/${id}/toggle-status`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
};

const update = (id, payload) => {
  return axios
    .patch(`${url}/users/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
};

const remove = (id) => {
  return axios
    .delete(`${url}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
};

export default {
  get,
  getAll,
  store,
  toggle,
  update,
  remove,
};
