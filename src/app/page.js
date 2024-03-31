'use client'
import Image from "next/image";
import styles from "./page.module.css";
import PostCard from "./components/PostCard/PostCard";
import PostForm from "./components/PostForm/PostForm";

export default function page() {
  const handleSubmit = (formData) => {
    // Handle form submission here, either uploading the file or processing it locally
    console.log(formData);
  };


  return (
    <main className={styles.main}>
  
      
<PostForm onSubmit={handleSubmit} />
    </main>
  );
}
