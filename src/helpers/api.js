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

export const requestSignUp = (data) =>
  api.post("/auth/signUp", data, {
    headers: { "Content-type": "multipart/form-data" },
  });

export const getProfile = (q) => {
  console.log(q);
  return api.get(`/user/profile?q=${q}`);
};

export const addComment = (postId, comment) =>
  api.post("/social", { postId, comment });

export const toggleNotificationStatus = (id, status) =>
  api.get(`/social/notification?n=${id}&status=${status}`);

export const reactPost = (postId) => api.get(`/post/react?post=${postId}`);

export const createPost = (data) =>
  api.post("/post/", data, {
    headers: { "Content-type": "multipart/form-data" },
  });
export const requestLogin = (email, password) =>
  api.post("/auth/login", { email, password });

export const requestTokenRefresh = () => api.post("/auth/refreshToken");

export const getPosts = (page = 1) => api.get("/post");

export const getPost = (id) => api.get(`/post/single?id=${id}`);

// For messenger
export const getConversations = (page) => api.get(`/messenger/?p=${page}`);

export const getConversationById = (conversationId) =>
  api.post(`/messenger/id`, {
    id: conversationId,
  });

export const searchUsers = (q) => api.get(`/user/search?q=${q}`);

export const getConversationByMemberId = (memberId) =>
  api.get(`/messenger/${memberId}`);

export const seenConversation = (conversationId, seen) => {
  api.post("/messenger/conversation", {
    id: conversationId,
    seen: seen,
  });
};

export const getMessages = () => api.get("/messenger");
