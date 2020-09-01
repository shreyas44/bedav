import React, { useEffect } from 'react'
import {graphql, createPaginationContainer} from 'react-relay'
import HospitalRow from './HospitalRow'

function HospitalList(props) {
  const list = props.hospitalList.hospitals.edges

  function getData() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if(props.relay.hasMore() && !props.relay.isLoading()) {
        props.relay.loadMore(200)
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", getData)

    return () => {
      window.removeEventListener("scroll", getData)
    }
  }, [])

  const hospitals = list.map((hospital, index) => <HospitalRow hospital={hospital.node} key={hospital.node.id} counter={index + 1} geolocation={props.geolocation}/>)
  
  return <>{hospitals}</>
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
