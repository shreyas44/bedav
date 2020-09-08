import React, { useState, useRef, useContext } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { getDistance } from '../extra/funcs'

const HospitalsContext = React.createContext()

let HospitalsProvider = (props) => {

  let hospitals = props.locality.hospitals.edges
  hospitals = hospitals.map(hospital => {
    const localHospital = {...hospital.node}
    localHospital.distance = getDistance(localHospital.latitude, props.latitude, localHospital.longitude, props.longitude)
  
    return localHospital
  })

  return (
    <HospitalsContext.Provider value={hospitals}>
      {props.children}
    </HospitalsContext.Provider>
  )
}

HospitalsProvider = createFragmentContainer(
  HospitalsProvider,
  {
    locality: graphql`
      fragment Hospitals_locality on Locality {
        hospitals(first: 10000) {
          edges {
            node {
              id
              name
              latitude
              longitude
              generalOccupied
              generalAvailable
              hduOccupied
              hduAvailable
              icuOccupied
              icuAvailable
              ventilatorsOccupied
              ventilatorsAvailable
              generalTotal
              ventilatorsTotal
              icuTotal
              hduTotal
              category
            }
          }
        }
      }
    `
  }
) 

export { HospitalsProvider }
export default HospitalsContext
