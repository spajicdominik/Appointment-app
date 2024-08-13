const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://dominikspajic7:Dombajecar123@cluster0.wf1ecca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const postSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    prezime: String,
    start: Date,
    end: Date
});

const Post = mongoose.model('Post', postSchema);


app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send('Error fetching posts from database');
  }
});

app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body);

  try {
    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(500).send('Error saving post to database');
  }
});
  
app.delete('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    await Post.deleteOne({ id: postId });
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting post from database');
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
