import React from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
const Chats = () => {
  return (
    <div className='chats relative full'>
      <Navbar username={"Admin"}/>
      <Sidebar items={["Add","Chats"]} selected={"Chats"}/>
      <div className="chats-body absolute body">Chats</div>
    </div>
  )
}

export default Chats