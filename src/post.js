const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

require('./UserModel.js');

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.connect('mongodb://localhost/so-posts');

const PostSchema = new mongoose.Schema({
  soID: {
    type: Number,
    required:true,
  },
  url: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  // tags: [Tags],
  AnswerId: {
    type: Number,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Posts', PostSchema);
