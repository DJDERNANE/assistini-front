import axios from "axios";
import Converter from "../helpers/Converter";

const url = process.env.REACT_APP_URL_API;

const getAllNoteSend = (search = "") => {
  return axios.get(`${url}/note/team${search && `?search=${search}`}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

const getAllNoteReceived = () => {
  return axios.get(`${url}/note`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export default {
  getAllNoteSend,
  getAllNoteReceived,
};
