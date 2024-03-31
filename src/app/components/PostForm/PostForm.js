// frontend/components/PostForm.js
"use client";
// frontend/components/PostForm.js
import { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import { Button, Input } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EmojiPicker from "emoji-picker-react";
const PostForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePost = () => {
    if (selectedFile && description) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageURL = reader.result;
        const newPost = { image: imageURL, description };
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
      };
      reader.readAsDataURL(selectedFile);
      setSelectedFile(null);
      setDescription("");
      setImagePreview(null);
    } else {
      alert("Please select an image and write a description");
    }
  };

  const handleDelete = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleEdit = (index, newDescription) => {
    const updatedPosts = [...posts];
    updatedPosts[index].description = newDescription;
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleEmojiSelect = (emojiObject) => {
    try {
      const emoji = emojiObject.emoji;
      console.log('Selected emoji:', emoji);
      if (emoji) {
        setDescription(description + emoji);
        setShowEmojiPicker(false);
      } else {
        console.error('No emoji selected');
      }
    } catch (error) {
      console.error('Error selecting emoji:', error);
    }
  };
  
  
  

  return (
    <div>
      <h1>Instagram post</h1>
      <label htmlFor="fileInput">
        <AddBoxIcon titleAccess="Upload Image" />
      </label>
      <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
      <br />
      {imagePreview && (
        <div className="imagePreviewContainer" style={{ display: "flex", flexDirection: "column" }}>
          <img src={imagePreview} alt="Image Preview" style={{ maxWidth: "100px", marginBottom: "10px" }} />
          <Input
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write a description..."
            endAdornment={<Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</Button>}
          />
         {showEmojiPicker && <EmojiPicker onEmojiClick={(emojiObject,event)=>handleEmojiSelect(emojiObject,event)} />}

        </div>
      )}
      <br />
      <Button variant="outlined" onClick={handlePost}>Post</Button>
      <div>
        {posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default PostForm;



