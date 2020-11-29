import { useContext, useState } from "react";

import { ChatPane, Sider } from "../components/";

import { Box } from "@material-ui/core";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Menu from "../assets/logo.svg";

import { Socket, Context } from "../contexts";

function Messenger(props) {
  const { conversations, current, setCurrent } = useContext(Context);
  const { online, getConversation, sendMessage } = useContext(Socket);

  const [isShow, setShow] = useState(false);

  const handleAvatarClick = async (_id) => {
    if (!_id) return;
    const conversation = await getConversation(_id);
    if (conversation) setCurrent(conversation);
  };

  return (
    <Box css={{ height: "calc(100vh - 16px)", overflow: "hidden" }}>
      <img
        src={Menu}
        alt="menu"
        onClick={() => setShow((isShow) => !isShow)}
        css={{
          position: "fixed",
          top: "1.5rem",
          right: "1rem",
          cursor: "pointer",
          display: "none !important",
          width: "3rem",

          "@media screen and (max-width: 1024px)": {
            display: "block !important",
            zIndex: "5",
          },
        }}
      ></img>
      <Box display="flex" css={{ height: "100%" }}>
        <Sider
          online={online}
          conversations={conversations}
          setCurrent={setCurrent}
          handleAvatarClick={handleAvatarClick}
          isShow={isShow}
        />

        {current && (
          <ChatPane conversation={current} sendMessage={sendMessage} />
        )}
      </Box>
    </Box>
  );
}

export default Messenger;
