import { useContext } from "react";

import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Context } from "../../contexts";

import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: 0,
  },
}));

function Notifications({ data }) {
  const { toggleNotification } = useContext(Context);
  const classes = useStyles();

  return (
    <List>
      {Object.values(data)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((item) => (
          <ListItem
            alignItems="flex-start"
            key={item._id}
            className={classes.item}
          >
            <Notification item={item} toggle={toggleNotification} />
          </ListItem>
        ))}
    </List>
  );
}

export default Notifications;
