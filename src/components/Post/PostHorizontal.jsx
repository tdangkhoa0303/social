import { useContext, useState } from "react";
import moment from "moment";

import { Link } from "../";
import {
  Typography,
  IconButton,
  Box,
  Avatar,
  InputBase,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Grid,
} from "@material-ui/core";
import {
  FavoriteOutlined,
  FavoriteBorder,
  MoreVert,
  Delete,
  Edit,
  Share,
  Send,
  Forum,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { Context } from "../../contexts";
import Carousel from "../Carousel";
import { Comment } from "../";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    flex: 1,
  },

  card: {
    boxShadow: "0px 4px 14px rgba(50,50,50,0.1)",
  },

  action: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },

  media: {
    padding: `0 !important`,
  },

  relative: {
    position: "relative",
  },

  content: {
    height: "100%",
  },

  comments: {
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(6),
    },
  },

  react: {
    "&:hover": {
      color: "#e53935",
    },
  },

  reacted: {
    color: "#e53935",
  },

  avatar: {
    marginRight: theme.spacing(2),
  },

  addComment: {
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: theme.spacing(1, 4),
      boxSizing: "border-box",
      boxShadow: "0px 4px 14px rgba(50,50,50,0.1)",
      background: "#ffffff",
    },
  },
}));

function Horizontal({
  data: { _id, author, createdAt, images, comments, likes = [], caption },
}) {
  const {
    auth: { user },
    reactPost,
    addComment,
  } = useContext(Context);

  const [comment, setComment] = useState("");

  const classes = useStyles();

  const [anchorEle, setAnchorEle] = useState(null);

  const handleClose = (event) => setAnchorEle(null);

  const handleOpen = (event) => setAnchorEle(event.currentTarget);

  const handleItemClick = (event, callback) => {
    callback && callback();
    handleClose();
  };

  const handleAddComment = (event) => {
    if (!comment.trim()) return;
    addComment(_id, comment);
    setComment("");
  };

  const handleReactPost = (event) => {
    reactPost(_id);
  };

  const handleInputComment = (event) => setComment(event.target.value);

  return (
    <Grid container spacing={6} className={classes.card}>
      <Grid item xs={12} md={6} xl={8} p={0} className={classes.media}>
        <Carousel images={images} />
      </Grid>
      <Grid item xs={12} md={6} xl={4} className={classes.relative}>
        <Box className={classes.action}>
          <Box>
            <IconButton
              edge="start"
              className={classes.react}
              onClick={handleReactPost}
            >
              {user && likes.includes(user._id) ? (
                <FavoriteOutlined className={classes.reacted} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
            <IconButton>
              <Forum />
            </IconButton>
            <IconButton>
              <Send />
            </IconButton>
            <IconButton
              aria-label="settings"
              aria-haspopup="true"
              onClick={handleOpen}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEle}
          open={Boolean(anchorEle)}
          keepMounted
          onClose={handleClose}
          className={classes.menu}
        >
          <MenuItem onClick={(event) => handleItemClick(event)}>
            <ListItemIcon>
              <Share fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Share</Typography>
          </MenuItem>
          {user && author._id === user._id && (
            <Box>
              <MenuItem onClick={(event) => handleItemClick(event)}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Edit</Typography>
              </MenuItem>
              <MenuItem onClick={(event) => handleItemClick(event)}>
                <ListItemIcon>
                  <Delete fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Delete</Typography>
              </MenuItem>
            </Box>
          )}
        </Menu>
        <Box display="flex" flexDirection="column" className={classes.content}>
          <Box display="flex" mb={2} alignItems="center">
            <Link to={`/profile/${author.nickName || author._id}`}>
              <Avatar
                aria-label="user avatar"
                src={author.avatar.url}
                className={classes.avatar}
              />
            </Link>
            <Box>
              <Typography>
                <Link to={`/profile/${author.nickName || author._id}`}>
                  <b>{author.nickName}</b>
                </Link>
              </Typography>
              <Typography variant="body2">
                {`${moment(createdAt).toNow(true)} ago`}
              </Typography>
            </Box>
          </Box>
          <Comment author={author.nickName} content={caption} />
          <Box className={classes.comments}>
            {comments.map((comment) => (
              <Comment
                key={comment.id || comment._id}
                author={
                  (user && user._id === comment.author._id) ||
                  user._id === comment.author
                    ? "You"
                    : comment.author.nickName
                }
                content={comment.content}
              />
            ))}
          </Box>
          <Box display="flex" className={classes.addComment}>
            <InputBase
              placeholder="Add comment..."
              className={classes.input}
              value={comment}
              onChange={handleInputComment}
            />
            <Button color="primary" onClick={handleAddComment}>
              Post
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Horizontal;
