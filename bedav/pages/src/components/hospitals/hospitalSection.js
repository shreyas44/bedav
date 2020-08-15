import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import HospitalHeader from './hospitalHeader'
import HospitalList from './hospitalList'
import {graphql, QueryRenderer} from 'react-relay'
import environment from '../../Environment'
import SearchHospitalContext from '../contexts/SearchHospital'

const StyledDiv = styled.div`
  margin: 10vh auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-gap: 5px;
  font-size: 15px;
`

const StyledP = styled.p`
  margin: 0 5px;
  grid-column: 1 / -1;
  color: #aaa;
`

function HospitalSection(props) {
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [rerender, setRerender] = useState(null)
  const {searchQuery} = useContext(SearchHospitalContext)

  function setLatLon(position) {
    setLat(position.coords.latitude)
    setLon(position.coords.longitude)
    setRerender(false)
  }

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLatLon)
  }

  return (
    <StyledDiv>
      <StyledP>
        Gen - General;
        HDU - High Dependency Unit;
        ICU - Intensive Care Unit;
        Vent - Ventilators
      </StyledP>
      <HospitalHeader />
      <QueryRenderer 
        environment={environment}
        query={graphql`
          query hospitalSectionQuery($lat: Float, $lon: Float, $searchQuery: String) {
            hospitals(first:10, lat: $lat, lon: $lon, searchQuery: $searchQuery) {
              ...hospitalList_hospitalList
            }
          }
        `}
        variables={{lat, lon, searchQuery}}
        render={({error, props}) => {
          if(error) {
            return <div>{error}</div>
          }

          if(!props) {
            return <div>Loading...</div>
          }

          if (!rerender) {
            return <HospitalList hospitalList={props.hospitals}/>
          }
        }}
      />
    </StyledDiv>
  )
}

export default HospitalSection