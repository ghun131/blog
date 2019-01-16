const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Post = new Schema({
    title: {type: String, required: true, max: 200},
    author: {type: String, required: true, max: 100},
    avaUrl: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    love: {type: Number, require: true},
    content: {type: String, required: true, max: 3000},
    tags: [String],
    time: {type: String}
})

module.exports = mongoose.model('Post', Post);