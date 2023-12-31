import React, { useEffect, useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import Map from '../../Components/map'
import SuggestionCard from '../../Components/suggestionCard'
import axios from 'axios'
import ModalComponent from '../../Components/modal'
import ImageSlider from '../../Components/imageSlider'
const Suggestions = () => {
  const [longitude, setLongitude] = useState(localStorage.getItem('longitude'))
  const [latitude, setLatitude] = useState(localStorage.getItem('latitude'))
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [openVisit, setOpenVisit] = useState(false)

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

  const handleSuggestionCardClick = (latitude, longitude) =>{
    setSelectedSuggestion({
      latitude,
      longitude,
      isSelected: true,
    });
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
              onClick ={() => handleSuggestionCardClick(room.latitude, room.longitude)}
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
            height={'80'} gap={'0'} 
            backgroundColor={'#081B38'} 
            color={'white'} 
            width={'1000'}
            direction={'row'}
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
            <div className="room-book flex column flex-start align-center gap-10">
              <div className="room-available-slots"></div>
              <div className="book-results"></div>
              <div className="done-btn"></div>
            </div>
          </ModalComponent>
    </div>
  )
}

export default Suggestions