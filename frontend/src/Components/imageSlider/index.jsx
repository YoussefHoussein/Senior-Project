import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

import './style.css'

const ImageSlider = ({images, interval = 3000 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, interval);
  
      return () => clearInterval(intervalId); 
    }, [images, interval]);
  return (
    <div className='imageSlider flex center'>
        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className='curr-img'/>
    </div>
  )
}

export default ImageSlider