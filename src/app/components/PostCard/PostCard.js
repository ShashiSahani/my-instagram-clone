"use client";
import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
function PostCard({ post, index, onDelete, onEdit }) {
  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(post.description);
  const [like, setLike] = useState(0);

  const handleLike = () => {
    setLike(like + 1);
    const likeSpan = document.getElementById("likeSpan");
    if (likeSpan) {
      likeSpan.style.color = "red";
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(index, newDescription);
    setIsEditing(false);
  };

  return (
    <main className="post-card">
      <img src={post.image} alt={`Post ${index}`} style={{ width: "200px" }} />
      {isEditing ? (
        <>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <SaveAsIcon onClick={handleSave}>Save</SaveAsIcon>
        </>
      ) : (
        <p>{post.description}</p>
      )}
     <div style={{display:"flex",justifyContent:"space-between"}}>
     <EditIcon onClick={handleEdit}>Edit</EditIcon>
      <DeleteIcon onClick={() => onDelete(index)}>Delete</DeleteIcon>
     <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
     <FavoriteIcon id="likeSpan" onClick={handleLike}/>
      <span>{like}</span>
     </div>
      <CommentIcon>Comment</CommentIcon>
     </div>
    </main>
  );
}

export default PostCard;

