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
  
  return (
    <div className='suggestions relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Suggestions"}/>
      <div className="client-home-container absolute body">
        <Map />
      </div>
      <div className='suggestions-cont flex column gap-10'>
        {
          suggestions.map((room,index) =>(
            <SuggestionCard 
              latitude={room.latitude} 
              longitude={room.longitude} 
              images={room.images} 
              features={room.features}/>
          ))
        }
      </div>
     
    </div>
  )
}

export default Suggestions