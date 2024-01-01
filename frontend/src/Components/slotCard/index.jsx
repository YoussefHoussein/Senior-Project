import React, { useEffect, useState } from 'react'
import './style.css'
import ImageSlider from '../imageSlider'
import ModalComponent from '../modal'
import {MapContainer, Marker, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const SlotCard = ({images,latitude, longitude,date, endDate}) => {
  const [open, setOpen] = useState(false)

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  useEffect(() => {
    const dateObject = new Date(date);
    const endDateObject = new Date(endDate)

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'UTC',
    };

    const formattedDateUTC = dateObject.toLocaleString('en-US', options);
    const formattedEndDateUTC = endDateObject.toLocaleString('en-US', options);

    options.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedDateLocal = dateObject.toLocaleString('en-US', options);
    const formattedEndDateLocal = endDateObject.toLocaleString('en-US', options);

    setFormattedDate(formattedDateLocal)
    setFormattedEndDate(formattedEndDateLocal)
    
  }, [date]);
  const openModal = () =>{
    setOpen(true)
  }
  const closeModal = () =>{
    setOpen(false)
  }
  return (
    <div className='slotcard-container flex column spaceBetween align-center'>
      <div className="slot-image">
        <ImageSlider images={images} />
      </div>
      <div className="slot-location flex center">
        <div onClick={openModal} className='location-btn'>
          Location
        </div>
      </div>
      <div className="slot-date flex center">
       From &nbsp; <span className='date-data'>{formattedDate}</span> 
      </div>
      <div className="slot-date flex center">
      To &nbsp; <span className='date-data'>{formattedEndDate}</span> 
      </div>
      <ModalComponent 
            openModal={open} 
            onRequestClose={closeModal} 
            posTop={'50'} 
            posLeft={'50'} 
            justifyContent={'flex-start'} 
            height={'50'} gap={'0'} 
            backgroundColor={'#081B38'} 
            color={'white'} 
            width={'500'}
            direction={'column'}
            alignItems={'center'}
          >
          <MapContainer className='map' center={[latitude,longitude]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude,longitude]}>
            </Marker>
        </MapContainer>
      </ModalComponent> 
    </div>
  )
}

export default SlotCard