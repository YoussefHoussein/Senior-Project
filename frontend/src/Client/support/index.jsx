import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Support = () => {
  return (
    <div className='support relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Support"}/>
      <div className="support-body absolute body">Support</div>
    </div>
  )
}

export default Support