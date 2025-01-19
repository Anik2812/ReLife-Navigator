import React, { useState, useEffect } from 'react';
import PostService from '../services/PostService';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '', tags: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostService.getPosts();
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const tags = newPost.tags.split(',').map(tag => tag.trim());
    await PostService.createPost(newPost.title, newPost.description, tags);
    setNewPost({ title: '', description: '', tags: '' });
    const response = await PostService.getPosts();
    setPosts(response.data);
  };

  const handleLikePost = async (postId) => {
    await PostService.likePost(postId);
    const response = await PostService.getPosts();
    setPosts(response.data);
  };

  const handleAddComment = async (postId, text) => {
    await PostService.addComment(postId, text);
    const response = await PostService.getPosts();
    setPosts(response.data);
  };

  return (
    <div className="community-page">
      <h1>Community</h1>
      <form onSubmit={handleCreatePost}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={newPost.tags}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div>
              {post.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
            <button onClick={() => handleLikePost(post._id)}>Like ({post.likes})</button>
            <div>
              <h4>Comments</h4>
              {post.comments.map((comment, index) => (
                <p key={index}>{comment.text}</p>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = e.target.elements.comment.value;
                  handleAddComment(post._id, text);
                  e.target.reset();
                }}
              >
                <input type="text" name="comment" required />
                <button type="submit">Add Comment</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;