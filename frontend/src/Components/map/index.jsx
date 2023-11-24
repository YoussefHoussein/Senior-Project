import React from 'react'
import {MapContainer, Marker, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const Map = ({longitude,latitude}) => {
    const position = [longitude, latitude]
  return (
    <MapContainer className='map' center={position} zoom={13} scrollWheelZoom={false} >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
                  
        </Marker>
    </MapContainer>
  )
}

export default Map