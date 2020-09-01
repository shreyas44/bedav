import React, { useEffect, useState, useRef } from 'react'
import {graphql, createPaginationContainer} from 'react-relay'
import HospitalRow from './HospitalRow'

function HospitalList(props) {
  const list = props.hospitalList.hospitals.edges
  const toBeRendered = useRef(list)
  const rendered = useRef([])
  const counter = useRef(0)
  const [updates, setUpdates] = useState(0)

  function getData() {
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

export default createPaginationContainer(
  HospitalList,
  {
    hospitalList: graphql`
      fragment HospitalList_hospitalList on Query @argumentDefinitions(
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
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.hospitalList && props.hospitalList.hospitals
    },
    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount
      }
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        count: paginationInfo.count,
        cursor: paginationInfo.cursor,
        lat: fragmentVariables.lat,
        lon: fragmentVariables.lon,
        searchQuery: fragmentVariables.searchQuery,
        categoryFilters: fragmentVariables.categoryFilters,
        orderBy: fragmentVariables.orderBy,
        descending: fragmentVariables.descending,
      }
    },
    query: graphql`
      query HospitalListPaginationQuery($count: Int, $lat: Float, $lon: Float, $searchQuery: String, $categoryFilters: [String], $orderBy: HospitalSortField, $descending: Boolean, $cursor: String) {
        ...HospitalList_hospitalList @arguments(count: $count, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending, cursor: $cursor)
      }
    `
  }
)

// export default HospitalList
