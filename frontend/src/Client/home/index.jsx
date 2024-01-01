import React from 'react'
import Navbar from '../../Components/navbar'
import './style.css'
import Sidebar from '../../Components/sidebar'
import Map from '../../Components/map'
const ClientHome= () => {
  return (
    <div className='client-home relative full'>
      <Navbar email={"test@gmail.com"} notifications={["test","test1","test2"]}/>
      <Sidebar items={["Home","Suggestions","Slots","Support"]}/>
      <div className='absolute body flex column home-container'>
        <div className='map-container'>
          <Map />
        </div>
        <div className='instructions-container flex flex-start align-center'>
          <span className="moving-text">
          Welcome back to Map Your Nap. If you notice the marker in the sea, it indicates that your location hasn't been set or has been set incorrectly. To optimize your experience on the website, kindly click on the user icon situated on the right side of the navbar next to your name, and set your location accurately. 
          After that, you can see the suggestions and other services in the sidebar on the left. Have a nice trial :) 
          </span>
        </div>
      </div>
    </div>
  )
}

export default ClientHome