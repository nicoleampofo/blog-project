const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// test db connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to database!")
};

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String
})

const Post = mongoose.model('Post', postSchema)

// Get all posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
})

// Get one post
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.send(post)
})

// Create new post
// when there is a post request, save the data as a new post in the database
app.post('/posts', async (req, res) => {
    // create a new post
    const newPost = new Post(req.body);
    // save this in the database, to write it and save it to the db
    const savedPost = await newPost.save()
    // send the result back to the front end
    res.send(savedPost)
})

// Delete post
app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    // send a custom status message back to the front end
    res.status(200).send('Post has been deleted')
})

// spin up the server and see if it works
app.listen(5500, () => {
    console.log('Server is running on port 5500')
})
