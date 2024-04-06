// "use client"
import React, { useState, useEffect } from "react";
import ImageMethods from "../ImageMethods/ImageMethods";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import websocket from 'websocket';
function DisplayImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [like, setLike] = useState(0);
  const [likeColor, setLikeColor] = useState(false);
  const [ws, setWebSocket] = useState(null); 

  
  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setImages((prevImages) =>
        prevImages.map((image) =>
          image._id === updatedData._id ? updatedData : image
        )
      );
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket connection error');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWebSocket(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const imageData = await response.json();
        console.log(imageData);
        setImages(imageData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImages();



  }, []);

  const handleDelete = async (postId) => {
    try {
      // Make a DELETE request to delete this post
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      // Update images state after deletion
      setImages((prevImages) =>
        prevImages.filter((image) => image._id !== postId)
      );
    } catch (error) {
      if (error.response) {
        console.error("Error deleting post:", error.response.data);
      } else {
        console.error("Error deleting post:", error.message);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleLike = async (postId, currentLikes, index) => {
    try {
      // Calculate the updated like count by incrementing by 1
      const updatedLikes = currentLikes + 1;
  
      // Send a PUT request with updated likes as a URL parameter
      await axios.put(`http://localhost:5000/posts/${postId}?likes=${updatedLikes}`);
  
      // Update the local state with the updated like count
      const updatedImages = [...images];
      updatedImages[index].likes = updatedLikes;
      setImages(updatedImages);
  
      console.log("Updated likes:", updatedLikes);
    } catch (error) {
      if (error.response) {
        console.error("Error updating like:", error.response.data);
      } else {
        console.error("Error updating like:", error.message);
      }
    }
  };
  
  

  
  
  
  
  
  return (
    <>
      <main>
        <h2>Images</h2>
        <section>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.image}
                alt={`Image ${index}`}
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "10px",
                  display: "block",
                }} // Ensure image is displayed as block
              />
              <p> Description :{image.description}</p>
              <IconButton onClick={()=>handleLike(image._id,image.likes,index)} title="Like">
                <FavoriteIcon style={{ color: image.likes> 0 ? "red" : "black" }} />
              </IconButton>
              <span>{image.likes}</span>
              <p>
                {!image.comments === 0
                  ? "No Comments"
                  : `${image.comments} Comments`}
              </p>
              <IconButton
                title="Delete"
                onClick={() => handleDelete(image._id)}
              >
                <DeleteIcon  />
              </IconButton>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default DisplayImages;
