import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Slots = () => {
  return (
    <div className='slots relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Slots"}/>
      <div className="slots-body absolute body">Slots</div>
    </div>
  )
}

export default Slots