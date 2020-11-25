import { useEffect } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";

import { Avatar, Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  item: {
    position: "relative",
    borderRadius: theme.spacing(1),
    width: "100%",
  },

  content: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5, 2, 2.5),

    cursor: "pointer",

    "&:hover": {
      background: grey[50],
    },
  },

  unseen: {
    background: grey[50],
  },

  seen: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    position: "absolute",

    right: theme.spacing(1),
    bottom: theme.spacing(1),
    background: blue[100],
    borderRadius: "50%",
  },

  avatar: {
    marginRight: theme.spacing(1),
  },
}));

function Notification({ item: { _id, path, author, status, action }, toggle }) {
  const history = useHistory();
  const classes = useStyles();

  const handleItemClick = (e) => {
    toggle(_id, true);
    if (path) history.push(`/post/${path}`);
    else history.push(`/profile/${author.nickName || author._id}`);
  };

  useEffect(() => console.log(status), [status]);

  return (
    <Box className={classes.item}>
      <Box
        onClick={handleItemClick}
        className={clsx([classes.content, !status && classes.unseen])}
      >
        <Avatar
          alt="user avartar"
          src={author.avatar.url}
          className={classes.avatar}
        />
        <Typography variant="body1" component="p">
          <b>{author.nickName || author.fullname}</b>
          &nbsp;
          {action}
        </Typography>
      </Box>
      <div className={classes.seen} onClick={(e) => toggle(_id)}></div>
    </Box>
  );
}

export default Notification;
