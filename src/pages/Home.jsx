import { useContext, useEffect } from "react";

import {
  Container,
  Grid,
  CircularProgress,
  List,
  ListItem,
} from "@material-ui/core";
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
    console.log(posts);
  }, [isAuth]);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={4}>
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
  );
}

export default Home;
