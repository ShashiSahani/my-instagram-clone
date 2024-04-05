"use client";
import './PostCard.css'
import { Avatar, Divider, IconButton, TextareaAutosize } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import CommentSection from '../CommentSection/CommentSection';

function PostCard({ post, index, onDelete, onEdit }) {
  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(post.description);
  console.log(post.description,"kfkjdsnfcn")
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
     <div className="user-avatar-container">
     <div style={{display:"flex",marginTop:"10px",alignItems:"center"}}>
        <Avatar src="" alt="usser" className="user-avatar" />
       
      </div>
      <div className='userName'>
      <span className="user-name">Ayush Agarwal</span>
      <span className="location">Kochi <span style={{fontSize:"12px"}}>India</span></span>
      </div>
     </div>
      <img src={post.image} alt={`Post ${index}`} style={{ width: "200px",marginTop:"10px" }} />
      {isEditing ? (
        <>
          <TextareaAutosize
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <SaveAsIcon onClick={handleSave}>Save</SaveAsIcon>
        </>
      ) : (
<>

<p style={{fontWeight:900,letterSpacing:"2px"}}>{post.description}</p>
<Divider className="divider"/>
</>        

      )}
     <div className="icon-container">
     <EditIcon onClick={handleEdit} titleAccess="Edit" className="icon">Edit</EditIcon>
      <DeleteIcon onClick={() => onDelete(index)} titleAccess="Delete" className="icon">Delete</DeleteIcon>
     <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
     <FavoriteIcon id={`likeSpan-${index}`} onClick={handleLike} titleAccess="Like" className="icon"/>
      <span>{like}</span>
     </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
      <CommentIcon titleAccess="Comments" className="icon">Comment</CommentIcon>
      <CommentSection postId={index}/>
      </div>
     </div>
    </main>
  );
}

export default PostCard;

