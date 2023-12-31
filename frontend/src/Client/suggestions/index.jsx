import React, { useEffect, useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import Map from '../../Components/map'
import SuggestionCard from '../../Components/suggestionCard'
import axios from 'axios'
const Suggestions = () => {
  const [longitude, setLongitude] = useState(localStorage.getItem('longitude'))
  const [latitude, setLatitude] = useState(localStorage.getItem('latitude'))
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const token = localStorage.getItem('token');
        const data ={
          userLat: latitude,
          userLong: longitude
        }
        const response = await axios.post('http://127.0.0.1:8000/api/rooms/suggestions',data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        setSuggestions(response.data)
      }
      catch(err){
        console.log("error occured")
      }
    }

    fetchData()
  }, [])

  const handleSuggestionCardClick = (latitude, longitude) =>{
    setSelectedSuggestion({
      latitude,
      longitude,
      isSelected: true,
    });
  }
  return (
    <div className='suggestions relative full'>
      <Navbar  />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Suggestions"}/>
      <div className="client-home-container absolute body">
        <Map selectedSuggestion={selectedSuggestion} />
      </div>
      <div className='suggestions-cont flex column gap-10'>
        {
          suggestions.map((room,index) =>(
            <SuggestionCard 
              latitude={room.latitude} 
              longitude={room.longitude} 
              images={room.images} 
              features={room.features}
              onClick ={() => handleSuggestionCardClick(room.latitude, room.longitude)}
            />
          ))
        }
      </div>
      
    </div>
  )
}

export default Suggestions