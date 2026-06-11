const Post = require('./../models/postModel');

let posts = [];

const getAllPosts = async (req, res) => {
  try {
    const { author, page = 1, limit = 5 } = req.query;

    let query = {};
    if (author) query.author = { $regex: new regExp(author, 'i') };

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const resultPosts = await Post.find(query).skip(skip).limit(limitNumber);
    const totalData = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalData / limitNumber);

    res.json({
      status: 'success',
      meta: {
        totalData,
        totalPages,
        currentPages: pageNumber,
        limit: limitNumber
      },
      data: resultPosts
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
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