import React, { useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import Map from '../../Components/map'
import SuggestionCard from '../../Components/suggestionCard'
const Suggestions = () => {
  const [longitude, setLongitude] = useState(localStorage.getItem('longitude'))
  const [latitude, setLatitude] = useState(localStorage.getItem('latitude'))
  return (
    <div className='suggestions relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Suggestions"}/>
      <div className="client-home-container absolute body">
        <Map />
      </div>
      <div className='suggestions-cont flex column gap-10'>
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
     
    </div>
  )
}

export default Suggestions