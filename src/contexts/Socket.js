import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Context from "./Context";
import {
  getConversationByMemberId,
  getConversationById,
  getConversations,
  seenConversation,
} from "../helpers/api";

const SocketContext = createContext();

export const Socket = (props) => {
  const [online, setOnline] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [current, setCurrent] = useState();

  const {
    auth: { isAuth, user },
  } = useContext(Context);

  const conversationsRef = useRef(null);

  useEffect(() => {
    conversationsRef.current = conversations;

    !current &&
      setCurrent(conversations.find((conversation) => conversation.seen));
  }, [conversations]);

  useEffect(() => {
    let sk = null;
    if (isAuth) {
      const connect = async () => {
        sk = await io(`${process.env.REACT_APP_SOCKET_URL}/messenger`);

        sk.on("update", handleOnlineChange);

        sk.on("message", recieveMessage);

        sk.on("error", (error) => {
          console.log(error);
        });

        sk.emit("authenticate", { auth: user.token });
        const {
          data: {
            data: { conversations },
          },
        } = await getConversations();

        setSocket(sk);
        setConversations(conversations);
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

    let conversation = conversations.find(
      (conversation) =>
        conversation.members
          .map((member) => member._id)
          .sort()
          .join("") === tmp
    );

    if (conversation) return conversation;

    try {
      const {
        data: { data },
      } = await getConversationByMemberId(id);

      setConversations((conversations) => [
        ...conversations,
        data.conversation,
      ]);
      return data.conversation;
    } catch (err) {
      console.log(err);
    }
  };

  const toggleConversationStatus = async (conversationId, seen = true) => {
    const index = conversations.findIndex(
      (conversation) => conversation._id === conversationId
    );

    setConversations((conversations) => [
      ...conversations.slice(0, index),
      {
        ...conversations[index],
        seen,
      },
      ...conversations.slice(index + 1, conversations.length),
    ]);

    await seenConversation(conversationId, seen);
  };

  const handleOnlineChange = (users) => {
    setOnline(users);
  };

  const sendMessage = (conversationId, content) => {
    try {
      const message = {
        id: uuidv4(),
        from: user._id,
        content,
      };

      const index = conversations.findIndex((e) => e._id === conversationId);

      if (index < 0) return;
      let conversation = conversations[index];
      conversation.messages.push(message);
      conversation.updatedAt = new Date().toISOString();

      setConversations((conversations) => [
        ...conversations.slice(0, index),
        conversation,
        ...conversations.slice(index + 1, conversations.length),
      ]);

      socket.emit("message", { conversationId, message });
    } catch (err) {
      console.log(err);
    }
  };

  const recieveMessage = async ({ conversationId, message }) => {
    const conversations = conversationsRef.current;
    try {
      const index = conversations.findIndex((e) => {
        return e._id === conversationId;
      });

      if (index < 0) {
        const conversation = await getConversationById(conversationId);
        setConversations((conversations) => [...conversations, conversation]);
      } else {
        let conversation = conversations[index];
        conversation.messages.push(message);

        setConversations((conversations) => [
          ...conversations.slice(0, index),
          {
            ...conversation,
            updatedAt: new Date().toISOString(),
            seen: false,
          },
          ...conversations.slice(index + 1, conversations.length),
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        online,
        conversations,
        getConversation,
        sendMessage,
        toggleConversationStatus,
        current,
        setCurrent,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
