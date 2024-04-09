"use client"
import React, { useEffect, useState } from 'react';
import DisplayImages from '../DisplayInstagramPost/DisplayPostImages';

function UploadInstagramPost() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(""); // State to store the description
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    setError(null);
  }, [image]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description); // Append description to the form data

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        setSuccess(true);
        setError(null);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to upload image:', errorMessage);
        setSuccess(false);
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setSuccess(false);
      setError('An error occurred while uploading the image');
    }
  };

  return (
   <>
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} /> {/* Input field for description */}
      <button onClick={handleSubmit}>Upload</button>
      {success && <p>Image uploaded successfully</p>}
      {error && <p style={{color:'red'}}> {error}</p>}
    </div>
    <DisplayImages/>
   </>


  );
}

export default UploadInstagramPost;
