"use client";
import '../PostCard/PostCard.css'
import { Avatar, Divider, IconButton, TextareaAutosize } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import CommentSection from '../CommentSection/CommentSection';

function ImageDetails({ post, index, onDelete, onEdit  }) {
  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
//   const [newDescription, setNewDescription] = useState(post.description);
  const [like, setLike] = useState(0);

  const handleLike = () => {
    setLike(like + 1);
    const likeSpan = document.getElementById(`likeSpan-${index}`);
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
    <main className="post-card" >
     
     <div className="icon-container">
     <EditIcon  titleAccess="Edit" className="icon">Edit</EditIcon>
      <DeleteIcon titleAccess="Delete" className="icon">Delete</DeleteIcon>
     <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
     <FavoriteIcon id={`likeSpan-${index}`} titleAccess="Like" className="icon"/>
      <span>{like}</span>
     </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
      <CommentIcon titleAccess="Comments" className="icon">Comment</CommentIcon>
      {/* <CommentSection postId={index}/> */}
      </div>
     </div>
    </main>
  );
}

export default ImageDetails;

