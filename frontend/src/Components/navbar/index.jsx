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
import { CiUser } from "react-icons/ci";
import DMap from '../draggebleMap'
import axios from 'axios'
import {useNavigate } from "react-router-dom";
const Navbar = ({notifications, admin}) => {
  const navigation = useNavigate();

  const [longitude, setLongitude] = useState(localStorage.getItem('longitude'))
  const [latitude, setLatitude] = useState(localStorage.getItem('latitude'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [username, setUsername] = useState(localStorage.getItem('userName'))

  const [searchData, setSearchData] = useState("")

  const handleSearch = (e) =>{
    setSearchData(e.target.value)
  }

  const [save, setSave] = useState(false)

  const [openNotification,SetOpenNotification] = useState(false)
  const [openUser,SetOpenUser] = useState(false)
  const [openEdit, SetOpenEdit] = useState(false)

  const [data, SetData] = useState({
    e_name: username,
    e_email: email,
    token: localStorage.getItem('token')
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

  const handleSave = async () => {
    await setSave(true)

    const finalData = ({
      ...data,
      latitude: localStorage.getItem('latitude'),
      longitude: localStorage.getItem('longitude'),
    })
    console.log(finalData)
    const response = await axios.post('http://127.0.0.1:8000/api/user/update', finalData)
    if(response.data.message == "Updated user"){
      closeEditModal()
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('userName', response.data.name)
      navigation("/client")
    }
    else{
      console.log('error')
    }
    setSave(false)
  }
  return (
    <div className='navbar-container flex spaceAround'>
      <div className="title flex spaceEvenly">
        <img src={img} alt="Logo" className='Logo'/>
        <h2>Map Your Nap</h2>
      </div>
      <div className="search-container flex">
        <AiOutlineSearch className='icon'/>
        <input type="text" name="search" value={searchData} onChange={handleSearch} className='search-input' placeholder='Click to Search'/>
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
            direction={'column'}
            alignItems={'center'}
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
            direction={'column'}
            alignItems={'center'}
          >
            <LuMailWarning className='empty-icon'/>
            <p>You have no notification this moment!!</p> 
          </ModalComponent>
        }
        {
          admin ? username: 
          <div className="user flex" onClick={openUserModal}>
            {username}
            <div className="username-circle flex center"> <CiUser className='user-icons'/></div>
          </div>
        }
        
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
          direction={'column'}
          alignItems={'center'}
        >
            <div className="user-img flex center"><CiUser className='user-icons'/></div>
            <div className="info-container flex center">
              <input type="text" name="username" value={username} className='info-input' disabled/>
            </div>
            <div className="info-container flex center">
              <input type="text" name="email" value={email} className='info-input' disabled/>
            </div>
            <div className="location flex center">
              <Map />
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
          direction={'column'}
          alignItems={'center'}
        >
            <div className="user-img flex center"><CiUser className='user-icons'/></div>
            <div className="info-container flex center">
              <input type="text" name="e_name" value={data.e_name} className='info-edit' onChange={editData} required/>
            </div>
            <div className="info-container flex center">
              <input type="text" name="e_email" value={data.e_email} className='info-edit' onChange={editData} required/>
            </div>
            <div className="edit-location flex center">
                <DMap save={save}/>
            </div>
            <button className='edit-info' onClick={handleSave}>Save</button>
        </ModalComponent>
      </div>
    </div>
  )
}

export default Navbar