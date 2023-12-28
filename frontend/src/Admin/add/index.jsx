import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import Navbar from '../../Components/navbar'
import Sidebar from '../../Components/sidebar'
import DMap from '../../Components/draggebleMap'
const Add = () => {
  const [images, setImages] = useState([]);
  const [done, setDone] =useState(false)
  const fileInputRef = useRef(null)
  const [imgCount, setImgCount] = useState(images.length)
  const [imgFull, setImgFull] = useState(false)
  const [missing, setMissing] = useState(false)
  const [data, setData] = useState({
    description: "",
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
}
const handleDone = async () =>{
  await setDone(true)
  console.log("lat : "+localStorage.getItem('Roomlat'))
  console.log("long : "+localStorage.getItem('Roomlong'))
  setDone(false)
}
  useEffect( () =>{
    localStorage.setItem('Roomlat', 0);
    localStorage.setItem('Roomlong', 0);
  }, [])
  useEffect(() => {
    const checkForMissingData = () => {
      const roomLat = localStorage.getItem('Roomlat');
      const roomLong = localStorage.getItem('Roomlong');
      if (roomLat === '0' || roomLong === '0' || images.length === 0) {
        setMissing(true);
      } else {
        setMissing(false);
      }
    };
  
    checkForMissingData();
  }, [images, localStorage.getItem('Roomlat'), localStorage.getItem('Roomlong')]);
  
  
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

  const handleSave = () =>{

  }

  return (
    <div className='add relative full'>
      <Navbar username={"Admin"}/>
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
          </div>
        </div>
        <div className="lower-container flex center">
          <button className={missing ? 'img-full sve' : 'done-button sve'} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
      
    
  )
}

export default Add