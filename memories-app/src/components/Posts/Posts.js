import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
// using the useSelector will help in getting or fetching the data from global reduc store
const Posts = () => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  const classes = useStyles();
  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
