import React, { useEffect, useContext, useRef } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import Environment from '../../Environment'
import { useDictState } from '../hooks'
import SearchHospitalContext from '../contexts/SearchHospital'
import SelectedFitlersContext from '../contexts/SelectedFilters'
import SortContext from '../contexts/Sort'
import FilterSection from './filter'
import TopSection from './TopSection'
import HospitalGrid from './hospitals/HospitalGrid'

function LocalityPage(props) {
  const localityRef = useRef(props.match ? props.match.params.localityName : null)
  let localityName = localityRef.current

  const {searchQuery} = useContext(SearchHospitalContext)
  const {filters} = useContext(SelectedFitlersContext)
  const {sortValue, setSortValue} = useContext(SortContext)

  const [state, setState] = useDictState({
    geolocation: false,
    getData: false,
    updates: 0,
  })

  useEffect(() => {
    document.title = "Bedav - Home"
  }, [])

  useEffect(() => {
    props.ensureDidMount()
  }, [])

  useEffect(() => {
    const currentName = props.match ? props.match.params.localityName : null
    
    if (currentName && currentName != localityRef.current) {
      localityRef.current = currentName
      setState({
        updates: state.updates + 1
      })
    }
  })

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
    <div>
      <QueryRenderer 
        environment={Environment}
        query={graphql`
          query LocalityPageQuery($localityName: String, $lat: Float, $lon: Float, $searchQuery: String, $categoryFilters: [String], $orderBy: HospitalSortField, $descending: Boolean, $cursor: String) {
            locality(name: $localityName) {
              ...TopSection_locality
              ...HospitalList_locality @arguments(count: 500, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending, cursor: $cursor)
            }
          }
        `}
        variables={{
          lat: state.lat, 
          lon: state.lon,
          searchQuery: searchQuery,
          categoryFilters: filters,
          orderBy: sortValue.field,
          descending: sortValue.descending,
          localityName: localityName
        }}
        render={localProps => {
          const {error} = localProps
          const queryProps = localProps.props
          if (error) {
            console.log(error)
          }

          if (!queryProps) {
            return <div>Loading...</div>
          }

          console.log(queryProps)

          return (
            <>
              <TopSection locality={queryProps.locality}/>
              <HospitalGrid getData={state.getData} geolocation={state.geolocation} locality={queryProps.locality} />
            </>
          )
        }}
      />
      <FilterSection />
    </div>
  )
}

export default LocalityPage
