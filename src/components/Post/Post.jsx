import { useContext, useState, Fragment } from "react";
import moment from "moment";

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
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import Context from "../../Context";
import Carousel from "../Carousel";
import { Comment } from "../";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(1),
    flex: 1,
  },
  content: {
    paddingBottom: 0,
  },

  react: {
    "&:hover": {
      color: "#e53935",
    },
  },

  reacted: {
    color: "#e53935",
  },
}));

function Post({
  data: { _id, author, createdAt, images, content, comments, likes = [] },
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
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="user avatar" src={author.avatar.url} />}
        title={
          <Typography>
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
          <IconButton edge="start">
            <Send />
          </IconButton>
        </Box>
        <Comment author="You" content="adsdsa" />
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
      </CardContent>
      <CardActions>
        <InputBase
          placeholder="Add comment..."
          className={classes.input}
          value={comment}
          onChange={handleInputComment}
        />
        <Button color="primary" onClick={handleAddComment}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
