import React from 'react'
import Navbar from '../../Components/navbar'
import './style.css'
import Sidebar from '../../Components/sidebar'
const AdminHome = () => {
  return (
    <div className='admin-home relative full'>
      <Navbar username={"Admin"}/>
      <Sidebar items={["Home","Add","Chats"]}/>
      <div className="admin-home-body absolute body">Home</div>
    </div>
  )
}

export default AdminHome