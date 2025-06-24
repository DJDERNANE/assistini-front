import axios from "axios";

const url = process.env.REACT_APP_URL_API;

const loginProvider = (payload) => {
  return axios.post(`${url}/providers/login`, payload);
};

const login = (payload) => {
  return axios.post(`${url}/users/login`, payload);
};

const confirmEmail = (payload) => {
  const { email, ...data } = payload;
  const code = `${data.pin_1}${data.pin_2}${data.pin_3}${data.pin_4}`;
  return axios.post(`${url}/users/confirmOtpCode`, { email, code });
};

const me = async () => {
  const response = await axios.get(`${url}/users/me`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("failed");
  }
};

const providerMe = () => {
  return axios.get(`${url}/providers/me`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  });
};

const register = (payload) => {
  return axios.post(`${url}/users/register`, payload);
};

const resetPwd = (payload) => {
  return axios.post(`${url}/users/ResetPassword`, payload);
};

// New password reset flow endpoints
const checkEmail = (payload) => {
  return axios.post(`${url}/users/checkEmail`, payload);
};

const confirmEmailCode = (payload) => {
  return axios.post(`${url}/users/confrimEmail`, payload);
};

const updateResetPwd = (payload) => {
  return axios.post(`${url}/users/ResetPassword`, payload);
};

export default {
  loginProvider,
  login,
  register,
  me,
  providerMe,
  confirmEmail,
  resetPwd,
  checkEmail,
  confirmEmailCode,
  updateResetPwd,
};
