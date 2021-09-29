import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// usedispatch to dispatch action
import { getPosts } from "../actions/post";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  /// useSelector to get somethings from our state which will be the number of pages
  const { numberOfPages } = useSelector((state) => state.posts);

  // First changing of this but what we want here is for this efsect to getposts
  // not to fetch all of the post but to pass a page as a parameter to it to fetch post from that specific page
  // Original version
  // useEffect(() => {
  //   if (page) dispatch(getPosts());
  // }, [page]);
  // changed version
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  // Fetch the post anytime the post changes
  const classes = useStyles();
  // The pagination imported will be what will ebe returned
  // Count here will be 5 to specify the amount of post
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        // We will be returning pagination item
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
