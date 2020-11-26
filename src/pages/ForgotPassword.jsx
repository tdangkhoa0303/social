import React, { useState, useContext } from "react";
import { Grid, TextField, Button, Typography, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../Context";

import Forgot from "../assets/forgot_password.svg";

const useStyles = makeStyles((theme) => ({
  root: { width: "100%", overflow: "hidden", height: "100vh" },
  section: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",

    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },

  hero: {
    width: "100%",
    maxHeight: "50vh",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    maxWidth: "30rem",

    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },

  field: { width: "100%" },
  nav: {
    boxShadow: "none",
    background: "none",
    color: "#333333",
  },
}));

function ForgotPassword() {
  const [email, setEmail] = useState({
    value: "",
    validated: true,
    validator: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  });

  const [feedback, setFeedback] = useState({});

  const handleSubmitForm = (event) => {
    event.preventDefault();
    // Call forgot password api, return feedback
    setFeedback({
      status: "success",
      message:
        "Follow the instructions sent to your mail to get a new password",
    });
  };

  const classes = useStyles();

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    const validated = email.validator ? email.validator(value) : true;
    setEmail((email) => ({ ...email, validated, value }));
  };

  return (
    <Box>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={6} className={classes.section}>
          <img src={Forgot} alt="forgot password" className={classes.hero} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.section}>
          <form className={classes.form} onSubmit={handleSubmitForm}>
            <Typography variant="h4" paragraph color="primary">
              Enter your email...
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                {feedback.message && (
                  <Alert severity={feedback.status}>{feedback.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  className={classes.field}
                  value={email.value}
                  onChange={handleEmailChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Send mail
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgotPassword;
