import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";

import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PostHorizontal } from "../components/Post";
import { Context } from "../contexts";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(16),
    width: theme.spacing(16),
    marginRight: theme.spacing(4),
  },

  grow: {
    flexGrow: 1,
  },

  nickName: {
    fontSize: theme.spacing(5),
  },
}));

function Profile() {
  const { id } = useParams();
  const { getSinglePost } = useContext(Context);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getSinglePost(id);
      setPost(post);
    };

    fetchPost();
  }, []);

  const classes = useStyles();

  return (
    <Container>
      {id ? (
        <Box mt={5}>
          {post === null && (
            <Typography variant="body1">This post is not exist</Typography>
          )}
          {post && post._id && <PostHorizontal data={post} />}
        </Box>
      ) : (
        <Redirect to="/" />
      )}
    </Container>
  );
}

export default Profile;
