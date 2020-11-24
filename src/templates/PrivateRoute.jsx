import React, { useContext, Fragment } from "react";

import { Redirect } from "react-router-dom";
import Context from "../Context";

import { PrivateAppBar } from "../components/AppBar";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
      {/* {isAuth !== null &&
        (isAuth ? ( */}
      <Box className={classes.root}>
        <PrivateAppBar />
        <Component />
      </Box>
      {/* ) : (
          <Redirect to="/signIn" />
        ))} */}
    </Fragment>
  );
}

export default PrivateRoute;
