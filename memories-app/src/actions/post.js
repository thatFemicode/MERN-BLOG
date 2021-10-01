import * as api from "../api/index";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";
// Now we have to create actions
// actiona cretors are functions that return actions
// The below is a function that returns another function
export const getPosts = (page) => async (dispatch) => {
  try {
    // DISPATCH START LOADING IMMEDIATELE WHEN WE GET POSTS
    dispatch({ type: START_LOADING });
    // passed page
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
// For individual posts
export const getPost = (id) => async (dispatch) => {
  try {
    // DISPATCH START LOADING IMMEDIATELE WHEN WE GET POSTS
    dispatch({ type: START_LOADING });
    // passed page
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
// This is for the search for both tags and norma search
// The get post by search will accept a searhcQuery and that will be sent to
// the database with out request
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    // Making the request, we have to destructure the {data} becuase we
    // are sending back something called data from the backend
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });

    // dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);
    console.log(data);
    dispatch({ type: CREATE, payload: data });
  } catch {}
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profi"));
  try {
    const { data } = await api.likePost(id, user?.token);
    console.log(data);
    dispatch({ type: LIKE, payload: data });
  } catch {}
};
export const commentPost = (value, id) => async (dispatch) => {
  // value and id are coming from the commentsection dispatch
  try {
    const { data } = await api.comment(value, id);
    console.log(data);
    dispatch({ type: COMMENT, payload: data });
    // After we dispatch this action, we also have to return the newswt comment coming in
    return data.comments;
  } catch (error) {}
};
// payload is usually the data where we store all of our post
// When you are deleting something payload should be the id that is to be deleted
