const express = require('express');
const { getPosts, createPost, likePost, addComment } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/posts', getPosts);
router.post('/posts', authMiddleware, createPost);
router.patch('/posts/:id/like', authMiddleware, likePost);
router.post('/posts/:id/comment', authMiddleware, addComment);

module.exports = router;