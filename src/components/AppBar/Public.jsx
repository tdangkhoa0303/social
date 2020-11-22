import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "none",
    boxShadow: "none",
    color: "#333333",
  },
  logo: { height: "2.5rem" },
  title: { fontFamily: `'Sacramento', cursive`, flexGrow: 1 },
}));

function Public() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" aria-label="logo">
          <Link to="/">
            <img src={Logo} alt="logo" className={classes.logo} />
          </Link>
        </IconButton>
        <Typography variant="h4" className={classes.title}>
          Instee
        </Typography>
        <Button href="/signUp" color="inherit">
          Create a new account
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Public;
