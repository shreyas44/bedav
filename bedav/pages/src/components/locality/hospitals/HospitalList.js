import React, { useEffect, useState, useRef, useContext } from 'react'
import {graphql, createPaginationContainer, createRefetchContainer } from 'react-relay'
import HospitalRow from './HospitalRow'
import SearchHospitalContext from '../../contexts/SearchHospital'
import SelectedFitlersContext from '../../contexts/SelectedFilters'
import SortContext from '../../contexts/Sort'

function HospitalList(props) {
  const list = props.locality.hospitals.edges
  const resetList = useRef(false)
  const toBeRendered = useRef(list)
  const rendered = useRef([])
  const counter = useRef(0)
  const [updates, setUpdates] = useState(0)

  const {searchQuery} = useContext(SearchHospitalContext)
  const {filters} = useContext(SelectedFitlersContext)
  const {sortValue} = useContext(SortContext)
  const prev = useRef({
    searchQuery,
    filters,
    sortValue
  })

  if (resetList.current) {
    toBeRendered.current = list
    rendered.current = []
    counter.current = 0
    loadMore(20)
    resetList.current = false
  }

  useEffect(() => {
    if (searchQuery != prev.current.searchQuery || filters != prev.current.filters || sortValue.field != prev.current.sortValue.field || sortValue.descending != prev.current.sortValue.descending) {
      props.relay.refetch(variables => ({
          ...variables,
          searchQuery: searchQuery,
          filters: filters,
          orderBy: sortValue.field,
          descending: sortValue.descending
        })
      )

      prev.current = {
        searchQuery,
        filters,
        sortValue
      }

      resetList.current = true
    }
  })

  function getData() {
    return 
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && toBeRendered.current.length == 0) {
      if(props.relay.hasMore() && !props.relay.isLoading()) {
        props.relay.loadMore(500)
      }
    }
  }

  function getNewRenderedItems(count, hospitals) {
    let newRendered = hospitals.slice(0,count).map((hospital) => {
      const component = <HospitalRow hospital={hospital.node} key={hospital.node.id} counter={counter.current + 1} geolocation={props.geolocation}/>
      counter.current += 1
      return component
    })
    return newRendered
  }

  function getNewToBeRenderedItems(count, hospitals) {
    let newToBeRendered  = [...hospitals]
    newToBeRendered.splice(0,count)
    return newToBeRendered
  }

  function loadMore(count) {
    const hospitals = toBeRendered.current
    toBeRendered.current = getNewToBeRenderedItems(count, hospitals) 
    rendered.current = rendered.current.concat(getNewRenderedItems(count, hospitals))
    setUpdates(updates + 1)
  }

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
      loadMore(20)
    }
  }



  useEffect(() => {
    window.addEventListener("scroll", getData)

    return () => {
      window.removeEventListener("scroll", getData)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    loadMore(20)
  }, [])

  return <>{rendered.current}</>
}

export default createRefetchContainer(
  HospitalList,
  {
    locality: graphql`
      fragment HospitalList_locality on Locality @argumentDefinitions(
        count: {type: "Int"},
        cursor: {type: "String"},
        lat: {type: "Float"},
        lon: {type: "Float"},
        searchQuery: {type: "String"},
        categoryFilters: {type: "[String]"},
        orderBy: {type: "HospitalSortField"},
        descending: {type: "Boolean"}
      ) {
        hospitals(
          first: $count,
          after: $cursor,
          lat: $lat,
          lon: $lon,
          searchQuery: $searchQuery,
          categoryFilters: $categoryFilters,
          orderBy: $orderBy,
          descending: $descending
          ) @connection(key: "hospitalList_hospitals") {
          edges {
            node {
              id
              ...HospitalRow_hospital
            }
          }

          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
  },
  graphql`
    query HospitalListPaginationQuery($localityName: String, $count: Int, $lat: Float, $lon: Float, $searchQuery: String, $categoryFilters: [String], $orderBy: HospitalSortField, $descending: Boolean, $cursor: String) {
      locality(name: $localityName) {
        ...HospitalList_locality @arguments(count: $count, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending, cursor: $cursor)  
      }
    }
  `
)

// export default HospitalList
