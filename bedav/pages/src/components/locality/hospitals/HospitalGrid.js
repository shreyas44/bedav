import React, {useEffect, useContext} from 'react'
import styled from 'styled-components'
import {graphql, QueryRenderer} from 'react-relay'
import Swal from 'sweetalert2'
import environment from '../../../Environment'
import { useDictState } from '../../hooks'
import SearchHospitalContext from '../../contexts/SearchHospital'
import SelectedFitlersContext from '../../contexts/SelectedFilters'
import { DataToShowProvider } from '../../contexts/DataToShow'
import SortContext from '../../contexts/Sort'
import HospitalGridHeader from './HospitalGridHeader'
import HospitalList from './HospitalList'
import AbbreviationsInfo from './AbbreviationsInfo'
import HospitalDataDropdown from './HospitalDataDropdown'
import { GridContainer } from '../../grid'

const OptionsContainer = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  width: 100%;
`

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 10vh auto;
  box-sizing: border-box;
  max-width: 1400px;
`

function HospitalGrid(props) {
  const [state, setState] = useDictState({
    geolocation: false,
    getData: false,
  })

  const {searchQuery} = useContext(SearchHospitalContext)
  const {filters} = useContext(SelectedFitlersContext)
  const {sortValue, setSortValue} = useContext(SortContext)

  function setCoords(position) {
    setSortValue({
      ...sortValue,
      field: 'DISTANCE',
      descending: false
    })

    setState({
      geolocation: true,
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      getData: true
    })
  }

  function setPosition() {
    navigator.geolocation.getCurrentPosition(setCoords, () => { setState({geolocation: false, getData: true}) })
  }

  function requestAndSetPosition() {
    Swal.fire({
      title: "Find hospitals closest to you",
      html: "If you want to find the hospitals which are closest to you, please allow <b>bedav</b> to access your location.",
      icon: null,
      showCancelButton: true,
      cancelButtonText: "Not now",
      confirmButtonText: "Always Allow",
      padding: '3em 1em',
      width: '33em',
      confirmButtonColor: "#28a745"
    }).then(result => {
      if(result.isConfirmed === true) {
        setPosition()
      } else if (result.isConfirmed === false) {
      	setState({
          getData: true
        })
      }
    })
  }

  function handleGeolocationState(result) {
    switch(result.state) {
      case 'granted':
        setPosition()
        break
      case 'prompt':
        requestAndSetPosition()
        break
      case 'denied':
        setState({
          getData: true
        }) 
    }
  }

  function requestGeolocationRequest() {
    if(navigator.permissions !== undefined) {
      navigator.permissions.query({name: 'geolocation'}).then(result => {
        handleGeolocationState(result)
        result.onchange = handleGeolocationState(result)
      })  
    } else {
      requestAndSetPosition()
    }
  }

  useEffect(() => {
    if(navigator.geolocation) {
      requestGeolocationRequest()
    } else {
      setState({getData:true})
    }
  }, [])

  return (
    <DataToShowProvider>
      <SectionContainer>
        <OptionsContainer>
          <AbbreviationsInfo />
          <HospitalDataDropdown />
        </OptionsContainer>
        <GridContainer
          columnTemplate="minmax(250px, 300px) minmax(150px, 225px) repeat(5, auto)"
          mobileColumnTemplate="minmax(150px, 175px) repeat(6, auto)"
        >
          <HospitalGridHeader geolocation={state.geolocation}/>
          { state.getData ? 
            <QueryRenderer 
              environment={environment}
              query={graphql`
                query HospitalGridQuery($lat: Float, $lon: Float, $searchQuery: String, $categoryFilters: [String], $orderBy: HospitalSortField, $descending: Boolean, $cursor: String) {
                  ...HospitalList_hospitalList @arguments(count: 500, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending, cursor: $cursor)
                }
              `}
              variables={{lat: state.lat, lon: state.lon, searchQuery: searchQuery, categoryFilters: filters, orderBy: sortValue.field, descending: sortValue.descending}}
              render={({error, props}) => {
                if(error) {
                  return <div>Error, please try again.</div>
                }

                if(!props) {
                  return <div>Loading...</div>
                }

                return <HospitalList hospitalList={{...props}} geolocation={state.geolocation}/>          
              }}
            /> :
            <div>Loading...</div> 
          }
        </GridContainer>
      </SectionContainer>
    </DataToShowProvider>
  )
}

export default HospitalGrid
