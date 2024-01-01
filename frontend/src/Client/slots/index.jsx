import React, { useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import SlotCard from '../../Components/slotCard'
import { useEffect } from 'react'
import axios from 'axios'
const Slots = () => {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const token = localStorage.getItem('token');
        const data = ({
          token,
        })
        const response = await axios.post('http://127.0.0.1:8000/api/booking/userBooking',data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        setBookings(response.data.bookings)
      }
      catch(err){
        console.log("error occured")
      }
    }

    fetchData()
  }, [])
  return (
    <div className='slots relative full'>
      <Navbar username={"Youssef"} />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Slots"}/>
      <div className="slots-body absolute body flex gap-50 wrap">
      {
          bookings.map((booking,index) =>(
            <SlotCard 
              date={booking.date}
              endDate={booking.endDate}
              latitude={booking.room.latitude}
              longitude={booking.room.longitude}
              images={booking.room.images}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Slots