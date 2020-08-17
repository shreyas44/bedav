import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import HospitalHeader from './hospitalHeader'
import HospitalList from './hospitalList'
import {graphql, QueryRenderer} from 'react-relay'
import environment from '../../Environment'
import SearchHospitalContext from '../contexts/SearchHospital'
import SelectedFitlersContext from '../contexts/SelectedFilters'
import SortContext from '../contexts/Sort'
import HospitalDataOptions from './hospitalDataOptions'

const StyledDiv = styled.div`
  margin: 10vh auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: 250px auto 150px repeat(4, auto);
  grid-gap: 5px;
  font-size: 15px;
  position: relative;
`

const StyledP = styled.p`
  margin: 0 5px;
  grid-column: 1 / -1;
  color: #aaa;
`

function HospitalSection(props) {
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [dataToShow, setDataToShow] = useState("occupied")
  const {searchQuery} = useContext(SearchHospitalContext)
  const {filters} = useContext(SelectedFitlersContext)
  const {sortValue} = useContext(SortContext)

  function setLatLon(position) {
    setLat(position.coords.latitude)
    setLon(position.coords.longitude)
  }

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLatLon)
  }

  return (
    <StyledDiv>
      <HospitalDataOptions 
        dataToShow={dataToShow}
        setDataToShow={setDataToShow}
      />
      <StyledP>
        HDU - High Dependency Unit;
        ICU - Intensive Care Unit;
        N.A. - Not Applicable
      </StyledP>
      <HospitalHeader dataToShow={dataToShow}/>
      <QueryRenderer 
        environment={environment}
        query={graphql`
          query hospitalSectionQuery($lat: Float, $lon: Float, $searchQuery: String, $categoryFilters: [String], $orderBy: HospitalSortField, $descending: Boolean, $cursor: String) {
            # hospitals(first:10, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {
            #   ...hospitalList_hospitalList
            # }

            ...hospitalList_hospitalList @arguments(count: 10, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending, cursor: $cursor)
          }
        `}
        variables={{lat: lat, lon: lon, searchQuery: searchQuery, categoryFilters: filters, orderBy: sortValue.field, descending: sortValue.descending}}
        render={({error, props}) => {
          if(error) {
            return <div>{error}</div>
          }

          if(!props) {
            return <div>Loading...</div>
          }

          console.log(props)
          return <HospitalList hospitalList={{...props}} dataToShow={dataToShow}/>          
        }}
      />
    </StyledDiv>
  )
}

export default HospitalSection