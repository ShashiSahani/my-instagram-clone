// frontend/components/PostForm.js
"use client";

import React, { useEffect, useState } from "react";
import "./PostForm.css";
import { Menu, MenuItem, TextareaAutosize } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Textarea, blue, grey } from "./PostForm.styles";
import UserComments from "../UserComments/UserComments";
const PostForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [previews, setPreviews] = useState([]);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [uploadImages, setUploadedImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [comments, setComments] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Load uploaded images from local storage
    const storedImages = localStorage.getItem("uploadPhotos");
    if (storedImages) {
      setUploadedImages(JSON.parse(storedImages));
    }
    localStorage.setItem('imageDescriptions',JSON.stringify(descriptions))
  }, [descriptions]);

  useEffect(() => {
    const totalPosts = uploadImages.length;
    document.getElementById(
      "totalPostsButton"
    ).innerText = `Total Posts ${totalPosts}`;
  }, [uploadImages]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...files]);

    // Read and display image previews
    const filePreviews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        filePreviews.push(e.target.result);
        if (filePreviews.length === files.length) {
          setPreviews(filePreviews);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // Retrieve previously uploaded images from local storage
    const storedImages = localStorage.getItem("uploadPhotos");
    let existingImages = [];
    if (storedImages) {
      existingImages = JSON.parse(storedImages);
    }

    // Concatenate previously uploaded images with newly selected images
    const updatedImages = existingImages.concat(previews); // Use previews instead of selectedFiles

    // Upload updated images to local storage
    localStorage.setItem("uploadPhotos", JSON.stringify(updatedImages));

    alert("Photos uploaded successfully!");
    setIsUploadMode(false);
    setUploadedImages(updatedImages);

    //clear the selected files and previews
    setPreviews([]);
  };

  const handlePostClick = () => {
    if (!isUploadMode) {
      document.getElementById("fileInput").click();
      setIsUploadMode(true);
    }
  };
  const handleDescriptionChange = (event, imageUrl) => {
    const { value } = event.target;
    setDescriptions({
      ...descriptions,
      [imageUrl]: value,
    });
    localStorage.setItem("imageDescriptions", JSON.stringify(descriptions));
  };
  const handleCommentChange = (event, index) => {
    const { value } = event.target;
    setComments({
      ...comments,
      [index]: value.split("\n"),
    });
    localStorage.setItem("userComments", JSON.stringify(comments));
  };
  const handleDelete = (index) => {
    const updatedImages = [...uploadImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);

    localStorage.setItem("uploadPhotos", JSON.stringify(updatedImages));
  };

  return (
    <main>
      <h2>Instagram photo upload</h2>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="imageStyle"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="imagePreviews">
        {previews.map((preview, index) => (
          <div className="imageConatiner" key={index}>
            <img
              src={preview}
              alt={`Preview ${index}`}
              key={index}
              className="previewImage"
            />

<Textarea
  name="descriptions"
  id={`description_${index}`}
  className="descriptionInput"
  placeholder="Add a description..."
  onChange={(event) => handleDescriptionChange(event, preview)}
/>

            <MoreVertIcon data-testid="MoreVertIcon">
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Save</MenuItem>
              </Menu>
            </MoreVertIcon>

            {/* <button onClick={() => handleDelete(index)} className="deleteBtn">
              Delete
            </button> */}
          </div>
        ))}
      </div>
      {isUploadMode && <button onClick={handleUpload}>UPLOAD</button>}
      <button onClick={handlePostClick}>
        {isUploadMode ? "Select More Photos" : "POST"}
      </button>
      <div className="uploadedImages">
        {uploadImages.length === 0 ? (
          <p>No image uploaded yet.</p>
        ) : (
          uploadImages.map((image, index) => (
            <div className="imageContainer">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                key={index}
                className="uploadedImage"
              />
              <div className="commentWrapper">
                <UserComments />
             <p>{descriptions[image]}</p>

                <MoreVertIcon
                  onClick={handleClick}
                  data-testid="MoreVertIcon"
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose(), handleDelete(index);
                    }}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Save</MenuItem>
                </Menu>

                {/* <button onClick={() => handleDelete(index)}>Delete</button> */}
              </div>
            </div>
          ))
        )}
      </div>
      <button id="totalPostsButton">Total Posts:{uploadImages.length}</button>
    </main>
  );
};

export default PostForm;
