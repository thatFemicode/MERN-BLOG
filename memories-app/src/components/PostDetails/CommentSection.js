import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/post";
import useStyles from "./styles";
const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  //   to keep value of the comment input
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  //   The Below will be used for the scroll feature
  const commentsRef = useRef();
  //   When we click comments we have to dispatch a new action to out redux
  //   out comments also need to contain the information about who is creating that comment so we will be grabbing user
  //   from local storage
  const user = JSON.parse(localStorage.getItem("profi"));

  const handleClick = async () => {
    //   HWo wrote that comment and the comment itself below
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");
    // Whwn do we want to scrol immeduiately we havse a new comment
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //   console.log(post);
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {/* Inside here we have to loop through comements of our specific post */}
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(":")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
