import React, { useState, useEffect } from 'react'
import './style.css'
import ModalComponent from '../modal'
import ImageSlider from '../imageSlider'
import {MapContainer, Marker, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addMonths } from 'date-fns';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios'
import DMap from '../draggebleMap'
import { CiCircleRemove } from "react-icons/ci";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const SearchCard = ({admin,images,latitude,longitude,features,room_id,country}) => {
  const [openAdmin, setOpenAdmin] = useState(false)
  const [openClient, setOpenClient] = useState(false)
  const [openVisit, setOpenVisit] = useState(false)
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState('1');
  const [message, setMessage] = useState(country)
  const [result, setResult] = useState(false)
  const [openUpdate , setOpenUpdate] = useState(false)
  const [done, setDone] =useState(false)
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [imgFull, setImgFull] = useState(false)
  const [missing, setMissing] = useState(false)
  const [error , setError] = useState("")
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const [op , setOp] = useState(false)

  const openOp = () =>{
    setOp(true)
  }
  const cl = () =>{
    setOp(false)
  }
  const [convertedImages, setConvertedImages] = useState([]);
    useEffect(() => {
      const convertImages = () => {
        const getImageUrlFromBase64 = (base64String) => {
          return `data:image/png;base64,${base64String}`;
        };
  
        const convertedImagesArray = images.map((image) => getImageUrlFromBase64(image.image));
        setConvertedImages(convertedImagesArray);
      };
  
      convertImages();
    }, [images]);
    const handleDeleteImage = (index) => {
      const updatedImages = [...convertedImages];
      updatedImages.splice(index, 1);
      setConvertedImages(updatedImages);
  
      if (updatedImages.length < 7) {
        setImgFull(false);
      }
    };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
  
    fetchCountries();
  }, []);
  const [data, setData] = useState({
    description: features,
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
}
  const openUpdateModal = () =>{
    setOpenUpdate(true)
    setOpenAdmin(false)
  }

  const closeUpdateModal = () =>{
    setOpenUpdate(false)
  }
  const openResult = () =>{
    setResult(true)
    setOpenVisit(false)
    setOpenAdmin(false)
  }
  const closeResult = () =>{
    setResult(false)
  }
  const open = () =>{
    setOpenVisit(true)
    setOpenClient(false)
  }
  const closeVisitModal = () =>{
    setOpenVisit(false)
  }
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
  const handleOptionChange = (event) => {
    setDuration(event.target.value);
  };
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
    openResult()  
  }
  const handleDelete = async () =>{
    const fnlData = ({
      room_id: room_id,
    })
    const response = await axios.post('http://127.0.0.1:8000/api/rooms/delete',fnlData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setMessage(response.data.message)
    openResult() 
  }
  const handleDone = async () =>{
    await setDone(true)
    
    setDone(false)
  }


  
  return (
    <div className='searchCard-container flex spaceBetween align-center'>
        <div className="search-info flex column spaceBetween align-center">
            <div className="features"><span>{features}</span></div>
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
              <div className="search-country-cont">{country}</div>
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
                <button className='update-room-btn' onClick={handleDelete}>Delete Room</button>
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
              <div className="search-country-cont">{country}</div>
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
                <button className='update-room-btn book-room-search' onClick={open}>Book</button>
              </div>
            </div>
      </ModalComponent>

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
                <ImageSlider images={images}/>
              </div>
              <div className="room-feat-container">
                {features}
              </div>
              <div className="search-country-cont">{country}</div>
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
            openModal={result} 
            onRequestClose={closeResult} 
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
            {message === "Booking saved successfully" ? message +". Please check bookings to know the time" : message}
             
          </ModalComponent>

          <ModalComponent 
            openModal={op} 
            onRequestClose={cl} 
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
            {error ? error : "Room saved Successfuly."}
             
          </ModalComponent>
    </div>
  )
}

export default SearchCard