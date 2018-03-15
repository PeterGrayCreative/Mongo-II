const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests

server.use(bodyParser.json());

// TODO: write your route handlers here
server.get('/posts', (req, res) => {
  Post.find({})
    .then((posts) => {
      return res.status(200).json(posts)
    })
    .catch((err) => {
      res.status(400).json({ err: err});
    }); 
});

module.exports = { server };
