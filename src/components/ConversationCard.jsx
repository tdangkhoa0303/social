import { useContext } from "react";
import { Context, Socket } from "../contexts";
import { getMember } from "../helpers/messenger.helper";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { Typography, Box, Avatar } from "@material-ui/core";
const Card = ({ conversation }) => {
  const {
    auth: { user },
    setCurrent,
    current,
  } = useContext(Context);

  const { toggleConversationStatus } = useContext(Socket);

  const { members, name, messages, _id, seen } = conversation;

  const member = getMember(members, user);

  const conversationName = name || member.fullName;

  const lastMessage = messages[messages.length - 1];

  const handleConversationClick = () => {
    if (!seen) toggleConversationStatus(_id, true);
    setCurrent(conversation);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      css={{
        cursor: "pointer",
        backgroundColor: current && current._id === _id ? "#f9f9f9" : "#ffffff",
        borderRadius: "1rem",
        boxSizing: "border-box",
        padding: "0.5rem 1rem",
      }}
      onClick={handleConversationClick}
    >
      <Avatar
        src={member.avatar.url}
        css={{
          height: "3.5rem !important",
          width: "3.5rem !important",
          marginRight: "1rem",
        }}
      />
      <Box
        css={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="subtitle1"
          css={{
            fontWeight: seen ? "500" : "600",
            marginBottom: "4px",
          }}
        >
          {conversationName}
        </Typography>

        {lastMessage && (
          <Typography
            variant="body2"
            css={{
              fontWeight: seen ? "400" : "500",
              lineHeight: "",
              maxHeight: "2.25rem",
              height: "2.25rem",
            }}
          >
            {`${lastMessage.from === user._id ? "You" : member.fullName}: ${
              lastMessage.content
            }`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Card;
