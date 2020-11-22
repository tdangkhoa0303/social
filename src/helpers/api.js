import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credential: "include",
  withCredentials: true,
});

export const setToken = (token) =>
  (api.defaults.headers.common["x-access-token"] = token);

export const requestSignUp = (data) => api.post("/auth/signUp", { data });

export const requestLogin = (email, password) =>
  api.post("/auth/login", { email, password });

export const requestTokenRefresh = () => api.post("/auth/refreshToken");
