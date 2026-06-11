const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [ true, 'A post must have an author' ]
  },
  content: {
    type: String,
    required: [ true, 'A post must have content' ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;