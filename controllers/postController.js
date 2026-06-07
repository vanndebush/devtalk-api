let posts = [
  {
    id: 1,
    author: 'vanndebush',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    author: 'loverrukk',
    content: 'Lorem ipsum! Dolor sit amet, consectetur adipisicing elit :(',
    createdAt: new Date().toISOString()
  }
];

const getAllPosts = (req, res) => {
  res.json({
    status: 'success',
    totalData: posts.length,
    data: posts
  });
};
const createPost = (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({
      status: 'fail',
      message: 'Author and content must be filled!'
    });
  }

  const newPost = {
    id: Date.now(),
    author,
    content,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json({
    status: 'success',
    message: 'Post created successfully.',
    data: newPost
  });
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