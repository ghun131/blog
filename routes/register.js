const express = require('express');
const router = express.Router();
const User = require('../modal/User');
const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {
    const {email, username, password, passwordConf} = req.body.payload

    // confirm that user typed same password twice
    if (password !== passwordConf) {
      let err = new Error('Passwords do not match.');
      err.status = 200;
      return res.json({
        success: false,
        message: "Passwords do not match!"
      })
    } else {
  
    // Check whether email is used or not?
      User.findOne({ email: email }, (err, item) => {
        if (err) {
          return res.json(err);
        } else if (item) {
          return res.json({
            success: false,
            message: "This email is already used!"
          })
  
        } else {
  
          User.findOne({ username: username }, (err, thing) => {
            if (err) {
              return res.json(err);
            } else if (thing) {
              return res.json({
                success: false,
                message: "This user name is taken! Choose a cooler one!"
              })
            } else {
              let userData = {
                email: email,
                username: username,
                avaUrl: '',
                biography: '',
                loveArticles: [],
                salt: '',
                password: password,
                passwordConf: passwordConf
              }
              
              let salt = bcrypt.genSaltSync(10);
              let hash = bcrypt.hashSync(password, salt);

              userData.password = hash;
            
              User.create(userData, (error, user) => {
                if (error) {
                  return next(error);
                } else {
                  return res.json({
                    success: true
                  })
                }
              });
            }
          })
  
        }
      })
    }
  })
  
  module.exports = router;