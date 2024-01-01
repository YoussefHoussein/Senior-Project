import React from 'react'
import './style.css'
const SearchCard = ({admin,images,latitude,longitude,features,room_id}) => {
  return (
    <div className='searchCard-container flex spaceBetween align-center'>
        <div className="search-info flex column spaceBetween align-center">
            <div className="features"><span className='txt-features-mv'>{features}</span></div>
            <div className="searchCard-location flex center">{latitude.toFixed(4)}&deg; - {longitude.toFixed(4)}&deg;</div>
        </div>
        <div className="searchCard-visit-btn-container flex center">
            <button className='searchCard-visit-btn'>Visit</button>
        </div>
    </div>
  )
}

export default SearchCard