import React, { useEffect, useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import Map from '../../Components/map'
import SuggestionCard from '../../Components/suggestionCard'
import axios from 'axios'
import ModalComponent from '../../Components/modal'
import ImageSlider from '../../Components/imageSlider'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addMonths } from 'date-fns';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
const Suggestions = () => {
  const [longitude, setLongitude] = useState(localStorage.getItem('longitude'))
  const [latitude, setLatitude] = useState(localStorage.getItem('latitude'))
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [openVisit, setOpenVisit] = useState(false)
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState('1');
  const [room_id , setRoomId] = useState('')
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState('')
  
  const openModal =()=>{
    setOpenVisit(false)
    setOpen(true)
  }
  const closeModal =()=>{
    setOpen(false)
  }
  const handleOptionChange = (event) => {
    setDuration(event.target.value);
  };
  const openVisitModal = () =>{
    setOpenVisit(true)
  }
  const closeVisitModal = () =>{
    setOpenVisit(false)
  }
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const token = localStorage.getItem('token');
        const data ={
          userLat: latitude,
          userLong: longitude
        }
        const response = await axios.post('http://127.0.0.1:8000/api/rooms/suggestions',data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        setSuggestions(response.data)
      }
      catch(err){
        console.log("error occured")
      }
    }

    fetchData()
  }, [])

  const handleSuggestionCardClick = (latitude, longitude,room_id) =>{
    setSelectedSuggestion({
      latitude,
      longitude,
      isSelected: true,
    });
    setRoomId(room_id);
  }
  const  convertToISOString = (dateString, timeString) =>{
    
    const dateObject = new Date(dateString);

    
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    
    const [hours, minutes] = timeString.split(':');

    
    const isoString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}T${hours}:${minutes}:00`;

    return isoString;
  }
  const handleBook = async () =>{
    const booking_date = convertToISOString(date.toDateString(),time)
    const fnlData = ({
      room_id: room_id,
      token: localStorage.getItem('token'),
      date: booking_date,
      duration: duration
    })
    const response = await axios.post('http://127.0.0.1:8000/api/booking/create',fnlData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    setMessage(response.data.message)
    openModal()
  }
  return (
    <div className='suggestions relative full'>
      <Navbar  />
      <Sidebar items={["Home","Suggestions","Slots","Statistics","Support"]} selected={"Suggestions"}/>
      <div className="client-home-container absolute body">
        <Map selectedSuggestion={selectedSuggestion} />
      </div>
      <div className='suggestions-cont flex column gap-10'>
        {
          suggestions.map((room,index) =>(
            <SuggestionCard 
              latitude={room.latitude} 
              longitude={room.longitude} 
              images={room.images} 
              features={room.features}
              room_id={room._id}
              onClick ={() => handleSuggestionCardClick(room.latitude, room.longitude,room._id)}
              selected={selectedSuggestion && selectedSuggestion.latitude === room.latitude && selectedSuggestion.longitude === room.longitude}
            />
          ))
        }
      </div>
      {selectedSuggestion ? <button className='visit-btn' onClick={openVisitModal}>Visit</button> : null}
      <ModalComponent 
            openModal={openVisit} 
            onRequestClose={closeVisitModal} 
            posTop={'50'} 
            posLeft={'50'} 
            justifyContent={'flex-start'} 
            height={'60'} gap={'0'} 
            backgroundColor={'white'} 
            color={'#081B38'} 
            width={'1000'}
            direction={'row'}
            alignItems={'flex-start'}
          >
            <div className="room-details flex column flex-start align-center gap-50">
              <div className="room-img-container">
              {selectedSuggestion && suggestions.length > 0 && (
                suggestions
                .filter(suggestion => suggestion.latitude === selectedSuggestion.latitude && suggestion.longitude === selectedSuggestion.longitude)
                .map((matchedSuggestion, index) => (
                  <ImageSlider images={matchedSuggestion.images}/>
                ))
              )}
              </div>
              <div className="room-feat-container">
              {selectedSuggestion && suggestions.length > 0 && (
                suggestions
                .filter(suggestion => suggestion.latitude === selectedSuggestion.latitude && suggestion.longitude === selectedSuggestion.longitude)
                .map((matchedSuggestion, index) => (
                  matchedSuggestion.features
                ))
              )}
              </div>
            </div>
            <div className="room-book flex column spaceBetween align-center">
              <div className="room-available-slots flex center">
                <Calendar 
                  onChange={setDate} 
                  value={date} 
                  className={'react-calendar'}
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 1)}
                  next2Label= ''
                  prev2Label=''

                />
              </div>
              <div className="set-time flex align-center spaceBetween">
                <TimePicker onChange={setTime} value={time} className={'time-picker'}/>
                <select name="duration" value={duration} onChange={handleOptionChange}>
                  <option value="1">1 hour</option>
                  <option value="6">6 hour</option>
                  <option value="12">12 hour</option>
                </select>
              </div>
              <div className="book-results flex center gap-50">
                {date.toDateString()} -
                {time} -
                {duration} hours
              </div>
              <div className="done-btn-container flex center">
                <button className='done-btn' onClick={handleBook}>Book</button>
              </div>
            </div>
          </ModalComponent>
          <ModalComponent 
            openModal={open} 
            onRequestClose={closeModal} 
            posTop={'50'} 
            posLeft={'50'} 
            justifyContent={'center'} 
            height={'40'} 
            gap={'0'} 
            backgroundColor={'#081B38'} 
            color={'white'} 
            width={'310'}
            direction={'column'}
            alignItems={'center'}
          >
            {message === "booking saved successfully" ? message +". Please check slots to know the time" : message}
             
          </ModalComponent>
    </div>
  )
}

export default Suggestions