// frontend/pages/upload.js

import React from 'react';
import PostForm from '../components/PostForm/PostForm';
const UploadPage = () => {
  const handleSubmit = (formData) => {
    // Handle form submission, e.g., send formData to backend
    console.log(formData);
  };

  return (
    <div>
      <h1>Upload Photo</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadPage;
