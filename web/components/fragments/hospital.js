import { gql } from '@apollo/client'

const HospitalInfo = gql`
  fragment HospitalInfoFragment on Hospital {
    id
    name
    latitude
    longitude
    generalOccupied
    generalAvailable
    oxygenOccupied
    oxygenAvailable
    hduOccupied
    hduAvailable
    icuOccupied
    icuAvailable
    ventilatorsOccupied
    ventilatorsAvailable
    generalTotal
    oxygenTotal
    ventilatorsTotal
    icuTotal
    hduTotal
    category
    address
    phone
    website

    locality {
      id
      name
      state
    }
  }
`

export default HospitalInfo
