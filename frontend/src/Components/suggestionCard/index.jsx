import React, { useState } from 'react'
import './style.css'
import ImageSlider from '../imageSlider';
import { useEffect } from 'react';
const SuggestionCard = ({latitude,longitude,images,features, onClick}) => {
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
  const handleCardClicked = () => {
    onClick(latitude,longitude);
  }
  return (
    <div className='sug-card-container flex column center' onClick={handleCardClicked}>
      <div className="room-img-cont">
        <ImageSlider images={convertedImages} />
      </div>
      <div className="room-desc-cont flex center">
        <span className='moving-desc'>{features}</span>
      </div>
    </div>
  )
}

export default SuggestionCard