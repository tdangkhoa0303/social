/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, Avatar, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  message: {
    width: "fit-content",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(2),
    color: "#333333",
    backgroundColor: "#eeeeee",
    margin: "2px 0",
  },

  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const Messages = ({ messages, member }) => {
  const isMine = messages[0].from !== member._id;
  const classes = useStyles();

  return (
    <Box
      display="flex"
      css={{
        width: "100%",
        justifyContent: isMine ? "flex-end" : "flex-start",
        alignItems: "flex-end",
        marginBottom: "0.5rem",
        padding: "1rem 0",
      }}
    >
      {!isMine && <Avatar src={member.avatar.url} className={classes.avatar} />}
      <Box
        display="flex"
        css={{
          flexDirection: "column",
          alignItems: isMine ? "flex-end" : "flex-start",
          ...(isMine
            ? {
                "& > div": {
                  color: "#ffffff",
                  backgroundColor: "#efbbcf",
                },
              }
            : {}),
        }}
      >
        {messages.map((message) => (
          <Typography
            variant="body1"
            className={classes.message}
            key={message._id || message.id}
          >
            {message.content}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Messages;
