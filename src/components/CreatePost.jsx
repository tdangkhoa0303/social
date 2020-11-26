import { useEffect, useState, useContext } from "react";
import {
  TextareaAutosize,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Photo } from "@material-ui/icons";

import Context from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 4px 14px rgba(50, 50, 50, 0.1)",
  },

  preview: {
    display: "flex",
  },

  caption: {
    width: "100%",
    border: "none",
    outline: "none",
    fontFamily: "Roboto, san-serif",
    fontSize: "1rem",
    resize: "none",
  },

  uploader: {
    lineHeight: 0,
  },

  imageWrapper: {
    width: "fit-content",
    height: "8rem",
    margin: "1rem 1rem 1rem 0",
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  image: { height: "100%" },

  action: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

function CreatePost() {
  const { createPost } = useContext(Context);

  const [images, setImages] = useState();
  const [caption, setCaption] = useState();
  const [previews, setPreviews] = useState([]);

  const [feedback, setFeedback] = useState({
    status: "",
    message: "",
  });

  useEffect(
    () =>
      images &&
      setPreviews(
        Array.from(images).map((image) => ({
          src: URL.createObjectURL(image),
        }))
      ),
    [images]
  );

  const classes = useStyles();

  const handleImagesChange = (event) => setImages(event.target.files);

  const handleCaptionChange = (event) => {
    let text = event.target.value;
    setCaption(text);
  };

  const handleCreatePost = (event) => {
    const post = createPost(caption, images);
    if (!post) {
      setFeedback((feedback) => ({
        ...feedback,
        status: "error",
        message: "Something went wrong. Let's try again...",
      }));
      return;
    }

    setPreviews([]);
    setCaption("");
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {feedback.message && (
          <Alert severity={feedback.status}>{feedback.message}</Alert>
        )}
        <TextareaAutosize
          aria-label="Share your thinking...."
          rowsMin={2}
          rowsMax={5}
          placeholder="What are you thinking?"
          className={classes.caption}
          value={caption}
          onChange={handleCaptionChange}
        />
        <Box className={classes.preview}>
          {previews &&
            previews.map((preview, i) => (
              <figure className={classes.imageWrapper} key={i}>
                <img
                  src={preview.src}
                  alt="img-preview"
                  className={classes.image}
                />
              </figure>
            ))}
        </Box>
      </CardContent>

      <CardActions className={classes.action}>
        <IconButton>
          <label htmlFor="images" className={classes.uploader}>
            <Photo />
          </label>
          <input
            multiple
            type="file"
            onChange={handleImagesChange}
            id="images"
            name="images"
            hidden
          />
        </IconButton>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleCreatePost}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

export default CreatePost;
