const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'DevTalk API v1.0 is Live!'
  });
});

app.listen(PORT, () => {
  console.log(`DevTalk server is running at http://localhost:${PORT}`);
})