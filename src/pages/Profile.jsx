import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import * as api from "../helpers/api";

import { Grid, Avatar, Box, Typography, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Casourel } from "../components";

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
  const { q } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { data },
      } = await api.getProfile(q);
      console.log(data.user);
      setProfile(data.user);
      return data;
    };

    fetchProfile();
  }, []);

  const classes = useStyles();

  return (
    <Fragment>
      {q ? (
        <Box mt={5}>
          {profile && (
            <Grid container justify="center">
              <Grid item xs={12} lg={4} md={8}>
                <Box display="flex" mb={8}>
                  <Avatar
                    src={profile.avatar.url}
                    alt="user avatar"
                    className={classes.avatar}
                  />
                  <Box className={classes.grow}>
                    <Typography variant="h2" className={classes.nickName}>
                      {profile.nickName}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      <b>{profile.posts.length}</b>&nbsp;
                      {profile.posts.length > 1 ? "posts" : "post"}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {profile.fullName}
                    </Typography>
                    <Typography variant="body1">{profile.bio}</Typography>
                  </Box>
                  <Box>
                    <Button variant="contained" color="primary">
                      Follow
                    </Button>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  {profile.posts.map((post) => (
                    <Grid item xs={12} md={6} key={post._id}>
                      <Link href={`/post/${post._id}`}>
                        <Casourel images={[post.images[0]]} imageSize="cover" />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      ) : (
        <Redirect to="/" />
      )}
    </Fragment>
  );
}

export default Profile;
