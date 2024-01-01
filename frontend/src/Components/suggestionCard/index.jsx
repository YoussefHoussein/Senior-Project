import React, { useState } from 'react'
import './style.css'
import ImageSlider from '../imageSlider';
import { useEffect } from 'react';
const SuggestionCard = ({latitude,longitude,images,features, onClick, selected,room_id}) => {
  const handleCardClicked = () => {
    onClick(latitude,longitude,room_id);
  }
  return (
    <div className={selected ? 'sug-card-container flex column center selected': 'sug-card-container flex column center'} onClick={handleCardClicked}>
      <div className="room-img-cont">
        <ImageSlider images={images} />
      </div>
      <div className="room-desc-cont flex center">
        <span className='moving-desc'>{features}</span>
      </div>
    </div>
  )
}

export default SuggestionCard