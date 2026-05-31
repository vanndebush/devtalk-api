const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Hello World!'
  });
});

app.listen(PORT, () => {
  console.log(`DevTalk server is running at http://localhost:${PORT}`);
})