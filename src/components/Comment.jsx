import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));
function Comment({ author, content }) {
  return (
    <Typography variant="body1" component="p">
      <b>{author}</b>
      :&nbsp;
      {content}
    </Typography>
  );
}

export default Comment;
