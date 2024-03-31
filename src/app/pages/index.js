// frontend/pages/index.js

import React from 'react';
import PostCard from '../components/PostCard/PostCard';

const posts = [
  { id: 1, imageUrl: '/uploads/photo1.jpg', description: 'Beautiful sunset', likes: 10, comments: ['Amazing!', 'Love it!'] },
  { id: 2, imageUrl: '/uploads/photo2.jpg', description: 'Fun day at the beach', likes: 15, comments: ['Great shot!', 'Wish I was there!'] },
  // Add more posts as needed
];

const HomePage = () => {
  return (
    <div>
      <h1>My Instagram Clone</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
