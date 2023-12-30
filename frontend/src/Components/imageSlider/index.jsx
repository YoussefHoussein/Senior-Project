import React, { useState } from 'react'
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

import './style.css'

const ImageSlider = ({images}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handlePrevClick = () =>{
        if(currentImageIndex === 0){
            setCurrentImageIndex(images.length - 1)
        }
        else{
            setCurrentImageIndex(currentImageIndex-1)
        }
    }

    const handleNextClick = () =>{
        if(currentImageIndex === images.length-1){
            setCurrentImageIndex(0)
        }
        else{
            setCurrentImageIndex(currentImageIndex+1)
        }
    }
  return (
    <div className='imageSlider flex center'>
        <IoIosArrowRoundBack onClick={handlePrevClick} className='move-btn'/>
        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className='curr-img'/>
        <IoIosArrowRoundForward onClick={handleNextClick} className='move-btn'/>
    </div>
  )
}

export default ImageSlider