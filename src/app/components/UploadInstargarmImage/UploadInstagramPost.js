import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Button, Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadInstagramPost({ isOpen, onClose }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(""); 
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSizeMB, setImageSizeMB] = useState(0);
  const [removeImage,setRemoveImage]=useState(true)
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    displayImagePreview(selectedImage);
    calculateImageSize(selectedImage);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    setError(null);
  }, [image]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        setSuccess(true);
        setError(null);
      } else {
        const errorMessage = await response.text();
        console.error("Failed to upload image:", errorMessage);
        setSuccess(false);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setSuccess(false);
      setError("An error occurred while uploading the image");
    }
  };

  const handleEmojiSelect = (emojiObject) => {
    try {
      const emoji = emojiObject.emoji;
      console.log("Selected emoji:", emoji);
      if (emoji) {
        setDescription(description + emoji);
        setShowEmojiPicker(false);
      } else {
        console.error("No emoji selected");
      }
    } catch (error) {
      console.error("Error selecting emoji:", error);
    }
  };

  const displayImagePreview = (selectedImage) => {
    if (!selectedImage) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const calculateImageSize = (selectedImage) => {
    if (!selectedImage) return;
    const sizeInMB = selectedImage.size / (1024 * 1024); // Convert bytes to MB
    setImageSizeMB(sizeInMB.toFixed(2)); // Keep only two decimal places
  };
  const handleRemoveImage=()=>{
    setImage(null)
    setImagePreview(null)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      BackdropProps={{ onClick: onClose }}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        
      }}
      aria-labelledby="upload-instagram-post-modal"
      aria-describedby="upload-instagram-post-modal-description"
    >
      <div>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        {
          image && <IconButton
          onClick={handleRemoveImage}
          >
           <HighlightOffRoundedIcon
           
           sx={{
            position: "absolute",
           top:16,
           left:-10,
            color:"white"
          }}
           />
            
          </IconButton>
        }

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="image-upload-input"
        />
        <label htmlFor="image-upload-input">
          <Button
            component="span"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            {/* Upload Image */}
          </Button>
        </label>

        {imagePreview && (
          <div  style={{marginTop:10}}>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />
            <p>Size: {imageSizeMB} MB</p>
          </div>
        )}

        <Input
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Write a description..."
          endAdornment={
            <Button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😊
            </Button>
          }
        />
        
        {showEmojiPicker && (
          <EmojiPicker
            onEmojiClick={(emojiObject, event) =>
              handleEmojiSelect(emojiObject, event)
            }
          />
        )}
        
        <Button variant="contained" onClick={handleSubmit}>Post</Button>
        {success && <p>Image uploaded successfully</p>}
        {error && <p style={{ color: "red" }}> {error}</p>}
      </div>
    </Modal>
  );
}

export default UploadInstagramPost;
