const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const User = require('../modal/User');
const middleware = require('../middleware');

router.get('/:username/', middleware.checkToken, (req, res) => {
  let data = {};
  let userName = req.session.username;
  if (req.session.username) {
    userName = req.session.username
  }
  else {
    userName = req.params.username
  }

  async function getUserPosts() {
    try {
      const posts = await Post
      .find({ author: userName })
      .limit(13)
      .sort('-time');

      data.posts = posts;
      res.send(data);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  async function totalUserPosts() {
    try {
      const totalNum = await Post.aggregate([
        { $match: { author: userName }}, { $count: "posts"}
      ]);

      data.totalDocuments = totalNum;
    } catch (err) {
      console.log(err.message);
    }
    getUserPosts();
  }

  totalUserPosts();
});

router.get('/:username/posts/:page', middleware.checkToken, (req, res) => {
  let data = {};
  const userName = req.params.username;
  const getDocs = req.params.page - 1;
  async function getUserPosts() {
    try {
        const posts = await Post
        .find({ author: userName })
        .skip(13 * getDocs)
        .limit(13)
        .sort({ time: -1});
        data.posts = posts;
    } 
      catch (err) {
        console.log(err.message)
    }
    res.send(data);    
  }

  async function totalUserPosts() {
    try {
      const totalNum = await Post.aggregate([
        { $match: { author: userName }}, { $count: "posts"}
      ]);

      data.totalDocuments = totalNum;
    } catch (err) {
      console.log(err.message);
    }
    getUserPosts();
  }

  totalUserPosts();
})

router.post('/:username/love', middleware.checkToken, (req, res) => {
  let loveArticles = req.body.loveArticles;
  async function getLovedArticles() {
    try {
        const posts = await Post
        .find({ title: {
          $in: loveArticles
        }})
        .limit(13)
        .sort({ time: -1});

      res.send(posts);    
    } 
      catch (err) {
        console.log(err.message)
    }
  }

  getLovedArticles();
})

router.put('/edit/:id', middleware.checkToken, (req, res) => {
  async function updatePost() {
    try {
      const post = await Post.findById(req.params.id);

      if (req.body.data.title) {
        post.content = req.body.data.content;
        post.title = req.body.data.title;
        post.tags = req.body.data.tags;
        post.avaUrl = req.body.data.avaUrl;
        const result = await post.save();
        console.log("save updated post");
        res.send(post);
      } else {
        res.send('Please enter your text!');
      }
    }
    catch(err) {
      console.log(err.message)
    }
  }

  updatePost()
})

router.delete('/delete/:id', middleware.checkToken, (req, res) => {
  async function deletePost() {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.send(post);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  deletePost()
})

router.put('/setting/:username', middleware.checkToken, (req, res) => {
  let {avaUrl, email, biography} = req.body.data
  async function updateProfile() {
    try {
        const result = await User.updateOne({ email: email }, {
          $set: {
            avaUrl, email, biography
          }
        });
        
        res.send(result);
    } catch(err) {
      console.log(err.message)
    }
  }

  updateProfile();
})

module.exports = router