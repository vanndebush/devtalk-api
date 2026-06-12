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
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: `Post with ID ${req.params.id} not found`
      });
    }

    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID format'
    });
  }
};
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        status: 'fail',
        message: `Post with ID ${req.params.id} not found`
      });
    }

    res.json({
      status: 'success',
      data: updatedPost
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
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