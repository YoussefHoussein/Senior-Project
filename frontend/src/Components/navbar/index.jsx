import React, { useState } from 'react'
import './style.css'
import img from './Picture1.png'
import {AiOutlineSearch} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import { LuMailWarning } from "react-icons/lu";
import { PiWarningThin } from "react-icons/pi";
import {MdNotificationsActive} from 'react-icons/md'
import ModalComponent from '../modal'
import Map from '../map'
const Navbar = ({username, userImage,email,notifications}) => {
  const [longitude, setLongitude] = useState(5)
  const [latitude, setLatitude] = useState(5)
  const [openNotification,SetOpenNotification] = useState(false)
  const [openUser,SetOpenUser] = useState(false)
  const [openEdit, SetOpenEdit] = useState(false)
  const [data, SetData] = useState({
    username: username,
    email: email,
  })
  const editData = (e) =>{
    SetData({ ...data, [e.target.name]: e.target.value })
  }
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
  const openEditModal = () => {
    SetOpenUser(false)
    SetOpenEdit(true)
  }
  const closeEditModal = () => {
    SetOpenEdit(false)
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
        <div className="notification" onClick={openNotificationModal}>
          <IoMdNotificationsOutline className='icon'/>
        </div>
        {
          notifications ? 
          <ModalComponent 
            openModal={openNotification} 
            onRequestClose={closeNotificationModal} 
            posTop={'40'} 
            posLeft={'77'} 
            justifyContent={'flex-start'} 
            height={'50'} gap={'0'} 
            backgroundColor={'#081B38'} 
            color={'white'} 
            width={'300'}
          >
              {notifications?.map((notification, index) => {
              return (
                <div className='notification-container flex align-center flex-start' key={index}>{notification}</div>
              );
            })}
          </ModalComponent> 
          : 
          <ModalComponent 
            openModal={openNotification} 
            onRequestClose={closeNotificationModal} 
            posTop={'40'} 
            posLeft={'77'} 
            justifyContent={'center'} 
            height={'50'} 
            gap={'0'} 
            backgroundColor={'#081B38'} 
            color={'white'} 
            width={'300'}
          >
            <LuMailWarning className='empty-icon'/>
            <p>You have no notification this moment!!</p> 
          </ModalComponent>
        }
        
        <div className="user flex" onClick={openUserModal}>
          {username}
          <div className="username-circle"></div>
        </div>
        <ModalComponent 
          openModal={openUser} 
          onRequestClose={closeUserModal} 
          posTop={'50'} 
          posLeft={'88'} 
          justifyContent={'flex-start'} 
          height={'70'} 
          gap={'20'} 
          backgroundColor={'#081B38'} 
          color={'white'} 
          width={'300'}
        >
            <div className="user-img"></div>
            <div className="info-container flex center">
              <input type="text" name="username" value={username} className='info-input' disabled/>
            </div>
            <div className="info-container flex center">
              <input type="text" name="email" value={email} className='info-input' disabled/>
            </div>
            <div className="location flex center">
              {
                longitude & latitude ? 
                  <Map longitude={longitude} latitude={latitude}/>
                  :
                  <div className='flex center column'>
                    <PiWarningThin className='warning-location'/>
                    You didn't add your location yet! <br /> Click "Edit" to add it
                  </div>
              }
              
            </div>
            <button className='edit-info' onClick={openEditModal}>Edit</button>
        </ModalComponent>
        <ModalComponent 
          openModal={openEdit} 
          onRequestClose={closeEditModal} 
          posTop={'50'} 
          posLeft={'50'} 
          justifyContent={'flex-start'} 
          height={'70'} 
          gap={'10'} 
          backgroundColor={'#fff'} 
          color={'black'} 
          width={'450'}
        >
          <div className="edit-user-img"></div>
            <div className="info-container flex center">
              <input type="text" name="username" value={data.username} className='info-edit' onChange={editData} required/>
            </div>
            <div className="info-container flex center">
              <input type="text" name="email" value={data.email} className='info-edit' onChange={editData} required/>
            </div>
            <div className="edit-location flex center">
                  <Map longitude={longitude} latitude={latitude}/>
            </div>
            <button className='edit-info' onClick={openEditModal}>Save</button>
        </ModalComponent>
      </div>
    </div>
  )
}

export default Navbar