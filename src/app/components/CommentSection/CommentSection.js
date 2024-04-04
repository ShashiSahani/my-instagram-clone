'use client'
import React, { useState } from 'react';
// import { Textarea } from '../PostForm/PostForm.styles';
import { Button, TextareaAutosize } from '@mui/material';
// import Textarea from '@mui/joy/Textarea';
function CommentSection({postId}) {
  const [comments,setComments]=useState(()=>{
    const storedComments=JSON.parse(localStorage.getItem(`comments - ${postId}`));
    return storedComments || [];
    })
  const [expanded,setExpanded]=useState(false);
  const [newCommentText,setNewCommentText]=useState("");

  const handleCommentChange=(event)=>{
    setNewCommentText(event.target.value)
  }

  const handleComment=async()=>{
    if(newCommentText.trim()!==""){
      try {
        const newComment=newCommentText;
        const updatedComments=[...comments,newComment];
        setComments(updatedComments);
        await localStorage.setItem(`comments - ${postId}`,JSON.stringify(updatedComments));
        setNewCommentText("")
      } catch (error) {
        console.error("Error adding comments",error)
      }
    }
  }
  const handleExpand=()=>{
    setExpanded(true);
  }
  return (
    <section>
        {
          comments.length===0?(
            <p>No comments</p>
          )
          :(
            comments.slice(0,2).map((comment,index)=>(
              <p key={index}>{comment}</p>
            ))
          )
        }
        {
          expanded && comments.length>2 &&(
            <div>
              {comments.slice(2).map((comment,index)=>(
                <Button onClick={handleExpand}>show more comments</Button>
              ))}
            </div>
          )
        }
      
        <TextareaAutosize   value={newCommentText}
  onChange={handleCommentChange}
  placeholder="Write your comment..." />
      <Button onClick={handleComment}>Post</Button>
    </section>
  )
}

export default CommentSection
