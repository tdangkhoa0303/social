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
  IconButton,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";

import { Link } from "react-router-dom";

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
        background: "#ffffff",
        zIndex: 4,
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
      <Box display="flex" alignItems="center">
        <Typography variant="h4" css={{ marginRight: "1rem" }}>
          Chat
        </Typography>
        <IconButton component={Link} to="/" color="inherit">
          <Home />
        </IconButton>
      </Box>

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

      <List css={{ marginBottom: "2rem", display: "flex" }}>
        {online &&
          Object.values(online).map((e) => (
            <ListItem
              key={e._id}
              css={{
                padding: "0 !important",
                width: "fit-content !important",
              }}
            >
              <Avatar
                src={e.avatar && e.avatar.url}
                onClick={(event) => handleAvatarClick(e._id)}
                css={{
                  height: "5rem !important",
                  width: "5rem !important",
                  marginRight: "1rem",
                }}
              />
            </ListItem>
          ))}
      </List>

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
