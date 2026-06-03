const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to DevTalk API!'
  });
});
app.get('/api/posts', (req, res) => {
  res.json({
    status: 'success',
    totalData: posts.length,
    data: posts
  });
});
app.post('/api/posts', (req, res) => {
  const newPost = {
    id: Date.now(),
    author: req.body.author,
    content: req.body.content,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json({
    status: 'success',
    message: 'Post created successfully.',
    data: newPost
  });
});
app.delete('/api/posts/:id', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`DevTalk server is running at http://localhost:${PORT}`);
})