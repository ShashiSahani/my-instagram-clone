// frontend/components/PostForm.js
"use client";
import { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";

const PostForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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

  return (
    <div>
      <h1>Post Form</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      {imagePreview && (
        <img src={imagePreview} alt="Image Preview" style={{ maxWidth: "100%", marginBottom: "10px" }} />
      )}
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Write a description..."
      />
      <br />
      <button onClick={handlePost}>Post</button>
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


