'use client'
import React from 'react';

function PostCard({ post }) {

    const [likeCount,setLikeCount]=React.useState(0);
    // useEffect(()=>{

    // },[])
    const handleLikeClick=()=>{
    }
    return (
        <div className="post-card">
            <img src={post.imageUrl} alt="Post" />
            <p>Description: {post.description}</p>
            <p onClick={handleLikeClick()}>Likes: {}</p>
            <p>Comments: {post.comments.length}</p>
        </div>
    );
}

export default PostCard;
