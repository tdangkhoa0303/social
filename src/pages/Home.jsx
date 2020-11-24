import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import { Container, Grid, CircularProgress } from "@material-ui/core";
import { CreatePost } from "../components";
import { Post } from "../components/Post";

import Context from "../Context";

function Home() {
  const {
    auth: { isAuth },
    posts,
    getPosts,
  } = useContext(Context);

  useEffect(() => {
    if (isAuth) getPosts();
  }, [isAuth]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CreatePost />
            </Grid>
            {posts.fetching ? (
              <CircularProgress />
            ) : (
              Object.values(posts.data).map((post) => (
                <Grid item xs={12} key={post._id}>
                  <Post data={post} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
