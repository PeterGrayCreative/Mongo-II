const fs = require('fs');

let savedPosts = null;

const Post = require('./post.js');
const User = require('./UserModel.js');

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
    savedPosts.map(post => {
      post.user = new User(post.user);
    })
   // console.log(savedPosts)
  }
  return savedPosts;
};

const populatePosts = (posts) => {
  return new Promise((resolve, reject) => {
    const promises = posts.map(element => {
    const post = new Post(element);
    post
      .save()
      .then((post) => post)
      .catch((err) => err);
    })
    Promise.all(promises)
      .then(res => res)
      .catch(err => err)
  }).catch((err) => {
    err: 'error saving posts';
  });
};

  module.exports = {
    readPosts,
    populatePosts
  }