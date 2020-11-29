import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "../helpers/cookieHelper";
import * as api from "../helpers/api";

import { v4 } from "uuid";
import { arrayToMap } from "../helpers/data.util";

const Context = React.createContext();

export function Provider(props) {
  const [auth, setAuth] = useState({ isAuth: null, user: null });
  const [notifications, setNotifications] = useState([]);
  const [posts, setPosts] = useState({ fetching: false, data: {} });

  useEffect(() => {
    const isLogin = getCookie("auth");
    if (isLogin) {
      refreshToken();
    } else setAuth({ isAuth: false, user: null });
  }, []);

  const __setUser = (data) => {
    const { user, refreshTTL, notifications: fetchedNotidications } = data;
    api.setToken(user.token);
    setCookie("auth", v4(), refreshTTL);
    setAuth({
      isAuth: true,
      user,
    });

    setNotifications(fetchedNotidications);
  };

  const signIn = async (email, password) => {
    try {
      const {
        data: { data },
      } = await api.requestLogin(email, password);
      if (data) __setUser(data);
    } catch (err) {
      console.log(err);
      setAuth({ isAuth: false, user: null });
    }
  };

  const refreshToken = async () => {
    try {
      const {
        data: { data },
      } = await api.requestTokenRefresh();
      if (data) __setUser(data);
    } catch (err) {
      setAuth({ isAuth: false, user: null });
    }
  };

  const getPosts = async (page) => {
    try {
      setPosts((posts) => ({ ...posts, fetching: true }));
      const {
        data: { data },
      } = await api.getPosts(page);
      setPosts((posts) => ({
        fetching: false,
        data: {
          ...posts.data,
          ...arrayToMap(data.posts),
        },
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setPosts((posts) => ({ ...posts, fetching: false }));
    }
  };

  const createPost = async (caption, images) => {
    let form = new FormData();
    form.append("caption", caption);
    for (let i = 0; i < images.length; i++) form.append("images", images[i]);

    try {
      const { data } = await api.createPost(form);
      if (data.status === "success") {
        const post = data.data.post;
        setPosts((posts) => ({
          ...posts,
          data: {
            ...posts.data,
            [post.id]: post,
          },
        }));
        return post;
      }
    } catch (err) {
      return null;
    }
  };

  const reactPost = async (postId) => {
    try {
      setPosts((posts) => {
        let post = posts.data[postId];

        if (!post.likes.includes(auth.user._id)) {
          post.likes.push(auth.user._id);
        } else {
          post.likes = Array.from(new Set(post.likes).delete(auth.user._id));
        }
        return {
          ...posts,
          data: {
            ...posts.data,
            [postId]: post,
          },
        };
      });
      await api.reactPost(postId);
    } catch (err) {
      console.log(err);
    }
  };

  const getSinglePost = async (postId) => {
    const { data } = await api.getPost(postId);
    if (data.status === "success") {
      const post = data.data.post;

      setPosts((posts) => ({
        ...posts,
        data: {
          ...posts.data,
          [post._id]: post,
        },
      }));
      return post;
    }

    return null;
  };

  const addComment = (postId, content) => {
    try {
      const comment = {
        id: v4(),
        author: auth.user._id,
        content: content,
        createdAt: new Date().toISOString,
      };

      setPosts((posts) => {
        let post = posts.data[postId];

        post.comments.push(comment);

        return {
          ...posts,
          data: {
            ...posts.data,
            [postId]: post,
          },
        };
      });

      api.addComment(postId, comment);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleNotification = async (id, status) => {
    try {
      setNotifications((notifications) => {
        const index = notifications.findIndex((e) => e._id === id);

        if (index < 0) return notifications;

        let notification = notifications[index];
        return [
          ...notifications.slice(0, index),
          {
            ...notification,
            status: status !== undefined ? status : !notification.status,
          },
          ...notifications.slice(index + 1),
        ];
      });
      await api.toggleNotificationStatus(id, status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Context.Provider
      value={{
        auth,
        signIn,
        refreshToken,
        notifications,
        getPosts,
        addComment,
        createPost,
        reactPost,
        toggleNotification,
        posts,
        getSinglePost,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
