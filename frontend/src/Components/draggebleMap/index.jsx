import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const DMap = ({save}) => {
  const [position, setPosition] = useState([localStorage.getItem('latitude'),localStorage.getItem('longitude')])
  const markerRef = useRef(null)
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const updateLocation = () => {
    if(position.lat == null || position.lat == undefined || position.lng == null || position.lng == undefined) {
      
    }
    else{
      localStorage.setItem('latitude',position.lat)
      localStorage.setItem('longitude',position.lng)
    }
    console.log("lat "+localStorage.getItem('latitude')+" lng "+localStorage.getItem('longitude'))
    
    

};

  if(save) {
    updateLocation()
  }
  

  return (
    <MapContainer
            className='map'
            center={position}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                draggable={true}
                position={position}
                eventHandlers={eventHandlers}
                ref={markerRef}
            ></Marker>
        </MapContainer>
  )
}

export default DMap