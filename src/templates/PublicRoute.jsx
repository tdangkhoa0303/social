import React, { Fragment, useContext } from "react";
import { PublicAppBar } from "../components/AppBar";

import { Context } from "../contexts";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "80px",
  },
}));

function PrivateRoute({ Component }) {
  const {
    auth: { isAuth },
  } = useContext(Context);

  const classes = useStyles();

  return (
    <Fragment>
      {isAuth !== null &&
        (isAuth ? (
          <Redirect to="/" />
        ) : (
          <Box className={classes.root}>
            <PublicAppBar />
            <Component />
          </Box>
        ))}
    </Fragment>
  );
}

export default PrivateRoute;
