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
const DMap = () => {

  const [position, setPosition] = useState([0,0])
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
    console.log('Updated Location:', position);
};

  return (
    <MapContainer
            className='map'
            center={[0, 0]}
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
            <button onClick={updateLocation}>Set Location</button>
        </MapContainer>
  )
}

export default DMap