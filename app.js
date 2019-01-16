const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const register = require('./routes/register');
const logIn = require('./routes/logIn');
const logOut = require('./routes/logOut');
const newPost = require('./routes/newPost');
const article = require('./routes/article');
const profile = require('./routes/profile');
const posts = require('./routes/posts');
const tags = require('./routes/tags');
const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs')
mongoose.connect('mongodb://hung131:abc123@ds151383.mlab.com:51383/simple-blog-db');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

require('./prod')(app);

app.use(session({ 
    secret: 'very mysterious',
    saveUninitialized: false,
    resave: false }))
// GET route for reading data
app.use('/api/posts', posts);

//POST route for register new user
app.use('/register', register);

// POST log in after registering
app.use('/api/log-in', logIn);

// User log out POST to clear session
app.use('/api/log-out', logOut);

// Handle one article
app.use('/article', article)

//POST method for new post
app.use('/api/new-post', newPost);

// GET articles for a tag
app.use('/tag', tags);

//POST method finds all posts of one author
app.use('/profile', profile);

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// app.use('*', async function (req, res) {
//     const indexFile = fs.readFileSync(path.join(__dirname, 'dist/index.html')).toString()
//     res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8'
//     })
//     res.end(indexFile)
// });

app.listen(3000 || process.env.PORT, () => console.log('Listening...'));