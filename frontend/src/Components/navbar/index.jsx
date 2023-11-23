import React from 'react'
import './style.css'
import img from './Picture1.png'
import {AiOutlineSearch} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
const Navbar = ({username, userImage}) => {
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
        <div className="notification"><IoMdNotificationsOutline className='icon'/></div>
        <div className="user flex">
          {username}
          <div className="username-circle"></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar