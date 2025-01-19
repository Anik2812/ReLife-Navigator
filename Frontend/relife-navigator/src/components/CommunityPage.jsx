import React, { useState, useEffect } from 'react';
import PostService from '../services/PostService';
import CreatePostModal from './CreatePostModal';
import PostCard from './PostCard';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await PostService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (newPost) => {
    try {
      const createdPost = await PostService.createPost(newPost);
      setPosts([createdPost, ...posts]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Community</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create New Post
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} onCreate={handleCreatePost} />}
    </div>
  );
};

export default CommunityPage;