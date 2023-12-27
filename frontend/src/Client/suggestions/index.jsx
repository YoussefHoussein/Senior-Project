import React, { useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import Map from '../../Components/map'
const Suggestions = () => {
  const [longitude, setLongitude] = useState(33.8938)
  const [latitude, setLatitude] = useState(35.5018)
  return (
    <div className='suggestions relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Suggestions"}/>
      <div className="client-home-container absolute body">
        <Map longitude={longitude} latitude={latitude}/>
      </div>
    </div>
  )
}

export default Suggestions