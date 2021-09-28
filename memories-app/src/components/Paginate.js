import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const Paginate = () => {
  const classes = useStyles();
  // The pagination imported will be what will ebe returned
  // Count here will be 5 to specify the amount of post
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlinesd"
      color="primary"
      renderItem={(item) => (
        // We will be returning pagination item
        <PaginationItem {...item} component={Link} to={`/posts?pages=${1}`} />
      )}
    />
  );
};

export default Paginate;
