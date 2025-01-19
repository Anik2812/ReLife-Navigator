import React, { useState } from 'react';
import PostCard from './PostCard';
import CreatePostModal from './CreatePostModal';

const initialPosts = [
  {
    id: 1,
    profilePic: 'https://via.placeholder.com/150',
    title: 'Post 1',
    description: 'Description for post 1',
    tags: ['tag1', 'tag2'],
    likes: 0,
    comments: 0,
  },
  {
    id: 2,
    profilePic: 'https://via.placeholder.com/150',
    title: 'Post 2',
    description: 'Description for post 2',
    tags: ['tag3', 'tag4'],
    likes: 0,
    comments: 0,
  },
];

const CommunityPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, comments: post.comments + 1 } : post));
  };

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="community-page bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Community</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Create Post
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
          ))}
        </div>
      </div>
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreatePost} />
    </div>
  );
};

export default CommunityPage;