import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Support = () => {
  return (
    <div className='support relative full'>
      <Navbar  />
      <Sidebar items={["Home","Suggestions","Slots","Support"]} selected={"Support"}/>
      <div className="support-body absolute body">Support</div>
    </div>
  )
}

export default Support