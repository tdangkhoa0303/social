import { useState } from "react";
import { Container, Grid, TextField, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddCircleOutline } from "@material-ui/icons";

import { Casourel } from "../components";

const useStyles = makeStyles((theme) => ({
  root: {},

  preview: {
    position: "relative",
    width: "fit-content",
  },

  uploader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontSize: "3rem",
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
      <Box className={classes.preview}>
        <Casourel images={images} />
        <label htmlFor="images" className={classes.uploader}>
          {!images.length && <AddCircleOutline fontSize="large" />}
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
    </Container>
  );
}

export default CreatePost;
