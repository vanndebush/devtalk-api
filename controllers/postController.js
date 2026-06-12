const Post = require('./../models/postModel');

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

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
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
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        status: 'fail',
        message: `Post with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Post successfully deleted'
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID format'
    });
  }
};

module.exports = { getAllPosts, createPost, getPostById, updatePost, deletePost };