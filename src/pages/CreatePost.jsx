import { useState } from "react";
import {
  Container,
  Grid,
  TextareaAutosize,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Photo } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},

  preview: {
    display: "flex",
  },

  caption: {
    width: "100%",
    border: "none",
    outline: "none",
    fontFamily: "Roboto, san-serif",
    fontSize: "1rem",
  },

  imageWrapper: {
    width: "8rem",
    height: "8rem",
    margin: "1rem 1rem 1rem 0",
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  image: { width: "100%" },

  action: {
    display: "flex",
    alignItems: "center",
  },
}));

function CreatePost() {
  const [images, setImages] = useState([]);

  const classes = useStyles();

  const handleImagesChange = (event) =>
    setImages(
      Array.from(event.target.files).map((image) => ({
        src: URL.createObjectURL(image),
      }))
    );

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextareaAutosize
                aria-label="Share your thinking...."
                rowsMin={2}
                placeholder="Are you ok?"
                className={classes.caption}
              />
              <Box className={classes.preview}>
                {images.map((e, i) => (
                  <figure className={classes.imageWrapper}>
                    <img
                      src={e.src}
                      alt="img-preview"
                      className={classes.image}
                    />
                  </figure>
                ))}
              </Box>
            </CardContent>

            <CardActions className={classes.action}>
              <Button size="small" color="primary">
                Share
              </Button>
              <Box>
                <label htmlFor="images">
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
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreatePost;
