import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",

    "&:hover": {
      textDecoration: "none",
    },

    "&:visited": {
      textDecoration: "none",
    },

    "&:active": {
      textDecoration: "none",
    },
  },
}));

function CustomLink({ children, ...props }) {
  const classes = useStyles();
  return (
    <Link {...props} className={classes.link}>
      {children}
    </Link>
  );
}

export default CustomLink;
