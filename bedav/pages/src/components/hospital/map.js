import React from 'react'
import styled from 'styled-components'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const apiKey = "AIzaSyDMJnJXbyp-pH4xaWY8_S1RI-mUEV1EzB0"

const MapContainer = styled.div`
  width: 50%;
  position: relative;
  height: fit-content;
`

function HospitalMap(props) {
  const {lat, lon} = props
  
  return (
    //<MapContainer>
      <Map 
        containerStyle={{position: "relative", width: "100%", height: "100%"}}
        style={{width: "100%", height: "100%"}}
        google={props.google} zoom={14} ></Map>
    //</MapContainer>
  )
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(HospitalMap)
