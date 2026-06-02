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
    id: posts.length + 1,
    author: req.body.author,
    content: req.body.content,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json({
    status: 'success',
    message: 'Post created!',
    data: newPost
  });
});

app.listen(PORT, () => {
  console.log(`DevTalk server is running at http://localhost:${PORT}`);
})