import React, { useState } from 'react'
import './style.css'
import {BiLogOut} from "react-icons/bi"
import SidebarItem from '../sidebarItem'
const Sidebar = ({items, selected = items[0]}) => {
  const [selectedTab, setSelectedTab] = useState(selected);
  const selectHandler = (label) => {
		setSelectedTab(label);
	};
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
        <div className="logout-container flex center">
          <BiLogOut className='logout'/>
          Logout
        </div>
      
    </div>
  )
}

export default Sidebar