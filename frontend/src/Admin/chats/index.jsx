import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Chats = () => {
  return (
    <div className='chats relative full'>
      <Navbar admin={true}/>
      <Sidebar items={["Add","Chats"]} selected={"Chats"}/>
      <div className="chats-body absolute body flex center">Coming Soon...</div>
    </div>
  )
}

export default Chats