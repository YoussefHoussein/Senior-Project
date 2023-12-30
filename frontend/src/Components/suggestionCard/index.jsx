import React, { useState } from 'react'
import './style.css'
const SuggestionCard = ({latitude,longitude,image,features}) => {
  
  return (
    <div className='sug-card-container flex column center gap-10'>
      <div className="room-img-cont">
        <img src={image} alt="roomImage" className='sugg-img'/>
      </div>
      <div className="room-desc-cont">
        {features}
      </div>
    </div>
  )
}

export default SuggestionCard