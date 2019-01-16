const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../modal/User');
const Post = require('../modal/Post')
const bcrypt = require('bcrypt');
const config = require('../config');

async function findUserPosts(email, package, res) {
  try {
    const result =  await Post.find({ email: email });
    package.collection = result;
    return res.json({
      success: true,
      package})
  }
  catch (err) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      })
    }
  }
}

router.post('/', (req, res) => {
  console.log('received!!!!!!!!!!')
  const { email, password } = req.body.user
  let package = {}

  async function checkUser() {
    const result = await User.find({ email: email })
    if (!result[0]) {
      res.json({
        success: false,
        message: "No email found! Sign up to do cool stuff!"
      })
    } else {
      bcrypt.compare(password, result[0].password, (err, check) => {
        if (err) {
          return res.json({
            success: false,
          })
        } else if (!check) {
          return res.json({
            success: false,
            message: 'Wrong password!'
          })
        } else {
          let token = jwt.sign({ email: result[0].email }, config.secret, { expiresIn: '24h' })
          req.session.token = token;
          req.session.username = result[0].username;
          req.session.email = email;
          package.token = token;
          package.email = result[0].email;
          package.username = result[0].username;
          package.bio = result[0].biography;
          package.avaUrl = result[0].avaUrl;
          package.loveArticles = result[0].loveArticles;
          findUserPosts(email, package, res)      
        }
      })
    }
  }

  checkUser()
})

  module.exports = router;