import { useState, Fragment, useEffect } from "react";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundColor: "wheat",
    width: "100%",
    paddingTop: "100%",
  },

  controller: {
    position: "absolute",
    border: "none",
    color: "#ffffff",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    textAlign: "center",
    width: "2rem",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    top: "50%",
    transform: "translateY(-50%)",
    outline: "none",
    left: "1rem",
    zIndex: 5,

    "&:disabled": {
      display: "none",
    },
  },

  right: {
    left: "initial",
    right: "1rem",
  },

  pagiation: {
    color: "#ffffff",
    position: "absolute",
    transform: "translateX(-50%)",
    left: "50%",
    bottom: "0",
  },

  imageContainer: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },

  image: {
    height: "100%",
  },

  swipeableView: {
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",

    "& > div": {
      height: "inherit",
    },
  },
}));

function Carousel({ images = [] }) {
  useEffect(() => setActive(0), [images]);

  const [active, setActive] = useState(0);

  const classes = useStyles();

  const handleUp = () =>
    setActive((prev) => (prev + 1 === images.length ? 0 : prev + 1));

  const handleDown = () =>
    setActive((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));

  return (
    <Box className={classes.root}>
      <SwipeableViews
        enableMouseEvents
        index={active}
        className={classes.swipeableView}
      >
        {images.map((image, i) => (
          <figure key={i} className={classes.imageContainer}>
            <img
              src={image.src}
              alt={image.alt || "image in carousel"}
              className={classes.image}
            />
          </figure>
        ))}
      </SwipeableViews>
      {images.length > 1 && (
        <Fragment>
          <button
            className={classes.controller}
            size="small"
            onClick={handleDown}
            disabled={active === 0}
          >
            <KeyboardArrowLeft />
          </button>
          <button
            className={clsx(classes.controller, classes.right)}
            size="small"
            onClick={handleUp}
            disabled={active === images.length - 1}
          >
            <KeyboardArrowRight />
          </button>
          <Typography paragraph className={classes.pagiation}>{`${
            active + 1
          } / ${images.length}`}</Typography>
        </Fragment>
      )}
    </Box>
  );
}

export default Carousel;
