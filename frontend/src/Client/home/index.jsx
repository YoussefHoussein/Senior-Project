import React, { useState } from 'react'
import Navbar from '../../Components/navbar'
import './style.css'
import Sidebar from '../../Components/sidebar'
import Map from '../../Components/map'
const ClientHome= () => {
  const [longitude, setLongitude] = useState(5)
  const [latitude, setLatitude] = useState(5)
  return (
    <div className='client-home relative full'>
      <Navbar username={"Youssef"} email={"test@gmail.com"} notifications={["test","test1","test2"]}/>
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]}/>
      <div className="client-home-container absolute body">
        <Map longitude={longitude} latitude={latitude}/>
      </div>
    </div>
  )
}

export default ClientHome