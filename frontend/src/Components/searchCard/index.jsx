import React, { useState } from 'react'
import './style.css'
import ModalComponent from '../modal'
import ImageSlider from '../imageSlider'
import {MapContainer, Marker, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const SearchCard = ({admin,images,latitude,longitude,features,room_id}) => {
  const [openAdmin, setOpenAdmin] = useState(false)
  const [openClient, setOpenClient] = useState(false)

  const openAdminModal = () =>{
    setOpenAdmin(true)
  }
  const closeAdminModal = () =>{
    setOpenAdmin(false)
  }

  const openClientModal = () =>{
    setOpenClient(true)
  }
  const closeClientModal = () =>{
    setOpenClient(false)
  }
  const handleVisit = () =>{
    if(admin){
      openAdminModal()
    }
    else{
      openClientModal()
    }
  }
  return (
    <div className='searchCard-container flex spaceBetween align-center'>
        <div className="search-info flex column spaceBetween align-center">
            <div className="features"><span className='txt-features-mv'>{features}</span></div>
            <div className="searchCard-location flex center">{latitude.toFixed(4)}&deg; - {longitude.toFixed(4)}&deg;</div>
        </div>
        <div className="searchCard-visit-btn-container flex center">
            <button className='searchCard-visit-btn' onClick={handleVisit}>Visit</button>
        </div>
        <ModalComponent 
            openModal={openAdmin} 
            onRequestClose={closeAdminModal} 
            posTop={'50'} 
            posLeft={'50'} 
            justifyContent={'flex-start'} 
            height={'70'} gap={'10'} 
            backgroundColor={'#081B38'} 
            color={'white'} 
            width={'1000'}
            direction={'row'}
            alignItems={'center'}
          >
            <div className="card-imgs-cont">
              <ImageSlider images={images}/>
            </div>
            <div className="card-img-details flex column spaceBetween align-center">
              <div className="card-feat-cont flex center">
                {features}
              </div>
              <div className="card-map">
                <MapContainer className='map' center={[latitude,longitude]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[latitude,longitude]}>
                  </Marker>
              </MapContainer>
              </div>
              <div className="card-btns flex flex-start align-center gap-10">
                <button className='update-room-btn'>Delete Room</button>
                <button className='update-room-btn'>Update Room information</button>
              </div>
            </div>
      </ModalComponent>

      <ModalComponent 
            openModal={openClient} 
            onRequestClose={closeClientModal} 
            posTop={'50'} 
            posLeft={'50'} 
            justifyContent={'flex-start'} 
            height={'70'} gap={'10'} 
            backgroundColor={'#081B38'} 
            color={'white'} 
            width={'1000'}
            direction={'row'}
            alignItems={'center'}
          >
          <div className="card-imgs-cont">
              <ImageSlider images={images}/>
            </div>
            <div className="card-img-details flex column spaceBetween align-center">
              <div className="card-feat-cont flex center">
                {features}
              </div>
              <div className="card-map">
                <MapContainer className='map' center={[latitude,longitude]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[latitude,longitude]}>
                  </Marker>
              </MapContainer>
              </div>
              <div className="card-btns flex flex-start align-center gap-10">
                <button className='update-room-btn book-room-search'>Book</button>
              </div>
            </div>
      </ModalComponent>
    </div>
  )
}

export default SearchCard