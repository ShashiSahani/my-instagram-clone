"use client"
import React, { useEffect, useState } from 'react';
import DisplayImages from '../DisplayInstagramPost/DisplayPostImages';

function UploadInstagramPost() {
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
useEffect(()=>{
    setError(null)
},[image])
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);

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
      <button onClick={handleSubmit}>Upload</button>
      {success && <p>Image uploaded successfully</p>}
      {error && <p style={{color:'red'}}> {error}</p>}
    </div>
    <DisplayImages/>
   </>


  );
}

export default UploadInstagramPost;

