const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user.userId;

  try {
    const post = new Post({
      userId,
      title,
      description,
      tags,
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.likePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1;
    await post.save();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      userId,
      text,
    };

    post.comments.push(comment);
    await post.save();

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};