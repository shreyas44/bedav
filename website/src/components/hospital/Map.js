import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { GoogleMap, LoadScript, Marker, TrafficLayer, OverlayView } from '@react-google-maps/api'

const apiKey = process.env.MAPS_API_KEY_WEBSITE

const MapContainer = styled.div`
  width: 100%;
  position: relative;
  height: 50vh;
  z-index: 0;

  @media only screen and (max-width: 600px) {
    height: 300px;
  }
`

const HospitalOverlayContainer = styled.div`
  color: white;
  font-size: 14px;
  max-width: 200px;
  text-align: center;
  background-color: black;
  border-radius: 5px;
`

const HospitalName = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`

const GetDirectionsButton = styled.div`
  font-weight: bold;
  color: var(--picton-blue);
  padding: 8px 10px 10px;
  border-top: 1px solid var(--silver-chalice);
  cursor: pointer;
  border-radius: 0 0 5px 5px;

  &:hover {
    background-color: var(--tundora);
  }

  & a {
    color: inherit;
    text-decoration: none;
  }

  & a:visited {
    color: var(--picton-blue);
  }
`

function HospitalMap(props) {
  const {lat, lon} = props
  const ref = useRef()
  const center = {
    lat: lat,
    lng: lon
  }
  const [map, setMap] = useState(null)

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  return (
    <MapContainer>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{height: "100%", width: "100%"}}
          center={center}
          zoom={16}
        >
          <Marker 
            position={center}
          />
          <TrafficLayer />
          <OverlayView
            position={center}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            zIndex={10}
          >
            <HospitalOverlayContainer>
              <HospitalName>
                {props.name} 
              </HospitalName>
              <GetDirectionsButton onClick={() => ref.current.click()}> 
                <a href={props.url} ref={ref} target="_blank">Get Directions</a>
              </GetDirectionsButton>
            </HospitalOverlayContainer>
          </OverlayView>
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  )
}

export default React.memo(HospitalMap)
