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
      return res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
});

server.get('/accepted-answer/:soID', (req, res) => {
  if (req.params.soID) {
    Post.findOne({ soID: req.params.soID })
      .then((post) => post.acceptedAnswerID)
      .then((answerID) => {
        if (answerID) {
          Post.findOne({ soID: answerID })
            .then((answerPost) => {
              if (answerPost) {
                res.status(200).json(answerPost);
              } else res.status(404).json({ error: 'No answer post found.' });
            })
            .catch((err) => {
              return {error: err};
            });
        } else
          res.status(404).json({ error: 'Post does not have an answer ID' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
      });
  }
});

server.get('/top-answer/:soID', (req, res) => {
  if (req.params.soID) {
    Post.find({ parentID: req.params.soID })
      .sort({ score: -1 }).limit(1)
      .then((post) => {
        if (post.length) {
        res.status(200).json(post);
        } else res.status(500).json({err: 'Parent ID not found'});
      })
      .catch(err => res.status(500).json({err: err.message}));
  }
});

module.exports = { server };
