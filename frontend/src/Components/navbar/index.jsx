import React, { useState } from 'react'
import './style.css'
import img from './Picture1.png'
import noNotification from './no-notification.png'
import {AiOutlineSearch} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import ModalComponent from '../modal'
const Navbar = ({username, userImage}) => {
  const [open,SetOpen] = useState(false)
  const openModal = () =>{
    SetOpen(true)
  }
  const closeModal = () =>{
    SetOpen(false)
  }
  return (
    <div className='navbar-container flex spaceAround'>
      <div className="title flex spaceEvenly">
        <img src={img} alt="Logo" className='Logo'/>
        <h2>Map Your Nap</h2>
      </div>
      <div className="search-container flex">
        <AiOutlineSearch className='icon'/>
        <input type="text" name="search" className='search-input' placeholder='Click to Search'/>
      </div>
      <div className="user-icon flex spaceAround">
        <div className="notification" onClick={openModal}><IoMdNotificationsOutline className='icon'/></div>
        <ModalComponent openModal={open} onRequestClose={closeModal}>
          <img src={noNotification} alt="nope" className='empty-image'/> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          <p>You have no notification this moment!!</p> 
          
        </ModalComponent>
        <div className="user flex">
          {username}
          <div className="username-circle"></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar