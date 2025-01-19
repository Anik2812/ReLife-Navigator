import React from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

const PostCard = ({ post, onLike, onComment }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center mb-4">
        <img src={post.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
        <h3 className="text-2xl font-bold">{post.title}</h3>
      </div>
      <p className="mb-4">{post.description}</p>
      <div className="flex space-x-2 mb-4">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-blue-500 text-white py-1 px-2 rounded-full text-sm">{tag}</span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button onClick={() => onLike(post.id)} className="flex items-center space-x-2">
          <FaHeart className="text-red-500" />
          <span>{post.likes}</span>
        </button>
        <button onClick={() => onComment(post.id)} className="flex items-center space-x-2">
          <FaComment className="text-blue-500" />
          <span>{post.comments}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;