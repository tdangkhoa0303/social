import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "3.5rem",
    width: "3.5rem",
    marginRight: theme.spacing(1),
  },

  root: {
    alignItems: "center",
    padding: "0.5rem",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
  },
}));

const Card = ({ contact, handleContactClick }) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.root} onClick={handleContactClick}>
      <Avatar
        src={contact.avatar && contact.avatar.url}
        className={classes.avatar}
      />
      <Typography variant="subtitle1">{contact.fullName}</Typography>
    </Box>
  );
};

export default Card;
