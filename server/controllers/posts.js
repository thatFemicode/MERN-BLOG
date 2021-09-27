const PostMessage = require('../models/postmessage');
const mongoose = require('mongoose');
const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    // console.log(postMessages);
    // console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createPost = async (req, res) => {
  const post = req.body;
  // nOW OUR CREATOR WONT BE THE NAME THAT WE SPECIFIED,
  // IT WILL BE THE ID
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  // with post request we have acces to req.body
};
const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No Post Found with that ID');

  // THIS NEEDS TO PASS BOTH _ID AND THE UPDATED POST  whichjis coming from the body
  // the new: true is so we can recieve the updated version of the post
  // when testing this at first the data was still not changing aeven after updating it
  // so when sending this back for update we need to send over the ID because in the DB each post has
  // its own id
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    // the below is what we are sending back
    { ...post, _id },
    {
      new: true,
    }
  );
  console.log(updatedPost);
  res.json(updatedPost);
};
const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No Post Found with that ID');

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'Successfully deleted' });
};
const likePost = async (req, res) => {
  // The req.id property is coming from the auth middleware becuase now
  // The auth middleware gets executed and we can then get properties from it
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthorized' });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No Post Found with that ID');
  const post = await PostMessage.findById(id);
  // We have the post above so we have to see if the user ID is already
  // In the like section
  // We have a callback functionwhere we loop through all likes
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    // Like the post
    post.likes.push(req.useeId);
  } else {
    // Dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
