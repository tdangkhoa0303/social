import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Context from "./Context";
import * as api from "../helpers/api";

const SocketContext = createContext();

export const Socket = (props) => {
  const [online, setOnline] = useState([]);
  const [socket, setSocket] = useState(null);

  const {
    auth: { isAuth, user },
    conversations,
    setNotifications,
    setConversations,
  } = useContext(Context);

  useEffect(() => {
    let sk = null;
    const connect = async () => {
      sk = await io(`${process.env.REACT_APP_SOCKET_URL}/messenger`);

      sk.on("update", handleOnlineChange);

      sk.on("message", recieveMessage);

      sk.on("notify", notify);

      sk.on("error", (error) => {
        console.log(error);
      });

      sk.emit("authenticate", { auth: user.token });

      setSocket(sk);
    };
    if (isAuth) {
      connect();
      return () => {
        // sk.removeAllListeners();
        sk.off("update", handleOnlineChange);
        sk.off("message", recieveMessage);
        sk.off("notify", notify);
      };
    }
  }, [isAuth]);

  const getConversation = async (id) => {
    const tmp = [user._id, id].sort().join("");

    let conversation = Object.values(conversations).find(
      (conversation) =>
        conversation.members
          .map((member) => member._id)
          .sort()
          .join("") === tmp
    );

    if (conversation) return conversation;

    try {
      const {
        data: {
          data: { conversation },
        },
      } = await api.getConversationByMemberId(id);
      console.log(conversation);
      setConversations((conversations) => ({
        ...conversations,
        [conversation._id]: conversation,
      }));
      return conversation;
    } catch (err) {
      console.log(err);
    }
  };

  const toggleConversationStatus = async (conversationId, seen = true) => {
    setConversations((conversations) => ({
      ...conversations,
      [conversationId]: {
        ...conversations[conversationId],
        seen,
      },
    }));

    await api.seenConversation(conversationId, seen);
  };

  const handleOnlineChange = (users) => {
    setOnline(users);
  };

  const notify = (notification) => {
    setNotifications((notifications) => ({
      ...notifications,
      [notification._id]: notification,
    }));
  };

  const sendMessage = (conversationId, content) => {
    try {
      const message = {
        id: uuidv4(),
        from: user._id,
        content,
      };

      setConversations((conversations) => {
        let conversation = conversations[conversationId];

        if (!conversation) return conversations;

        conversation.messages.push(message);
        conversation.updatedAt = new Date().toISOString();
        return {
          ...conversations,
          [conversationId]: conversation,
        };
      });

      socket.emit("message", { conversationId, message });
    } catch (err) {
      console.log(err);
    }
  };

  const getConversationById = async (id) => {
    const { data } = await api.getConversationById(id);
    if (data.status === "success") {
      return {
        ...conversations,
        [id]: data.data.conversation,
      };
    }
  };

  const recieveMessage = ({ conversationId, message }) => {
    try {
      setConversations((conversations) => {
        let conversation = conversations[conversationId];

        if (!conversation) {
          getConversationById(conversationId);
          return conversations;
        } else {
          conversation.messages.push(message);

          return {
            ...conversations,
            [conversationId]: {
              ...conversation,
              updatedAt: new Date().toISOString(),
              seen: false,
            },
          };
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        online,
        getConversation,
        sendMessage,
        toggleConversationStatus,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
