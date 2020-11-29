import { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Notifications as NotificationsIcon, Search } from "@material-ui/icons";

import { Context } from "../../contexts";

import Logo from "../../assets/logo.svg";
import { Menu, Notifications } from "../";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "0px 4px 14px rgba(50,50,50,0.05)",
    background: "#ffffff",
    color: "#333333",
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
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  searchContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  searchInput: {
    padding: theme.spacing(0.5, 1, 0.5, 0),
    color: "inherit",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(50),
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

  avatar: {
    marginLeft: theme.spacing(1),
  },
}));

function Private() {
  const {
    auth: { user },
    notifications,
  } = useContext(Context);

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
        <Box className={classes.searchContainer}>
          <Box className={classes.search}>
            <Search className={classes.searchIcon} />
            <InputBase
              placeholder="Search…"
              className={classes.searchInput}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
        </Box>
        <div className={classes.grow}></div>
        <IconButton aria-label="show new notifications" color="inherit">
          <Menu
            trigger={() => (
              <Badge
                badgeContent={
                  notifications &&
                  notifications.filter((item) => !item.status).length
                }
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            )}
          >
            <Notifications data={notifications} />
          </Menu>
        </IconButton>
        <Avatar src={user && user.avatar.url} className={classes.avatar} />
      </Toolbar>
    </AppBar>
  );
}

export default Private;
