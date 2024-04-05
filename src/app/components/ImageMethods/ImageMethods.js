"use client";

// import "../PostCard/PostCard.css";
// import { Avatar, Divider, IconButton, TextareaAutosize } from "@mui/material";
// import CommentIcon from "@mui/icons-material/Comment";
// import SaveAsIcon from "@mui/icons-material/SaveAs";
// import DeleteIcon from "@mui/icons-material/Delete";
// import React, { useState } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import EditIcon from "@mui/icons-material/Edit";
// import CommentSection from "../CommentSection/CommentSection";

// function ImageMethods() {
//   const [disabled, setDisabled] = useState(false);
//   const [like, setLikes] = useState(0);
//   const [likeColor, setLikeColor] = useState(false);

//   const handleLikeCount = () => {
//     setLikes(like + 1);
//   };
//   const handleLike = () => {
//     if (!like) {
//       setLikeColor(true); // Set liked to true
//     }
//     handleLikeCount();
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     onEdit(index, newDescription);
//     setIsEditing(false);
//   };

//   return (
//     <main className="post-card">
//       <div className="icon-container">
//         <EditIcon titleAccess="Edit" className="icon">
//           Edit
//         </EditIcon>
//         <DeleteIcon titleAccess="Delete" className="icon">
//           Delete
//         </DeleteIcon>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <FavoriteIcon
//             id="likeid"
//             style={{ color: likeColor ? "red" : "black" }}
//             onClick={handleLike}
//             titleAccess="Like"
//             className="icon"
//           />
//           <span>{like}</span>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CommentIcon titleAccess="Comments" className="icon">
//             Comment
//           </CommentIcon>
//           {/* <CommentSection postId={index}/> */}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ImageMethods;


import "../PostCard/PostCard.css";
import { IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

function ImageMethods({ postId }) {
  const [like, setLike] = useState(0);
  const [likeColor, setLikeColor] = useState(false);

  const handleLike = async () => {
    try {
      // Make a POST request to increment likes for this post
      await axios.post(`http://localhost:5000/posts/`);
      console.log(postId,"postId")
      setLike(prevLike => prevLike + 1); // Increment the like count
      setLikeColor(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDelete = async ({postId}) => {
    
console.log("0",postId)
    try {
      // Make a DELETE request to delete this post
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      // Handle post deletion in your UI as needed
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <main className="post-card">
      <div className="icon-container">
        <IconButton onClick={handleDelete} title="Delete">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleLike} title="Like">
          <FavoriteIcon style={{ color: likeColor ? "red" : "black" }} />
        </IconButton>
        <span>{like}</span>
        <IconButton title="Comments">
          <CommentIcon />
        </IconButton>
      </div>
    </main>
  );
}

export default ImageMethods;
