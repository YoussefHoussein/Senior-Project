import React, { useState } from 'react'
import './style.css'
import {BiLogOut} from "react-icons/bi"
import SidebarItem from '../sidebarItem'
import { useNavigate } from "react-router-dom";

const Sidebar = ({items, selected = items[0]}) => {
  const [selectedTab, setSelectedTab] = useState(selected);
  
  const navigation = useNavigate();

  const selectHandler = (label) => {
		setSelectedTab(label);
	};
  
  const openClientProtection = () =>{
    navigation("/client")
    
  }
  const openAdminProtection = () =>{
    navigation("/admin")
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    if(localStorage.getItem('userType') == 2){
      openClientProtection();
    }
    else{
      openAdminProtection()
    }
  }
  return (
    <div className='sidebar-container flex column spaceBetween'>
      
        <div className="items flex column">
          
            {items?.map((item, index) => {
              return (
                <SidebarItem 
                  key={index}
                  label={item}
                  selected={selectedTab === item}
                  onSelected={(label) => selectHandler(label)}
                />
              );
            })}
          
        </div>
        <div className="logout-container flex center" onClick={handleLogout}>
          <BiLogOut className='logout'/>
          Logout
        </div>
      
    </div>
  )
}

export default Sidebar