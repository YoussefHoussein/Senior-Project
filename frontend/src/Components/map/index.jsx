import React, { useRef, useState, useEffect } from 'react'
import {MapContainer, Marker, TileLayer,Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import './style.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const Map = ({selectedSuggestion}) => {
  const [position, setPosition] = useState([localStorage.getItem('latitude'),localStorage.getItem('longitude')])
  const mapRef = useRef();
  useEffect(() => {
    
    if (selectedSuggestion) {
      const { latitude, longitude, isSelected } = selectedSuggestion;
      console.log('Map Component - Latitude:', latitude, 'Longitude:', longitude, 'isSelected:', isSelected);

      mapRef.current.flyTo([latitude, longitude], 13, { animate: true });
    }
  }, [selectedSuggestion]);
  
  return (
    
    <MapContainer className='map' center={position} zoom={13} scrollWheelZoom={false} ref={mapRef}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div>
              <h3>Your Location</h3>
              <p>Latitude: {position[0]}</p>
              <p>Longitude: {position[1]}</p>
            </div>
          </Popup>
        </Marker>
        {selectedSuggestion ? <Marker position={[selectedSuggestion.latitude,selectedSuggestion.longitude]} >
          <Popup>
            <div>
              <h3>Room Location</h3>
              <p>Latitude: {selectedSuggestion.latitude}</p>
              <p>Longitude: {selectedSuggestion.longitude}</p>
            </div>
          </Popup>
        </Marker> : null}
    </MapContainer>
   
  )
}

export default Map