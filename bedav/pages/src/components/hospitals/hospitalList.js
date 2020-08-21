import React, { useEffect } from 'react'
import HospitalItem from './hospitalItem'
import {graphql, createPaginationContainer} from 'react-relay'

function HospitalList(props) {
  const list = props.hospitalList.hospitals.edges

  useEffect(() => {
    window.addEventListener("scroll", function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          if(props.relay.hasMore() && !props.relay.isLoading()) {
            props.relay.loadMore(20)
          }
      }
    })

    return window.removeEventListener("scroll", () => {})
  }, [])

  let counter = 0;
  const items = list.map((item, index) => {
    counter += 1
    return <HospitalItem key={index} counter={counter} geolocation={props.geolocation} hospital={item.node} dataToShow={props.dataToShow}/>
  })
  
  return <>{items}</>
}

export default createPaginationContainer(
  HospitalList,
  {
    hospitalList: graphql`
      fragment hospitalList_hospitalList on Query @argumentDefinitions(
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
              ...hospitalItem_hospital
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
      query hospitalListPaginationQuery($count: Int, $lat: Float, $lon: Float, $searchQuery: String, $categoryFilters: [String], $orderBy: HospitalSortField, $descending: Boolean, $cursor: String) {
        ...hospitalList_hospitalList @arguments(count: $count, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending, cursor: $cursor)
      }
    `
  }
)

// export default HospitalList