import { gql } from '@apollo/client'

const CountryFragment = gql`
  fragment CountryFragment on Country {
    lastUpdated
    available
    occupied
    total
  }
`

export default CountryFragment
