import { Typography } from "@material-ui/core";

function Comment({ author, content }) {
  return (
    <Typography variant="body1" component="p">
      <b>{author}</b>
      &nbsp;
      {content}
    </Typography>
  );
}

export default Comment;
