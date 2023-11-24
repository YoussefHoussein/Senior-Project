import React, { useState } from 'react'

import './style.css'
import img from './Picture1.png'
import noNotification from './no-notification.png'
import {AiOutlineSearch} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import ModalComponent from '../modal'
import Map from '../map'
const Navbar = ({username, userImage,email,notifications}) => {
  const [openNotification,SetOpenNotification] = useState(false)
  const [openUser,SetOpenUser] = useState(false)
  const openNotificationModal = () =>{
    SetOpenNotification(true)
  }
  const closeNotificationModal = () =>{
    SetOpenNotification(false)
  } 
  const openUserModal = () =>{
    SetOpenUser(true)
  }
  const closeUserModal = () =>{ 
    SetOpenUser(false)
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
        <div className="notification" onClick={openNotificationModal}><IoMdNotificationsOutline className='icon'/></div>
        {
          notifications ? 
          <ModalComponent openModal={openNotification} onRequestClose={closeNotificationModal} posTop={'40'} posLeft={'77'} justifyContent={'flex-start'} height={'50'} gap={'0'}>
              {notifications?.map((notification, index) => {
              return (
                <div className='notification-container flex align-center flex-start' key={index}>{notification}</div>
              );
            })}
          </ModalComponent> 
          : 
          <ModalComponent openModal={openNotification} onRequestClose={closeNotificationModal} posTop={'40'} posLeft={'77'} justifyContent={'center'} height={'50'} gap={'0'}>
            <img src={noNotification} alt="nope" className='empty-image'/> 
            <p>You have no notification this moment!!</p> 
          </ModalComponent>
        }
        
        <div className="user flex" onClick={openUserModal}>
          {username}
          <div className="username-circle"></div>
        </div>
        <ModalComponent openModal={openUser} onRequestClose={closeUserModal} posTop={'50'} posLeft={'88'} justifyContent={'flex-start'} height={'70'} gap={'20'}>
            <div className="user-img"></div>
            <div className="info-container flex center">
              <input type="text" name="username" value={username} className='info-input' disabled/>
            </div>
            <div className="info-container flex center">
              <input type="text" name="email" value={email} className='info-input' disabled/>
            </div>
            <div className="location">
              <Map />
            </div>
            <button className='edit-info'>Edit</button>
        </ModalComponent>
      </div>
    </div>
  )
}

export default Navbar