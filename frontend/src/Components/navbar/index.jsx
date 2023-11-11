import React from 'react'
import './style.css'
import img from './Picture1.png'
import {AiOutlineSearch} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import {BiUserCircle} from "react-icons/bi"
const Navbar = () => {
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
      <div className="user-icon flex spaceBetween">
        <div className="notification"><IoMdNotificationsOutline className='icon'/></div>
        <div className="user"><BiUserCircle className='icon'/></div>
      </div>
    </div>
  )
}

export default Navbar