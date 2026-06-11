const Post = require('./../models/postModel');

let posts = [];

const getAllPosts = (req, res) => {
  const { author, page = 1, limit = 5 } = req.query;
  let resultPosts = posts;

  if (author) resultPosts = resultPosts.filter(post => post.author.toLowerCase() === author.toLowerCase());

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const paginatedPosts = resultPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(resultPosts.length / limitNumber);

  res.json({
    status: 'success',
    meta: {
      totalData: resultPosts.length,
      totalPages,
      currentPages: pageNumber,
      limit: limitNumber
    },
    data: paginatedPosts
  });
};
const createPost = async (req, res) => {
  try {
    const { author, content } = req.body;

    const newPost = await Post.create({ author, content });

    res.status(201).json({
      status: 'success',
      data: newPost
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};
const getPostById = (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);

  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: `Post with ID ${postId} not found.`
    });
  }

  res.json({
    status: 'success',
    data: post
  });
};
const updatePost = (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Post with ID ${postId} not found.`
    });
  }

  if (!req.body.content) {
    return res.status(400).json({
      status: 'fail',
      message: 'Content must be filled!'
    });
  }

  const oldPost = posts[postIndex];
  const updatedPost = {
    id: oldPost.id,
    author: oldPost.author,
    content: req.body.content,
    createdAt: oldPost.createdAt
  }

  posts[postIndex] = updatedPost;

  res.json({
    status: 'success',
    message: 'Post updated successfully.',
    data: updatedPost
  });
};
const deletePost = (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Post with ID ${postId} not found.`
    });
  }

  posts.splice(postIndex, 1);

  res.json({
    status: 'success',
    message: 'Post deleted successfully.'
  });
};

module.exports = { getAllPosts, createPost, getPostById, updatePost, deletePost };