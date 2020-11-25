import { useContext } from "react";

import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Context from "../../Context";

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
      {data.map((item) => (
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