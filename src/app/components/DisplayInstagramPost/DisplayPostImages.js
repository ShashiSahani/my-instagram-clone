import React, { useState, useEffect } from 'react';

function DisplayImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const imageData = await response.json();
        setImages(imageData);
        setLoading(false);
        console.log(imageData,"imageData")

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
   <>
   
   <div>
      <h2>Images</h2>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.image} alt={`Image ${index}`} style={{ width: '200px', height: '200px', margin: '10px' }} />
          </div>
        ))}
      </div>
    </div>
   </>
  );
}

export default DisplayImages;
