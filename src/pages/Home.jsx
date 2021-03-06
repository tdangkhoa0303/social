import { useContext, useEffect } from "react";

import { Grid, CircularProgress, Box } from "@material-ui/core";
import { CreatePost } from "../components";
import { Post } from "../components/Post";

import { Context } from "../contexts";

function Home() {
  const {
    auth: { isAuth },
    posts,
    getPosts,
  } = useContext(Context);

  useEffect(() => {
    if (isAuth) getPosts();
  }, [isAuth]);

  const renderPosts = (posts) =>
    posts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((post) => (
        <Grid item xs={12} key={post._id}>
          <Post data={post} />
        </Grid>
      ));

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={5} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CreatePost />
          </Grid>

          {posts.fetching ? (
            <Box p={2}>
              <CircularProgress />
            </Box>
          ) : (
            renderPosts(Object.values(posts.data))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
