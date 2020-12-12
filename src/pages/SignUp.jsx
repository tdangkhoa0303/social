import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import * as api from "../helpers/api";

import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    overflow: "hidden",
    paddingTop: "8rem",
  },

  field: {
    width: "100%",
  },

  form: {
    maxWidth: "40rem",
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },
  img: {
    width: "10rem",
    height: "auto",
  },

  uploader: {
    width: "3rem",
    backgroundColor: "red",
    heigh: "2rem",
  },

  stepper: {
    padding: "2rem 0",
    maxWidth: "40rem",
    width: "80%",
  },

  action: {
    margin: "1rem 0",
  },

  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: "2rem 0",
    width: "10rem",
    height: "10rem",

    "& > img": {
      width: "100%",
      height: "unset",
    },
  },
}));

function SignUp() {
  const history = useHistory();
  const passwordRef = useRef();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const [fields, setFields] = useState({
    firstName: {
      label: "First name",
      name: "firstName",
      value: "",
      validated: true,
      default: "",
      validator: "",
      spacing: { xs: 12, md: 6 },
      type: "text",
    },
    lastName: {
      label: "Last name",
      name: "lastName",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12, md: 6 },
      type: "text",
    },

    nickName: {
      label: "Nickname",
      name: "nickName",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12 },
    },
    email: {
      label: "Email",
      name: "email",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12 },
      type: "email",
      validator: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    },
    password: {
      label: "Password",
      name: "password",
      value: "",
      validated: true,
      default: "",
      type: "password",
      spacing: { xs: 12, md: 6 },
    },
    confirmPassword: {
      label: "Confirm password",
      name: "confirmPassword",
      value: "",
      validated: true,
      default: "",
      type: "password",
      spacing: { xs: 12, md: 6 },
      validator: (value) => value === passwordRef.current,
    },
    bio: {
      label: "Bio",
      name: "bio",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12 },
    },
  });

  useEffect(() => {
    passwordRef.current = fields.password.value;
  }, [fields.password.value]);

  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleFieldChange = (event, field) => {
    const value = event.target.value;
    const validated = field.validator ? field.validator(value) : true;

    setFields((fields) => ({
      ...fields,
      [field.name]: { ...field, validated, value },
    }));
  };

  const getActiveContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form className={classes.form}>
            <Grid container spacing={3}>
              {Object.values(fields).map((field, index) => (
                <Grid item {...field.spacing} key={index}>
                  <TextField
                    variant="outlined"
                    label={field.label}
                    id={field.name}
                    name={field.name}
                    className={classes.field}
                    value={field.value}
                    error={!field.validated}
                    type={field.type}
                    onChange={(e) => handleFieldChange(e, field)}
                  />
                </Grid>
              ))}
            </Grid>
          </form>
        );
      case 1:
        return (
          <Box>
            <Typography paragraph>Choose your avatar</Typography>
            <label htmlFor="avatar" className={classes.uploader}>
              <Avatar
                className={classes.avatar}
                alt="avatar"
                src={avatar && URL.createObjectURL(avatar)}
              >
                {fields.firstName ? fields.firstName.value[0] : "K"}
              </Avatar>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleAvatarChange}
              hidden
            />
          </Box>
        );
      case 3:
        return (
          <Typography className={classes.instructions}>
            We prepared all the things for you!
          </Typography>
        );
      default:
        return;
    }
  };

  const handleSignUp = async () => {
    try {
      const form = new FormData();

      Object.values(fields).forEach((field) =>
        form.append(field.name, field.value)
      );
      form.append("avatar", avatar);

      const { data: response } = await api.requestSignUp(form);
      console.log(response);
      if (response.success === "success") history.push("/signIn");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSignUp();
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const classes = useStyles();

  const steps = [
    {
      label: "General",
      isOptional: false,
      isSkip: false,
    },
    {
      label: "Avatar",
      isOptional: false,
      isSkip: false,
    },
    {
      label: "Finish",
      isOptional: false,
      isSkip: false,
    },
  ];

  return (
    <Container className={classes.root}>
      <Typography variant="h4" paragraph color="primary">
        Join our community to connect new friend and share your stories...
      </Typography>

      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (step.isOptional) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (step.isSkip) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box spacing={3}>
        <Box>
          {getActiveContent(activeStep)}
          <Box className={classes.action}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignUp}
              >
                Let's start
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
