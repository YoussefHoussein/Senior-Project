import React, {useEffect, useState} from 'react'

const UseGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", long: ""}
    })
    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                long: location.coords.longitude
            }
        })
    }
    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        })
    }
    useEffect(() => {
        if(!("geoLocation" in navigator)){
            onError({
                loaded: true,
                error: {
                    code: 0,
                    message: "GeoLocation not supported"
                }
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])    
  return location
}

export default UseGeoLocation