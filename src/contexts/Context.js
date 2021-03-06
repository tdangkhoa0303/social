import React, { useState, useEffect, useContext } from "react";
import { getCookie, setCookie } from "../helpers/cookieHelper";
import * as api from "../helpers/api";

import { v4 } from "uuid";
import { arrayToMap } from "../helpers/data.util";

const Context = React.createContext();

export function Provider(props) {
  const [auth, setAuth] = useState({ isAuth: null, user: null });
  const [notifications, setNotifications] = useState({});
  const [posts, setPosts] = useState({ fetching: false, data: {} });
  const [conversations, setConversations] = useState({});
  const [current, setCurrent] = useState();

  useEffect(() => {
    const isLogin = getCookie("auth");
    if (isLogin) {
      refreshToken();
    } else setAuth({ isAuth: false, user: null });
  }, []);

  useEffect(() => {
    if (!current)
      setCurrent(
        Object.values(conversations).find((conversation) => conversation.seen)
      );
  }, [conversations]);

  const __setUser = (data) => {
    const {
      user,
      refreshTTL,
      notifications: fetchedNotidications,
      conversations,
    } = data;
    api.setToken(user.token);
    setCookie("auth", v4(), refreshTTL);
    setAuth({
      isAuth: true,
      user,
    });
    setConversations(arrayToMap(conversations));
    setNotifications(arrayToMap(fetchedNotidications));
  };

  const signIn = async (email, password) => {
    try {
      const { data } = await api.requestLogin(email, password);
      if (data.status === "success") {
        __setUser(data.data);
      }
      return data;
    } catch (err) {
      setAuth({ isAuth: false, user: null });
      console.log(err);
      return err;
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
    form.append("id", v4());
    for (let i = 0; i < images.length; i++) form.append("images", images[i]);

    try {
      const { data } = await api.createPost(form);
      if (data.status === "success") {
        const post = data.data.post;
        console.log(post);
        setPosts((posts) => ({
          ...posts,
          data: {
            ...posts.data,
            [post._id]: post,
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
        const notification = notifications[id];

        if (!notification) return notifications;

        return {
          ...notifications,
          [id]: {
            ...notification,
            status: status !== undefined ? status : !notification.status,
          },
        };
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
        conversations,
        setConversations,
        current,
        setCurrent,
        setNotifications,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
