import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Context from "./Context";
import {
  getConversationByMemberId,
  getConversationById,
  seenConversation,
} from "../helpers/api";

const SocketContext = createContext();

export const Socket = (props) => {
  const [online, setOnline] = useState([]);
  const [socket, setSocket] = useState(null);

  const {
    auth: { isAuth, user },
    conversations,
    setConversations,
  } = useContext(Context);

  useEffect(() => {
    let sk = null;
    if (isAuth) {
      const connect = async () => {
        sk = await io(`${process.env.REACT_APP_SOCKET_URL}/messenger`, {
          transports: ["polling", "websocket"],
        });

        sk.on("update", handleOnlineChange);

        sk.on("message", recieveMessage);

        sk.on("error", (error) => {
          console.log(error);
        });

        sk.emit("authenticate", { auth: user.token });

        setSocket(sk);
      };
      connect();
    }
    if (sk)
      return () => {
        sk.off("update", handleOnlineChange);
        sk.off("message", recieveMessage);
      };
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
        data: { data: conversation },
      } = await getConversationByMemberId(id);

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

    await seenConversation(conversationId, seen);
  };

  const handleOnlineChange = (users) => {
    setOnline(users);
    console.log(users);
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

  const recieveMessage = ({ conversationId, message }) => {
    try {
      setConversations(async (conversations) => {
        let conversation = conversations[conversationId];

        if (!conversation) {
          const conversation = await getConversationById(conversationId);
          return {
            ...conversations,
            [conversationId]: conversation,
          };
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
