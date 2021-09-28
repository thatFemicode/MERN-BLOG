import React from "react";
import {
  Container,
  AppBar,
  Paper,
  Typography,
  Grow,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
// Chip Inpit to look for inputs like tags
import ChipInput from "material-ui-chip-input";
// Iporting useHistory, TextField, Button, useLocation to know on which page we are to help
// with setting the pagination

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/post";
import { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate";
import useStyles from "./styles";

// HOOK BELOW
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  // Maning the search input
  const [search, setSearch] = useState("");
  // Array for the below cus we want to have multiple tags
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  // THE CURRENT ID IS TO GET THE CURRENT ID THAT WILL BE CLICKED ON IN THE POST
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  // query, where our page information will be coming from
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const history = useHistory();
  // Key Press
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagDelete) =>
    setTags(tags.filter((tag) => tag === tagDelete));
  // The search post function is to search for posts on
  const searchPost = () => {
    // if there is a search term or there are tags
    if (search.trim() || tags) {
      // dispatch an action
      // /For the tags below
      // [europe, usa] => "europe,usa"
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none "}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridCotainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {/* Pagination will be called under the form  */}
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* We need a value for the chipinput  */}
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
