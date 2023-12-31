import React, { useState, useEffect } from 'react'


import './style.css'

const ImageSlider = ({images, interval = 3000 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [convertedImages, setConvertedImages] = useState([]);
    useEffect(() => {
      const convertImages = () => {
        const getImageUrlFromBase64 = (base64String) => {
          return `data:image/png;base64,${base64String}`;
        };
  
        const convertedImagesArray = images.map((image) => getImageUrlFromBase64(image.image));
        setConvertedImages(convertedImagesArray);
      };
  
      convertImages();
    }, [images]);
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, interval);
  
      return () => clearInterval(intervalId); 
    }, [images, interval]);
  return (
    <div className='imageSlider flex center'>
        <img src={convertedImages[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className='curr-img'/>
    </div>
  )
}

export default ImageSlider