import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Suggestions = () => {
  return (
    <div className='suggestions relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Suggestions"}/>
      <div className="suggestions-body absolute body">Suggestions</div>
    </div>
  )
}

export default Suggestions