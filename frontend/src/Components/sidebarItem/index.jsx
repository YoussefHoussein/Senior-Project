import React from 'react'
import {AiFillHome , AiFillHeart, AiOutlineLineChart} from "react-icons/ai"
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import {BiTimeFive, BiSupport} from "react-icons/bi"
import './style.css'
import { useLocation, useNavigate } from "react-router-dom";
const SidebarItem = ({label,selected,onSelected}) => {
    const navigation = useNavigate();
	const location = useLocation();
    const base_location = location.pathname.split("/")[1];
	const clickHandler = () => {
		onSelected(label);
		navigation(`/${base_location}/${label?.toLowerCase()}`);
	};
    let icon
    if(label === "Home"){
        icon = <AiFillHome />
    }
    else if(label === "Add"){
        icon = <IoAddCircleOutline />
    }
    else if(label === "Chats"){
        icon = <MdOutlineChat />
    }
    else if(label === "Suggestions"){
        icon = <AiFillHeart />
    }
    else if(label === "Bookings"){
        icon = <BiTimeFive />
    }
    else if(label === "Statistics"){
        icon = <AiOutlineLineChart />
    }
    else if(label === "Support"){
        icon = <BiSupport />   
    }
  return (
    <div className={selected ? `sidebar-item active flex align-center` : `sidebar-item flex align-center`} 
        onClick={clickHandler}>
        <div className="icon-container">{icon}</div>
        {label}
    </div>
  )
}

export default SidebarItem