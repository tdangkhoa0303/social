import { Fragment, useState } from "react";
import Card from "./ConversationCard";
import ContactCard from "./ContactCard";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { searchUsers } from "../helpers/api";

import {
  List,
  ListItem,
  Avatar,
  InputBase,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";

function Sider({ online, handleAvatarClick, conversations, isShow }) {
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleSearchChange = async (e) => {
    const q = e.target.value;
    if (q && q.trim()) {
      setSearch(q);
      setLoading(true);
      const {
        data: {
          data: { users },
        },
      } = await searchUsers(q);
      setContacts(users);
      console.log(users);
      setLoading(false);
      return;
    }
    setSearch("");
  };

  const handleContactClick = (_id) => {
    setSearch("");
    setLoading(false);
    setContacts([]);
    handleAvatarClick(_id);
  };

  return (
    <Box
      css={{
        borderWidth: "0 1px 0 0",
        borderStyle: "solid",
        borderColor: "#eee",
        width: "40rem",
        overflow: "auto",
        height: "100%",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
        padding: "2rem 1rem",

        "@media screen and (max-width: 1024px)": {
          position: "fixed",
          top: 0,
          right: 0,
          borderWidth: "0 0 0 1px",
          maxWidth: "50rem",
          width: "90%",
          transition: "all 0.2s ease-out",
          transform: isShow ? "translateX(0)" : "translateX(100%)",
        },
      }}
    >
      <Typography variant="h4">Chat</Typography>
      <Box my={2}>
        <InputBase
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          css={{
            padding: "0.5rem 1rem",
            width: "100%",
            borderRadius: "2rem",
            backgroundColor: "#eeeeee",
          }}
          onChange={handleSearchChange}
        />
      </Box>
      <Typography variant="h6">Online</Typography>
      <Box>
        <List style={{ marginBottom: "2rem" }} direction="horizontal">
          {online &&
            Object.values(online).map((e) => (
              <ListItem key={e._id}>
                <Avatar
                  src={e.avatar.url}
                  size="7rem"
                  onClick={(event) => handleAvatarClick(e._id)}
                  style={{ marginRight: "1rem" }}
                />
              </ListItem>
            ))}
        </List>
      </Box>
      {search ? (
        <Fragment>
          <Typography variant="h6">Find contact</Typography>
          <Box>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              contacts.map((contact) => (
                <ContactCard
                  key={contact._id}
                  contact={contact}
                  handleContactClick={(e) => handleContactClick(contact._id)}
                />
              ))
            )}
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Typography variant="h6">Conversations</Typography>
          <Box>
            {conversations &&
              Object.values(conversations)
                .sort(
                  (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                )
                .map((conversastion) => (
                  <Card key={conversastion._id} conversation={conversastion} />
                ))}
          </Box>
        </Fragment>
      )}
    </Box>
  );
}

export default Sider;
