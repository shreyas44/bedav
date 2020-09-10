import { gql } from '@apollo/client'

const LocalityInfoFragment = gql`
  fragment LocalityInfoFragment on Locality {
    name
    state
    lastUpdated
    total
    occupied
    available
    lastUpdated
  }
`
export default LocalityInfoFragment
