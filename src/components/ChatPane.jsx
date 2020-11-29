import { useContext, useState, Fragment, createRef, useEffect } from "react";
import { getMember } from "../helpers/messenger.helper";
import { Context } from "../contexts";

import { Avatar, Box, InputBase, Button, Typography } from "@material-ui/core";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Messages from "./Messages";
const ChatPane = ({ conversation, sendMessage }) => {
  const { members, messages } = conversation;

  const {
    auth: { user },
  } = useContext(Context);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  }, [messages.length]);

  const [message, setMessage] = useState("");

  const member = getMember(members, user);

  const conversationName = conversation.name || member.fullName;

  const lastMessageRef = createRef(null);

  const renderMessages = (messages) => {
    if (!messages.length) return [];

    let content = [],
      messageGroup = [messages[0]],
      i;
    for (i = 1; i < messages.length; i++) {
      if (messages[i].from !== messages[i - 1].from) {
        content.push(
          <Messages key={i} messages={messageGroup} member={member} />
        );
        messageGroup = [messages[i]];
      } else messageGroup.push(messages[i]);
    }

    if (messageGroup.length)
      content.push(
        <Messages key={i} messages={messageGroup} member={member} />
      );
    return content;
  };

  const handleOnSubmitMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(conversation._id, message);
    setMessage("");
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {conversation && (
        <Fragment>
          <Box
            display="flex"
            alignItems="center"
            css={{
              padding: "1.5rem 1rem 1rem",
              boxShadow: "0 4px 16px rgba(50, 50, 50, 0.1)",
            }}
          >
            <Avatar src={member.avatar.url} css={{ marginRight: "1rem" }} />
            <Typography variant="h6" css={{ fontWeight: "400" }}>
              {conversationName}
            </Typography>
          </Box>
          <Box
            css={{
              flexGrow: "2",
              overflowY: "scroll",
              padding: "1rem 1rem 0 1rem",

              "::-webkit-scrollbar": {
                display: "none",
              },

              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {renderMessages(messages)}
            <span ref={lastMessageRef}></span>
          </Box>

          <form
            css={{
              display: "flex",
              width: "100%",
              padding: "1rem 1rem 0",
              boxSizing: "border-box",
              boxShadow: "0 4px 16px rgba(50, 50, 50, 0.1)",
            }}
            onSubmit={handleOnSubmitMessage}
          >
            <InputBase
              type="text"
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Enter message..."
              css={{ flexGrow: 2 }}
            />
            <Button color="primary" type="submit">
              Send
            </Button>
          </form>
        </Fragment>
      )}
    </Box>
  );
};

export default ChatPane;
