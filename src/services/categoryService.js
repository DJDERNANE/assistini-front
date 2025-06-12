import axios from "axios";

const url = process.env.REACT_APP_URL_API;

const getAll = () => {
  return axios.get(`${url}/categories`);
};

const getSpecialites = (id) => {
  return axios.get(`${url}/specialties/specialtiesofcategory?catId=${id}`);
};

export default {
  getAll,
  getSpecialites,
};
