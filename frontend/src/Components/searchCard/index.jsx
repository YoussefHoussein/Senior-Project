import React from 'react'
import './style.css'
const SearchCard = ({admin}) => {
  return (
    <div className='searchCard-container flex spaceBetween align-center'>
        <div className="search-info flex column center">
            <div className="features"></div>
            <div className="searchCard-location"></div>
        </div>
        <div className="searchCard-visit-btn-container flex center">
            <button className='searchCard-visit-btn'>Visit</button>
        </div>
    </div>
  )
}

export default SearchCard