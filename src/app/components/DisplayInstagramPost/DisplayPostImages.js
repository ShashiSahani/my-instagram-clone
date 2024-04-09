import React, { useState, useEffect } from "react";
import { IconButton, TextField, Modal, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import "./DisplayImage.css";
import { ModeCommentOutlined } from "@mui/icons-material";
function DisplayImages({ postId, initialLikes }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInput, setCommentInput] = useState(""); // State to store the comment input
  const [likes, setLikes] = useState(initialLikes);
  const [commentInputs, setCommentInputs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageComments, setSelectedImageComments] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        setImages(response.data);
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
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      setImages((prevImages) =>
        prevImages.filter((image) => image._id !== postId)
      );
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
    }
  };

  const handleLike = async (postId, index) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/posts/${postId}/likes`
      );
      console.log("old like", response.data);
      const updatedLikes = response.data.likes;
      console.log(updatedLikes, "updated like");
      const updatedImages = [...images];
      updatedImages[index].likes = updatedLikes;
      setImages(updatedImages);
    } catch (error) {
      console.error(
        "Error updating likes:",
        error.response?.data || error.message
      );
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${postId}/comments`,
        { text: commentInput }
      );
      console.log("Comment submitted successfully:", response.data);
      setCommentInput(""); // Clear the comment input field after submission
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response?.data || error.message
      );
    }
  };

  const handleCommentInputChange = (e, index) => {
    const updatedCommentInputs = [...commentInputs];
    updatedCommentInputs[index] = e.target.value;
    setCommentInputs(updatedCommentInputs);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleOpenModal = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/posts/${postId}/comments`
      );
      setSelectedImageComments(response.data.comments);
      setOpenModal(true);
    } catch (error) {
      console.error(
        "Error fetching comments:",
        error.response?.data || error.message
      );
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <main>
      <h2>Images</h2>
      <h2>Total Post:{images.length}</h2>
      <section >
        {images.map((image, index) => (
          <Box key={index}>
            <img
              src={image.image}
              alt={`Image ${index}`}
              style={{
                width: "200px",
                height: "200px",
                margin: "10px",
                display: "block",
             
              }}
            />
         
            <section style={{display:"flex",alignItems:"center",marginTop:"10px"}}>
            <div>
              <IconButton
              onClick={() => handleLike(image._id, index)}
              title="Like"
            >
              <FavoriteIcon
                style={{ color: image.likes > 0 ? "red" : "black" }}
              />
            </IconButton>
            <span>{image.likes}</span>

           

            <IconButton
              onClick={() => handleOpenModal(image._id)}
              title="View Comments"
            >
            <ModeCommentOutlined/>

            </IconButton>
            <IconButton title="Delete" onClick={() => handleDelete(image._id)}>
              <DeleteIcon />
            </IconButton>

              </div>
              <div>
              <TurnedInNotIcon  title="Save"/>
              </div>
        
            </section>


            <div>
           
              <TextField
                label="Add a comment"
                value={commentInput}
                id="standard-basic"
               variant="standard" 
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <IconButton
                onClick={() => handleCommentSubmit(image._id)}
                title="Submit Comment"
                disabled={!commentInput.trim()} // Disable button if commentInput is empty or contains only whitespace
              >
                <SendIcon />
              </IconButton>
             <p> description: {image.description}</p>
            <p onClick={()=>setOpenModal(true)} style={{fontSize:"18px",color:"black" ,cursor:"pointer"}} >View All {image.comments.length} comments </p>

            </div>

          
          </Box>
        ))}
      </section>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            width: 400,
            height: 400,
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <h2>Comments</h2>
          {selectedImageComments.map((comment, index) => (
            <ul key={index}>
              <li>{comment.text}</li>
            </ul>
          ))}
        </div>
      </Modal>
    </main>
  );
}

export default DisplayImages;
