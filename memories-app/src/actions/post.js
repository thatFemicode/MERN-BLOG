import * as api from "../api/index";

// Now we have to create actions
// actiona cretors are functions that return actions
// The below is a function that returns another function
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
  } catch {}
};
// payload is usually the data where we store all of our post
