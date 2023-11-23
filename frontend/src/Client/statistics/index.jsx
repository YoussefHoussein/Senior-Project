import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Statistics = () => {
  return (
    <div className='statistics relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Statistics"}/>
      <div className="statistics-body absolute body">Statistics</div>
    </div>
  )
}

export default Statistics