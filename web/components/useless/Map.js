import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { FormFieldContainer } from './formField'

const apiKey = "AIzaSyDMJnJXbyp-pH4xaWY8_S1RI-mUEV1EzB0"

function Map() {
  const [map, setMap] = useState(null)
  const [location, setLocation] = useState({});

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(map => {
    setMap(null)
  })

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => setLocation({lat: position.coords.latitude, lon: position.coords.longitude}))
  }

  return (
    <FormFieldContainer>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap 
          mapContainerStyle={{maxWidth: "100%", height: 400, borderRadius: 15, marginTop: 75}}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          center={location}
        >

        </GoogleMap>
      </LoadScript>
    </FormFieldContainer>
  )
}

export default React.memo(Map)
