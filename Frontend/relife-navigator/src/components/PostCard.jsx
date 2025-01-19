import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaSmile, FaImage } from 'react-icons/fa';
import PostService from '../services/PostService';

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const [reactions, setReactions] = useState(post.reactions);

  const handleLike = async () => {
    try {
      await PostService.likePost(post._id);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await PostService.addComment(post._id, commentText);
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddReaction = async (reaction) => {
    try {
      const updatedReactions = await PostService.addReaction(post._id, reaction);
      setReactions(updatedReactions);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
      {post.image && <img src={post.image} alt={post.title} className="mb-4 rounded-lg" />}
      <p className="mb-4">{post.content}</p>
      {post.tags && (
        <div className="mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full mr-2">{tag}</span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button onClick={handleLike} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <FaThumbsUp />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <FaComment />
            <span>{comments.length}</span>
          </button>
          <button onClick={() => handleAddReaction('smile')} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <FaSmile />
            <span>{reactions.smile || 0}</span>
          </button>
        </div>
        <span className="text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <form onSubmit={handleAddComment} className="flex space-x-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
          Add
        </button>
      </form>
      <div className="mt-4 space-y-2">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-700 p-2 rounded-lg">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;