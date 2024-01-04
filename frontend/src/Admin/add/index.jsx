import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import DMap from '../../Components/draggebleMap'
import axios from 'axios'
import ModalComponent from '../../Components/modal'


const Add = () => {
  const [images, setImages] = useState([]);
  const [done, setDone] =useState(false)
  const fileInputRef = useRef(null)
  const [imgCount, setImgCount] = useState(images.length)
  const [imgFull, setImgFull] = useState(false)
  const [missing, setMissing] = useState(false)
  const [base64Images, setBase64Images] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [data, setData] = useState({
    description: "",
  })
  const [open , setOpen] = useState(false);
  const [error , setError] = useState("")
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
}
const handleDone = async () =>{
  await setDone(true)
  
  setDone(false)
}
const handleCountryChange = (event) => {
  setSelectedCountry(event.target.value);
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
  useEffect( () =>{
    localStorage.setItem('Roomlat', 0);
    localStorage.setItem('Roomlong', 0);
  }, [])
  useEffect(() => {
    const checkForMissingData = () => {
      const roomLat = localStorage.getItem('Roomlat');
      const roomLong = localStorage.getItem('Roomlong');
      if (roomLat === '0' || roomLong === '0' || images.length === 0 || data.description === "" || selectedCountry === "") {
        setMissing(true);
      } else {
        setMissing(false);
      }
    };
  
    checkForMissingData();
  }, [images, localStorage.getItem('Roomlat'), localStorage.getItem('Roomlong'), data.description, selectedCountry]);
  
  
  const handleFileInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const imageFiles = selectedFiles.filter((file) => file.type.startsWith('image/'));

    setImages((prevImages) => [...prevImages, ...imageFiles]);
    setImgCount(imgCount+1)
    if(imgCount == 8){
      setImgFull(true)
    }
  };

  const handleDivClick = () =>{
    fileInputRef.current.click()
  }
  
  const openModal = () =>{
    setOpen(true)
  }
  const closeModal = () =>{
    setOpen(false)
    localStorage.setItem('Roomlat', 0);
    localStorage.setItem('Roomlong', 0);
    setData({
      description: ""
    })
    setSelectedCountry("")
    setImages([])
  }

  const handleSave = async () => {
    
    const promises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(image);
      });
    });
    
    const base64Results = await Promise.all(promises);

    setBase64Images(base64Results);
    console.log('Base64 Images:', base64Results);
    console.log('description' + data.description);
    console.log('lat : ' + localStorage.getItem('Roomlat'));
    console.log('long : ' + localStorage.getItem('Roomlong'));
    
    const fnlData = {
      ...data,
      latitude: localStorage.getItem('Roomlat'),
      longitude: localStorage.getItem('Roomlong'),
      base64Images: base64Results,
      userType: localStorage.getItem('userType'),
      country: selectedCountry
    };
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/rooms/add', fnlData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.message == "room saved successfully"){
        setError("")
        openModal()
      }
      else{
        setError(response.data.message)
        openModal()
      }

  };

  return (
    <div className='add relative full'>
      <Navbar admin={true}/>
      <Sidebar items={["Add","Chats"]} selected={"Add"}/>
      <div className="add-body absolute body flex column">
        <div className="upper-container flex">
          <div className="add-half add-left flex column flex-start align-center gap-10">
            <h1>Add Room</h1>
            
            <div className="add-location-container">
              <DMap done={done}/>
            </div>
            <div className="room-res flex flex-start align-center gap-10">
              <button className='done-button' onClick={handleDone}>Done</button>
              <div className="result">
                Results: &nbsp; &nbsp; {
                  parseFloat(localStorage.getItem('Roomlat')).toFixed(4)
                }&deg; &nbsp; &nbsp;  {
                  parseFloat(localStorage.getItem('Roomlong')).toFixed(4)
                }&deg;
              </div>
            </div>
            <textarea 
              cols="30" 
              rows="10"
              type="text" 
                name="description" 
                className='input-desc' 
                value={data.description} 
                placeholder='Description'
                onChange={handleChange}
            ></textarea>
          </div>
          <div className="add-half add-right flex column flex-start align-center">
            <div className='images-container'>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className='added-image'
                />
              ))}
            </div>
            <div className='cont flex column align-center'>
              <button className={imgFull ? 'img-full' : 'done-button'} onClick={handleDivClick}>Upload Image</button>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                ref={fileInputRef}
                style={ {display : 'none'}}
              />
            </div>
            <div className="info-container flex center">
              <label htmlFor="country">Select a country:</label>
              <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select...</option>
                {countries.map((country) => (
                  <option key={country.cca2} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="lower-container flex center">
          <button className={missing ? 'img-full sve' : 'done-button sve'} onClick={handleSave}>Save</button>
        </div>
      </div>
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
            {error ? error : "Room saved Successfuly."}
             
          </ModalComponent>
    </div>
      
    
  )
}

export default Add