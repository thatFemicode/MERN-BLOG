import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000",
});
// const url = "http://localhost:5000/posts";
API.interceptors.request.use((req) => {
  // We re simply connecting this to the backed to send the user
  // token to the auth (middleware) backend
  if (localStorage.getItem("profi")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profi")).token
    }`;
  }

  // For interceptors we have to return request so it can move to the other middle
  // requests
  return req;
  // With this our Backend will be able to get a specific header
});
// All actions towrd backend are going to be done with redux
export const fetchPosts = () => API.get("/posts");

// On bigger applications redux will be great for scalability

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`, deletePost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// Route for SIGNIN AND SIGNOUT
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
