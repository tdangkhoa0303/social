import React, { useState, useRef, useEffect } from "react";

import {
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    overflow: "hidden",
    padding: "2rem 0",
    flexDirection: "column",
  },

  field: {
    width: "100%",
  },

  form: {
    maxWidth: "40rem",
    width: "80%",
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
}));

function SignUp() {
  const passwordRef = useRef();

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
      spacing: { xs: 12 },
    },
    confirmPassword: {
      label: "Confirm password",
      name: "confirmPassword",
      value: "",
      validated: true,
      default: "",
      type: "password",
      spacing: { xs: 12 },
      validator: (value) => value === passwordRef.current,
    },
  });

  useEffect(() => {
    passwordRef.current = fields.password.value;
  }, [fields.password.value]);

  const [previews, setPreviews] = useState([]);

  const handleFormSubmission = (event) => {};

  const handleAvatarChange = (event) => {
    const files = Array.from(event.target.files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleFieldChange = (event, field) => {
    const value = event.target.value;
    const validated = field.validator ? field.validator(value) : true;

    setFields((fields) => ({
      ...fields,
      [field.name]: { ...field, validated, value },
    }));
  };

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
      <form className={classes.form} onSubmit={handleFormSubmission}>
        <Stepper activeStep={0}>
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
        <Typography variant="h4" paragraph color="primary">
          Join our community to connect new friend and share your stories...
        </Typography>
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
          <Grid item sm={12}>
            <label htmlFor="avatar" className={classes.uploader}></label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              multiple
              onChange={handleAvatarChange}
              hidden
            />
          </Grid>
          <Grid item sm={12}>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
        {previews.map((img, i) => (
          <img src={img} key={i} alt="dfdsf" className={classes.img} />
        ))}
      </form>
    </Container>
  );
}

export default SignUp;
