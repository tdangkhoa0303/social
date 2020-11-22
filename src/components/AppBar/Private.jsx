import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  InputBase,
  Badge,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Notifications, Search } from "@material-ui/icons";

import Logo from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "none",
    boxShadow: "none",
  },
  logo: { height: "2.5rem" },
  title: {
    fontFamily: `'Sacramento', cursive`,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  grow: {
    flexGrow: 1,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: "inherit",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20em",
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
        <Box className={classes.search}>
          <Box className={classes.searchIcon}>
            <Search />
          </Box>
          <InputBase
            placeholder="Search…"
            className={classes.searchInput}
            inputProps={{ "aria-label": "search" }}
          />
        </Box>
        <div className={classes.grow}></div>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Private;
