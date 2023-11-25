import React from 'react'
import Navbar from '../../Components/navbar'
import './style.css'
import Sidebar from '../../Components/sidebar'
const ClientHome= () => {
  return (
    <div className='client-home relative full'>
      <Navbar username={"Youssef"} email={"test@gmail.com"} notifications={["test","test1","test2"]}/>
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]}/>
      <div className="client-home-container absolute body">Home</div>
    </div>
  )
}

export default ClientHome