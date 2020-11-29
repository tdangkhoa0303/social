import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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

function CustomLink({ children, className, ...props }) {
  const classes = useStyles();
  return (
    <Link {...props} className={clsx([classes.link, className])}>
      {children}
    </Link>
  );
}

export default CustomLink;
