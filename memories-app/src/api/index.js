import axios from "axios";

const url = "http://localhost:5000/posts";

// All actions towrd backend are going to be done with redux
export const fetchPosts = () => axios.get(url);

// On bigger applications redux will be great for scalability

export const createPost = (newPost) => axios.post(url, newPost);
