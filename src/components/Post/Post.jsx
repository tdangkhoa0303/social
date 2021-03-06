import { useContext, useState, useRef } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Avatar,
  InputBase,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
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
    padding: theme.spacing(1),
    flex: 1,
  },

  card: {
    boxShadow: "0px 4px 14px rgba(50,50,50,0.1)",
  },

  content: {
    paddingBottom: 0,
  },

  comments: {
    display: "none",

    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  action: {
    display: "none",
    alignItems: "center",
    width: "100%",

    [theme.breakpoints.up("md")]: {
      display: "flex",
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

  dkOnly: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  mbOnly: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Post({
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
  const commentRef = useRef(null);

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

  const renderComments = (comments) => {
    let res = [];
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (i === 3) {
        res.push(
          <Box mt={1} key="readmore">
            <Link to={`/post/${_id}`} key={comment._id || comment.id}>
              <Typography variant="body1">
                {`View all ${comments.length} ${
                  comments.length > 1 ? "comments" : "comment"
                }`}
              </Typography>
            </Link>
          </Box>
        );

        break;
      }

      res.push(
        <Comment
          key={comment._id || comment.id}
          author={
            (user && user._id === comment.author._id) ||
            user._id === comment.author
              ? "You"
              : comment.author.nickName
          }
          content={comment.content}
        />
      );
    }
    return res;
  };

  const handleInputComment = (event) => setComment(event.target.value);
  const handleCommentClick = (event) => commentRef && commentRef.focus();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Link to={`/profile/${author.nickName || author._id}`}>
            <Avatar
              aria-label="user avatar"
              src={author.avatar && author.avatar.url}
            />
          </Link>
        }
        title={
          <Typography
            component={Link}
            to={`/profile/${author.nickName || author._id}`}
          >
            <b>{author.nickName}</b>
          </Typography>
        }
        subheader={`${moment(createdAt).toNow(true)} ago`}
        action={
          <IconButton
            aria-label="settings"
            aria-haspopup="true"
            onClick={handleOpen}
          >
            <MoreVert />
          </IconButton>
        }
      />
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
      <Carousel images={images} />

      <CardContent className={classes.content}>
        <Box css={{ color: "rgba(0, 0, 0, 0.8)" }}>
          <IconButton
            color="inherit"
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
          <IconButton
            color="inherit"
            onClick={handleCommentClick}
            className={classes.dkOnly}
          >
            <Forum />
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to={`/post/${_id}`}
            className={classes.mbOnly}
          >
            <Forum />
          </IconButton>
          <IconButton color="inherit">
            <Send />
          </IconButton>
        </Box>
        {likes.length > 0 && (
          <Typography variant="body2">
            {`${likes.length} ${likes.length > 1 ? "likes" : "like"}`}
          </Typography>
        )}
        <Comment author={author.nickName} content={caption} />

        <Box className={classes.comments}>{renderComments(comments)}</Box>
        {comments.length > 0 && (
          <Link to={`/post/${_id}`} className={classes.mbOnly}>
            <Typography variant="body1">
              {`View all ${comments.length} ${
                comments.length > 1 ? "comments" : "comment"
              }`}
            </Typography>
          </Link>
        )}
      </CardContent>
      <CardActions>
        <Box className={classes.action} display="flex">
          <InputBase
            ref={commentRef}
            placeholder="Add comment..."
            className={classes.input}
            value={comment}
            onChange={handleInputComment}
          />
          <Button color="primary" onClick={handleAddComment}>
            Post
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default Post;
