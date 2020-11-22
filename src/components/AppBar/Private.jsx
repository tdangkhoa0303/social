import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "none",
    boxShadow: "none",
  },
  logo: { height: "2.5rem" },
  title: { fontFamily: `'Sacramento', cursive`, flexGrow: 1 },
}));

function Private() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" aria-label="logo">
          <img src={Logo} alt="logo" className={classes.logo} />
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

export default Private;
