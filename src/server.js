const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { readPosts, populatePosts } = require('./populate.js')

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests

server.use(bodyParser.json());
// server.get('/', (req, res) => {
//   res.status(200).json({success:'success'});
// })
// TODO: write your route handlers here
server.get('/', (req, res) => {
  Post.find({})
    .then((posts) => {
      console.log(posts)
      res.status(200).json(posts)
    })
    .catch((err) => {
      res.status(400).json({ err: err});
      console.log(err)
    });
});

mongoose
  .connect('mongodb://localhost/so-posts')
  .then(res => {
    Post.create(readPosts())
      .then((populatePosts) => {
        console.log('population succedded');
        mongoose.disconnect();
      })
      .catch((error) => {
        console.error('population failed');
      });
  })
  .catch((error) => {
    console.error(error);
  });


server.listen(3000, () => {
  console.log('Server Listening')
})

// module.exports = { server };
