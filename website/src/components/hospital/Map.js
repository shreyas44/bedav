import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
  TrafficLayer,
} from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";

import styled from "styled-components";

const apiKey = process.env.MAPS_API_CLIENT_KEY;

const MapContainer = styled.div`
  width: 100%;
  position: relative;
  height: 50vh;
  z-index: 0;

  @media only screen and (max-width: 600px) {
    height: 300px;
  }
`;

const HospitalOverlayContainer = styled.div`
  color: white;
  font-size: 14px;
  max-width: 200px;
  text-align: center;
  background-color: black;
  border-radius: 5px;
`;

const HospitalName = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const GetDirectionsButton = styled.div`
  font-weight: bold;
  color: #34a1eb;
  padding: 8px 10px 10px;
  border-top: 1px solid #aaa;
  cursor: pointer;
  border-radius: 0 0 5px 5px;

  &:hover {
    background-color: #444;
  }

  & a {
    color: inherit;
    text-decoration: none;
  }

  & a:visited {
    color: #34a1eb;
  }
`;

function HospitalMap(props) {
  const { lat, lon } = props;
  const ref = useRef();
  const center = {
    lat: lat,
    lng: lon,
  };
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  return (
    <MapContainer>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={16}
        >
          <Marker position={center} />
          <TrafficLayer />
          <OverlayView
            position={center}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            zIndex={10}
          >
            <HospitalOverlayContainer>
              <HospitalName>{props.name}</HospitalName>
              <GetDirectionsButton onClick={() => ref.current.click()}>
                <a href={props.url} ref={ref} target="_blank">
                  Get Directions
                </a>
              </GetDirectionsButton>
            </HospitalOverlayContainer>
          </OverlayView>
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  );
}

export default React.memo(HospitalMap);
