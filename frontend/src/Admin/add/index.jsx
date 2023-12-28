import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Add = () => {
  return (
    <div className='add relative full'>
      <Navbar username={"Admin"}/>
      <Sidebar items={["Add","Chats"]} selected={"Add"}/>
      <div className="add-body absolute body">Add</div>
    </div>
  )
}

export default Add