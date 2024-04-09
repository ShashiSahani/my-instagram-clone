"use client";
import Image from "next/image";
import styles from "./page.module.css";
import PostCard from "./components/PostCard/PostCard";
import PostForm from "./components/PostForm/PostForm";
import NavBar from "./components/NavBar/NavBar";
import UploadInstagramPost from "./components/UploadInstargarmImage/UploadInstagramPost";
import DisplayImages from "./components/DisplayInstagramPost/DisplayPostImages";

export default function page() {
  const handleSubmit = (formData) => {
    // Handle form submission here, either uploading the file or processing it locally
    console.log(formData);
  };

  return (
    <main>
      <NavBar />
    
    </main>
  );
}
